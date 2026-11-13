import Link from "next/link";
import type { Project } from "@/lib/projects";
import TagList from "@/components/TagList";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <li>
      {/* Link makes the whole card clickable and goes to /projects/<slug>.
          "group" lets the disk react when anywhere on the card is hovered
          (see .disk in globals.css). */}
      <Link
        href={`/projects/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-raised transition-colors hover:border-gold"
      >
        {/* The disk: the project's image if it has one, otherwise gold grooves
            with the title printed on it */}
        <div className="flex justify-center px-6 pt-10 pb-6">
          <div
            className="disk flex w-3/5 items-start justify-center"
            style={project.image ? { backgroundImage: `url(${project.image})` } : undefined}
          >
            {!project.image && (
              <span className="mt-[18%] px-4 text-center font-serif text-lg leading-tight text-gold">
                {project.title}
              </span>
            )}
          </div>
        </div>

        {/* Text area */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-medium text-foreground">{project.title}</h3>
          {project.highlight && (
            <p className="mt-1 text-sm font-medium text-gold">{project.highlight}</p>
          )}
          <p className="mt-2 text-sm text-muted">{project.summary}</p>
          <TagList tags={project.tags} className="mt-auto pt-3" />
        </div>
      </Link>
    </li>
  );
}
