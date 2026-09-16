# AGENTS.md

Project Master Instruction & Architecture Guide for this repository.
This file is the single source of truth for all human and AI agents working on this project.

---

## 1. Project Purpose & Scope

- **Application**: Modern, minimal, editorial portfolio for Aritra Mondal (Graphic & UI/UX Designer).
- **Goal**: Showcase design disciplines, 5 core tools, downloadable resume, direct Behance/Instagram/LinkedIn links, and direct contact.
- **Design Philosophy**: Minimal, dark, high-contrast, editorial, and lightweight without clutter.

---

## 2. Technology Stack & Constraints

- **Framework**: React.js (`^19.x`)
- **Language**: JavaScript ONLY (`.js`, `.jsx`). **NO TypeScript**.
- **Build Tool**: Vite (`^8.x`)
- **Styling**: Tailwind CSS (`^3.4.x`) + PostCSS + Autoprefixer
- **Icons**: Lucide React (`lucide-react`)
- **Package Manager**: npm

### Hard Rules:
1. **Never use TypeScript** (`.ts`, `.tsx`). Only modern JavaScript with ES modules and functional React components.
2. **Never install arbitrary packages** for small tasks. Implement with React and Tailwind CSS first.
3. **No fake interactions**: Forms, filters, modals, and buttons must have actual state, validation, and real feedback.
4. **All UI must be responsive**: Mobile, tablet, laptop, and wide desktop layouts must look intentional and polished.
5. **Clean Code**: No dead code, no unused imports, and no bloated components.

---

## 3. Project Structure

```
d:/website portfolio/
├── AGENTS.md                     # Source of truth (this file)
├── package.json                  # Dependencies & scripts
├── vite.config.js                # Vite build config
├── tailwind.config.js            # Tailwind styling tokens & darkMode
├── postcss.config.js             # PostCSS plugins
├── index.html                    # HTML entry point with metadata & fonts
└── src/
    ├── assets/                   # Static assets, SVG illustrations
    ├── components/               # Reusable UI component library
    │   ├── ui/                   # Primitive/Atomic components
    │   │   ├── Button.jsx        # Variants: primary, secondary, outline, ghost
    │   │   ├── Badge.jsx         # Status, tech tags, categories
    │   │   ├── Card.jsx          # Container with hover & border treatments
    │   │   ├── Modal.jsx         # Accessible modal dialog with backdrop & focus handling
    │   │   ├── Tabs.jsx          # Tab buttons for filtering
    │   │   ├── Input.jsx         # Accessible input with labels and error messaging
    │   │   ├── Textarea.jsx      # Accessible textarea with validation state
    │   │   └── Toast.jsx         # Feedback notification component
    │   ├── Navbar.jsx            # Top navigation bar with theme toggle & mobile menu
    │   └── Footer.jsx            # Clean footer with copyright & social links
    ├── sections/                 # Main portfolio page sections
    │   ├── Hero.jsx              # Personal intro, role, portrait, CTA & socials
    │   ├── About.jsx             # 01 About Me, 4 disciplines & 5 tools
    │   ├── Resume.jsx            # 02 Resume download card
    │   ├── Connect.jsx           # 03 Social & Behance platform links
    │   └── Contact.jsx           # 04 Direct email card & handwritten note
    ├── data/                     # Data layer separated from presentation
    │   ├── portfolioData.js      # Structured developer profile, projects, history
    │   └── navigation.js         # Nav links & social channels
    ├── hooks/                    # Custom hooks
    │   ├── useTheme.js           # Light/Dark mode state with localStorage persistence
    │   └── useToast.js           # Toast notification triggers
    ├── utils/                    # Utility functions
    │   └── helpers.js            # Class combining (cn) and helpers
    ├── App.jsx                   # Main application shell
    ├── main.jsx                  # React DOM mount point
    └── index.css                 # Tailwind directives, font imports & custom utilities
```

---

## 4. Design System & Tokens

- **Theme Strategy**: Dark mode default with light mode toggle (`darkMode: 'class'`).
- **Color Palette**:
  - Background Dark: `bg-zinc-950` / `bg-zinc-900` / `bg-zinc-800`
  - Background Light: `bg-zinc-50` / `bg-white` / `bg-zinc-100`
  - Borders: `border-zinc-800` (dark) / `border-zinc-200` (light)
  - Text: `text-zinc-100` / `text-zinc-400` (dark), `text-zinc-900` / `text-zinc-600` (light)
  - Accents: Emerald (`emerald-500` / `emerald-400`) & Indigo (`indigo-500` / `indigo-400`)
- **Typography**: Inter (sans-serif) for body and headlines, JetBrains Mono for code snippets and tags.
- **Border Radius**: Subtle, modern rounding (`rounded-xl`, `rounded-2xl`).

---

## 5. Component Conventions

1. **Functional Components**: All components are arrow or standard functions with explicit props.
2. **Prop Validation / Defaults**: Provide clean default props where appropriate.
3. **Accessibility**:
   - Semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   - Buttons must use `<button type="button|submit">` and include `aria-label` when icon-only.
   - Interactive modal supports `Escape` key close, focus containment, and click-outside dismissal.
4. **Data Separation**: Project data, timeline entries, and skill lists live in `src/data/portfolioData.js` rather than hardcoded in JSX markup.

---

## 6. Common Development Commands

- `npm run dev`: Start Vite development server.
- `npm run build`: Build production bundle into `dist/`.
- `npm run preview`: Locally preview production build.

---

## 7. Change Management & Workflow

Before any task:
1. Read this `AGENTS.md`.
2. Inspect existing components and utilities.
3. Reuse existing components (`Button`, `Card`, `Badge`, `Modal`, etc.).
4. Verify changes with `npm run build`.
5. Update this file only when architecture, rules, or key dependencies change.
