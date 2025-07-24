'use client';

import { useState } from 'react';
import { Search, MapPin, X, ChevronDown, Check } from 'lucide-react';

// Add custom styles for animations
const animationStyles = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-slide-in {
    animation: slideIn 0.3s ease-out forwards;
  }
`;

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
        <span className={`text-sm ${selectedOption ? 'text-gray-900' : 'text-gray-500'}`}>
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
              className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
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

export default function SearchBar({ 
  onSearch, 
  placeholder = "Search properties...", 
  className = "" 
}: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);

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

  // Options for dropdowns
  const priceOptions = [
    { value: 'No min', label: 'No min' },
    { value: '50000', label: '£50,000' },
    { value: '100000', label: '£100,000' },
    { value: '150000', label: '£150,000' },
    { value: '200000', label: '£200,000' },
    { value: '250000', label: '£250,000' },
    { value: '300000', label: '£300,000' },
    { value: '400000', label: '£400,000' },
    { value: '500000', label: '£500,000' },
    { value: '750000', label: '£750,000' },
    { value: '1000000', label: '£1,000,000' },
  ];

  const pricePriceMaxOptions = [
    { value: 'No max', label: 'No max' },
    { value: '100000', label: '£100,000' },
    { value: '150000', label: '£150,000' },
    { value: '200000', label: '£200,000' },
    { value: '250000', label: '£250,000' },
    { value: '300000', label: '£300,000' },
    { value: '400000', label: '£400,000' },
    { value: '500000', label: '£500,000' },
    { value: '750000', label: '£750,000' },
    { value: '1000000', label: '£1,000,000' },
    { value: '2000000', label: '£2,000,000+' },
  ];

  const bedroomOptions = [
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

  const bathroomOptions = [
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

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      <div className={`w-full ${className} relative`}>
      {/* Container that morphs between search bar and modal */}
      <div className={`bg-white shadow-lg border border-gray-200 transition-all duration-500 ease-in-out ${
        showFilters 
          ? 'rounded-lg' 
          : 'rounded-full hover:shadow-xl cursor-pointer'
      }`}>
        
        {/* Search Bar Content - Show when filters are hidden */}
        {!showFilters && (
          <div 
            onClick={() => setShowFilters(true)}
            className="relative flex items-center opacity-100 transform translate-y-0 transition-all duration-300 ease-out"
          >
            <input
              type="text"
              placeholder={placeholder}
              className="block w-full px-6 py-4 text-lg border-none rounded-full focus:outline-none bg-transparent cursor-pointer text-center text-black font-medium placeholder-black transition-all duration-300"
              readOnly
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
              <button className="bg-primary-500 text-white p-3 rounded-full hover:bg-primary-600 transition-all duration-200">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Search Modal Content - Show when filters are visible */}
        {showFilters && (
          <div className="animate-slide-in">
          {/* Header */}
          <div className="relative flex items-center justify-center p-6 border-b">
            <h2 className="text-xl font-semibold text-black">Search Properties</h2>
            <button 
              onClick={() => setShowFilters(false)}
              className="absolute right-6 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Filter Content */}
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-700 text-sm"
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
              <h3 className="text-sm font-medium text-gray-700 mb-3">Price range</h3>
              <div className="grid grid-cols-2 gap-4">
                <CustomSelect
                  value={filters.priceMin}
                  onChange={(value) => setFilters(prev => ({ ...prev, priceMin: value }))}
                  options={priceOptions}
                  placeholder="Min price"
                />
                <CustomSelect
                  value={filters.priceMax}
                  onChange={(value) => setFilters(prev => ({ ...prev, priceMax: value }))}
                  options={pricePriceMaxOptions}
                  placeholder="Max price"
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Bedrooms</h3>
              <div className="grid grid-cols-2 gap-4">
                <CustomSelect
                  value={filters.bedroomsMin}
                  onChange={(value) => setFilters(prev => ({ ...prev, bedroomsMin: value }))}
                  options={bedroomOptions}
                  placeholder="Min beds"
                />
                <CustomSelect
                  value={filters.bedroomsMax}
                  onChange={(value) => setFilters(prev => ({ ...prev, bedroomsMax: value }))}
                  options={bedroomMaxOptions}
                  placeholder="Max beds"
                />
              </div>
            </div>

            {/* Bathrooms */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Bathrooms</h3>
              <div className="grid grid-cols-2 gap-4">
                <CustomSelect
                  value={filters.bathroomsMin}
                  onChange={(value) => setFilters(prev => ({ ...prev, bathroomsMin: value }))}
                  options={bathroomOptions}
                  placeholder="Min baths"
                />
                <CustomSelect
                  value={filters.bathroomsMax}
                  onChange={(value) => setFilters(prev => ({ ...prev, bathroomsMax: value }))}
                  options={bathroomMaxOptions}
                  placeholder="Max baths"
                />
              </div>
            </div>

            {/* Property Type - Custom coral checkboxes */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Property type</h3>
              <div className="grid grid-cols-2 gap-3">
                {['House', 'Flat', 'Bungalow', 'Land', 'Commercial', 'Other'].map((type) => (
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
                          <Check className="h-3 w-3 text-white" />
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
                {['Freehold', 'Leasehold', 'Shared Ownership', 'Commonhold'].map((type) => (
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
                          <Check className="h-3 w-3 text-white" />
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
                      <Check className="h-3 w-3 text-white" />
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
              className="text-gray-600 hover:text-gray-800 font-medium text-sm"
            >
              Clear all
            </button>
            <button
              onClick={handleSearch}
              className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors flex items-center text-sm"
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </button>
          </div>
        </div>
        )}
      </div>
    </div>
    </>
  );
} 