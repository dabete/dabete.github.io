import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <h1 className="text-5xl">Contact</h1>
      <div className="mt-4 space-y-2 text-muted">
        <p>If you have any questions, please feel free to contact me at:</p>
        <p>
          <a
            href="mailto:diegoabete.work@gmail.com"
            className="font-medium text-foreground underline decoration-accent underline-offset-4 transition-colors hover:text-accent"
          >
            diegoabete.work@gmail.com
          </a>
        </p>
        <p>
          You can also find me on{" "}
          <a href="https://www.linkedin.com/in/diego-abete-59776629b/" target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent">
            LinkedIn
          </a>{" "}
          and{" "}
          <a href="https://github.com/dabete" target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent">
            GitHub
          </a>
          .
        </p>
      </div>
    </>
  );
}
