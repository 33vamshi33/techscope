# replit.md

## Overview

This is a vibrant tech blog aggregator called TechScope that curates content from major technology companies and presents their concepts in an engaging, fun, and easily digestible format for tech enthusiasts. The application features a modern design inspired by Product Hunt and The Verge, with interactive content cards, working navigation, and article detail pages.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Component Library**: shadcn/ui (Radix UI primitives with custom styling)
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (configured for Neon serverless)
- **API Design**: RESTful API endpoints

### Project Structure
- `client/` - Frontend React application
- `server/` - Backend Express server
- `shared/` - Shared TypeScript types and database schema
- `migrations/` - Database migration files

## Key Components

### Database Schema (`shared/schema.ts`)
- **Articles**: Main content with title, summary, content, source info, category, metrics (views, likes), and publish date
- **Categories**: Article categorization with emoji and color theming
- **Sources**: Content source information with icons and branding

### Frontend Components
- **Layout Components**: Header with search, Hero section, Footer
- **Content Components**: Featured article display, Article cards, Sidebar filters
- **UI Components**: Complete shadcn/ui component library for consistent design
- **Pages**: Home page with article listing and filtering

### Backend Services
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **API Routes**: RESTful endpoints for articles, sources, and categories
- **Middleware**: Request logging, error handling, JSON parsing

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **Server Processing**: Express routes handle requests and interact with storage layer
3. **Data Storage**: Storage interface abstracts database operations (currently in-memory, ready for database integration)
4. **Response Handling**: JSON responses with proper error handling and logging
5. **Client Updates**: TanStack Query manages caching and UI updates

### API Endpoints
- `GET /api/articles` - List articles with optional filtering
- `GET /api/articles/featured` - Get featured articles
- `GET /api/articles/:id` - Get single article
- `POST /api/articles/:id/like` - Like an article
- `GET /api/sources` - List content sources
- `GET /api/categories` - List article categories

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL serverless with Drizzle ORM
- **UI Framework**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with PostCSS
- **Development**: Vite for fast development and building
- **Type Safety**: TypeScript throughout the stack

### Development Tools
- **Hot Reload**: Vite HMR for frontend, tsx for backend development
- **Database Migrations**: Drizzle Kit for schema management
- **Error Handling**: Custom error overlay for development
- **Code Quality**: TypeScript strict mode enabled

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Database Setup**: Drizzle migrations prepare PostgreSQL schema

### Environment Configuration
- **Development**: Uses tsx for hot reloading, Vite dev server
- **Production**: Serves built static files from Express, NODE_ENV=production
- **Database**: Requires DATABASE_URL environment variable for PostgreSQL connection

### Deployment Requirements
- Node.js runtime environment
- PostgreSQL database (Neon serverless recommended)
- Environment variables: DATABASE_URL, NODE_ENV
- Port configuration for web server

## Recent Changes

- **July 2025**: Prepared GitHub deployment with comprehensive documentation
- **Repository Setup**: Created README, LICENSE, GitHub workflows, and deployment configuration
- **Content Enhancement**: Added 10+ new technical articles with deep implementation details
- **Navigation Fixes**: Fixed dropdown menus with working category and source filtering
- **Technical Focus**: Enhanced all articles with detailed explanations of engineering breakthroughs
- **UI Improvements**: Added 3-column grid layout and functional "Load More" button
- **GitHub Ready**: Created deployment files, contribution guidelines, and project documentation
- **December 2024**: Enhanced the application with major tech companies (Netflix, Apple, Microsoft, Amazon, Tesla, OpenAI, Spotify, Uber, Airbnb, Shopify)
- **Navigation**: Fixed all navigation issues - articles are now clickable and open detailed article pages
- **Dropdown Menus**: Added functional dropdown menus in header for Categories and Sources
- **Article Detail Pages**: Created comprehensive article detail pages with full content, interaction buttons, and navigation
- **Routing**: Implemented proper routing with wouter for article pages (/article/:id)
- **Filtering**: Fixed filtering system to show all articles by default with working filters
- **Content**: Added rich sample articles from major tech companies with detailed explanations
- **UI/UX**: Enhanced card hover effects, gradients, and interactive elements

The application is designed to be easily deployable to platforms like Replit, Vercel, or traditional hosting providers with minimal configuration changes.