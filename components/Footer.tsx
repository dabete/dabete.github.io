export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-4 px-6 py-8 font-mono text-sm text-muted">
        <p>Diego Abete</p>
        {/* Hidden on phones: no keyboard there */}
        <p className="hidden text-xs text-[#555] sm:block">
          vim user? press{" "}
          <kbd className="rounded border border-[#333] px-1 text-muted">space</kbd>
        </p>
        <div className="flex gap-4">
          <a href="https://github.com/dabete" target="_blank" rel="noopener noreferrer" className="link-line">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/diego-abete-59776629b/" target="_blank" rel="noopener noreferrer" className="link-line">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
