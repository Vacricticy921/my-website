# my-website

Personal website built with Next.js, TypeScript, and Tailwind CSS

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **Travel Blog**: Showcase travel experiences and destinations
- **Resume**: Professional portfolio with skills, experience, and education
- **Life Plan**: Personal development roadmap
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS 4

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx       # Root layout with metadata and fonts
│   ├── page.tsx         # Homepage with hero section and navigation
│   ├── travel/          # Travel experiences page
│   ├── resume/          # Personal resume page
│   ├── life-plan/       # Life planning page
│   └── globals.css      # Tailwind CSS theme configuration
├── components/          # Reusable React components
│   └── Navigation.tsx   # Fixed header navigation with active states
└── styles/              # Additional CSS styles
    └── globals.css      # Custom CSS classes and responsive design
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
