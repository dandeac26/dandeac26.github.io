---
applyTo: "**"
---

# Project: Dan Cristian Deac Portfolio Website

## Frameworks & Technologies

- **React 18** with functional components and hooks
- **TypeScript** (strict mode) — all components use `.tsx`, data files use `.ts`
- **Vite** as build tool and dev server
- **Tailwind CSS v4** — utility-first CSS, configured via CSS `@theme` directive (no `tailwind.config.js`)
- **Framer Motion** — animations (scroll reveals, layout transitions, hover effects)
- **Lucide React** — icon library (replaces FontAwesome)
- **react-markdown** — renders blog posts from `.md` files
- **gray-matter** — parses frontmatter from markdown files

## Architecture

- Single-page application with anchor-based scrolling (no React Router)
- Fixed sidebar layout on desktop, off-canvas hamburger menu on mobile
- Dark/light theme via React Context + CSS `class` strategy + `localStorage` persistence
- Data-driven sections: project/volunteering data in `src/data/` TypeScript files
- Blog content in `src/data/blog/*.md` with YAML frontmatter

## Code Conventions

- Functional components only (no class components)
- Use `const` arrow functions for components: `const MyComponent: React.FC<Props> = ({ ... }) => { ... }`
- Props interfaces defined above each component, named `{ComponentName}Props`
- Use Tailwind utility classes exclusively — no inline styles or separate CSS files (except `index.css` for theme)
- Responsive design: mobile-first approach with Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`)
- Framer Motion `motion.*` elements for any animated component
- Import icons individually: `import { Github, Mail } from 'lucide-react'`

## File Organization

```
src/
├── main.tsx              # Entry point, renders App
├── App.tsx               # Shell layout (sidebar + sections)
├── index.css             # Tailwind + custom theme tokens
├── context/              # React contexts
├── components/           # All UI components
└── data/                 # Static data + blog markdown
```

## Deployment

- GitHub Pages via GitHub Actions
- Build output: `dist/` directory
- Base URL: `/` (user page at dandeac26.github.io)

## Key Patterns

- `IntersectionObserver` for active nav state (not scroll event listeners)
- `AnimatePresence` + `layout` prop for filtering animations in Portfolio
- `useLocalStorage` custom hook for theme persistence
- Blog posts loaded as static imports at build time
- All images in `public/images/` referenced as `/images/filename.ext`

## Color Palette

- Salmon/Pink accent: `#E27689`
- Teal button: `#8ebebc`
- Dark sidebar: `#222629`
- Light backgrounds: `#f5fafa`, `#ecf1f1`, `#e8edec`
- Dark mode backgrounds: `#0f172a`, `#1e293b`
