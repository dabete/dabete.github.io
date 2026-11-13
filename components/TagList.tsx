type TagListProps = {
  tags: string[];
  className?: string; // optional extra classes, e.g. for spacing
};

// The little rounded "pill" tags. Used on the project cards and project pages,
// so the styling lives in one place.
export default function TagList({ tags, className = "" }: TagListProps) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
