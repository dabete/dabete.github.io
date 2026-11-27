import type { Metadata } from "next";
import ProjectRow from "@/components/ProjectRow";
import { getAllProjects } from "@/lib/projects";
import ToBeContinued from "@/components/ToBeContinued";

export const metadata: Metadata = { title: "Projects" };

// app/projects/page.tsx → /projects
// (app/projects/[slug]/page.tsx is still the page for each single project)
export default function ProjectsPage() {
  // This runs at build time: it reads the .md files straight from disk.
  const projects = getAllProjects();
  const featured = projects.filter((p) => p.status === "finished");
  const inProgress = projects.filter((p) => p.status === "in-progress");

  return (
    <>
      <h1 className="mt-6 text-5xl sm:text-6xl">Projects</h1>

      <p className="mt-10 font-mono text-xs tracking-widest text-muted uppercase">Finished</p>
      <ul className="mt-3 border-b border-line">
        {featured.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i + 1} />
        ))}
      </ul>

      {/* More projects are on the way */}
      <ToBeContinued />

      {inProgress.length > 0 && (
        <section>
          <p className="mt-10 font-mono text-xs tracking-widest text-muted uppercase">
            Currently building
          </p>
          <ul className="mt-3 border-b border-line">
            {inProgress.map((project, i) => (
              <ProjectRow key={project.slug} project={project} index={featured.length + i + 1} quiet />
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
