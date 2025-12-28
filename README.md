# Nanang Marvin — Portfolio (Next.js)

A personal portfolio website built with Next.js (App Router) showcasing projects, skills, and a contact form. The site focuses on performance, accessibility, and a polished visual presentation suitable for freelance and job opportunities.

**Live demo:** https://nanangmarvin.my.id (replace with your deployment URL)

**Status:** Production-ready — optimized images, LCP improvements, and clean build.

## Key Features

- Built with Next.js (App Router) and Tailwind CSS
- Responsive, accessible layout and typographic scale
- Optimized images (.webp) with Next.js Image component
- Loading overlay for smooth first paint
- Smooth scrolling handled by Lenis provider
- Contact form endpoint at `/api/sendEmail`
- Performance-minded (LCP, image loading, no render-blocking resources)

## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- Framer Motion (animations)
- GSAP (where applicable)
- Lenis (smooth scrolling)
- Vercel (recommended deployment)

## Project Structure (important files)

- `src/app/layout.js` — Root layout, global providers, and metadata
- `src/app/globals.css` — Global styles and Tailwind import
- `src/app/components/Hero.js` — Hero section (LCP image)
- `src/app/components/Navbar.js` — Navigation and menu
- `src/app/components/Works.js` — Project cards and images
- `src/app/components/Contact.js` — Contact section UI
- `src/app/api/sendEmail/route.js` — API route for contact form
- `public/img/` — Images used by the site (converted to `.webp`)

## Getting Started

Prerequisites: Node.js (16+ recommended), npm or pnpm.

Install dependencies:

```bash
npm install
```

Run development server (PowerShell):

```powershell
npm run dev
```

Build for production:

```bash
npm run build
```

Start production server (after build):

```bash
npm run start
```

## Deployment

Vercel is recommended for zero-configuration deployment of Next.js apps. Connect your GitHub repository and deploy the `main` branch. The project is already configured to work with Vercel.

## Notes & Recommendations

- Hero LCP: the hero image uses `loading="eager"` to improve Largest Contentful Paint.
- If you add client-side hooks in files inside `src/app`, mark them with `"use client"` (hooks like `useEffect` are not allowed in Server Components).
- When using Next.js `<Image />` with `fill` for responsive images, include a `sizes` prop to avoid build-time warnings.
- Scroll behavior: the project uses Lenis; avoid setting `scroll-behavior` globally if Lenis is active.

## Contact Form

The contact form posts to `/api/sendEmail`. Verify environment variables required by your email provider (e.g., SMTP credentials or third-party API keys) are set in `.env` or your hosting environment.

## Troubleshooting

- Build errors related to React hooks in server files: move hook logic into a client component and import it inside your layout or page.
- Image warnings: add `sizes` or appropriate `width`/`height` when using Next.js `Image`.
- If you see unexpected scrollbar styling, check `src/app/globals.css` for leftover custom rules — this project currently uses the browser default scrollbars.

## Contributing

Feel free to open issues or pull requests. Keep changes focused, add tests where relevant, and run the build locally before pushing.

## License

See the `LICENSE` file in the repository.

---

If you'd like, I can also generate a short CONTRIBUTING.md, add CI (GitHub Actions) for lint/build, or create a deployment workflow. Which would you prefer next?
