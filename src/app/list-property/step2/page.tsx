'use client'

import { useState, useEffect } from 'react'
import { Camera, Upload, X } from 'lucide-react'

export default function ListPropertyStep2() {
  const [formData, setFormData] = useState({
    description: '',
    imagePreviewUrls: [] as string[],
    imageData: [] as Array<{base64: string, name: string, type: string}>,
    imageCount: 0
  })
  
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  useEffect(() => {
    // Component mounted - could load step 1 data if needed for validation
  }, [])

  const addDebugInfo = (message: string) => {
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
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
      
      // Convert files to base64 for storage
      const imageDataPromises = newFiles.map((file, index) => {
        return new Promise<{base64: string, name: string, type: string}>((resolve, reject) => {
          const reader = new FileReader()
          
          reader.onload = (e) => {
            addDebugInfo(`✅ File ${index + 1} (${file.name}) loaded successfully`)
            resolve({
              base64: e.target?.result as string,
              name: file.name,
              type: file.type
            })
          }
          
          reader.onerror = (e) => {
            addDebugInfo(`❌ Error reading file ${index + 1} (${file.name})`)
            reject(new Error(`Failed to read file: ${file.name}`))
          }
          
          reader.onabort = () => {
            addDebugInfo(`⚠️ File reading aborted for ${file.name}`)
            reject(new Error(`Reading aborted: ${file.name}`))
          }
          
          addDebugInfo(`🔄 Starting to read file ${index + 1}: ${file.name}`)
          reader.readAsDataURL(file)
        })
      })
      
      try {
        const newImageData = await Promise.all(imageDataPromises)
        addDebugInfo(`🎉 All ${newImageData.length} files processed successfully!`)
        
        setFormData(prev => ({
          ...prev,
          imageCount: prev.imageCount + newFiles.length,
          imagePreviewUrls: [...prev.imagePreviewUrls, ...newPreviewUrls],
          imageData: [...prev.imageData, ...newImageData]
        }))
        addDebugInfo(`📊 Updated state: ${newFiles.length} new images added`)
      } catch (error) {
        addDebugInfo(`💥 Error processing files: ${error}`)
        alert('Some images failed to upload. Check debug info below for details.')
      }
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      imageCount: prev.imageCount - 1,
      imagePreviewUrls: prev.imagePreviewUrls.filter((_, i) => i !== index),
      imageData: prev.imageData.filter((_, i) => i !== index)
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
    if (isFormValid()) {
      // Store form data in sessionStorage
      sessionStorage.setItem('propertyFormStep2', JSON.stringify(formData))
      // Navigate to step 3
      window.location.href = '/list-property/step3'
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
                <button
                  onClick={() => setDebugInfo([])}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Clear
                </button>
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