import type { Metadata } from "next";

// Becomes the tab title "About | Diego Abete" (via the template in layout.tsx)
export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold">About</h1>
      <div className="mt-4 space-y-4 text-muted">
        <p>
          I&apos;m Diego Abete, an aspiring software engineer and a 2nd Year
          student currently studying at King&apos;s College London, looking for
          internships and industry placements.
        </p>
        <p>
          Outside of coding: Cuban salsa, strength training, Muay Thai, anime,
          piano, guitar and karaoke.
        </p>
      </div>
    </>
  );
}
