'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function ListPropertyReview() {
  const [step1Data, setStep1Data] = useState<Record<string, any> | null>(null)
  const [step2Data, setStep2Data] = useState<Record<string, any> | null>(null)
  const [step3Data, setStep3Data] = useState<Record<string, any> | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])
  const [isLoadingImages, setIsLoadingImages] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      // Load all steps data from sessionStorage
      const savedStep1 = sessionStorage.getItem('propertyFormStep1')
      const savedStep2 = sessionStorage.getItem('propertyFormStep2')
      const savedStep3 = sessionStorage.getItem('propertyFormStep3')
      
      if (savedStep1) setStep1Data(JSON.parse(savedStep1))
      if (savedStep3) setStep3Data(JSON.parse(savedStep3))
      
      if (savedStep2) {
        const step2 = JSON.parse(savedStep2)
        setStep2Data(step2)
        
        // Load images from IndexedDB and create preview URLs
        if (step2.imageIds?.length) {
          try {
            const imageData = await getImagesFromDB(step2.imageIds)
            const previewUrls = imageData.map(img => img.base64)
            setImagePreviewUrls(previewUrls)
          } catch (error) {
            console.error('Error loading images from IndexedDB:', error)
          }
        }
      }
      
      setIsLoadingImages(false)
    }
    
    loadData()
  }, [])

  const handleBackToEdit = () => {
    window.location.href = '/list-property/step3'
  }

  // IndexedDB helper functions (same as step2)
  const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('PropertyListingDB', 1)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains('images')) {
          db.createObjectStore('images', { keyPath: 'id' })
        }
      }
    })
  }

  const getImagesFromDB = async (imageIds: string[]): Promise<Array<{base64: string, name: string, type: string}>> => {
    const db = await initDB()
    const transaction = db.transaction(['images'], 'readonly')
    const store = transaction.objectStore('images')
    
    const images: Array<{base64: string, name: string, type: string}> = []
    for (const id of imageIds) {
      const request = store.get(id)
      const result = await new Promise<any>((resolve, reject) => {
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
      })
      if (result && result.base64 && result.name && result.type) {
        images.push({
          base64: result.base64,
          name: result.name,
          type: result.type
        })
      }
    }
    return images
  }

  const clearAllImagesFromDB = async (): Promise<void> => {
    const db = await initDB()
    const transaction = db.transaction(['images'], 'readwrite')
    const store = transaction.objectStore('images')
    await store.clear()
  }

  const uploadImagesToSupabase = async (imageData: Array<{base64: string, name: string, type: string}>) => {
    const uploadedUrls: string[] = []
    
    // Check if Supabase is properly configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || supabaseUrl === 'http://localhost:3000' || !supabaseKey || supabaseKey === 'dummy-key') {
      console.error('Supabase not configured properly. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
      alert('Image upload not configured. Please set up Supabase environment variables.')
      return []
    }
    
    for (const image of imageData) {
      try {
        // Convert base64 to File object
        const response = await fetch(image.base64)
        const blob = await response.blob()
        const file = new File([blob], image.name, { type: image.type })
        
        // Create unique filename
        const fileExt = image.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
        
        // Upload to Supabase storage
        const { data, error } = await supabase.storage
          .from('property-images')
          .upload(fileName, file)

        if (error) {
          console.error('Error uploading image:', error)
          console.error('Supabase config:', { 
            url: process.env.NEXT_PUBLIC_SUPABASE_URL,
            hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
          })
          // Skip this image and continue
          continue
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('property-images')
          .getPublicUrl(fileName)

        console.log('Generated public URL:', publicUrl)
        uploadedUrls.push(publicUrl)
      } catch (error) {
        console.error('Error processing image:', error)
      }
    }
    
    return uploadedUrls
  }

  const handlePublishListing = async () => {
    if (!step1Data || !step2Data || !step3Data) {
      alert('Missing form data. Please complete all steps.')
      return
    }

    setIsSubmitting(true)

    try {
      // Get images from IndexedDB and upload to Supabase storage
      let imageUrls: string[] = []
      if (step2Data.imageIds?.length) {
        const imageData = await getImagesFromDB(step2Data.imageIds)
        imageUrls = await uploadImagesToSupabase(imageData)
      }

      // Combine all form data
      const propertyData = {
        title: step1Data.title,
        type: step1Data.type,
        price: parseFloat(step3Data.price),
        listing_type: step1Data.listing_type,
        property_name: step1Data.property_name || null,
        address_line_1: step1Data.address_line_1,
        address_line_2: step1Data.address_line_2 || null,
        city: step1Data.city,
        postcode: step1Data.postcode,
        bedrooms: parseInt(step1Data.bedrooms),
        bathrooms: parseInt(step1Data.bathrooms),
        floor_area: parseInt(step1Data.floor_area),
        description: step2Data.description,
        features: step1Data.features || [],
        custom_features: step1Data.custom_features || [],
        images: imageUrls,
        property_tenure: 'Freehold'
      }

      console.log('Property data being saved:', propertyData)
      console.log('Image URLs:', imageUrls)

      // Insert into Supabase
      const { data: insertedData, error } = await supabase
        .from('properties')
        .insert([propertyData])
        .select()

      if (error) {
        console.error('Error inserting property:', error)
        alert('Failed to publish listing. Please try again.')
        return
      }

      // Clear session storage and IndexedDB
      sessionStorage.removeItem('propertyFormStep1')
      sessionStorage.removeItem('propertyFormStep2')
      sessionStorage.removeItem('propertyFormStep3')
      
      // Clear all images from IndexedDB
      await clearAllImagesFromDB()

      // Redirect to success page with property ID
      window.location.href = `/list-property/success?id=${insertedData[0].id}`

    } catch (error) {
      console.error('Error publishing listing:', error)
      alert('Failed to publish listing. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!step1Data || !step2Data || !step3Data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Loading your listing data...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(parseFloat(step3Data.price))

  const fullAddress = [
    step1Data.property_name,
    step1Data.address_line_1,
    step1Data.address_line_2,
    step1Data.city,
    step1Data.postcode
  ].filter(Boolean).join(', ')

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Review Your Listing
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Property Preview */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Image Gallery */}
            <div className="relative h-64 bg-gray-200">
              {isLoadingImages ? (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto mb-2"></div>
                    <p>Loading images...</p>
                  </div>
                </div>
              ) : imagePreviewUrls.length > 0 ? (
                <img 
                  src={imagePreviewUrls[0]} 
                  alt="Property"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}
              <button className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-50">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              {step1Data.listing_type === 'sale' && (
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  New Listing
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-gray-900">
                  {formattedPrice}
                </h3>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {step1Data.title}
              </h4>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{fullAddress}</span>
              </div>
              
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <div className="flex items-center">
                  <Bed className="w-4 h-4 mr-1" />
                  <span className="text-sm">{step1Data.bedrooms} beds</span>
                </div>
                <div className="flex items-center">
                  <Bath className="w-4 h-4 mr-1" />
                  <span className="text-sm">{step1Data.bathrooms} baths</span>
                </div>
                <div className="flex items-center">
                  <Square className="w-4 h-4 mr-1" />
                  <span className="text-sm">{step1Data.floor_area} sqm</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <span className="text-xs text-pink-600 bg-pink-50 px-2 py-1 rounded">
                  New Listing
                </span>
                <span className="text-xs text-gray-500 ml-2">Listed today</span>
              </div>
            </div>
          </div>

          {/* Preview Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-center text-gray-600 mb-6">
                This is a preview of how your property will appear to buyers
              </p>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-600">
                  {step2Data.description}
                </p>
              </div>

              {/* Features */}
              {(step1Data.features?.length > 0 || step1Data.custom_features?.length > 0) && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Features
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {step1Data.features?.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-pink-600 rounded-full mr-2"></span>
                        {feature}
                      </div>
                    ))}
                    {step1Data.custom_features?.map((feature: string, index: number) => (
                      <div key={`custom-${index}`} className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-pink-600 rounded-full mr-2"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sale Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Sale Information
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Property Tenure</span>
                    <p className="text-sm text-gray-600">Freehold</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={handleBackToEdit}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  ← Back to Edit
                </button>
                
                <button
                  onClick={handlePublishListing}
                  disabled={isSubmitting}
                  className={`px-8 py-4 rounded-lg text-lg font-semibold transition-colors ${
                    isSubmitting
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-pink-600 text-white hover:bg-pink-700'
                  }`}
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Listing'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 