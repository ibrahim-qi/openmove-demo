'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Header from '@/components/Header'

const PROPERTY_TYPES = [
  'House', 'Flat', 'Bungalow', 'Maisonette', 'Terraced House', 
  'Semi-Detached House', 'Detached House', 'Cottage', 'End of Terrace House'
]

const STANDARD_FEATURES = [
  'Garden', 'Off-street parking', 'Garage', 'Driveway', 
  'Central heating', 'Double glazing', 'Fireplace', 'Utility room',
  'En-suite', 'Downstairs toilet', 'Family bathroom', 'Walk-in wardrobe',
  'Home office', 'Built-in wardrobes', 'Loft storage', 'Outside tap',
  'Basement', 'Playroom', 'Gym', 'Games room',
  'Conservatory', 'Dining room', 'Patio', 'Shed',
  'EV charging point', 'Solar panels'
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

  const BEDROOM_OPTIONS = ['1', '2', '3', '4', '5', '6+']
  const BATHROOM_OPTIONS = ['1', '2', '3', '4', '5+']

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
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-6 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-4 sm:text-2xl">
            List Your Property
          </h1>
          
          {/* Progress indicators */}
          <div className="flex items-center justify-center space-x-6 sm:space-x-8 mb-8">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center sm:w-6 sm:h-6">
                <span className="text-white font-semibold text-xs">1</span>
              </div>
              <span className="ml-2 text-sm font-medium text-black sm:text-base">Property Details</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center sm:w-6 sm:h-6">
                <span className="text-gray-600 font-semibold text-xs">2</span>
              </div>
              <span className="ml-2 text-sm text-gray-500 sm:text-base">Photos</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center sm:w-6 sm:h-6">
                <span className="text-gray-600 font-semibold text-xs">3</span>
              </div>
              <span className="ml-2 text-sm text-gray-500 sm:text-base">Set Your Price</span>
            </div>
          </div>
        </div>

        {/* Is your property section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6 lg:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center lg:text-xl lg:mb-6">
            Is your property...
          </h3>
          <div className="flex gap-3">
            <button
              onClick={() => setFormData(prev => ({ ...prev, listing_type: 'sale' }))}
              className={`px-6 py-3 rounded-2xl font-semibold transition-colors flex-1 ${
                formData.listing_type === 'sale'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              For Sale
            </button>
            <button
              onClick={() => setFormData(prev => ({ ...prev, listing_type: 'rent' }))}
              className={`px-6 py-3 rounded-2xl font-semibold transition-colors flex-1 ${
                formData.listing_type === 'rent'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              To Rent
            </button>
          </div>
        </div>

        {/* Property Title */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6 lg:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center lg:text-xl lg:mb-6">
            Give your property a catchy title
          </h3>
          <input
            type="text"
            placeholder="e.g Stunning 3-Bedroom Cottage"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-primary-500 text-center text-gray-600"
          />
        </div>

        {/* Property Type */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6 lg:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center lg:text-xl lg:mb-6">
            What type of property do you have?
          </h3>
          <div className="relative">
            <button
              onClick={() => setShowPropertyTypes(!showPropertyTypes)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl bg-white text-center flex items-center justify-center focus:outline-none focus:border-primary-500 text-gray-500"
            >
              <span>{formData.type || 'Choose your property type'}</span>
              <ChevronDown className="w-4 h-4 ml-2" />
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
                    className="w-full px-4 py-3 text-center hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6 lg:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6 text-center lg:text-xl lg:mb-8">
            Where is your property located?
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-medium text-gray-900 mb-3 text-center">
                Does your property have a name or number? (Optional)
              </h4>
              <input
                type="text"
                placeholder="e.g 10, Rose Cottage or Apartment 5B"
                value={formData.property_name}
                onChange={(e) => setFormData(prev => ({ ...prev, property_name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-primary-500 text-center text-gray-600"
              />
            </div>

            <div>
              <h4 className="text-base font-medium text-gray-900 mb-3 text-center">
                What&apos;s your street name? (address line 1)
              </h4>
              <input
                type="text"
                placeholder="e.g. Downing Street"
                value={formData.address_line_1}
                onChange={(e) => setFormData(prev => ({ ...prev, address_line_1: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-primary-500 text-center text-gray-600"
              />
            </div>

            <div>
              <h4 className="text-base font-medium text-gray-900 mb-3 text-center">
                Where&apos;s your street located? (address line 2)
              </h4>
              <input
                type="text"
                placeholder="e.g. Broadway"
                value={formData.address_line_2}
                onChange={(e) => setFormData(prev => ({ ...prev, address_line_2: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-primary-500 text-center text-gray-600"
              />
            </div>

            <div>
              <h4 className="text-base font-medium text-gray-900 mb-3 text-center">
                Which City or Town?
              </h4>
              <input
                type="text"
                placeholder="e.g. London"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-primary-500 text-center text-gray-600"
              />
            </div>

            <div>
              <h4 className="text-base font-medium text-gray-900 mb-3 text-center">
                What&apos;s your postcode?
              </h4>
              <input
                type="text"
                placeholder="e.g. SW1A 2AA"
                value={formData.postcode}
                onChange={(e) => setFormData(prev => ({ ...prev, postcode: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-primary-500 text-center text-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Space Details */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6 lg:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6 text-center lg:text-xl lg:mb-8">
            Let&apos;s talk about the space
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-medium text-gray-900 mb-3 text-center">
                How many bedrooms?
              </h4>
              <div className="relative">
                <button
                  onClick={() => setShowBedrooms(!showBedrooms)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl bg-white text-center flex items-center justify-center focus:outline-none focus:border-primary-500 text-gray-500"
                >
                  <span>{formData.bedrooms || 'Choose bedrooms'}</span>
                  <ChevronDown className="w-4 h-4 ml-2" />
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
                        className="w-full px-4 py-3 text-center hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-base font-medium text-gray-900 mb-3 text-center">
                How many bathrooms?
              </h4>
              <div className="relative">
                <button
                  onClick={() => setShowBathrooms(!showBathrooms)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl bg-white text-center flex items-center justify-center focus:outline-none focus:border-primary-500 text-gray-500"
                >
                  <span>{formData.bathrooms || 'Choose bathrooms'}</span>
                  <ChevronDown className="w-4 h-4 ml-2" />
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
                        className="w-full px-4 py-3 text-center hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-base font-medium text-gray-900 mb-3 text-center">
                What&apos;s the floor area? (sqm)
              </h4>
              <input
                type="number"
                placeholder="e.g. 100"
                value={formData.floor_area}
                onChange={(e) => setFormData(prev => ({ ...prev, floor_area: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-primary-500 text-center text-gray-600"
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                Try and be as accurate as you can
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-8 lg:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-2 text-center lg:text-xl lg:mb-4">
            What features does your property have?
          </h3>
          <p className="text-gray-500 mb-6 text-center text-sm lg:text-base lg:mb-8">
            Select all the features that apply to your property
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
            {STANDARD_FEATURES.map((feature) => (
              <button
                key={feature}
                onClick={() => handleFeatureToggle(feature)}
                className={`px-4 py-3 rounded-2xl border text-sm font-medium transition-colors ${
                  formData.features.includes(feature)
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                {feature}
              </button>
            ))}
          </div>

          {/* Add your own features */}
          <div className="mb-6">
            <h4 className="text-base font-semibold text-gray-900 mb-4 text-center">
              Add your own features
            </h4>
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="e.g. South facing garden"
                value={formData.custom_feature_input}
                onChange={(e) => setFormData(prev => ({ ...prev, custom_feature_input: e.target.value }))}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-primary-500 text-center text-gray-600"
                onKeyPress={(e) => e.key === 'Enter' && handleAddCustomFeature()}
              />
              <button
                onClick={handleAddCustomFeature}
                disabled={!formData.custom_feature_input.trim()}
                className="px-3 py-2 bg-primary-500 text-white rounded-2xl font-semibold hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
              >
                Add feature
              </button>
            </div>

            {/* Display custom features */}
            {formData.custom_features.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
                {formData.custom_features.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => handleRemoveCustomFeature(index)}
                    className="px-4 py-3 rounded-2xl border bg-primary-500 text-white border-primary-500 text-sm font-medium flex items-center justify-center"
                  >
                    {feature}
                    <span className="ml-2">×</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-8">
          <button
            onClick={() => window.history.back()}
            className="flex-1 bg-white text-gray-700 border border-gray-300 px-4 py-2.5 rounded-2xl text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            disabled={!isFormValid()}
            className="flex-1 bg-primary-500 text-white px-4 py-2.5 rounded-2xl text-sm font-semibold hover:bg-primary-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Continue to Photos
          </button>
        </div>
      </div>
    </div>
  )
}