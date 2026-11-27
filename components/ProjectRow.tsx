import { ViewTransition } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";

type ProjectRowProps = {
  project: Project;
  index: number; // shown as 01, 02, ...
  quiet?: boolean; // smaller, for "Currently building"
};

// One row of the projects list. Fills orange on hover (and on j/k selection,
// see VimKeys). The title morphs into the project page's heading on click.
export default function ProjectRow({ project, index, quiet = false }: ProjectRowProps) {
  return (
    <li className="border-t border-line">
      <Link
        href={`/projects/${project.slug}`}
        data-vim-row
        className="project-row grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-2 px-2 py-5 sm:grid-cols-[2.5rem_1fr_auto]"
      >
        <span className="font-mono text-xs text-[#555]">{String(index).padStart(2, "0")}</span>
        <span className="row-title">
          <ViewTransition name={`project-${project.slug}`}>
            <span className={`block font-bold tracking-tight ${quiet ? "text-lg text-[#bbb]" : "text-2xl"}`}>
              {project.title}
            </span>
          </ViewTransition>
          {project.highlight && (
            <span className="mt-1.5 block font-mono text-sm text-accent">{project.highlight}</span>
          )}
        </span>
        <span className="col-start-2 font-mono text-xs text-muted sm:col-start-3 sm:text-right">
          {project.tags.slice(0, 3).join(" · ").toLowerCase()}
        </span>
      </Link>
    </li>
  );
}
