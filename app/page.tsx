import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export default function Home() {
  // This runs on the server: it reads the .md files straight from disk.
  const projects = getAllProjects();
  const featured = projects.filter((p) => p.status === "finished");
  const inProgress = projects.filter((p) => p.status === "in-progress");

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-8">
      <Hero />

      <Section id="about" title="About">
        <p>
          I&apos;m Diego Abete, an aspiring software engineer and a 2nd Year
          student currently studying at King&apos;s College London, looking for
          internships and industry placements.
        </p>
      </Section>

      <Section id="projects" title="Projects">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </ul>

        {inProgress.length > 0 && (
          <>
            <h3 className="mt-10 font-medium text-zinc-900 dark:text-zinc-100">
              Currently building
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {inProgress.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </ul>
          </>
        )}
      </Section>

      <Section id="experience" title="Experience & Education">
        <p>
          BSc Computer Science with a Year in Industry, King&apos;s College
          London (2025 – 2029)
        </p>
      </Section>

      <Section id="resume" title="Resume">
        {/* Files in public/ are served from the root of the site:
            public/diego-abete-resume.pdf → /diego-abete-resume.pdf */}
        <a
          href="/diego-abete-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          View my resume (PDF) ↗
        </a>
      </Section>

      <Section id="contact" title="Contact">
        <p>If you have any questions, please feel free to contact me at:</p>
        <p>diegoabete.work@gmail.com</p>
      </Section>
    </main>
  );
}
