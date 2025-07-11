'use client';

import { X, MapPin, Bed, Bath, Home, Phone, Mail, Heart } from 'lucide-react';
import Image from 'next/image';
import { Property } from '@/lib/supabase';

interface PropertyModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PropertyModal({ property, isOpen, onClose }: PropertyModalProps) {
  if (!isOpen || !property) return null;

  const formatPrice = (price: number, listingType: 'sale' | 'rent') => {
    if (listingType === 'rent') {
      return `£${price.toLocaleString()} pcm`;
    }
    return `£${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getFullAddress = (property: Property) => {
    return [property.address_line_1, property.address_line_2, property.city, property.postcode]
      .filter(Boolean)
      .join(', ');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Property Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image Gallery */}
          <div className="mb-6">
            <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden">
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
              
              {/* Status Badge */}
              {property.status === 'sold' && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
                  Sold STC
                </div>
              )}
              
              {property.status === 'rented' && (
                <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded text-sm font-semibold">
                  Rented
                </div>
              )}

              {/* Listing Type Badge */}
              <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded text-sm font-semibold">
                {property.listing_type === 'rent' ? 'To Rent' : 'For Sale'}
              </div>
            </div>
          </div>

          {/* Property Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Details */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {formatPrice(property.price, property.listing_type)}
                </h3>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {property.title}
                </h4>
                <div className="flex items-start text-gray-600 mb-4">
                  <MapPin size={18} className="mt-0.5 mr-2 flex-shrink-0" />
                  <span>
                    {getFullAddress(property)}
                  </span>
                </div>
              </div>

              {/* Property Stats */}
              <div className="flex items-center space-x-6 mb-6 text-gray-600">
                <div className="flex items-center">
                  <Bed size={18} className="mr-2" />
                  <span className="font-medium">{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center">
                  <Bath size={18} className="mr-2" />
                  <span className="font-medium">{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center">
                  <Home size={18} className="mr-2" />
                  <span className="font-medium">{property.type}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h5 className="text-lg font-semibold text-gray-900 mb-3">Description</h5>
                <p className="text-gray-700 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h5 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h5>
                <div className="grid grid-cols-2 gap-2">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Seller */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-lg font-semibold text-gray-900 mb-3">Contact Seller</h5>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Listed by</span>
                    <p className="font-medium text-gray-900">Property Owner</p>
                  </div>
                  
                  <div className="space-y-2">
                    <button className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center justify-center">
                      <Phone size={18} className="mr-2" />
                      Call 07XXX XXXXXX
                    </button>
                    <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center">
                      <Mail size={18} className="mr-2" />
                      Send Message
                    </button>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-lg font-semibold text-gray-900 mb-3">Property Details</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property ID:</span>
                    <span className="font-medium">{property.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Listed on:</span>
                    <span className="font-medium">{formatDate(property.created_at)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Type:</span>
                    <span className="font-medium">{property.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium capitalize ${
                      property.status === 'active' ? 'text-green-600' :
                      property.status === 'sold' ? 'text-red-600' :
                      property.status === 'rented' ? 'text-yellow-600' :
                      'text-gray-600'
                    }`}>
                      {property.status === 'active' ? 'Available' : property.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Save Property */}
              <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center">
                <Heart size={18} className="mr-2" />
                Save Property
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 