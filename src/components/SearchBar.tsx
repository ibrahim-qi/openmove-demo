'use client';

import { useState } from 'react';
import { Search, MapPin, X, ChevronDown } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, filters?: SearchFilters) => void;
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

  // Price options
  const priceOptions = [
    { value: 'No min', label: 'No min' },
    { value: '25000', label: '£25,000' },
    { value: '50000', label: '£50,000' },
    { value: '75000', label: '£75,000' },
    { value: '100000', label: '£100,000' },
    { value: '125000', label: '£125,000' },
    { value: '150000', label: '£150,000' },
    { value: '175000', label: '£175,000' },
    { value: '200000', label: '£200,000' },
    { value: '225000', label: '£225,000' },
    { value: '250000', label: '£250,000' },
    { value: '275000', label: '£275,000' },
    { value: '300000', label: '£300,000' },
    { value: '350000', label: '£350,000' },
    { value: '400000', label: '£400,000' },
    { value: '450000', label: '£450,000' },
    { value: '500000', label: '£500,000' },
    { value: '600000', label: '£600,000' },
    { value: '700000', label: '£700,000' },
    { value: '800000', label: '£800,000' },
    { value: '900000', label: '£900,000' },
    { value: '1000000', label: '£1,000,000' },
    { value: '1250000', label: '£1,250,000' },
    { value: '1500000', label: '£1,500,000' },
    { value: '2000000', label: '£2,000,000' },
  ];

  const priceMaxOptions = [
    { value: 'No max', label: 'No max' },
    ...priceOptions.slice(1) // All options except 'No min'
  ];

  // Bedroom options
  const bedroomMinOptions = [
    { value: 'No min', label: 'No min' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5+' },
  ];

  const bedroomMaxOptions = [
    { value: 'No max', label: 'No max' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5+' },
  ];

  // Bathroom options
  const bathroomMinOptions = [
    { value: 'No min', label: 'No min' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4+' },
  ];

  const bathroomMaxOptions = [
    { value: 'No max', label: 'No max' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4+' },
  ];

  // Custom Select Component
  const CustomSelect = ({ 
    value, 
    onChange, 
    options, 
    placeholder = "Select..."
  }: {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(option => option.value === value);

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-700 cursor-pointer shadow-sm hover:border-gray-300 flex items-center justify-between"
        >
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                  option.value === value ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Simple Search Bar */}
      <div className={`w-full ${className}`}>
        <div 
          onClick={() => setShowModal(true)}
          className="relative flex items-center cursor-pointer bg-white rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200"
        >
          <input
            type="text"
            placeholder={placeholder}
            className="block w-full px-6 py-4 text-lg border-none rounded-full focus:outline-none bg-transparent cursor-pointer text-center text-black font-medium"
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
            <div className="relative flex items-center justify-center p-6 border-b">
              <h2 className="text-xl font-semibold text-black">Search Properties</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="absolute right-6 text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Purpose Toggle - Split buttons */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">I&apos;m looking</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, purpose: 'buy' }))}
                    className={`flex-1 py-3 px-6 rounded-lg text-sm font-medium transition-colors border ${
                      filters.purpose === 'buy'
                        ? 'bg-primary-500 text-white border-primary-500'
                        : 'text-gray-600 hover:text-gray-900 border-gray-300 bg-white'
                    }`}
                  >
                    To Buy
                  </button>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, purpose: 'rent' }))}
                    className={`flex-1 py-3 px-6 rounded-lg text-sm font-medium transition-colors border ${
                      filters.purpose === 'rent'
                        ? 'bg-primary-500 text-white border-primary-500'
                        : 'text-gray-600 hover:text-gray-900 border-gray-300 bg-white'
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-700"
                  />
                </div>
              </div>

              {/* Search Radius - Match Replit layout */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Search radius</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['This area only', '1 mile', '3 miles', '5 miles', '10 miles', '15 miles', '30 miles'].map((radius) => (
                    <button
                      key={radius}
                      onClick={() => setFilters(prev => ({ ...prev, radius }))}
                      className={`py-3 px-3 text-sm rounded-lg border transition-colors ${
                        filters.radius === radius
                          ? 'bg-primary-500 text-white border-primary-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {radius}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range - Modern custom dropdowns */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Price</h3>
                <div className="grid grid-cols-2 gap-4">
                  <CustomSelect
                    value={filters.priceMin}
                    onChange={(value) => setFilters(prev => ({ ...prev, priceMin: value }))}
                    options={priceOptions}
                    placeholder="No min"
                  />
                  <CustomSelect
                    value={filters.priceMax}
                    onChange={(value) => setFilters(prev => ({ ...prev, priceMax: value }))}
                    options={priceMaxOptions}
                    placeholder="No max"
                  />
                </div>
              </div>

              {/* Bedrooms - Modern custom dropdowns */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Bedrooms</h3>
                <div className="grid grid-cols-2 gap-4">
                  <CustomSelect
                    value={filters.bedroomsMin}
                    onChange={(value) => setFilters(prev => ({ ...prev, bedroomsMin: value }))}
                    options={bedroomMinOptions}
                    placeholder="No min"
                  />
                  <CustomSelect
                    value={filters.bedroomsMax}
                    onChange={(value) => setFilters(prev => ({ ...prev, bedroomsMax: value }))}
                    options={bedroomMaxOptions}
                    placeholder="No max"
                  />
                </div>
              </div>

              {/* Bathrooms - Modern custom dropdowns */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Bathrooms</h3>
                <div className="grid grid-cols-2 gap-4">
                  <CustomSelect
                    value={filters.bathroomsMin}
                    onChange={(value) => setFilters(prev => ({ ...prev, bathroomsMin: value }))}
                    options={bathroomMinOptions}
                    placeholder="No min"
                  />
                  <CustomSelect
                    value={filters.bathroomsMax}
                    onChange={(value) => setFilters(prev => ({ ...prev, bathroomsMax: value }))}
                    options={bathroomMaxOptions}
                    placeholder="No max"
                  />
                </div>
              </div>

              {/* Property Type - Custom coral checkboxes */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Property type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Detached', 'Flat', 'Semi-detached', 'Park home', 
                    'Terraced', 'Land', 'Commercial'
                  ].map((type) => (
                    <label key={type} className="flex items-center space-x-3 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={filters.propertyTypes.includes(type)}
                          onChange={() => togglePropertyType(type)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                          filters.propertyTypes.includes(type)
                            ? 'bg-primary-500 border-primary-500'
                            : 'border-gray-300 bg-white hover:border-gray-400'
                        }`}>
                          {filters.propertyTypes.includes(type) && (
                            <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tenure Type - Custom coral checkboxes */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Tenure type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Freehold', 'Leasehold'].map((type) => (
                    <label key={type} className="flex items-center space-x-3 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={filters.tenureTypes.includes(type)}
                          onChange={() => toggleTenureType(type)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                          filters.tenureTypes.includes(type)
                            ? 'bg-primary-500 border-primary-500'
                            : 'border-gray-300 bg-white hover:border-gray-400'
                        }`}>
                          {filters.tenureTypes.includes(type) && (
                            <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Show Sold STC - Custom coral checkbox */}
              <div>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Show sold STC properties</span>
                    <p className="text-xs text-gray-500">Include properties sold subject to contract</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={filters.showSoldSTC}
                      onChange={(e) => setFilters(prev => ({ ...prev, showSoldSTC: e.target.checked }))}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                      filters.showSoldSTC
                        ? 'bg-primary-500 border-primary-500'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}>
                      {filters.showSoldSTC && (
                        <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
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