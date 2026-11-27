"use client"; // needs the current URL to highlight the active link

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  href: string;
  label: string;
};
// The links shown in the navbar. Adding a page = adding one line here
// (plus its folder in app/, plus a key in components/VimKeys.tsx).
const links: NavLink[] = [
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/resume", label: "resume" },
  { href: "/contact", label: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    // Named so page transitions leave the header still (see globals.css)
    <header
      className="sticky top-0 z-10 border-b border-line bg-background/80 backdrop-blur"
      style={{ viewTransitionName: "site-header" }}
    >
      <nav className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-4 font-mono text-sm">
        <Link href="/" className="text-accent">
          ~/diego
        </Link>
        <ul className="flex gap-5 text-muted">
          {links.map((link) => {
            // /projects/api-gateway still counts as "projects"
            const active = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className="link-line"
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
