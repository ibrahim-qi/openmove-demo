'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import { supabase, Property } from '@/lib/supabase';
import { Heart, Clock } from 'lucide-react';

// Define SearchFilters interface to match SearchBar
interface SearchFilters {
  purpose: 'buy' | 'rent';
  location: string;
  radius: string;
  priceMin: string;
  priceMax: string;
  bedroomsMin: string;
  bedroomsMax: string;
  bathroomsMin: string;
  bathroomsMax: string;
  propertyTypes: string[];
  tenureTypes: string[];
  showSoldSTC: boolean;
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function Home() {
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [recentlyViewedProperties, setRecentlyViewedProperties] = useState<Property[]>([]);

  useEffect(() => {
    loadSavedProperties();
    loadRecentlyViewedProperties();
  }, []);

  const loadSavedProperties = async () => {
    // Sample data to match Figma design
    const sampleSavedProperty = {
      id: 'sample-saved-1',
      title: '4 Bedroom Detached Home',
      price: 400000,
      listing_type: 'sale' as 'sale' | 'rent',
      address_line_1: 'Church Street',
      address_line_2: '',
      city: 'Wedmore',
      postcode: '',
      bedrooms: 4,
      bathrooms: 2,
      floor_area: 145,
      type: 'Detached',
      status: 'active' as 'active' | 'sold' | 'rented' | 'withdrawn',
      images: ['https://picsum.photos/400/300?random=1'],
      features: ['Garden', 'Parking', 'Modern'],
      custom_features: [],
      created_at: '2025-07-20T00:00:00.000Z',
      updated_at: '2025-07-20T00:00:00.000Z',
      user_id: '',
      description: '',
      location: { lat: 0, lng: 0 }
    };
    
    setSavedProperties([sampleSavedProperty]);
  };

  const loadRecentlyViewedProperties = async () => {
    // Sample data to match Figma design
    const sampleRecentProperty = {
      id: 'sample-recent-1',
      title: '3 Bedroom Semi-Detached Home',
      price: 350000,
      listing_type: 'sale' as 'sale' | 'rent',
      address_line_1: 'Church Street',
      address_line_2: '',
      city: 'Wedmore',
      postcode: '',
      bedrooms: 3,
      bathrooms: 2,
      floor_area: 100,
      type: 'Semi-Detached',
      status: 'active' as 'active' | 'sold' | 'rented' | 'withdrawn',
      images: ['https://picsum.photos/400/300?random=2'],
      features: ['Garden', 'Parking'],
      custom_features: [],
      created_at: '2025-07-15T00:00:00.000Z',
      updated_at: '2025-07-15T00:00:00.000Z',
      user_id: '',
      description: '',
      location: { lat: 0, lng: 0 }
    };
    
    setRecentlyViewedProperties([sampleRecentProperty]);
  };

  const handleSearch = async (query: string, filters?: SearchFilters) => {
    // For now, redirect to a search results page
    // You can implement this based on your routing needs
    if (query.trim() || filters) {
      console.log('Search query:', query, 'Filters:', filters);
      // TODO: Implement search results page navigation
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Search Section */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-6">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search properties"
            />
          </div>
          
          {/* List Your Property Button - Centered */}
          <div className="text-center">
            <Link 
              href="/list-property"
              className="bg-gradient-to-r from-primary-500 to-primary-700 text-white px-10 py-3.5 rounded-full font-semibold text-base hover:from-primary-600 hover:to-primary-800 transition-all duration-200 shadow-lg inline-block"
            >
              List Your Property
            </Link>
          </div>
        </div>
      </section>

      {/* Saved Properties */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4 px-4">
            <h2 className="text-lg font-bold text-gray-900">Saved Properties</h2>
          </div>

          {savedProperties.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No saved properties yet</h3>
              <p className="text-gray-500">Start saving properties you love to see them here</p>
            </div>
          ) : (
            <div className="px-4">
              {/* Mobile: Stack vertically, Desktop: Grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recently Viewed Properties */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 px-4">
            <h2 className="text-xl font-bold text-gray-900">Recently Viewed</h2>
          </div>

          {recentlyViewedProperties.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No recently viewed properties</h3>
              <p className="text-gray-500">Properties you view will appear here for quick access</p>
            </div>
          ) : (
            <div className="px-4">
              {/* Mobile: Stack vertically, Desktop: Grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentlyViewedProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
