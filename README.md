# Dan Cristian Deac — Portfolio Website

A modern, responsive portfolio website built with **React + TypeScript + Tailwind CSS**, deployed on GitHub Pages.

> Live at: [dandeac26.github.io](https://dandeac26.github.io)

---

## Tech Stack

| Technology          | Purpose                         |
| ------------------- | ------------------------------- |
| **Vite**            | Build tool & dev server         |
| **React 18**        | UI framework                    |
| **TypeScript**      | Type safety                     |
| **Tailwind CSS v4** | Utility-first styling           |
| **Framer Motion**   | Scroll & interaction animations |
| **Lucide React**    | Icon library                    |
| **react-markdown**  | Blog post rendering             |
| **GitHub Actions**  | CI/CD to GitHub Pages           |

---

## Migration Plan (from HTML5 UP Prologue → React)

### Phase 1: Project Scaffolding

- [x] Initialize Vite + React + TypeScript project
- [x] Install dependencies (Tailwind, Framer Motion, Lucide, react-markdown)
- [x] Configure Tailwind v4 with custom theme tokens (existing color palette)
- [x] Set up GitHub Actions workflow for deployment

### Phase 2: Core Layout & Theme

- [x] Dark/light theme toggle with `localStorage` persistence
- [x] App shell: fixed sidebar (desktop) + off-canvas hamburger (mobile)
- [x] Sidebar: avatar, name, navigation, social icons, theme toggle
- [x] Active nav highlighting via `IntersectionObserver`

### Phase 3: Section Components

- [x] **Portfolio** — Project cards with search + tag filter, animated transitions, 3→2→1 column grid
- [x] **Volunteering** — Dark section with image/text cards, scroll reveal
- [x] **About Me** — Two-column layout, education & interests
- [x] **Contact** — Icon + text links (email, LinkedIn, GitHub)

### Phase 4: Blog (New Feature)

- [x] Markdown-based blog with frontmatter
- [x] Blog listing as card grid, expand-in-place to read
- [x] Sample blog post

### Phase 5: Animations & Polish

- [x] Framer Motion `whileInView` section reveals
- [x] Staggered card animations
- [x] Responsive polish at 375px / 768px / 1440px

### Phase 6: Deployment

- [x] GitHub Actions: push to `main` → build → deploy to `gh-pages`
- [x] Cleanup old HTML/jQuery/SCSS assets

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

Deployment is automatic via GitHub Actions. Push to `main` and the site will be built and deployed to the `gh-pages` branch.

To deploy manually:

```bash
npm run build
npx gh-pages -d dist
```

---

## Project Structure

```
src/
├── main.tsx                  # React entry point
├── App.tsx                   # App shell (sidebar + main content)
├── index.css                 # Tailwind imports + custom theme
├── context/
│   └── ThemeContext.tsx       # Dark/light theme context
├── components/
│   ├── Sidebar.tsx           # Fixed sidebar with nav & socials
│   ├── Portfolio.tsx         # Portfolio grid with search/filter
│   ├── Volunteering.tsx      # Volunteering section
│   ├── About.tsx             # About Me section
│   ├── Contact.tsx           # Contact section
│   ├── Blog.tsx              # Blog listing
│   └── BlogPost.tsx          # Blog post renderer
├── data/
│   ├── projects.ts           # Portfolio project data
│   ├── volunteering.ts       # Volunteering entries
│   └── blog/
│       └── hello-world.md    # Sample blog post
public/
└── images/                   # All project images
```

---

## Design Decisions

- **No React Router** — Single page with anchor scrolling, same UX as original
- **Static project data** — No runtime GitHub API calls (avoids rate limits). Links to repos.
- **Dark mode** — Follows `prefers-color-scheme` by default, toggle stored in `localStorage`
- **Tailwind v4** — CSS-first configuration with `@theme` directive
- **Blog expand-in-place** — Posts expand on the same page, no separate routes needed

---

## License

See [LICENSE.txt](LICENSE.txt)
