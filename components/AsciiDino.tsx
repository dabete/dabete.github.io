// A gold ASCII dinosaur (a nod to Diego's Scary Monsters).
// String.raw keeps the backslashes exactly as typed, so the art isn't mangled.
// Edit the drawing freely: it's monospace, so every character lines up.
// (Don't use backticks in the art: they would end the string.)
const DINO = String.raw`
      __
    /' o'-.____
   |      ____.'
   |     /
    \    \  ,
     |    \/'
     |     '-.____________
      \               ''~~--..__
       '.    _.        ____      '~-.__
         '--' |  /\   /    '~--..___   '-.
              | /  \  |            '~-.  \
             _|/   _\_|                '--'
            /_/   /__/
`;

export default function AsciiDino() {
  return (
    <pre
      role="img"
      aria-label="ASCII art of a dinosaur"
      className="font-mono text-[11px] leading-tight text-gold select-none [text-shadow:0_0_8px_rgb(201_165_76/0.45)]"
    >
      {DINO}
    </pre>
  );
}
