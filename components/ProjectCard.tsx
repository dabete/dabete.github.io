import Link from "next/link";
import type { Project } from "@/lib/projects";
import TagList from "@/components/TagList";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <li>
      {/* Link makes the whole card clickable and goes to /projects/<slug> */}
      <Link
        href={`/projects/${project.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
      >
        {/* Image area: a grey placeholder until we add real screenshots */}
        <div className="flex aspect-[4/3] items-center justify-center bg-zinc-100 text-xs text-zinc-400 dark:bg-zinc-900">
          Image coming soon
        </div>

        {/* Text area */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
            {project.title}
          </h3>
          <p className="mt-1 text-sm">{project.summary}</p>
          <TagList tags={project.tags} className="mt-auto pt-3" />
        </div>
      </Link>
    </li>
  );
}
