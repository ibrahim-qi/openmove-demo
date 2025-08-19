'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Bed, Bath, Home, Calendar, Heart } from 'lucide-react';
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
      <div className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden w-full ${className}`}>
        {/* Property Image */}
        <div className="relative h-72 md:h-80 w-full">
          {property.images && property.images.length > 0 && !property.images[0].includes('example.com') ? (
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                console.log('Image failed to load:', property.images[0]);
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
          
          {/* Heart Icon - Top Right */}
          <div className="absolute top-3 right-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Heart size={20} className="text-primary-500 fill-primary-500" />
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="p-5">
          {/* Title and Price */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-black leading-tight">
                {property.bedrooms} Bedroom<br />
                {property.type} Home
              </h3>
            </div>
            <div className="ml-4">
              <span className="text-xl font-bold text-black">
                {formatPrice(property.price, property.listing_type)}
              </span>
            </div>
          </div>

          {/* Address */}
          <div className="mb-3">
            <span className="text-black text-sm">
              {getFullAddress(property)}
            </span>
          </div>

          {/* Property Stats Row */}
          <div className="flex items-center space-x-4 mb-3 text-black text-sm">
            <span>{property.bedrooms} Beds</span>
            <span>{property.bathrooms} Baths</span>
            <span>{property.floor_area}m2</span>
          </div>

          {/* Property Type */}
          <div className="mb-3">
            <span className="text-black text-sm">{property.type}</span>
          </div>

          {/* Tenure */}
          <div className="mb-3">
            <span className="text-black text-sm">Freehold</span>
          </div>

          {/* Listed Date */}
          <div className="text-primary-500 text-sm font-medium text-right">
            Listed on {new Date(property.created_at).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
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