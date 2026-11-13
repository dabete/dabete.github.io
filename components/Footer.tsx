export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex w-full max-w-3xl justify-between px-6 py-8 text-sm text-zinc-500">
        <p>Diego Abete</p>
        <div className="flex gap-4">
          {/* Placeholder links: swap in your real profiles */}
          <a href="https://github.com/dabete" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/diego-abete-59776629b/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
