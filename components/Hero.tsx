import Link from "next/link";
import GoldParticles from "@/components/GoldParticles";
import AsciiDino from "@/components/AsciiDino";

// Hero stays a Server Component; only GoldParticles runs in the browser.
export default function Hero() {
  return (
    // relative + isolate: the particle canvas sits behind the text, inside this box
    <section className="relative isolate pt-20 pb-16">
      <div className="absolute inset-0 -z-10">
        <GoldParticles />
      </div>

      {/* Text on the left, dino on the right; on small screens the dino goes below */}
      <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-gold uppercase">
            Seeking internships and a 2027–2028 placement
          </p>
          <h1 className="mt-4 text-6xl font-semibold tracking-tight">
            Diego Abete
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Second-year Computer Science student at King&apos;s College London,
            interested in software and AI engineering.
          </p>

          {/* Calls to action: the two places a recruiter most likely wants to go */}
          <div className="mt-10 flex flex-wrap gap-3 text-sm font-medium">
            <Link
              href="/projects"
              className="rounded-md bg-gold px-5 py-2.5 text-background hover:opacity-90"
            >
              See my projects
            </Link>
            <Link
              href="/resume"
              className="rounded-md border border-line px-5 py-2.5 hover:border-gold hover:text-gold"
            >
              View my resume
            </Link>
          </div>
        </div>

        <AsciiDino />
      </div>
    </section>
  );
}
