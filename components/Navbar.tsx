import Link from "next/link";


type NavLink = {
  href: string;
  label: string;
}
// The links shown in the navbar. Adding a page = adding one line here
// (plus its folder in app/).
const links: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-background/80 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-4">
        {/* font-logo = Cinzel, set up in layout.tsx + globals.css */}
        <Link href="/" className="font-logo text-lg font-semibold tracking-widest text-gold uppercase">
          Diego&apos;s World
        </Link>
        <ul className="flex gap-6 text-sm text-muted">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-gold">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
