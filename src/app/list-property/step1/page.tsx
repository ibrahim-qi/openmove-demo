'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const PROPERTY_TYPES = [
  'House', 'Flat', 'Bungalow', 'Maisonette', 'Terraced House', 
  'Semi-Detached House', 'Detached House', 'Cottage', 'End of Terrace House'
]

const BEDROOM_OPTIONS = ['1', '2', '3', '4', '5', '6+']
const BATHROOM_OPTIONS = ['1', '2', '3', '4', '5+']

const STANDARD_FEATURES = [
  'Garden', 'Off-street parking', 'Garage', 'Driveway', 'Balcony', 'Terrace',
  'Fireplace', 'Central heating', 'Double glazing', 'Air conditioning',
  'Modern kitchen', 'Utility room', 'Pantry', 'Wine cellar', 'En-suite bathroom',
  'Family bathroom', 'Downstairs cloakroom', 'Walk-in wardrobe', 'Built-in wardrobes',
  'Loft storage', 'Basement', 'Swimming pool', 'Hot tub', 'Gym', 'Home office',
  'Study room', 'Playroom', 'Games room', 'Cinema room', 'Conservatory',
  'Patio', 'Decking', 'Summer house', 'Shed', 'Workshop', 'Electric car charging point',
  'Solar panels', 'Wood burning stove', 'Underfloor heating', 'Alarm system',
  'CCTV', 'Intercom system', 'Lift access', 'Disabled access', 'Sea view',
  'River view', 'Period features', 'High ceilings', 'Recently renovated'
]

