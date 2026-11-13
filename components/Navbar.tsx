import Link from "next/link";


type NavLink = {
  href: string;
  label: string;
}
// The links shown in the navbar. Adding a section = adding one line here.
const links: NavLink[] = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
  { href: "/#resume", label: "Resume" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-background/80 backdrop-blur dark:border-zinc-800">
      <nav className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold">
          Diego Abete
        </Link>
        <ul className="flex gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          {links.map((link) => (
            <li key={link.href}>
              {/* Plain <a>, not <Link>: the browser re-scrolls even when the URL already has this #hash */}
              <a href={link.href} className="hover:text-foreground">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
