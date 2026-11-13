import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// The shape of one project. Every .md file's front matter must match this.
export type Project = {
  slug: string; // taken from the filename, e.g. "api-gateway"
  title: string;
  summary: string;
  status: "finished" | "in-progress"; // only these two values are allowed
  date: string;
  tags: string[];
  github?: string; // the ? means optional
  demo?: string;
  highlight?: string; // one headline metric shown on the card
  image?: string; // e.g. "/projects/fridge.png" (file in public/projects/)
};

// Where the project files live: <project root>/content/projects
const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export function getAllProjects(): Project[] {
  const filenames = fs
    .readdirSync(PROJECTS_DIR)
    .filter((name) => name.endsWith(".md") && !name.startsWith("_"));

  const projects = filenames.map((filename) => {
    const fileContents = fs.readFileSync(
      path.join(PROJECTS_DIR, filename),
      "utf-8",
    );
    // matter() splits the file into front matter (data) and the Markdown body
    const { data } = matter(fileContents);

    return {
      slug: filename.replace(/\.md$/, ""),
      ...(data as Omit<Project, "slug">),
    };
  });

  // Newest first ("2025-12" > "2025-06" works because the format is YYYY-MM)
  return projects.sort((a, b) => b.date.localeCompare(a.date));
}

// One project plus its Markdown body (the part below the front matter).
// Returns null if there's no file with that slug.
export function getProjectBySlug(
  slug: string,
): { project: Project; content: string } | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.md`);
  if (slug.startsWith("_") || !fs.existsSync(filePath)) {
    return null;
  }

  const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));
  return {
    project: { slug, ...(data as Omit<Project, "slug">) },
    content,
  };
}
