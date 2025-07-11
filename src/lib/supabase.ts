import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our property data
export interface Property {
  id: string
  created_at: string
  title: string
  type: string
  price: number
  address_line_1: string
  address_line_2?: string
  city: string
  postcode: string
  property_name?: string
  bedrooms: number
  bathrooms: number
  floor_area: number
  description: string
  features: string[]
  custom_features: string[]
  images: string[]
  status: 'active' | 'sold' | 'rented' | 'withdrawn'
  listing_type: 'sale' | 'rent'
  property_tenure?: string
}

export interface PropertyFormData {
  // Step 1: Property Details
  listing_type: 'sale' | 'rent'
  title: string
  type: string
  property_name?: string
  address_line_1: string
  address_line_2?: string
  city: string
  postcode: string
  bedrooms: number
  bathrooms: number
  floor_area: number
  features: string[]
  custom_features: string[]
  
  // Step 2: Photos & Details
  description: string
  images: File[]
  
  // Step 3: Pricing
  price: number
} 