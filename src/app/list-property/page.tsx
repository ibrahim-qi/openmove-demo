'use client'

import Link from 'next/link'
import Header from '@/components/Header'

export default function ListPropertyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:text-3xl lg:text-4xl">
              List Your Property
            </h1>
            <p className="text-base text-gray-600 sm:text-lg lg:text-xl max-w-2xl mx-auto">
              List your property in just 3 simple steps
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4 mb-12 lg:mb-16 lg:space-y-6">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:p-8 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4 lg:space-x-6">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 lg:w-12 lg:h-12">
                  <span className="text-white font-bold text-lg lg:text-xl">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 lg:text-xl lg:mb-3">
                    Property Details
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed lg:text-base">
                    Tell us about your property - location, size, features and more
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:p-8 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4 lg:space-x-6">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 lg:w-12 lg:h-12">
                  <span className="text-white font-bold text-lg lg:text-xl">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 lg:text-xl lg:mb-3">
                    Add Photos
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed lg:text-base">
                    Upload photos to showcase your property (you can add more at any time)
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:p-8 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4 lg:space-x-6">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 lg:w-12 lg:h-12">
                  <span className="text-white font-bold text-lg lg:text-xl">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 lg:text-xl lg:mb-3">
                    Set Your Price
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed lg:text-base">
                    Set your asking price and list!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link
              href="/list-property/step1"
              className="bg-gradient-to-r from-primary-500 to-primary-700 text-white px-10 py-4 rounded-full text-base font-semibold hover:from-primary-600 hover:to-primary-800 transition-all duration-200 shadow-lg inline-block lg:px-12 lg:py-5 lg:text-lg"
            >
              Start Listing Your Property
            </Link>
            <p className="text-gray-500 mt-4 text-sm lg:text-base lg:mt-6">
              It only takes a few minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 