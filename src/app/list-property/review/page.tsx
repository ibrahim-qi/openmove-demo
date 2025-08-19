'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react'
import Header from '@/components/Header'
import Image from 'next/image'

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
        price: parseFloat(step3Data.price.replace(/,/g, '')),
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
        </div>
      </div>
    )
  }

  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(parseFloat(step3Data.price.replace(/,/g, '')))

  const fullAddress = [
    step1Data.address_line_1,
    step1Data.city
  ].filter(Boolean).join(', ')

  const propertyType = step1Data.type
  const bedroomCount = step1Data.bedrooms
  const bathroomCount = step1Data.bathrooms
  const floorArea = step1Data.floor_area

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-6 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-gray-900 mb-4 sm:text-2xl">
            Review Your Listing
          </h1>
        </div>

        {/* Property Preview Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-8 lg:max-w-md lg:mx-auto">
          {/* Property Image */}
          <div className="relative h-64 bg-gray-200 lg:h-80">
            {isLoadingImages ? (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-2"></div>
                  <p>Loading images...</p>
                </div>
              </div>
            ) : imagePreviewUrls.length > 0 ? (
              <Image 
                src={imagePreviewUrls[0]} 
                alt="Property"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No Image Available
              </div>
            )}
            <button className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-50">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Property Details */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">
                  {bedroomCount} Bedroom
                </h3>
                <h4 className="text-lg font-bold text-gray-900 leading-tight">
                  {propertyType}
                </h4>
              </div>
              <span className="text-xl font-bold text-gray-900">{formattedPrice}</span>
            </div>
            
            <div className="flex items-center text-gray-600 mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{fullAddress}</span>
            </div>
            
            <div className="flex items-center space-x-4 text-gray-700 mb-3">
              <span className="text-sm">{bedroomCount} Beds</span>
              <span className="text-sm">{bathroomCount} Baths</span>
              <span className="text-sm">{floorArea}m2</span>
            </div>

            <div className="mb-2">
              <span className="text-sm text-gray-900">{propertyType}</span>
            </div>

            <div className="mb-4">
              <span className="text-sm text-gray-900">Freehold</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-primary-500 text-sm">Listed on 20/07/2025</span>
            </div>
          </div>
        </div>

        {/* Preview Info */}
        <div className="text-center mb-8">
          <p className="text-gray-500 text-sm">
            Click the preview to see the full listing page
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleBackToEdit}
            className="flex-1 bg-white text-gray-700 border border-gray-300 px-4 py-2.5 rounded-2xl text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handlePublishListing}
            disabled={isSubmitting}
            className="flex-1 bg-primary-500 text-white px-4 py-2.5 rounded-2xl text-sm font-semibold hover:bg-primary-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Publishing...' : 'List Property'}
          </button>
        </div>
      </div>
    </div>
  )
}