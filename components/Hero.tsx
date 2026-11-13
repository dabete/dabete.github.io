import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-16 pb-4">
      <p className="text-sm text-zinc-500">Hi, I&apos;m</p>
      <h1 className="mt-2 text-5xl font-bold tracking-tight">Diego</h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Second-year Computer Science student at King&apos;s College London,
        interested in software and AI engineering.
      </p>

      {/* Calls to action: the two places a recruiter most likely wants to go */}
      <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium">
        <Link
          href="/projects"
          className="rounded-md bg-foreground px-4 py-2 text-background hover:opacity-90"
        >
          See my projects
        </Link>
        <Link
          href="/resume"
          className="rounded-md border border-zinc-300 px-4 py-2 hover:border-zinc-500 dark:border-zinc-700"
        >
          View my resume
        </Link>
      </div>
    </section>
  );
}
