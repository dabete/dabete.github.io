"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// LazyVim-style keyboard controls. Hidden until a vim key is pressed.
//   space      → menu: h home, p projects, a about, r resume, c contact, ? keys
//   j / k      → move through project rows (elements with data-vim-row), else scroll
//   enter / l  → open the selected row
//   h          → back (project → list, other pages → home)
//   H / L      → previous / next page (about, projects, resume, contact)
//   gg / G     → top / bottom
//   :          → command line (:q, :help, :projects)

const MENU: [key: string, label: string, href: string][] = [
  ["h", "home", "/"],
  ["p", "projects", "/projects/"],
  ["a", "about", "/about/"],
  ["r", "resume", "/resume/"],
  ["c", "contact", "/contact/"],
];
// Shift+H / Shift+L cycle through these, in navbar order
const TABS = ["/about/", "/projects/", "/resume/", "/contact/"];
const HELP = "j/k move · ⏎/l open · h back · H/L prev/next page · gg/G top/bottom · : commands · space menu";

export default function VimKeys() {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(false); // bar visible
  const [menu, setMenu] = useState(false); // which-key popup open
  const [cmd, setCmd] = useState<string | null>(null); // null = not in : mode
  const [message, setMessage] = useState("");

  // Values the key handler reads; refs so the listener is added only once.
  const state = useRef({ menu, cmd, pathname, sel: -1, lastG: 0 });
  useEffect(() => {
    state.current.menu = menu;
    state.current.cmd = cmd;
  }, [menu, cmd]);
  // New page: remember it and forget the selected row.
  useEffect(() => {
    state.current.pathname = pathname;
    state.current.sel = -1;
  }, [pathname]);

  useEffect(() => {
    let msgTimer: ReturnType<typeof setTimeout>;
    const say = (text: string) => {
      setMessage(text);
      clearTimeout(msgTimer);
      msgTimer = setTimeout(() => setMessage(""), 3000);
    };
    const rows = () => [...document.querySelectorAll<HTMLElement>("[data-vim-row]")];
    const select = (i: number) => {
      const all = rows();
      state.current.sel = i;
      all.forEach((r, n) => r.toggleAttribute("data-selected", n === i));
      all[i]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    };
    const go = (href: string) => {
      select(-1);
      router.push(href);
    };

    function onKey(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey || e.key === "Shift") return;
      // Never steal keys while someone is typing in a form field.
      const t = e.target as HTMLElement;
      if (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName)) return;
      const s = state.current;
      // Caps Lock shouldn't turn j into J: only Shift makes a capital.
      const k = e.shiftKey || e.key.length !== 1 ? e.key : e.key.toLowerCase();
      // Space/Enter on a focused button (e.g. the cat) should press it.
      if (t.tagName === "BUTTON" && (k === " " || k === "Enter") && s.cmd === null && !s.menu) return;

      // ":" command line
      if (s.cmd !== null) {
        e.preventDefault();
        if (k === "Escape") return setCmd(null);
        if (k === "Backspace") return setCmd(s.cmd.slice(0, -1));
        if (k === "Enter") {
          const c = s.cmd.trim();
          setCmd(null);
          if (["q", "q!", "wq", "x"].includes(c)) {
            go("/");
            say("you can't quit that easily. welcome home.");
          } else if (c === "help" || c === "h") say(HELP);
          else if (c === "projects") go("/projects/");
          else if (c) say(`E492: Not an editor command: ${c}`);
          return;
        }
        if (k.length === 1) setCmd(s.cmd + k);
        return;
      }

      // space menu: the next key picks
      if (s.menu) {
        e.preventDefault();
        setMenu(false);
        const item = MENU.find(([key]) => key === k);
        if (item) go(item[2]);
        else if (k === "?") say(HELP);
        return;
      }

      const onProjectPage = /^\/projects\/[^/]+\/?$/.test(s.pathname);
      switch (k) {
        // Shift+H / Shift+L: previous / next page, like switching buffers in LazyVim
        case "H":
        case "L": {
          setActive(true);
          const here = TABS.findIndex((p) => s.pathname.startsWith(p)); // -1 on home
          const next = here === -1 ? (k === "L" ? 0 : TABS.length - 1) : (here + (k === "L" ? 1 : -1) + TABS.length) % TABS.length;
          go(TABS[next]);
          return;
        }
        case " ":
          e.preventDefault();
          setActive(true);
          setMenu(true);
          return;
        case ":":
          e.preventDefault();
          setActive(true);
          setCmd("");
          return;
        case "Escape":
          select(-1);
          return;
        case "j":
        case "k": {
          setActive(true);
          const n = rows().length;
          if (n) select(k === "j" ? Math.min(n - 1, s.sel + 1) : Math.max(0, s.sel - 1));
          else window.scrollBy({ top: k === "j" ? 80 : -80, behavior: "smooth" });
          return;
        }
        case "Enter":
        case "l":
          if (s.sel >= 0) {
            e.preventDefault();
            rows()[s.sel]?.click();
          }
          return;
        case "h":
          setActive(true);
          if (onProjectPage) go("/projects/");
          else if (s.pathname !== "/") go("/");
          return;
        case "G":
          setActive(true);
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
          return;
        case "g":
          setActive(true);
          if (Date.now() - s.lastG < 500) window.scrollTo({ top: 0, behavior: "smooth" });
          s.lastG = Date.now();
          return;
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(msgTimer);
    };
  }, [router]);

  const file = pathname === "/" ? "home.md" : pathname.replace(/^\/|\/$/g, "") + ".md";

  return (
    <>
      {/* which-key popup */}
      <div
        aria-hidden={!menu}
        className={`fixed right-4 bottom-9 z-50 min-w-56 rounded-lg border border-line bg-[#252525] px-4 py-3 font-mono text-sm transition duration-200 ${menu ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
      >
        <p className="mb-1.5 text-foreground">~/diego</p>
        {MENU.map(([key, label]) => (
          <p key={key} className="flex gap-3 py-0.5 text-muted">
            <b className="w-3.5 text-accent">{key}</b>
            {label}
          </p>
        ))}
        <p className="flex gap-3 py-0.5 text-muted">
          <b className="w-3.5 text-accent">?</b>all keys
        </p>
      </div>

      {/* status bar */}
      <div
        aria-hidden={!active}
        className={`fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-[#252525] font-mono text-xs transition-transform duration-300 ${active ? "" : "translate-y-full"}`}
      >
        <span className="border-r border-line px-2.5 py-1 font-bold text-accent">
          {cmd !== null ? "COMMAND" : "NORMAL"}
        </span>
        <span className="px-2.5 py-1 text-foreground">~/diego/{file}</span>
        <span className="flex-1 truncate px-2.5 py-1 text-muted" role="status">
          {cmd !== null ? `:${cmd}` : message}
        </span>
        <span className="hidden px-2.5 py-1 text-muted sm:block">j/k · ⏎ · h · H/L · space</span>
      </div>
    </>
  );
}
