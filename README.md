# Openmove - Complete Property Platform

A comprehensive property listing platform that enables homeowners to sell their properties directly without estate agents. Built with Next.js 15, TypeScript, and Supabase for a complete full-stack solution.

## 🚀 Key Features

- **Multi-Step Property Listing**: Complete 3-step listing process with validation
- **Real Database Backend**: Full Supabase integration with PostgreSQL
- **Image Upload & Storage**: Property photos stored in Supabase Storage
- **Real-Time Search**: Find properties by location, type, postcode with live filtering
- **Mobile Responsive**: Optimized for all devices with modern UI/UX
- **Cost Savings**: Save thousands compared to traditional estate agent commissions

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router & TypeScript
- **Backend**: Supabase (PostgreSQL + Storage + Auth)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📋 Complete Functionality

### Property Listing Flow
1. **Overview Page** (`/list-property`) - How it works guide
2. **Step 1** (`/list-property/step1`) - Property details, location, features
3. **Step 2** (`/list-property/step2`) - Photo upload, descriptions, floor plans
4. **Step 3** (`/list-property/step3`) - Pricing and review
5. **Success Page** (`/list-property/success`) - Confirmation and sharing

### Homepage Features
- Hero section with search functionality
- Value propositions (Complete Faster, Connect Directly, You're in Charge)
- Cost comparison vs traditional estate agents
- Featured properties with real database integration
- Advanced filtering and sorting

### Database Schema
Complete properties table with:
- Basic info (title, type, price, listing_type)
- Address details (property_name, address lines, city, postcode)
- Property specs (bedrooms, bathrooms, floor_area, description)
- Features (40+ selectable features + custom features as JSONB)
- Images (stored in Supabase Storage with public URLs)
- Status management and timestamps

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Supabase Setup

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to **SQL Editor** and run the complete schema:

```sql
-- Create properties table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Basic property information
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  listing_type TEXT NOT NULL CHECK (listing_type IN ('sale', 'rent')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'sold', 'rented', 'withdrawn')),
  
  -- Address information
  property_name TEXT,
  address_line_1 TEXT NOT NULL,
  address_line_2 TEXT,
  city TEXT NOT NULL,
  postcode TEXT NOT NULL,
  
  -- Property details
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  floor_area INTEGER NOT NULL,
  description TEXT NOT NULL,
  
  -- Features and amenities
  features JSONB DEFAULT '[]'::jsonb,
  custom_features JSONB DEFAULT '[]'::jsonb,
  
  -- Images and media
  images JSONB DEFAULT '[]'::jsonb,
  
  -- Additional metadata
  property_tenure TEXT DEFAULT 'Freehold'
);

-- Create indexes for performance
CREATE INDEX idx_properties_listing_type ON properties(listing_type);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_properties_created_at ON properties(created_at);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active properties
CREATE POLICY "Allow public read access to active properties" ON properties
  FOR SELECT USING (status = 'active');

-- Allow public insert for property listings
CREATE POLICY "Allow public insert" ON properties
  FOR INSERT WITH CHECK (true);

-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('property-images', 'property-images', true);

-- Storage policies for image upload
CREATE POLICY "Public read access to property images" ON storage.objects
  FOR SELECT USING (bucket_id = 'property-images');

CREATE POLICY "Public upload access to property images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'property-images');
```

### 3. Environment Variables

Create `.env.local` file:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Get these from **Supabase Dashboard** → **Settings** → **API**

### 4. Development

```bash
npm run dev
# Open http://localhost:3000
```

### 5. Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Add environment variables in **Vercel Dashboard** → **Settings** → **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy

## 💰 Value Proposition

**Traditional Estate Agent**: £6,500 total cost
- Property Value: £400,000
- Commission (1.5%): £6,000
- Marketing: £500

**Openmove**: £10 total cost
- Listing Fee: £10
- Marketing: £0
- **Total Savings: £6,490 (99.8% cost reduction)**

## 🎯 Demo Flow for Clients

1. **Homepage**: Show search, filtering, and property cards
2. **List Property**: Walk through complete 3-step listing process
3. **Database Integration**: Show properties saving and appearing instantly
4. **Search & Filter**: Demonstrate real-time search functionality
5. **Mobile Responsive**: Test on different screen sizes
6. **Backend Admin**: Show Supabase dashboard with real data

## 🏗️ Architecture Highlights

- **Type-Safe**: Full TypeScript implementation with proper interfaces
- **Performant**: Optimized database queries with indexing
- **Scalable**: Supabase backend handles authentication, storage, and real-time features
- **SEO-Ready**: Next.js App Router with proper meta tags
- **Production-Ready**: Error handling, loading states, and fallbacks

## 📱 Features Implemented

✅ **Property Listing Flow**
- Multi-step form with validation
- 40+ property features selection
- Custom features input
- Image upload with preview
- Floor plan upload support

✅ **Database Integration**
- Complete CRUD operations
- Real-time property search
- Advanced filtering and sorting
- Image storage and retrieval

✅ **UI/UX**
- Modern, responsive design
- Loading states and error handling
- Mobile-first approach
- Professional property cards

✅ **Performance**
- Optimized images and lazy loading
- Database indexing
- Efficient search queries
- Fast build times

This demonstrates a complete £4,500 MVP with professional UI, full backend functionality, and production-ready architecture.

---

Built with ❤️ to help property sellers save money and maintain control of their sales process.
