# replit.md

## Overview

GTR Auto is a single-page website for an automotive workshop/garage business. It features a dark industrial aesthetic with sections for Hero, About, Services, Gallery, and Contact. The site supports bilingual content (English and Serbian) and includes a contact form that submits inquiries to a PostgreSQL database. This is a full-stack TypeScript application with a React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight router), but the app is essentially a single-page scrolling site
- **Styling**: Tailwind CSS with CSS variables for theming (dark mode default with industrial color palette — black, gray, metallic orange/red accents)
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives, stored in `client/src/components/ui/`
- **Fonts**: Chakra Petch (display) and Rajdhani (body) for the industrial look
- **Animations**: Framer Motion for scroll animations and entry effects
- **Smooth Scrolling**: react-scroll for anchor-based navigation within the single page
- **Carousel**: Embla Carousel with autoplay plugin for the gallery section
- **State Management**: React Query (@tanstack/react-query) for server state, React Context for language switching
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers
- **Internationalization**: Custom LanguageContext with English and Serbian translations stored in `client/src/lib/LanguageContext.tsx`
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend
- **Runtime**: Node.js with Express
- **Language**: TypeScript, executed via tsx in development
- **API Structure**: Single REST endpoint `POST /api/inquiries` for contact form submissions
- **API Contract**: Shared route definitions in `shared/routes.ts` with Zod schemas for input validation
- **Dev Server**: Vite dev server runs as middleware in Express during development (see `server/vite.ts`)
- **Production**: Client is built to `dist/public`, server is bundled with esbuild to `dist/index.cjs`

### Database
- **Database**: PostgreSQL (required, via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation integration
- **Schema Location**: `shared/schema.ts` — single table `inquiries` with fields: id, name, email, phone, message, createdAt
- **Migrations**: Managed via `drizzle-kit push` (schema push approach, not migration files)
- **Connection**: node-postgres (`pg`) Pool in `server/db.ts`

### Storage Layer
- **Pattern**: Repository/storage pattern — `IStorage` interface in `server/storage.ts` with `DatabaseStorage` implementation
- **Purpose**: Abstracts database operations, currently only has `createInquiry`

### Build System
- **Client Build**: Vite produces static assets in `dist/public`
- **Server Build**: esbuild bundles server code to `dist/index.cjs`, with selected dependencies bundled (allowlist in `script/build.ts`) and others kept external
- **Scripts**: `npm run dev` (development), `npm run build` (production build), `npm start` (run production), `npm run db:push` (push schema to database)

## External Dependencies

### Database
- **PostgreSQL**: Required. Connection string must be provided via `DATABASE_URL` environment variable. Used with Drizzle ORM and node-postgres driver.

### Key npm Packages
- **drizzle-orm** + **drizzle-kit**: ORM and schema management for PostgreSQL
- **express**: HTTP server framework
- **@tanstack/react-query**: Async state management on the client
- **framer-motion**: Animation library for scroll effects
- **react-scroll**: Smooth scrolling navigation
- **embla-carousel-react** + **embla-carousel-autoplay**: Image carousel
- **zod**: Schema validation shared between client and server
- **wouter**: Client-side routing

### Replit-Specific Plugins
- `@replit/vite-plugin-runtime-error-modal`: Shows runtime errors in development
- `@replit/vite-plugin-cartographer`: Replit integration (dev only)
- `@replit/vite-plugin-dev-banner`: Dev environment banner (dev only)

### External Services
- **Google Fonts**: Chakra Petch, Rajdhani, DM Sans, Fira Code, Geist Mono loaded via CDN
- No other third-party API integrations currently (no auth, no payment, no email sending)