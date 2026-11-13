import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";

export const metadata: Metadata = { title: "Resume" };

// Resume content as data, so updating the CV means editing these arrays,
// not the JSX below. Keep it in sync with public/diego-abete-resume.pdf.
type Entry = {
  title: string;
  subtitle: string;
  date: string;
  href?: string; // optional link to the project's page on this site
  points: string[];
};

const education: Entry[] = [
  {
    title: "King's College London",
    subtitle:
      "BSc Computer Science with a Year in Industry (Year 1: First Class Honours)",
    date: "Sep 2025 – Jul 2029",
    points: [
      "Key Year 1 modules: Database Systems (75%), Data Structures and Algorithms (85%), Discrete Maths (80%), Software Engineering (86%), Programming (91%)",
      "Year 2 coursework: C++ programming, Internet Systems",
    ],
  },
];

const projects: Entry[] = [
  {
    title: "Distributed API Gateway / Rate Limiter",
    subtitle: "Go, Redis, Docker, Docker Compose",
    date: "2025",
    href: "/projects/api-gateway",
    points: [
      "Enforced a single shared per-client rate limit across 3 gateway instances within 2.9% of theoretical bounds (34 of 35 allowed) under constant load, using an atomic Redis Lua token bucket that fails open when Redis is unavailable.",
      "Sustained 1,000 req/s with 100% availability and 7.1ms p95 latency across 3 gateways with a round-robin load balancer in Go and connection-pooled reverse proxying.",
      "Maintained 99.94% availability during abrupt node failures with passive circuit breaking and active polling, limiting dropped traffic to 8 of 12,000 requests (0.06%) with automated failover under 0.1s.",
    ],
  },
  {
    title: "Fridge – Full-Stack Social App",
    subtitle: "React, JavaScript, Java, Spring Boot, PostgreSQL",
    date: "2025",
    href: "/projects/shared-fridge",
    points: [
      "Improved homepage Lighthouse Performance score from 68 to 92 by diagnosing oversized image delivery and adding client-side resizing and WebP conversion before upload.",
      "Secured user-scoped fridge data with a Spring Boot REST API using custom JWT authentication and method-level security (@PreAuthorize), deployed on Render.",
      "Achieved ~140ms median round-trip latency for real-time group chat using STOMP WebSocket messaging over WSS.",
      "Reduced p95 API latency from 126ms to 74ms under a 100-VU k6 load test by diagnosing HikariCP connection pool exhaustion via Actuator metrics.",
    ],
  },
  {
    title: "UK Air Pollution Visualizer",
    subtitle: "Java, JavaFX",
    date: "",
    points: [
      "Rendered DEFRA air pollution data on an interactive 43x25 coordinate grid by building the core UI matrix in JavaFX.",
      "Converted Ordnance Survey Eastings/Northings into 2D matrix indices for accurate geospatial visualisation.",
      "Designed a threshold algorithm that computes statistical bounds for a multi-tier colour heat map.",
    ],
  },
];

const experience: Entry[] = [
  {
    title: "First Year Hack",
    subtitle: "King's College London",
    date: "Nov 2025",
    points: [
      "Built mobile workflows for communal kitchen inventory tracking and barcode expiry alerts during a 6-hour sprint.",
      "Structured relational data models and backend endpoints for peer-to-peer item sharing across residences.",
    ],
  },
  {
    title: "Physics Summer School",
    subtitle: "Imperial College London",
    date: "Jul 2024",
    points: [
      "Modelled simple harmonic systems in Python, validated them against theoretical MATLAB models, and presented the findings to 100+ students and faculty.",
    ],
  },
];

const skills: { label: string; items: string }[] = [
  { label: "Languages", items: "Java, Go, Python, C++, JavaScript, SQL" },
  { label: "Frameworks", items: "Spring Boot, Spring Security, React, JavaFX" },
  {
    label: "Tools, Cloud & Databases",
    items:
      "PostgreSQL, Redis, Supabase, Docker, Docker Compose, Git, k6, Linux/WSL, Render, Claude Code",
  },
];

// One education/project/experience entry. Only used on this page, so it lives here.
function ResumeEntry({ entry }: { entry: Entry }) {
  return (
    <div className="mt-6 first:mt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
          {entry.href ? (
            <Link href={entry.href} className="underline underline-offset-4">
              {entry.title}
            </Link>
          ) : (
            entry.title
          )}
        </h3>
        <span className="text-sm text-zinc-500">{entry.date}</span>
      </div>
      <p className="text-sm italic">{entry.subtitle}</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
        {entry.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ResumePage() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold">Resume</h1>
        {/* Files in public/ are served from the root of the site:
            public/diego-abete-resume.pdf → /diego-abete-resume.pdf */}
        <a
          href="/diego-abete-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
        >
          Download PDF ↓
        </a>
      </div>

      <Section title="Education">
        {education.map((e) => (
          <ResumeEntry key={e.title} entry={e} />
        ))}
      </Section>

      <Section title="Projects">
        {projects.map((e) => (
          <ResumeEntry key={e.title} entry={e} />
        ))}
      </Section>

      <Section title="Experience & Hackathons">
        {experience.map((e) => (
          <ResumeEntry key={e.title} entry={e} />
        ))}
      </Section>

      <Section title="Technical Skills">
        <dl className="space-y-2 text-sm">
          {skills.map((s) => (
            <div key={s.label}>
              <dt className="inline font-medium text-zinc-900 dark:text-zinc-100">
                {s.label}:{" "}
              </dt>
              <dd className="inline">{s.items}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
