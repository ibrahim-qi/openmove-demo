'use client'

import Link from 'next/link'
import { Home, Camera, PoundSterling } from 'lucide-react'

export default function ListPropertyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            List Your Property
          </h1>
          <p className="text-xl text-gray-600">
            List your property in just 3 simple steps
          </p>
        </div>

        {/* How it works */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            How it works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <div className="flex items-center justify-center mb-4">
                <Home className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Property Details
              </h3>
              <p className="text-gray-600">
                Tell us about your property - location, size, features and more
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <div className="flex items-center justify-center mb-4">
                <Camera className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Add Photos
              </h3>
              <p className="text-gray-600">
                Upload photos and videos to showcase your property (you can add more at any time)
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <div className="flex items-center justify-center mb-4">
                <PoundSterling className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Set Your Price
              </h3>
              <p className="text-gray-600">
                Choose your asking price and listing preferences
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/list-property/step1"
            className="bg-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-pink-700 transition-colors inline-block"
          >
            Start Listing Your Property
          </Link>
          <p className="text-gray-500 mt-4">
            It only takes a few minutes
          </p>
        </div>
      </div>
    </div>
  )
} 