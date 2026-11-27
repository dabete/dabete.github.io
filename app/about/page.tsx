import type { Metadata } from "next";

// Becomes the tab title "About | Diego Abete" (via the template in layout.tsx)
export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <h1 className="text-5xl">About</h1>
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
      <figure className="mt-10 flex items-center gap-4">
        {/* Plain <img>: static export to GitHub Pages has no image optimizer. */}
        {/* Scaled up inside a clipping box to hide the light strip baked into the photo's edge. */}
        <div className="aspect-square w-56 overflow-hidden rounded-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cat.jpeg"
            alt="My grey British Shorthair cat with orange eyes, looking up with its mouth open"
            className="size-full scale-110 object-cover object-[50%_60%]"
          />
        </div>
        <figcaption className="font-mono text-sm text-muted">
          <span className="text-accent">&lt;-</span> the real cat from the home page
        </figcaption>
      </figure>
    </>
  );
}
