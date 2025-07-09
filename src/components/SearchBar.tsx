'use client';

import { useState } from 'react';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ 
  onSearch, 
  placeholder = "Search properties...", 
  className = "" 
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Real-time search as user types
    onSearch(value);
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder={placeholder}
              className="block w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            />
          </div>

          {/* Filters Button */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-4 border border-l-0 border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center"
          >
            <SlidersHorizontal className="h-5 w-5 text-gray-600" />
          </button>

          {/* Search Button */}
          <button
            type="submit"
            className="px-6 py-4 bg-primary-500 text-white rounded-r-lg hover:bg-primary-600 transition-colors flex items-center font-semibold"
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type
                </label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                  <option value="">Any</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="cottage">Cottage</option>
                  <option value="penthouse">Penthouse</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bedrooms
                </label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Price
                </label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                  <option value="">No min</option>
                  <option value="100000">£100,000</option>
                  <option value="200000">£200,000</option>
                  <option value="300000">£300,000</option>
                  <option value="500000">£500,000</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price
                </label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                  <option value="">No max</option>
                  <option value="300000">£300,000</option>
                  <option value="500000">£500,000</option>
                  <option value="750000">£750,000</option>
                  <option value="1000000">£1,000,000</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
} 