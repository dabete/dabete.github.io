# Portfolio redesign: style C ("bold monochrome + menacing cat")

## Why
Diego didn't like the current navy/gold site, especially the projects page.
Goal: look professional with smooth animations, and still show personality
(his grey British Shorthair with orange eyes, and JoJo's Bizarre Adventure).

## Goals
- Near-black background, off-white text, one orange accent (`#ff9a3c`, the cat's eye colour).
- Big heavy sans headings (Geist, weight 800, tight tracking); Geist Mono for small details (nav, labels, tags, tagline).
- Home: big "Diego / Abete." with orange dot, mono tagline `// cs @ kcl — backend, systems, ai`, the two existing buttons, and the ASCII cat face beside the name: orange eyes that slowly blink, ゴ letters drifting up around it.
- Projects page: numbered rows (01, 02 …) with title, highlight and short tech list. On hover the row fills orange left-to-right and the title slides right. "Currently building" stays as a second, quieter list.
- Animations: staggered fade-up of page content on load; hover fills and small slides; page transitions with React `<ViewTransition>` (project title morphs from list row into project page heading, other navigations cross-fade).
- `prefers-reduced-motion`: no animations, everything shown still.

## Character extras (picked from preview v3)
- **Cat's eyes follow the mouse:** pupils lean up to ~2px toward the cursor. Mouse only; off with reduced motion.
- **Click the cat → purr:** cat vibrates briefly and "purr~ / ♥" floats up. Ignored while already purring.
- **404 page:** small cat sitting by an ASCII "[ page ]" that falls off the table; "404", "My cat knocked this page off the table.", link home. Uses Next's `app/not-found.tsx`.
- **Vim keys** (LazyVim-style, one small client component in the layout):
  - `space` opens a which-key menu (bottom right): `h` home, `p` projects, `a` about, `r` resume, `c` contact, `?` show all keys. `Esc` or any other key closes it.
  - `j`/`k` move the highlight through project rows (same look as hover); on other pages they scroll. `Enter`/`l` opens, `h` goes back (project → list, other pages → home).
  - `gg` / `G` top / bottom.
  - `:` opens a command line in a vim-style bar at the bottom: `:q` / `:q!` / `:wq` go home ("you can't quit that easily."), `:help` lists keys, `:projects`, anything else → `E492: Not an editor command: …`.
  - The bar is hidden until a vim key is pressed. Footer hint: "vim user? press space".
  - Never fires with Ctrl/Alt/Cmd held, on Shift alone, or while typing in an input/textarea.

## Non-goals
- No change to content (`content/projects/*.md`), routes, `lib/projects.ts` or the GitHub Pages export.
- No scroll-triggered animations, no new dependencies.
- Not built (tried in preview, dropped): speech bubbles, ゴゴゴ on row hover, status line, "Part 1/2" labels, console message, knock/menacing cat clicks.

## Anti-goals
- Anything that looks gimmicky or slows the page. The cat is the one decoration.
- Drawing JoJo characters. The reference is only the ゴゴゴ sound effect (and the "To be continued" arrow).

## Approaches
1. **Plain CSS + React `<ViewTransition>` (picked).** No new packages, pages stay Server Components, looks like the mockups. Transitions just don't animate in older browsers.
2. Motion library. Springier, easy scroll animations, but adds a dependency and forces Client Components.
3. Rewrite from scratch. Dropped: structure is fine, only the look is wrong.

## Removed
`GoldParticles`, `AsciiDino`, the record "disk" CSS, `ProjectCard` (replaced by a row component), Cormorant and Cinzel fonts, navy/gold palette.

## Builder's calls (Claude's, easy to change)
- Colour token `--gold` renamed to `--accent` everywhere.
- Navbar logo becomes mono `~/diego` instead of "Diego's World".
- `ToBeContinued` stays (it's a JoJo nod), restyled orange with Geist Mono.
- Project page and About/Resume/Contact get the new fonts/colours and fade-up, no layout change.
- The cat stays plain text (`<pre>`) so it's tiny and screen readers get an `aria-label`.
