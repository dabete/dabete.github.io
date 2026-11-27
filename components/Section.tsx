import type { ReactNode } from "react";

// The "shape" of the props this component accepts.
type SectionProps = {
  title: string;
  children: ReactNode; // whatever JSX you put between <Section> and </Section>
};

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="py-6">
      <h2 className="text-2xl">{title}</h2>
      <div className="mt-4 text-muted">{children}</div>
    </section>
  );
}
