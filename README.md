# Openmove - Property Platform

A property listing platform that cuts out estate agents and their hefty fees. Built this to show how homeowners can sell directly and save thousands.

![Platform Preview](https://img.shields.io/badge/Status-Live-success) ![Tech Stack](https://img.shields.io/badge/Stack-Next.js%2015%20%7C%20TypeScript%20%7C%20Supabase-blue)

## What This Does

**Problem**: Estate agents charge £6,500+ per property sale  
**Solution**: Direct platform where homeowners list for £10  
**Result**: 99.8% cost reduction

## Technical Implementation

### Frontend & UX
- Multi-step property listing form with session persistence
- Real-time search and filtering across 40+ property features  
- Mobile-responsive design with bottom sheet modals
- Image upload with preview and Supabase storage integration

### Backend & Database
- PostgreSQL schema with JSONB for flexible feature storage
- Performance optimized with strategic indexing
- Row Level Security policies for data protection
- Real-time search across location, type, and postcode

### Production Features
- Full TypeScript implementation with proper error handling
- SEO optimization and Vercel deployment ready
- Comprehensive loading states and fallbacks

## Tech Stack

```
Frontend: Next.js 15 (App Router) • TypeScript • Tailwind CSS v4
Backend:  Supabase (PostgreSQL + Storage + Auth)
Deploy:   Vercel
```

## Key Technical Challenges Solved

### File Upload Issues
Property submissions were failing because File objects lose properties when stored in sessionStorage. Fixed by converting images to base64 for storage, then reconstructing File objects for upload.

### Image Configuration  
Next.js was throwing hostname errors with Supabase storage URLs. Solved by configuring remotePatterns in next.config.ts and adding proper fallback handling.

### Database Integration
Migrated from mock data to live Supabase queries while maintaining type safety. Created comprehensive TypeScript interfaces and updated all components with proper error boundaries.

## Database Schema

```sql
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  address_line_1 TEXT NOT NULL,
  city TEXT NOT NULL,
  postcode TEXT NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  floor_area INTEGER NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb
);
```

## How It Works

1. **Homepage**: Search properties with real-time filtering and sorting
2. **List Property**: 3-step form (details → photos → pricing)  
3. **Database**: Properties save instantly and appear in search results
4. **Mobile**: Works seamlessly across all device sizes

## Business Model

- **Traditional Agent**: £6,500 (1.5% commission + marketing)
- **This Platform**: £10 listing fee
- **Savings**: £6,490 per property

## Development Process

Started as a frontend demo, then built the complete backend infrastructure. Tackled file serialization bugs, Next.js configuration issues, and database integration challenges. The result is a production-ready platform that handles everything from property submission to image storage.

## Quick Start

```bash
git clone [repository]
npm install
# Add Supabase environment variables to .env.local
npm run dev
```

Built to handle real estate at scale while keeping costs minimal for property sellers.
