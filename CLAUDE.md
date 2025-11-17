# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HU Fusion is a React + TypeScript website for Hampton University's Fusion Research program, specifically showcasing the STAR_Lite Stellarator project. The site provides information about fusion research, faculty/students, publications, and news.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint

# Preview production build
npm run preview
```

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS with custom Hampton blue color (#0060A9)
- **Routing**: React Router v6
- **State Management**: Zustand (stores in `src/stores/`)
- **Icons**: lucide-react
- **Drag & Drop**: @dnd-kit (for sortable interfaces)
- **Firebase**: Firestore for news articles, Storage for images, Authentication for admin access

## Architecture

### Routing Structure

The app uses React Router with lazy-loaded route components for performance:

- `/` - Home page (Hero + Latest News)
- `/fusion/*` - Fusion energy overview pages (overview, magnetic confinement, university scale)
- `/research/*` - Research pages (CFRT, collaborations, publications, star-lite)
- `/people/*` - Faculty and students pages, including bio pages at `/people/bio/:id`
- `/news/*` - News pages
- `/admin/news` - Admin interface for managing news articles (requires authentication)

All routes are lazy-loaded via `React.lazy()` with a Suspense boundary in App.tsx:1.

### Component Organization

```
src/
├── components/
│   ├── Core UI: Navbar, Footer, Hero, Logo, PageHeader
│   ├── PersonCard.tsx - Reusable card for faculty/students
│   ├── news/ - NewsCard, NewsGrid, LatestNews
│   ├── research/ - Overview components for research areas
│   └── documents/ - DocumentViewer, DocumentPreview, DocumentList
├── pages/
│   ├── admin/ - NewsAdmin.tsx (admin interface for managing news)
│   ├── fusion/ - Fusion energy information pages
│   ├── research/ - Research project pages
│   ├── people/ - Faculty, Students, PersonBio
│   └── news/ - Latest news page
├── stores/
│   ├── authStore.ts - Firebase Authentication (sign in/out, auth state)
│   └── documentStore.ts - Document management (Firestore removed, placeholder only)
├── services/
│   └── newsService.ts - Firestore CRUD operations for news articles
├── lib/
│   └── firebase.ts - Firebase initialization and configuration
├── data/
│   └── news.ts - Static news items (fallback when Firebase not configured)
└── types/
    └── news.ts - TypeScript interfaces for news
```

### State Management

- **Zustand stores** located in `src/stores/`
- `authStore` - Firebase Authentication with sign in/out and auth state listener
- `documentStore` - Has Firestore functionality removed, contains placeholder structure for document/folder management

### News Management System

The site uses Firebase for dynamic news article management:

- **Public Display**: News components (`LatestNews.tsx`, `Latest.tsx`) fetch from Firestore and fall back to static data in `src/data/news.ts` if Firebase is unavailable
- **Admin Interface**: `/admin/news` provides authenticated CRUD operations for news articles
- **Image Upload**: News article images are uploaded to Firebase Storage (`news/` folder)
- **Authentication**: Email/password authentication required for admin access
- **Service Layer**: `src/services/newsService.ts` handles all Firestore operations (create, read, update, delete)

### Static Data

Faculty and student data are defined as static arrays in their respective page files (e.g., `facultyMembers` in `src/pages/people/Faculty.tsx`). News items have a static fallback in `src/data/news.ts` but are primarily managed through Firebase.

### Styling Patterns

- Black background (`bg-black`) with white text is the site theme
- Custom Hampton blue color available as `hampton-blue` in Tailwind config
- Hover effects commonly use `hover:scale-105`, `group-hover:scale-110`
- Gradient overlays with `bg-gradient-to-t from-black` for image cards

## Build Configuration

- **Vite plugins**: React, bundle visualizer (outputs `stats.html`), compression
- **Optimization**: lucide-react excluded from optimizeDeps
- **Code splitting**: Route-based lazy loading implemented

## Performance Considerations

- Recent commits focused on lazy loading and removing large images
- Bundle analysis available via rollup-plugin-visualizer
- Compression enabled via vite-plugin-compression

## File Locations

- **Images**: `/public/images/` (faculty photos, logos, backgrounds, etc.)
- **Type definitions**: `src/types/`
- **Static content**: Faculty/student data in respective page files
- **News images**: Firebase Storage (`news/` folder) for dynamically uploaded images

## Firebase Configuration

The site uses Firebase for news management. See `FIREBASE_SETUP.md` for detailed setup instructions.

- **Environment variables**: Define in `.env.local` (see `.env.example`)
- **Configuration**: `src/lib/firebase.ts`
- **Security**: Firestore and Storage rules allow public read, authenticated write
- **Admin access**: Navigate to `/admin/news` and sign in with Firebase Auth credentials
