// An orange arrow-shaped tag that says "To be continued" (a JoJo nod).
// clip-path cuts the box into an arrow pointing right.
export default function ToBeContinued() {
  return (
    <div className="mt-12 flex justify-end">
      <p
        className="bg-accent py-2 pr-10 pl-5 font-mono text-sm font-semibold tracking-widest text-background uppercase"
        style={{ clipPath: "polygon(0 0, calc(100% - 22px) 0, 100% 50%, calc(100% - 22px) 100%, 0 100%)" }}
      >
        To be continued
      </p>
    </div>
  );
}
