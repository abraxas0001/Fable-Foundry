# FableFoundry 🔥📚

A warm, interactive storytelling platform where rotating narrator avatars guide you through immersive tales crafted like a hand-forged hearth.

## 🎯 Project Overview

FableFoundry combines the cozy aesthetic of a traditional library with modern interactive storytelling. Each story is brought to life by our talented "Foundry Smiths" - narrator avatars that provide a personal, guided reading experience.

## 🎨 Design Philosophy

- **Warm & Inviting**: Earth-tone colors (#FAF9F6 parchment, #D97742 amber, #8C5A2E sienna)
- **Hand-Crafted Feel**: Custom typography (Playfair Display, Lora, Caveat, Inter)
- **Smooth Interactions**: 250ms ease-out animations throughout
- **Accessibility First**: WCAG 2.1 AA compliance with full keyboard navigation

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router & TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animation**: Framer Motion for smooth micro-interactions
- **UI Components**: Headless UI for accessibility
- **Icons**: Heroicons & Lucide React

## 🏗️ Current Status

✅ **Task 1 Complete**: Project foundation and development environment
- Next.js project initialized with TypeScript
- Custom Tailwind configuration with FableFoundry color palette
- Framer Motion and UI libraries installed
- Basic component structure created
- Hero section with animated Foundry Smith avatar
- Library preview with story cards
- Responsive header and footer

## 🎭 Key Features Implemented

### Hero Section
- Full-width forge-library background with warm gradients
- Animated Foundry Smith avatar with scale and Y-oscillation effects
- Smooth scroll to library section on CTA click
- Responsive design with mobile-first approach

### Story Library Preview
- Masonry grid layout (4 columns desktop, 2 tablet, 1 mobile)
- Story cards with hover effects and "New" badges
- Mock story data with genre tags and duration
- Smooth animations on scroll

### Navigation
- Sticky header with FableFoundry branding
- Mobile-responsive hamburger menu
- Focus rings for accessibility
- Consistent hover states

## 🎯 Next Steps

The project is ready for the next implementation tasks:
- Content management system integration (Sanity.io)
- User authentication (Supabase)
- Audio narration system
- Community features
- Advanced filtering and search

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/
│   ├── layout/         # Header, Footer
│   ├── sections/       # HeroSection, LibraryPreview
│   └── ui/            # Reusable UI components
└── types/             # TypeScript type definitions
```

## 🎨 Design System

The project uses a custom design system built on Tailwind CSS:

- **Colors**: Parchment, Amber, Sienna, Golden, Charcoal
- **Typography**: Playfair Display (headings), Lora (body), Caveat (quotes), Inter (buttons)
- **Animations**: Custom keyframes for narrator entry and gentle pulsing
- **Components**: Consistent button variants and hover effects

---

*Crafted with care for storytellers and dreamers* ✨