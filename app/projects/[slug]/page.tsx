import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import TagList from "@/components/TagList";

// Tell Next.js every slug that exists, so it can build each project page
// ahead of time instead of waiting for someone to visit the URL.
// Returns e.g. [{ slug: "api-gateway" }, { slug: "shared-fridge" }]
export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

// Sets this page's <title> and description from the project's front matter.
// Next.js calls this separately from the page component, with the same params.
export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const result = getProjectBySlug(slug);
  if (!result) {
    return {}; // the page itself will show the 404
  }

  return {
    title: result.project.title, // becomes "Distributed API Gateway | Diego Abete"
    description: result.project.summary,
  };
}

// The [slug] folder name means: "this part of the URL can be anything".
// Visiting /projects/api-gateway gives us params = { slug: "api-gateway" }.
export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  // params is a Promise in this version of Next.js, so we await it.
  const { slug } = await props.params;

  // Read this project's file: front matter (project) + Markdown body (content).
  const result = getProjectBySlug(slug);

  // No matching file (e.g. /projects/typo)? Show the 404 page.
  if (!result) {
    notFound();
  }

  const { project, content } = result;

  return (
    <>
      {/* Back to the list page at app/projects/page.tsx */}
      <Link
        href="/projects"
        className="text-sm text-muted hover:text-gold"
      >
        ← Back to projects
      </Link>

      <h1 className="mt-6 text-3xl font-semibold text-foreground">
        {project.title}
      </h1>
      <p className="mt-2">{project.summary}</p>
      <TagList tags={project.tags} className="mt-4" />

      {/* Only shows links that exist in the front matter.
          `a && <X />` means "if a is set, render X; otherwise render nothing". */}
      {(project.github || project.demo) && (
        <div className="mt-4 flex gap-4 text-sm font-medium">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-gold"
            >
              GitHub ↗
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-gold"
            >
              Live demo ↗
            </a>
          )}
        </div>
      )}

      {/* "prose" styles the HTML that Markdown produces (headings, lists...).
          "prose-invert" = light text for a dark page (colours set in globals.css). */}
      <article className="prose prose-invert mt-8">
        <Markdown>{content}</Markdown>
      </article>
    </>
  );
}
