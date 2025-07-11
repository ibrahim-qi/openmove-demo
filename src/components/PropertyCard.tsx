'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Bed, Bath, Home, Calendar } from 'lucide-react';
import { Property } from '@/lib/supabase';
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

  const getFullAddress = (property: Property) => {
    return [property.address_line_1, property.address_line_2, property.city, property.postcode]
      .filter(Boolean)
      .join(', ');
  };

  return (
    <>
      <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${className}`}>
        {/* Property Image */}
        <div className="relative h-64 w-full">
          {property.images && property.images.length > 0 && !property.images[0].includes('example.com') ? (
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                console.log('Image failed to load:', property.images[0]);
                // Replace the failed image with a fallback
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                      <div class="text-center text-gray-500">
                        <div class="mx-auto mb-2">🏠</div>
                        <p class="text-sm">Image unavailable</p>
                      </div>
                    </div>
                  `;
                }
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Home size={48} className="mx-auto mb-2" />
                <p className="text-sm">No image available</p>
              </div>
            </div>
          )}
          
          {/* Status Badge - Only show if not active */}
          {property.status === 'sold' && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
              Sold STC
            </div>
          )}
          
          {property.status === 'rented' && (
            <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-semibold">
              Rented
            </div>
          )}
          
          {property.status === 'withdrawn' && (
            <div className="absolute top-3 left-3 bg-gray-500 text-white px-2 py-1 rounded text-sm font-semibold">
              Withdrawn
            </div>
          )}

          {/* Listing Type Badge */}
          <div className="absolute top-3 right-3 bg-primary-500 text-white px-2 py-1 rounded text-sm font-semibold">
            {property.listing_type === 'rent' ? 'To Rent' : 'For Sale'}
          </div>
        </div>

        {/* Property Details */}
        <div className="p-4">
          {/* Price */}
          <div className="mb-2">
            <h3 className="text-2xl font-bold text-gray-900">
              {formatPrice(property.price, property.listing_type)}
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
              {getFullAddress(property)}
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
              <span className="text-sm">{property.type}</span>
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
            <span>Listed {formatDate(property.created_at)}</span>
          </div>

          {/* Action Buttons */}
          <div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              View Details
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