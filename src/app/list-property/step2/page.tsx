'use client'

import { useState, useEffect } from 'react'
import { Camera, Upload, Plus } from 'lucide-react'
import Header from '@/components/Header'
import Image from 'next/image'

// IndexedDB helper functions
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
      if (!db.objectStoreNames.contains('floorPlan')) {
        db.createObjectStore('floorPlan', { keyPath: 'id' })
      }
    }
  })
}

const storeImageInDB = async (imageData: {base64: string, name: string, type: string}, storeName: string = 'images'): Promise<string> => {
  const db = await initDB()
  const transaction = db.transaction([storeName], 'readwrite')
  const store = transaction.objectStore(storeName)
  
  const id = `${storeName}_${Date.now()}_${Math.random().toString(36).substring(2)}`
  await store.put({ id, ...imageData, timestamp: Date.now() })
  
  return id
}

const getImagesFromDB = async (storeName: string = 'images'): Promise<Array<{id: string, base64: string, name: string, type: string}>> => {
  const db = await initDB()
  const transaction = db.transaction([storeName], 'readonly')
  const store = transaction.objectStore(storeName)
  
  return new Promise((resolve, reject) => {
    const request = store.getAll()
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

const removeImageFromDB = async (id: string, storeName: string = 'images'): Promise<void> => {
  const db = await initDB()
  const transaction = db.transaction([storeName], 'readwrite')
  const store = transaction.objectStore(storeName)
  await store.delete(id)
}

export default function ListPropertyStep2() {
  const [formData, setFormData] = useState({
    description: '',
    imagePreviewUrls: [] as string[],
    imageIds: [] as string[],
    floorPlanUrl: '',
    floorPlanId: '',
    imageCount: 0
  })

  useEffect(() => {
    loadExistingImages()
  }, [])

  const loadExistingImages = async () => {
    try {
      const images = await getImagesFromDB('images')
      const floorPlans = await getImagesFromDB('floorPlan')
      
      if (images.length > 0) {
        const urls = images.map(img => img.base64)
        const ids = images.map(img => img.id)
        setFormData(prev => ({
          ...prev,
          imagePreviewUrls: urls,
          imageIds: ids,
          imageCount: urls.length
        }))
      }

      if (floorPlans.length > 0) {
        setFormData(prev => ({
          ...prev,
          floorPlanUrl: floorPlans[0].base64,
          floorPlanId: floorPlans[0].id
        }))
      }
    } catch (error) {
      console.error('Error loading images:', error)
    }
  }

  const compressImage = (file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<{base64: string, name: string, type: string}> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new window.Image()
      
      img.onload = () => {
        let { width, height } = img
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
        
        canvas.width = width
        canvas.height = height
        
        ctx?.drawImage(img, 0, 0, width, height)
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality)
        
        resolve({
          base64: compressedBase64,
          name: file.name,
          type: 'image/jpeg'
        })
      }
      
      img.onerror = () => reject(new Error(`Failed to load image: ${file.name}`))
      img.src = URL.createObjectURL(file)
    })
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const newFiles = Array.from(files)
      
      try {
        const imageStoragePromises = newFiles.map(file => 
          compressImage(file).then(compressedImage => 
            storeImageInDB(compressedImage, 'images')
          )
        )
        
        const newImageIds = await Promise.all(imageStoragePromises)
        const newPreviewUrls = await Promise.all(
          newFiles.map(file => {
            return new Promise<string>((resolve) => {
              const reader = new FileReader()
              reader.onload = (e) => resolve(e.target?.result as string)
              reader.readAsDataURL(file)
            })
          })
        )
        
        setFormData(prev => ({
          ...prev,
          imagePreviewUrls: [...prev.imagePreviewUrls, ...newPreviewUrls],
          imageIds: [...prev.imageIds, ...newImageIds],
          imageCount: prev.imageCount + newFiles.length
        }))
      } catch (error) {
        console.error('Error uploading images:', error)
      }
    }
  }

  const handleFloorPlanUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        // Remove existing floor plan
        if (formData.floorPlanId) {
          await removeImageFromDB(formData.floorPlanId, 'floorPlan')
        }

        const compressedImage = await compressImage(file)
        const floorPlanId = await storeImageInDB(compressedImage, 'floorPlan')
        
        const reader = new FileReader()
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            floorPlanUrl: e.target?.result as string,
            floorPlanId
          }))
        }
        reader.readAsDataURL(file)
      } catch (error) {
        console.error('Error uploading floor plan:', error)
      }
    }
  }

  const removeImage = async (index: number) => {
    try {
      const imageId = formData.imageIds[index]
      if (imageId) {
        await removeImageFromDB(imageId, 'images')
      }
      
      setFormData(prev => ({
        ...prev,
        imagePreviewUrls: prev.imagePreviewUrls.filter((_, i) => i !== index),
        imageIds: prev.imageIds.filter((_, i) => i !== index),
        imageCount: prev.imageCount - 1
      }))
    } catch (error) {
      console.error('Error removing image:', error)
    }
  }

  const isFormValid = () => {
    return formData.imagePreviewUrls.length > 0 && formData.description.trim()
  }

  const handleContinue = () => {
    if (isFormValid()) {
      sessionStorage.setItem('propertyFormStep2', JSON.stringify(formData))
      window.location.href = '/list-property/step3'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-6 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6">
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
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center sm:w-8 sm:h-8">
                <span className="text-gray-600 font-semibold text-xs sm:text-sm">3</span>
              </div>
              <span className="ml-2 text-sm text-gray-500 sm:text-base">Set Your Price</span>
            </div>
          </div>
        </div>

        {/* Upload Photos Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 lg:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-2 text-center lg:text-xl lg:mb-3">
            Upload your property photos
          </h2>
          <p className="text-gray-500 mb-6 text-center text-sm lg:text-base lg:mb-8">
            Good photos will help attract more buyers
          </p>

          {/* Main Upload Button */}
          <div className="mb-6 lg:mb-8">
            <label className="block">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="bg-primary-500 text-white px-6 py-3 rounded-full text-center font-semibold cursor-pointer hover:bg-primary-600 transition-colors flex items-center justify-center lg:px-8 lg:py-4 lg:text-lg">
                <Camera className="w-5 h-5 mr-2 lg:w-6 lg:h-6" />
                Upload Photos
              </div>
            </label>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {formData.imagePreviewUrls.map((url, index) => (
              <div key={index} className="relative aspect-square bg-white rounded-2xl border border-gray-300 overflow-hidden">
                <Image
                  src={url}
                  alt={`Property photo ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 lg:w-8 lg:h-8 lg:text-base"
                >
                  ×
                </button>
              </div>
            ))}
            
            {/* Empty slots */}
            {Array.from({ length: Math.max(0, 4 - formData.imagePreviewUrls.length) }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square bg-white rounded-2xl border border-gray-300 flex flex-col items-center justify-center">
                {index === 3 && formData.imagePreviewUrls.length >= 3 ? (
                  <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="text-4xl text-gray-400 mb-2 lg:text-5xl">+</div>
                    <span className="text-gray-400 text-sm font-medium lg:text-base">Add more</span>
                  </label>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-4xl text-gray-300 mb-2 lg:text-5xl">+</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Floor Plan Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 lg:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 text-center lg:text-xl lg:mb-6">
            Upload floor plan
          </h2>
          
          <div className="mb-6">
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={handleFloorPlanUpload}
                className="hidden"
              />
              <div className="bg-primary-500 text-white px-6 py-3 rounded-full text-center font-semibold cursor-pointer hover:bg-primary-600 transition-colors flex items-center justify-center">
                <Upload className="w-5 h-5 mr-2" />
                Upload Floor Plan
              </div>
            </label>
          </div>
          
          <p className="text-gray-500 text-center text-sm mb-4">
            Uploading a floor plan is optional, but recommended
          </p>

          {formData.floorPlanUrl && (
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={formData.floorPlanUrl}
                alt="Floor plan"
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>

        {/* Property Description */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 lg:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 text-center lg:text-xl lg:mb-6">
            Property description
          </h2>
          
          <textarea
            placeholder="Describe your property's best features, location benefits, recent improvements ..."
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none h-32"
            rows={6}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-8">
          <button
            onClick={() => window.history.back()}
            className="flex-1 bg-white text-gray-700 border border-gray-300 px-6 py-4 rounded-full text-base font-semibold hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            disabled={!isFormValid()}
            className="flex-1 bg-primary-500 text-white px-6 py-4 rounded-full text-base font-semibold hover:bg-primary-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Continue to Pricing
          </button>
        </div>
      </div>
    </div>
  )
}