export default function ListPropertyStep1() {
  const [formData, setFormData] = useState({
    listing_type: 'sale' as 'sale' | 'rent',
    title: '',
    type: '',
    property_name: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    postcode: '',
    bedrooms: '',
    bathrooms: '',
    floor_area: '',
    features: [] as string[],
    custom_features: [] as string[],
    custom_feature_input: ''
  })

  const [showPropertyTypes, setShowPropertyTypes] = useState(false)
  const [showBedrooms, setShowBedrooms] = useState(false)
  const [showBathrooms, setShowBathrooms] = useState(false)

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const handleAddCustomFeature = () => {
    if (formData.custom_feature_input.trim()) {
      setFormData(prev => ({
        ...prev,
        custom_features: [...prev.custom_features, prev.custom_feature_input.trim()],
        custom_feature_input: ''
      }))
    }
  }

  const handleRemoveCustomFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      custom_features: prev.custom_features.filter((_, i) => i !== index)
    }))
  }

  const isFormValid = () => {
    return formData.title.trim() && 
           formData.type && 
           formData.address_line_1.trim() && 
           formData.city.trim() && 
           formData.postcode.trim() &&
           formData.bedrooms &&
           formData.bathrooms &&
           formData.floor_area
  }

  const handleContinue = () => {
    if (isFormValid()) {
      // Store form data in sessionStorage for now
      sessionStorage.setItem('propertyFormStep1', JSON.stringify(formData))
      // Navigate to step 2
      window.location.href = '/list-property/step2'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            List Your Property
          </h1>
          
          {/* Progress indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:space-x-4 mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">1</span>
              </div>
              <span className="ml-2 text-sm font-medium text-pink-600">Property Details</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-sm">2</span>
              </div>
              <span className="ml-2 text-sm text-gray-500">Photos</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-sm">3</span>
              </div>
              <span className="ml-2 text-sm text-gray-500">Pricing</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Tell us about your property
          </h2>

          {/* Property Type Selection */}
          <div className="bg-purple-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Is your property...
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4">
              <button
                onClick={() => setFormData(prev => ({ ...prev, listing_type: 'sale' }))}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors flex-1 ${
                  formData.listing_type === 'sale'
                    ? 'bg-pink-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                For Sale
              </button>
              <button
                onClick={() => setFormData(prev => ({ ...prev, listing_type: 'rent' }))}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors flex-1 ${
                  formData.listing_type === 'rent'
                    ? 'bg-pink-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                To Rent
              </button>
            </div>
          </div>

          {/* Property Title */}
          <div className="bg-purple-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Give your property a catchy title
            </h3>
            <p className="text-gray-600 mb-4">
              What would make someone excited to view your home?
            </p>
            <input
              type="text"
              placeholder="e.g. Stunning Victorian Family Home"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          {/* Property Type */}
          <div className="bg-purple-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What type of property do you have?
            </h3>
            <p className="text-gray-600 mb-4">
              Help buyers understand your home&apos;s style
            </p>
            <div className="relative">
              <button
                onClick={() => setShowPropertyTypes(!showPropertyTypes)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              >
                <span className={formData.type ? 'text-gray-900' : 'text-gray-500'}>
                  {formData.type || 'Choose your property type'}
                </span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </button>
              {showPropertyTypes && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {PROPERTY_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, type }))
                        setShowPropertyTypes(false)
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="bg-purple-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Where is your property located?
            </h3>
            <p className="text-gray-600 mb-4">
              Help buyer find your property
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Does your property have a name or number? <span className="text-gray-500">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rose Cottage or Apartment 5B"
                  value={formData.property_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, property_name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
                <p className="text-sm text-gray-500 italic mt-1">
                  Don&apos;t worry - you can leave this empty if you prefer
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What&apos;s your street name? (address line 1) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Main Street"
                  value={formData.address_line_1}
                  onChange={(e) => setFormData(prev => ({ ...prev, address_line_1: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Where&apos;s your street located? (address line 2) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Broadway"
                  value={formData.address_line_2}
                  onChange={(e) => setFormData(prev => ({ ...prev, address_line_2: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Which city or town? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. London"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What&apos;s your postcode? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SW1A 1AA"
                    value={formData.postcode}
                    onChange={(e) => setFormData(prev => ({ ...prev, postcode: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Room Details */}
          <div className="bg-purple-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Let&apos;s talk about the space
            </h3>
            <p className="text-gray-600 mb-4">
              Tell us about the rooms and size
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How many bedrooms?
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowBedrooms(!showBedrooms)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <span className={formData.bedrooms ? 'text-gray-900' : 'text-gray-500'}>
                      {formData.bedrooms || 'Choose bedrooms'}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </button>
                  {showBedrooms && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                      {BEDROOM_OPTIONS.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setFormData(prev => ({ ...prev, bedrooms: option }))
                            setShowBedrooms(false)
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How many bathrooms?
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowBathrooms(!showBathrooms)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <span className={formData.bathrooms ? 'text-gray-900' : 'text-gray-500'}>
                      {formData.bathrooms || 'Choose bathrooms'}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </button>
                  {showBathrooms && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                      {BATHROOM_OPTIONS.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setFormData(prev => ({ ...prev, bathrooms: option }))
                            setShowBathrooms(false)
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Floor area (sqm)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 120"
                  value={formData.floor_area}
                  onChange={(e) => setFormData(prev => ({ ...prev, floor_area: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Try and be as accurate as you can
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-purple-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What features does your property have?
            </h3>
            <p className="text-gray-600 mb-4">
              Select all the features that apply to your property
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {STANDARD_FEATURES.map((feature) => (
                <button
                  key={feature}
                  onClick={() => handleFeatureToggle(feature)}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                    formData.features.includes(feature)
                      ? 'bg-pink-600 text-white border-pink-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>

            {/* Custom Features */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-2">
                Add Your Own Feature
              </h4>
              <p className="text-gray-600 mb-3 text-sm">
                Add unique features that make your property special
              </p>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="e.g. Wine cellar"
                  value={formData.custom_feature_input}
                  onChange={(e) => setFormData(prev => ({ ...prev, custom_feature_input: e.target.value }))}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCustomFeature()}
                />
                <button
                  onClick={handleAddCustomFeature}
                  className="px-6 py-3 bg-pink-200 text-pink-800 rounded-lg font-medium hover:bg-pink-300 transition-colors"
                >
                  Add Feature
                </button>
              </div>
              
              {/* Display custom features */}
              {formData.custom_features.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {formData.custom_features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-pink-100 text-pink-800"
                    >
                      {feature}
                      <button
                        onClick={() => handleRemoveCustomFeature(index)}
                        className="ml-2 text-pink-600 hover:text-pink-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <p className="text-gray-500 mb-4">
              Fill in the required fields and you&apos;ll be ready for the next step
            </p>
            <button
              onClick={handleContinue}
              disabled={!isFormValid()}
              className={`px-8 py-4 rounded-lg text-lg font-semibold transition-colors ${
                isFormValid()
                  ? 'bg-pink-600 text-white hover:bg-pink-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Photos & Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 