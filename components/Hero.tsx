import Link from "next/link";
import Cat from "@/components/Cat";

// Hero stays a Server Component; only the cat runs in the browser.
export default function Hero() {
  return (
    // Text on the left, cat on the right; on small screens the cat goes below
    <section className="grid items-center gap-10 pt-12 pb-8 md:grid-cols-[1fr_auto]">
      <div className="stagger">
        <p className="font-mono text-xs tracking-widest text-accent uppercase">
          Seeking internships and a 2027–2028 placement
        </p>
        <h1 className="mt-4 text-[clamp(3.5rem,11vw,6rem)] leading-[0.9]">
          Diego
          <br />
          Abete<span className="text-accent">.</span>
        </h1>
        <p className="mt-5 font-mono text-muted">{"// cs @ kcl — backend, systems, ai"}</p>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          Second-year Computer Science student at King&apos;s College London,
          interested in software and AI engineering.
        </p>

        {/* Calls to action: the two places a recruiter most likely wants to go */}
        <div className="mt-9 flex flex-wrap gap-3 text-sm font-semibold">
          <Link
            href="/projects"
            className="rounded-md bg-accent px-5 py-2.5 text-background transition-transform duration-300 hover:-translate-y-0.5"
          >
            See my projects
          </Link>
          <Link
            href="/resume"
            className="rounded-md border border-line px-5 py-2.5 transition duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            View my resume
          </Link>
        </div>
      </div>

      <Cat />
    </section>
  );
}
