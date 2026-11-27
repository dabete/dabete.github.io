import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

// Shown for any URL that doesn't exist (exported as 404.html for GitHub Pages).
export default function NotFound() {
  return (
    <div className="pt-14 text-center">
      <pre
        role="img"
        aria-label="ASCII cat knocking a page off a table"
        className="inline-block text-left font-mono text-[15px] leading-[1.15] text-[#7f8894]"
      >
        {"   /\\_/\\        "}
        <span className="falling">[ page ]</span>
        {"\n  ( "}
        <span className="text-accent">●</span>.<span className="text-accent">●</span>
        {" )  _/\n __> ^ <___/\n|__________|"}
      </pre>
      <h1 className="mt-6 text-7xl">404</h1>
      <p className="mt-2 text-muted">My cat knocked this page off the table.</p>
      <p className="mt-6">
        <Link href="/" className="font-mono text-sm text-muted transition-colors hover:text-accent">
          ← take me home
        </Link>
      </p>
    </div>
  );
}
