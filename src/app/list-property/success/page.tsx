'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { CheckCircle, Share, MapPin, Bed, Bath, Square } from 'lucide-react'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

function SuccessContent() {
  const searchParams = useSearchParams()
  const propertyId = searchParams.get('id')
  const [property, setProperty] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (propertyId) {
      fetchProperty()
    }
  }, [propertyId])

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .single()

      if (error) {
        console.error('Error fetching property:', error)
        return
      }

      setProperty(data)
    } catch (error) {
      console.error('Error fetching property:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleShareProperty = () => {
    if (!property) return;
    
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.origin + `/property/${property.id}`
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.origin + `/property/${property.id}`)
      alert('Property link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Property not found.</p>
          <Link href="/" className="text-pink-600 hover:text-pink-700 mt-2 inline-block">
            Go back to home
          </Link>
        </div>
      </div>
    )
  }

  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(property.price)

  const fullAddress = [
    property.property_name,
    property.address_line_1,
    property.address_line_2,
    property.city,
    property.postcode
  ].filter(Boolean).join(', ')

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-pink-600 mb-4">
            Your property has been listed!
          </h1>
          <p className="text-xl text-gray-600">
            View your property below or share on socials
          </p>
        </div>

        {/* Property Preview */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          {/* Image Gallery */}
          <div className="relative h-64 bg-gray-200">
            {property.images && property.images.length > 0 ? (
              <img 
                src={property.images[0]} 
                alt="Property"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No Image Available
              </div>
            )}
            <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              New Listing
            </div>
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
              Property listed successfully!
            </div>
          </div>

          {/* Property Details */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-bold text-gray-900">
                {formattedPrice}
              </h3>
            </div>
            
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {property.title}
            </h4>
            
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{fullAddress}</span>
            </div>
            
            <div className="flex items-center space-x-4 text-gray-600 mb-4">
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.bedrooms} beds</span>
              </div>
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.bathrooms} baths</span>
              </div>
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.floor_area} sqm</span>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                New Listing
              </span>
              <span className="text-xs text-gray-500 ml-2">Listed today</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleShareProperty}
            className="flex items-center px-6 py-3 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
          >
            <Share className="w-5 h-5 mr-2" />
            Share Property
          </button>
          
          <Link
            href="/"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back to Home
          </Link>
          
          <Link
            href={`/property/${property.id}`}
            className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            Go to Listing
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ListPropertySuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
} 