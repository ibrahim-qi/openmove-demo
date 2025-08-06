'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'

export default function ListPropertyStep3() {
  const [formData, setFormData] = useState({
    price: ''
  })

  useEffect(() => {
    // Load any existing data
    const savedData = sessionStorage.getItem('propertyFormStep3')
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
  }, [])

  const isFormValid = () => {
    return formData.price && parseFloat(formData.price) > 0
  }

  const handleBack = () => {
    sessionStorage.setItem('propertyFormStep3', JSON.stringify(formData))
    window.location.href = '/list-property/step2'
  }

  const handlePreviewListing = () => {
    if (isFormValid()) {
      sessionStorage.setItem('propertyFormStep3', JSON.stringify(formData))
      window.location.href = '/list-property/review'
    }
  }

  const formatPrice = (value: string) => {
    // Remove non-digits
    const numbers = value.replace(/\D/g, '')
    
    // Format with commas
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formattedValue = formatPrice(value)
    setFormData(prev => ({ ...prev, price: formattedValue }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-6 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-gray-900 mb-4 sm:text-2xl">
            List Your Property
          </h1>
          
          {/* Progress indicators */}
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-8">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center sm:w-8 sm:h-8">
                <span className="text-white font-semibold text-xs sm:text-sm">1</span>
              </div>
              <span className="ml-2 text-sm font-medium text-primary-500 sm:text-base">Property Details</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center sm:w-8 sm:h-8">
                <span className="text-white font-semibold text-xs sm:text-sm">2</span>
              </div>
              <span className="ml-2 text-sm font-medium text-primary-500 sm:text-base">Photos</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center sm:w-8 sm:h-8">
                <span className="text-white font-semibold text-xs sm:text-sm">3</span>
              </div>
              <span className="ml-2 text-sm font-medium text-primary-500 sm:text-base">Set Your Price</span>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-12">
          <h2 className="text-lg font-bold text-gray-900 mb-8 text-center">
            Choose an asking price
          </h2>

          <div className="mb-8">
            <div className="relative">
              <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-900 text-xl font-semibold">
                £
              </span>
              <input
                type="text"
                placeholder="400,000"
                value={formData.price}
                onChange={handlePriceChange}
                className="w-full pl-12 pr-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-xl font-semibold text-center text-gray-900 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-8">
          <button
            onClick={handleBack}
            className="flex-1 bg-white text-gray-700 border border-gray-300 px-6 py-4 rounded-full text-base font-semibold hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handlePreviewListing}
            disabled={!isFormValid()}
            className="flex-1 bg-primary-500 text-white px-6 py-4 rounded-full text-base font-semibold hover:bg-primary-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Preview Listing
          </button>
        </div>
      </div>
    </div>
  )
}