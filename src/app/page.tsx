'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import { supabase, Property } from '@/lib/supabase';
import { MessageCircle, Zap, Shield } from 'lucide-react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(12);

      if (error) {
        console.error('Error fetching properties:', error);
        return;
      }

      console.log('Fetched properties:', data);
      if (data && data.length > 0) {
        console.log('First property images:', data[0].images);
      }

      setProperties(data || []);
      setSearchResults(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults(properties);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'active')
        .or(`title.ilike.%${query}%,city.ilike.%${query}%,postcode.ilike.%${query}%,type.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching properties:', error);
        return;
      }

      setSearchResults(data || []);
    } catch (error) {
      console.error('Error searching properties:', error);
    }
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    const sortedResults = [...searchResults];
    
    switch (value) {
      case 'price_low':
        sortedResults.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        sortedResults.sort((a, b) => b.price - a.price);
        break;
      case 'bedrooms':
        sortedResults.sort((a, b) => b.bedrooms - a.bedrooms);
        break;
      case 'newest':
      default:
        sortedResults.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }
    
    setSearchResults(sortedResults);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Sell Your Property
              <span className="block text-primary-500">Without Estate Agents</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              List and manage property sales independently, removing the need for traditional estate agents. 
              Save thousands on commission fees.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search properties by location, type, or postcode..."
            />
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Complete Faster */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-700 text-white p-8 rounded-lg text-center shadow-lg">
              <div className="mb-4">
                <Zap className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Complete Faster</h3>
              <p className="text-white/90">
                Direct communication between buyers and sellers eliminates delays and speeds up the process
              </p>
            </div>

            {/* Connect Directly */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-700 text-white p-8 rounded-lg text-center shadow-lg">
              <div className="mb-4">
                <MessageCircle className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Connect Directly</h3>
              <p className="text-white/90">
                Message buyers instantly without waiting for agent intermediaries to pass information along
              </p>
            </div>

            {/* You're in Charge */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-700 text-white p-8 rounded-lg text-center shadow-lg">
              <div className="mb-4">
                <Shield className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold mb-4">You&apos;re in Charge</h3>
              <p className="text-white/90">
                Take full control of your listing - add photos or videos anytime and update or remove your property whenever you like
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Save Money With Openmove
            </h2>
            <p className="text-xl text-gray-600">
              See how much you could save by selling your property directly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Traditional Estate Agent */}
            <div className="bg-gray-500 text-white p-8 rounded-lg">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Traditional Estate Agent</h3>
                <p className="text-gray-200">Commission-based fees</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span>Property Value:</span>
                  <span className="font-semibold">£400,000</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Commission (1.5%):</span>
                  <span className="font-semibold">£6,000</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Marketing:</span>
                  <span className="font-semibold">£500</span>
                </div>
                <div className="border-t border-gray-400 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total Cost:</span>
                    <span>£6,500</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Openmove */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-700 text-white p-8 rounded-lg shadow-lg">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Openmove</h3>
                <p className="text-white/90">Fixed transparent fees</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span>Property Value:</span>
                  <span className="font-semibold">£400,000</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Listing Fee:</span>
                  <span className="font-semibold">£10</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Marketing:</span>
                  <span className="font-semibold">£0</span>
                </div>
                <div className="border-t border-white/30 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total Cost:</span>
                    <span>£10</span>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                      Save £6,490!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Properties</h2>
              <p className="text-gray-600">Discover the latest listings on our platform</p>
            </div>
            
            {/* Sort Dropdown */}
            <div className="mt-4 sm:mt-0">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort:</label>
                <select 
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="newest">Newest first</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="bedrooms">Most Bedrooms</option>
                </select>
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md h-96 animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-t-lg"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold">
              View All Properties
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Sell Your Property?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of homeowners who have saved money by selling directly
          </p>
          <Link 
            href="/list-property"
            className="bg-white text-primary-500 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg inline-block"
          >
            List Your Property for £10
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
