'use client'

import { useState, useEffect } from 'react'
import { Camera, Upload, X } from 'lucide-react'

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
    }
  })
}

const storeImageInDB = async (imageData: {base64: string, name: string, type: string}): Promise<string> => {
  const db = await initDB()
  const transaction = db.transaction(['images'], 'readwrite')
  const store = transaction.objectStore('images')
  
  const id = `img_${Date.now()}_${Math.random().toString(36).substring(2)}`
  await store.put({ id, ...imageData, timestamp: Date.now() })
  
  return id
}

const getImagesFromDB = async (): Promise<Array<{id: string, base64: string, name: string, type: string}>> => {
  const db = await initDB()
  const transaction = db.transaction(['images'], 'readonly')
  const store = transaction.objectStore('images')
  
  return new Promise((resolve, reject) => {
    const request = store.getAll()
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

const removeImageFromDB = async (id: string): Promise<void> => {
  const db = await initDB()
  const transaction = db.transaction(['images'], 'readwrite')
  const store = transaction.objectStore('images')
  await store.delete(id)
}

const clearAllImagesFromDB = async (): Promise<void> => {
  const db = await initDB()
  const transaction = db.transaction(['images'], 'readwrite')
  const store = transaction.objectStore('images')
  await store.clear()
}

export default function ListPropertyStep2() {
  const [formData, setFormData] = useState({
    description: '',
    imagePreviewUrls: [] as string[],
    imageIds: [] as string[], // Store IndexedDB IDs instead of image data
    imageCount: 0
  })
  
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  useEffect(() => {
    // Component mounted - could load step 1 data if needed for validation
  }, [])

  const addDebugInfo = (message: string) => {
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const compressImage = (file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<{base64: string, name: string, type: string}> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
        
        canvas.width = width
        canvas.height = height
        
        // Draw and compress
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
    if (files) {
      const newFiles = Array.from(files)
      
      // Add debug info about selected files
      addDebugInfo(`📁 Selected ${newFiles.length} files`)
      newFiles.forEach((file, i) => {
        addDebugInfo(`File ${i + 1}: ${file.name} (${file.type}, ${(file.size / 1024 / 1024).toFixed(2)}MB)`)
      })
      
      const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file))
      addDebugInfo(`✅ Created ${newPreviewUrls.length} preview URLs`)
      
      // Compress and store files in IndexedDB
      addDebugInfo(`🔄 Starting image compression and IndexedDB storage...`)
      const imageStoragePromises = newFiles.map((file, index) => {
        addDebugInfo(`🔄 Compressing file ${index + 1}: ${file.name}`)
        return compressImage(file)
          .then(async (compressedImage) => {
            const originalSize = (file.size / 1024 / 1024).toFixed(2)
            const compressedSize = (compressedImage.base64.length / 1024 / 1024 * 0.75).toFixed(2)
            addDebugInfo(`✅ File ${index + 1} compressed: ${originalSize}MB → ~${compressedSize}MB`)
            
            // Store in IndexedDB
            const imageId = await storeImageInDB(compressedImage)
            addDebugInfo(`💾 File ${index + 1} stored in IndexedDB with ID: ${imageId}`)
            return imageId
          })
          .catch(error => {
            addDebugInfo(`❌ Error processing file ${index + 1} (${file.name}): ${error}`)
            throw error
          })
      })
      
      try {
        const newImageIds = await Promise.all(imageStoragePromises)
        addDebugInfo(`🎉 All ${newImageIds.length} files stored in IndexedDB successfully!`)
        
        setFormData(prev => ({
          ...prev,
          imageCount: prev.imageCount + newFiles.length,
          imagePreviewUrls: [...prev.imagePreviewUrls, ...newPreviewUrls],
          imageIds: [...prev.imageIds, ...newImageIds]
        }))
        addDebugInfo(`📊 Updated state: ${newFiles.length} new images added`)
      } catch (error) {
        addDebugInfo(`💥 Error processing files: ${error}`)
        alert('Some images failed to upload. Check debug info below for details.')
      }
    }
  }

  const removeImage = async (index: number) => {
    // Remove from IndexedDB
    const imageIdToRemove = formData.imageIds[index]
    if (imageIdToRemove) {
      try {
        await removeImageFromDB(imageIdToRemove)
        addDebugInfo(`🗑️ Removed image from IndexedDB: ${imageIdToRemove}`)
      } catch (error) {
        addDebugInfo(`❌ Error removing image from IndexedDB: ${error}`)
      }
    }
    
    // Clean up preview URL
    const urlToRevoke = formData.imagePreviewUrls[index]
    if (urlToRevoke) {
      URL.revokeObjectURL(urlToRevoke)
    }
    
    setFormData(prev => ({
      ...prev,
      imageCount: prev.imageCount - 1,
      imagePreviewUrls: prev.imagePreviewUrls.filter((_, i) => i !== index),
      imageIds: prev.imageIds.filter((_, i) => i !== index)
    }))
  }

  const isFormValid = () => {
    return formData.description.trim() && formData.imageCount >= 3
  }

  const handleBack = () => {
    // Save current data
    sessionStorage.setItem('propertyFormStep2', JSON.stringify(formData))
    window.location.href = '/list-property/step1'
  }

  const handleContinue = () => {
    const isValid = formData.description.trim() && formData.imageCount >= 3
    addDebugInfo(`🚀 Continue clicked - Images: ${formData.imageCount}, Description: ${formData.description.length} chars, Valid: ${isValid}`)
    
    if (isValid) {
      addDebugInfo(`✅ Validation passed - proceeding to step 3`)
      
      // Store lightweight form data in sessionStorage (no heavy image data)
      const step2Data = {
        description: formData.description,
        imageIds: formData.imageIds,
        imageCount: formData.imageCount
      }
      
      try {
        sessionStorage.setItem('propertyFormStep2', JSON.stringify(step2Data))
        addDebugInfo(`💾 Lightweight data saved to sessionStorage (${JSON.stringify(step2Data).length} chars)`)
      } catch (error) {
        addDebugInfo(`❌ Error saving to sessionStorage: ${error}`)
        return
      }
      
      // Navigate to step 3
      addDebugInfo(`🔄 Attempting navigation to /list-property/step3...`)
      window.location.href = '/list-property/step3'
      
    } else {
      addDebugInfo(`❌ Validation failed - cannot proceed`)
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
              <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">2</span>
              </div>
              <span className="ml-2 text-sm font-medium text-pink-600">Photos</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-sm">3</span>
              </div>
              <span className="ml-2 text-sm text-gray-500">Pricing</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Add photos, videos and a description
          </h2>

          {/* Upload Photos */}
          <div className="bg-purple-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upload your property photos
            </h3>
            <p className="text-gray-600 mb-4">
              Good photos will help you attract more buyers
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="flex items-center justify-center px-6 py-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                  <Camera className="w-5 h-5 mr-2" />
                  Upload Photos
                </div>
              </label>

              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  className="hidden"
                />
                <div className="flex items-center justify-center px-6 py-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Videos
                </div>
              </label>
            </div>
            
            <p className="text-gray-500 text-sm italic text-center">
              Uploading videos is optional
            </p>
          </div>

          {/* Image Preview Grid */}
          {formData.imagePreviewUrls.length > 0 && (
            <div className="bg-purple-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your uploaded media
              </h3>
              <p className="text-gray-600 mb-4">
                Drag and drop to reorder your images
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {formData.imagePreviewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-gray-900 bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                      Photo {index + 1}
                    </div>
                  </div>
                ))}
                
                {/* Add More Button */}
                <label className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center hover:border-pink-500 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-gray-500 text-sm">Add More</span>
                </label>
              </div>
              
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-600">
                  Media Summary: {formData.imageCount} photos, 0 videos
                </span>
              </div>
            </div>
          )}

          {/* Upload Floor Plan */}
          <div className="bg-purple-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upload floor plan
            </h3>
            <p className="text-gray-600 mb-4">
              Floor plans help buyers understand your property layout better
            </p>

            <label className="cursor-pointer block">
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
              />
              <div className="flex items-center justify-center px-6 py-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                <Upload className="w-5 h-5 mr-2" />
                Upload Floor Plan
              </div>
            </label>
            
            <p className="text-gray-500 text-sm italic text-center mt-2">
              Uploading a floor plan is optional, but recommended
            </p>
          </div>

          {/* Property Description */}
          <div className="bg-purple-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Property description
            </h3>
            <p className="text-gray-600 mb-4">
              Write a description that highlights your property&apos;s unique features and selling points
            </p>

            <textarea
              placeholder="Describe your property's best features, location benefits, recent improvements..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 h-32 resize-none"
              rows={6}
            />
          </div>

          {/* Debug Info Panel */}
          {debugInfo.length > 0 && (
            <div className="bg-gray-100 rounded-lg p-4 mb-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold text-gray-900">
                  🔍 Debug Info (for troubleshooting)
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={async () => {
                      const isValid = formData.description.trim() && formData.imageCount >= 3
                      addDebugInfo(`🔍 Manual check - Images: ${formData.imageCount}, Description: "${formData.description.trim()}" (${formData.description.length} chars), Valid: ${isValid}`)
                      
                      // Check IndexedDB and sessionStorage data
                      try {
                        const step2Data = JSON.stringify(formData)
                        addDebugInfo(`📏 SessionStorage data size: ${step2Data.length} characters`)
                        addDebugInfo(`📊 Image IDs count: ${formData.imageIds.length}, Preview URLs: ${formData.imagePreviewUrls.length}`)
                        
                        // Check IndexedDB
                        const imagesInDB = await getImagesFromDB()
                        addDebugInfo(`💾 IndexedDB has ${imagesInDB.length} images stored`)
                      } catch (error) {
                        addDebugInfo(`❌ Error checking data: ${error}`)
                      }
                    }}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Check Status
                  </button>
                  <button
                    onClick={() => {
                      addDebugInfo(`🔧 Testing direct navigation...`)
                      window.open('/list-property/step3', '_blank')
                    }}
                    className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Test Step3
                  </button>
                  <button
                    onClick={() => setDebugInfo([])}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="max-h-40 overflow-y-auto bg-white rounded p-2 text-xs font-mono">
                {debugInfo.map((info, index) => (
                  <div key={index} className="mb-1 text-gray-700">
                    {info}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Validation Message */}
          {!isFormValid() && (
            <div className="text-center mb-6">
              <p className="text-gray-500">
                Add at least 3 photos and a property description to continue
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Current: {formData.imageCount} photos, {formData.description.length} description characters
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <button
              onClick={handleBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors w-full md:w-auto"
            >
              ← Back
            </button>
            
            <button
              onClick={handleContinue}
              disabled={!isFormValid()}
              className={`px-8 py-4 rounded-lg text-lg font-semibold transition-colors w-full md:w-auto ${
                isFormValid()
                  ? 'bg-pink-600 text-white hover:bg-pink-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 