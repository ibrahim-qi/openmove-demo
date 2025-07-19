'use client';

import { useState, useEffect } from 'react';
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
    try {
      // Get saved property IDs from localStorage
      const savedIds = JSON.parse(localStorage.getItem('savedProperties') || '[]');
      
      if (savedIds.length === 0) {
        setSavedProperties([]);
        return;
      }

      // Fetch the actual property data
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .in('id', savedIds)
        .eq('status', 'active')
        .limit(10);

      if (error) {
        console.error('Error fetching saved properties:', error);
        return;
      }

      setSavedProperties(data || []);
    } catch (error) {
      console.error('Error loading saved properties:', error);
      setSavedProperties([]);
    }
  };

  const loadRecentlyViewedProperties = async () => {
    try {
      // Get recently viewed property IDs from localStorage
      const recentlyViewedIds = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      
      if (recentlyViewedIds.length === 0) {
        setRecentlyViewedProperties([]);
        return;
      }

      // Fetch the actual property data
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .in('id', recentlyViewedIds)
        .eq('status', 'active')
        .limit(10);

      if (error) {
        console.error('Error fetching recently viewed properties:', error);
        return;
      }

      // Maintain the order from localStorage
      const orderedProperties = recentlyViewedIds
        .map((id: string) => data?.find(p => p.id === id))
        .filter(Boolean);

      setRecentlyViewedProperties(orderedProperties);
    } catch (error) {
      console.error('Error loading recently viewed properties:', error);
      setRecentlyViewedProperties([]);
    }
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
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Search Section */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search properties..."
            />
          </div>
        </div>
      </section>

      {/* Saved Properties */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary-500" />
              <h2 className="text-2xl font-bold text-gray-900">Saved Properties</h2>
            </div>
            {savedProperties.length > 0 && (
              <button className="text-primary-500 hover:text-primary-600 font-medium">
                View All
              </button>
            )}
          </div>

          {savedProperties.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No saved properties yet</h3>
              <p className="text-gray-500">Start saving properties you love to see them here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="flex space-x-6 pb-4" style={{ minWidth: 'max-content' }}>
                {savedProperties.map((property) => (
                  <div key={property.id} className="w-80 flex-shrink-0">
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recently Viewed Properties */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-primary-500" />
              <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
            </div>
            {recentlyViewedProperties.length > 0 && (
              <button className="text-primary-500 hover:text-primary-600 font-medium">
                View All
              </button>
            )}
          </div>

          {recentlyViewedProperties.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No recently viewed properties</h3>
              <p className="text-gray-500">Properties you view will appear here for quick access</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="flex space-x-6 pb-4" style={{ minWidth: 'max-content' }}>
                {recentlyViewedProperties.map((property) => (
                  <div key={property.id} className="w-80 flex-shrink-0">
                    <PropertyCard property={property} />
                  </div>
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
