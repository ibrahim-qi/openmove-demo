'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Bed, Bath, Home, Calendar, Phone, Mail } from 'lucide-react';
import { Property } from '@/data/properties';
import PropertyModal from './PropertyModal';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export default function PropertyCard({ property, className = '' }: PropertyCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatPrice = (price: number, listingType: 'sale' | 'rent') => {
    if (listingType === 'rent') {
      return `£${price.toLocaleString()} pcm`;
    }
    return `£${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  return (
    <>
      <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${className}`}>
        {/* Property Image */}
        <div className="relative h-48 w-full">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Status Badge */}
          {property.status === 'under_offer' && (
            <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-semibold">
              Under Offer
            </div>
          )}
          
          {property.status === 'sold' && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
              Sold STC
            </div>
          )}

          {/* Listing Type Badge */}
          <div className="absolute top-3 right-3 bg-primary-500 text-white px-2 py-1 rounded text-sm font-semibold">
            {property.listingType === 'rent' ? 'To Rent' : 'For Sale'}
          </div>
        </div>

        {/* Property Details */}
        <div className="p-4">
          {/* Price */}
          <div className="mb-2">
            <h3 className="text-2xl font-bold text-gray-900">
              {formatPrice(property.price, property.listingType)}
            </h3>
          </div>

          {/* Title */}
          <h4 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
            {property.title}
          </h4>

          {/* Address */}
          <div className="flex items-start text-gray-600 mb-3">
            <MapPin size={16} className="mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-sm">
              {property.address}, {property.city}, {property.postcode}
            </span>
          </div>

          {/* Property Stats */}
          <div className="flex items-center space-x-4 mb-3 text-gray-600">
            <div className="flex items-center">
              <Bed size={16} className="mr-1" />
              <span className="text-sm">{property.bedrooms} bed</span>
            </div>
            <div className="flex items-center">
              <Bath size={16} className="mr-1" />
              <span className="text-sm">{property.bathrooms} bath</span>
            </div>
            <div className="flex items-center">
              <Home size={16} className="mr-1" />
              <span className="text-sm">{property.propertyType}</span>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1 mb-3">
            {property.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {feature}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                +{property.features.length - 3} more
              </span>
            )}
          </div>

          {/* Date Added */}
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <Calendar size={14} className="mr-1" />
            <span>Listed {formatDate(property.dateAdded)}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              View Details
            </button>
            <button className="flex items-center justify-center bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors">
              <Phone size={18} />
            </button>
            <button className="flex items-center justify-center bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors">
              <Mail size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Property Modal */}
      <PropertyModal
        property={property}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
} 