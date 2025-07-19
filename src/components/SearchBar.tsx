'use client';

import { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, filters?: any) => void;
  placeholder?: string;
  className?: string;
}

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

export default function SearchBar({ 
  onSearch, 
  placeholder = "Search properties...", 
  className = "" 
}: SearchBarProps) {
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    purpose: 'buy',
    location: '',
    radius: '5 miles',
    priceMin: 'No min',
    priceMax: 'No max',
    bedroomsMin: 'No min',
    bedroomsMax: 'No max',
    bathroomsMin: 'No min',
    bathroomsMax: 'No max',
    propertyTypes: [],
    tenureTypes: [],
    showSoldSTC: false
  });

  const handleSearch = () => {
    onSearch(filters.location, filters);
    setShowModal(false);
  };

  const handleClearAll = () => {
    setFilters({
      purpose: 'buy',
      location: '',
      radius: '5 miles',
      priceMin: 'No min',
      priceMax: 'No max',
      bedroomsMin: 'No min',
      bedroomsMax: 'No max',
      bathroomsMin: 'No min',
      bathroomsMax: 'No max',
      propertyTypes: [],
      tenureTypes: [],
      showSoldSTC: false
    });
  };

  const togglePropertyType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type]
    }));
  };

  const toggleTenureType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      tenureTypes: prev.tenureTypes.includes(type)
        ? prev.tenureTypes.filter(t => t !== type)
        : [...prev.tenureTypes, type]
    }));
  };

  return (
    <>
      {/* Simple Search Bar */}
      <div className={`w-full ${className}`}>
        <div 
          onClick={() => setShowModal(true)}
          className="relative flex items-center cursor-pointer bg-white rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={placeholder}
            className="block w-full pl-12 pr-16 py-4 text-lg border-none rounded-full focus:outline-none bg-transparent cursor-pointer"
            readOnly
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            <button className="bg-primary-500 text-white p-3 rounded-full hover:bg-primary-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Search Properties</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Purpose Toggle */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">I'm looking</h3>
                <div className="flex space-x-0 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, purpose: 'buy' }))}
                    className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-colors ${
                      filters.purpose === 'buy'
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    To Buy
                  </button>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, purpose: 'rent' }))}
                    className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-colors ${
                      filters.purpose === 'rent'
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    To Rent
                  </button>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Location</h3>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search locations"
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Search Radius */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Search radius</h3>
                <div className="grid grid-cols-3 gap-2">
                  {['This area only', '1 mile', '3 miles', '5 miles', '10 miles', '15 miles', '30 miles'].map((radius) => (
                    <button
                      key={radius}
                      onClick={() => setFilters(prev => ({ ...prev, radius }))}
                      className={`py-2 px-3 text-sm rounded-lg border transition-colors ${
                        filters.radius === radius
                          ? 'bg-primary-500 text-white border-primary-500'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {radius}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Price</h3>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={filters.priceMin}
                    onChange={(e) => setFilters(prev => ({ ...prev, priceMin: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="No min">No min</option>
                    <option value="50000">£50,000</option>
                    <option value="100000">£100,000</option>
                    <option value="150000">£150,000</option>
                    <option value="200000">£200,000</option>
                    <option value="300000">£300,000</option>
                    <option value="400000">£400,000</option>
                    <option value="500000">£500,000</option>
                  </select>
                  <select
                    value={filters.priceMax}
                    onChange={(e) => setFilters(prev => ({ ...prev, priceMax: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="No max">No max</option>
                    <option value="200000">£200,000</option>
                    <option value="300000">£300,000</option>
                    <option value="400000">£400,000</option>
                    <option value="500000">£500,000</option>
                    <option value="750000">£750,000</option>
                    <option value="1000000">£1,000,000</option>
                    <option value="1500000">£1,500,000</option>
                  </select>
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Bedrooms</h3>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={filters.bedroomsMin}
                    onChange={(e) => setFilters(prev => ({ ...prev, bedroomsMin: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="No min">No min</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5+</option>
                  </select>
                  <select
                    value={filters.bedroomsMax}
                    onChange={(e) => setFilters(prev => ({ ...prev, bedroomsMax: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="No max">No max</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5+</option>
                  </select>
                </div>
              </div>

              {/* Bathrooms */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Bathrooms</h3>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={filters.bathroomsMin}
                    onChange={(e) => setFilters(prev => ({ ...prev, bathroomsMin: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="No min">No min</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </select>
                  <select
                    value={filters.bathroomsMax}
                    onChange={(e) => setFilters(prev => ({ ...prev, bathroomsMax: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="No max">No max</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </select>
                </div>
              </div>

              {/* Property Type */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Property type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Detached', 'Flat', 'Semi-detached', 'Park home', 
                    'Terraced', 'Land', 'Commercial'
                  ].map((type) => (
                    <label key={type} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={filters.propertyTypes.includes(type)}
                        onChange={() => togglePropertyType(type)}
                        className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tenure Type */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Tenure type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Freehold', 'Leasehold'].map((type) => (
                    <label key={type} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={filters.tenureTypes.includes(type)}
                        onChange={() => toggleTenureType(type)}
                        className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Show Sold STC */}
              <div>
                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Show sold STC properties</span>
                    <p className="text-xs text-gray-500">Include properties sold subject to contract</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={filters.showSoldSTC}
                    onChange={(e) => setFilters(prev => ({ ...prev, showSoldSTC: e.target.checked }))}
                    className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t bg-gray-50">
              <button
                onClick={handleClearAll}
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                Clear all
              </button>
              <button
                onClick={handleSearch}
                className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors flex items-center"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 