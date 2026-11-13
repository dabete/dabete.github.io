"use client";
// "use client" = this component runs in the browser, not just at build time.
// It needs to, because it animates a <canvas> using browser APIs.

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; r: number; speed: number; drift: number; phase: number };

// Slow gold specks drifting upward behind the hero.
export default function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // useEffect runs after the component appears on the page, and the function
  // it returns runs when the component is removed (to clean up).
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Use the same gold as the rest of the site (defined in globals.css)
    const gold = getComputedStyle(document.documentElement).getPropertyValue("--gold").trim();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    // Match the canvas to its size on screen (and to high-DPI screens so it stays sharp)
    function resize() {
      const dpr = window.devicePixelRatio || 1;
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // More area = more particles, so density looks the same on phone and desktop
      const count = Math.round((width * height) / 9000);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.4,
        speed: Math.random() * 0.25 + 0.05,
        drift: (Math.random() - 0.5) * 0.15,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = gold;
      for (const p of particles) {
        // Twinkle: brightness gently pulses over time
        ctx!.globalAlpha = 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(time / 1200 + p.phase));
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    let frame = 0;
    function tick(time: number) {
      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift;
        // Off the top or sides? Re-enter at the bottom.
        if (p.y < -5 || p.x < -5 || p.x > width + 5) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }
      }
      draw(time);
      // requestAnimationFrame = "call me before the next screen refresh".
      // Browsers pause it in hidden tabs, so this costs nothing in the background.
      frame = requestAnimationFrame(tick);
    }

    resize();
    const observer = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    observer.observe(canvas);

    // Reduced motion: show one still frame of specks instead of animating
    if (reduceMotion) draw(0);
    else frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  // aria-hidden: purely decorative, screen readers skip it
  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
