import type { ReactNode } from "react";

// The "shape" of the props this component accepts.
type SectionProps = {
  id: string; // used for anchor links, e.g. /#projects
  title: string;
  children: ReactNode; // whatever JSX you put between <Section> and </Section>
};

export default function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20 py-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="mt-4 text-zinc-600 dark:text-zinc-400">{children}</div>
    </section>
  );
}
