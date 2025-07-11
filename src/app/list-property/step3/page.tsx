'use client'

import { useState, useEffect } from 'react'

export default function ListPropertyStep3() {
  const [formData, setFormData] = useState({
    price: ''
  })

  useEffect(() => {
    // Component mounted - could load previous steps data if needed for validation
  }, [])

  const isFormValid = () => {
    return formData.price && parseFloat(formData.price) > 0
  }

  const handleBack = () => {
    // Save current data
    sessionStorage.setItem('propertyFormStep3', JSON.stringify(formData))
    window.location.href = '/list-property/step2'
  }

  const handleReview = () => {
    if (isFormValid()) {
      // Store form data in sessionStorage
      sessionStorage.setItem('propertyFormStep3', JSON.stringify(formData))
      // Navigate to review page
      window.location.href = '/list-property/review'
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
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">1</span>
              </div>
              <span className="ml-2 text-sm font-medium text-green-600">Property Details</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">2</span>
              </div>
              <span className="ml-2 text-sm font-medium text-green-600">Photos</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">3</span>
              </div>
              <span className="ml-2 text-sm font-medium text-pink-600">Pricing</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Set your asking price
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Price your property competitively to attract buyers
          </p>

          {/* Pricing Section */}
          <div className="bg-purple-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Asking price
            </h3>

            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-semibold">
                £
              </span>
              <input
                type="number"
                placeholder="350,000"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="w-full pl-8 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-lg"
                min="0"
                step="1000"
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <button
              onClick={handleBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors w-full md:w-auto"
            >
              ← Back
            </button>
            
            <button
              onClick={handleReview}
              disabled={!isFormValid()}
              className={`px-8 py-4 rounded-lg text-lg font-semibold transition-colors w-full md:w-auto ${
                isFormValid()
                  ? 'bg-pink-600 text-white hover:bg-pink-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Review Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 