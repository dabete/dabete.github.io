"use client";

import { useEffect, useRef, useState } from "react";

const MENACE = ["left-0 top-[10%]", "left-1.5 top-[55%] [animation-delay:0.9s]", "right-0 top-[18%] [animation-delay:0.45s]", "right-2 top-[62%] [animation-delay:1.35s]"];

// ASCII British Shorthair. Orange eyes follow the mouse; click it and it purrs.
export default function Cat() {
  const root = useRef<HTMLButtonElement>(null);
  const [purrId, setPurrId] = useState(0); // >0 while purring; changes each purr

  // Eyes lean (max ~2.5px) toward the mouse. Skipped with reduced motion.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pupils = root.current!.querySelectorAll<HTMLElement>(".cat-pupil");
    function onMove(e: MouseEvent) {
      pupils.forEach((p) => {
        const b = p.getBoundingClientRect();
        const dx = e.clientX - (b.left + b.width / 2);
        const dy = e.clientY - (b.top + b.height / 2);
        const d = Math.hypot(dx, dy) || 1;
        p.style.translate = `${(dx / d) * 2.5}px ${(dy / d) * 2}px`;
      });
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  function purr() {
    if (purrId) return; // already purring
    setPurrId(Date.now());
    setTimeout(() => setPurrId(0), 2300); // after the last "purr~" has floated away
  }

  const eye = (
    <span className="cat-eye">
      (<span className="cat-pupil">●</span>)
    </span>
  );

  return (
    <button
      ref={root}
      type="button"
      onClick={purr}
      aria-label="ASCII art of a grey British Shorthair cat with orange eyes. Click to pet."
      className="relative mx-auto cursor-pointer px-9 py-5 md:mx-0"
    >
      {MENACE.map((pos) => (
        <span key={pos} aria-hidden className={`menace ${pos}`}>
          ゴ
        </span>
      ))}
      {purrId > 0 &&
        ["purr~", "♥", "purr~", "♥", "purr~"].map((text, i) => (
          <span
            key={`${purrId}-${i}`}
            aria-hidden
            className="purr-float font-mono"
            style={{ left: `${20 + ((i * 37) % 60)}%`, animationDelay: `${i * 0.22}s`, animationFillMode: "both" }}
          >
            {text}
          </span>
        ))}
      <pre aria-hidden className={`text-left font-mono text-[15px] leading-[1.15] text-[#7f8894] ${purrId ? "purring" : ""}`}>
        {"   /\\_____/\\\n  /         \\\n |  "}
        {eye} {eye}
        {"  |\n |     ᴥ     |\n  \\  ‿‿‿‿‿  /\n   '-------'"}
      </pre>
    </button>
  );
}
