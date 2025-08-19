'use client'

import Link from 'next/link'
import Header from '@/components/Header'

export default function ListPropertyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-2xl font-bold text-black mb-4 sm:text-3xl lg:text-4xl">
              List Your Property
            </h1>
            <p className="text-base text-black sm:text-lg lg:text-xl max-w-2xl mx-auto">
              List your property in just 3 simple steps
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4 mb-12 lg:mb-16 lg:space-y-6">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 lg:p-8 hover:shadow-lg transition-shadow relative">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center absolute top-4 left-4">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <div className="text-center pt-4">
                <h3 className="text-lg font-bold text-black mb-3 lg:text-xl">
                  Property Details
                </h3>
                <p className="text-black text-sm leading-relaxed lg:text-base">
                  Tell us about your property - location, size, features and more
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 lg:p-8 hover:shadow-lg transition-shadow relative">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center absolute top-4 left-4">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <div className="text-center pt-4">
                <h3 className="text-lg font-bold text-black mb-3 lg:text-xl">
                  Add Photos
                </h3>
                <p className="text-black text-sm leading-relaxed lg:text-base">
                  Upload photos to showcase your property (you can add more at any time)
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 lg:p-8 hover:shadow-lg transition-shadow relative">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center absolute top-4 left-4">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <div className="text-center pt-4">
                <h3 className="text-lg font-bold text-black mb-3 lg:text-xl">
                  Set Your Price
                </h3>
                <p className="text-black text-sm leading-relaxed lg:text-base">
                  Set your asking price and list!
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link
              href="/list-property/step1"
              className="bg-primary-500 text-white px-6 py-3 rounded-2xl text-base font-semibold hover:bg-primary-600 transition-all duration-200 shadow-lg inline-block"
            >
              Start Listing Your Property
            </Link>
            <p className="text-black mt-4 text-sm lg:text-base lg:mt-6">
              It only takes a few minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 