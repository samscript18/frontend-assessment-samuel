# CineTrace - Frontend Assessment Submission

CineTrace is a content explorer built with Next.js 16 App Router, TypeScript, and Tailwind CSS, powered by the TMDB API.

## Project Summary

This submission focuses on the core evaluation areas from the brief:

- Server-side data fetching and route architecture
- URL-driven search and filtering with debounced input
- Clear loading, error, and empty states
- Performance-oriented rendering and caching decisions
- Feature-based code organization and testability

## Public API Selection

API: The Movie Database (TMDB)

- Docs: https://developer.themoviedb.org/docs
- Why: Stable, paginated endpoints and rich movie/TV metadata suitable for listing, filtering, and detail pages

## Feature Checklist (Rubric Mapping)

### F-1 Listing Page

- Server-rendered listing route in app/page.tsx
- 20+ items per page
- Card fields: title/name, poster image with fallback, and multiple metadata fields
- Responsive grid: 1 column mobile, 2 columns tablet, 3-4 columns desktop
- Pagination implemented and URL-shareable

### F-2 Detail Page

- Dynamic routes:
     - app/movie/[id]/page.tsx
     - app/tv/[id]/page.tsx
- Server-level data fetching in both detail pages
- generateMetadata includes title, description, and og:image
- Breadcrumb navigation back to listing context

### F-3 Search & Filtering

- URL-driven search with 300ms debounce
- Filters: content type and year
- Query state reflected in URL for shareability

### F-4 Loading, Error, Empty States

- Route-level skeleton loaders:
     - app/loading.tsx
     - app/movie/[id]/loading.tsx
     - app/tv/[id]/loading.tsx
- Friendly error boundary in app/error.tsx
- Dedicated empty state in components/MovieGrid.tsx

### F-5 Deployment

- Deploy script included for OpenNext Cloudflare adapter
- Compatible with Cloudflare Workers and Vercel
- Cache-Control headers configured for static assets in next.config.mjs

## Technical Stack

- Framework: Next.js 16.2 (App Router)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS + custom CSS
- Data: Native fetch via centralized API layer
- Testing: Vitest + React Testing Library

## Setup (5 Commands)

1. git clone <repository-url>
2. cd cine-trace
3. npm install
4. cp .env.example .env.local
5. npm run dev

Add in .env.local:

- NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_key
- NEXT_PUBLIC_APP_URL=http://localhost:3000

## Architecture Decisions

Project structure:

- app/: routes, layout, metadata, loading/error boundaries
- components/: reusable UI pieces
- features/: feature-scoped logic (search, listing, detail)
- hooks/: shared hooks used across features
- lib/: API abstraction and utility helpers
- types/: shared TypeScript interfaces

Why this structure:

- Keeps route files focused on orchestration
- Moves business logic into reusable feature modules
- Prevents direct fetch calls in presentation components
- Improves readability and testability

## Pagination Decision

Pagination was chosen over infinite scroll because it:

- Produces deterministic URL state (easy to share/bookmark)
- Controls memory growth for long browsing sessions
- Maps directly to TMDB pagination semantics

## Performance & Caching Notes

Implemented:

1. next/image for posters/backdrops with explicit sizing and priority where relevant
2. next/font optimization in app/layout.tsx
3. Server-rendered listing and detail data flow to reduce client fetch waterfalls
4. Fetch revalidation defaults in lib/tmdb.ts
5. Static asset cache headers in next.config.mjs

Cloudflare readiness:

- OpenNext Cloudflare package and deploy script are included
- API route and static cache headers are configured

## Testing

Current tests:

- Unit tests:
     - tests/tmdb.test.ts
     - tests/useDebounce.test.ts
- Integration tests (2):
     - tests/integration/listing.integration.test.tsx

Integration test coverage:

1. Debounced search/filter URL synchronization
2. Correct movie/tv route linking in mixed listing mode

Run checks:

- npm run lint
- npm run test:run

## Bonus Tasks Status

- B-1 Cloudflare edge caching + x-cache-status header: not fully implemented yet
- B-2 Streaming with explicit Suspense slow-fetch boundary: partial (loading boundaries exist)
- B-3 Accessibility audit report with 95+ documented score: not included yet

## Trade-offs & Limitations

- Mixed movie/TV search merges two endpoints and sorts by popularity; practical but approximate
- Year filtering is strongest in single-type mode
- Cloudflare edge cache verification headers are pending