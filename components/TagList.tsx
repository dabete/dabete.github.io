type TagListProps = {
  tags: string[];
  className?: string; // optional extra classes, e.g. for spacing
};

// The little rounded "pill" tags on project pages.
export default function TagList({ tags, className = "" }: TagListProps) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
