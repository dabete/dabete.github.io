// An orange outlined arrow tag that says "To be continued" (a JoJo nod).
// Outline only, no solid orange fill: orange blocks with black text read like a certain logo.
export default function ToBeContinued() {
  return (
    <div className="mt-12 flex justify-end">
      <p
        className="border border-accent px-4 py-2 font-mono text-sm font-semibold tracking-widest text-accent uppercase"
      >
        To be continued ⟶
      </p>
    </div>
  );
}
