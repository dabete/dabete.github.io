import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
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
      <h1 className="text-3xl font-semibold">Projects</h1>
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>

      {/* More projects are on the way */}
      <ToBeContinued />

      {inProgress.length > 0 && (
        <>
          <h2 className="mt-10 font-medium text-foreground">
            Currently building
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {inProgress.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </ul>
        </>
      )}
    </>
  );
}
