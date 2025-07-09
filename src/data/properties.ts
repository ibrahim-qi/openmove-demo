export interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  city: string;
  postcode: string;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  description: string;
  images: string[];
  features: string[];
  listingType: 'sale' | 'rent';
  dateAdded: string;
  isFeatured: boolean;
  status: 'available' | 'sold' | 'under_offer';
  sellerName: string;
  sellerPhone: string;
  sellerEmail: string;
}

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Charming Victorian Terrace',
    price: 725000,
    address: '28 Victoria Grove',
    city: 'Brighton',
    postcode: 'BN1 3FN',
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'Terraced House',
    description: 'Beautiful Victorian terrace house with period features, modern kitchen, and private garden. Walking distance to Brighton seafront and excellent transport links to London.',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    features: ['Garden', 'Period Features', 'Modern Kitchen', 'Near Transport'],
    listingType: 'sale',
    dateAdded: '2025-01-01',
    isFeatured: true,
    status: 'available',
    sellerName: 'Sarah Johnson',
    sellerPhone: '07123 456789',
    sellerEmail: 'sarah.j@email.com'
  },
  {
    id: '2',
    title: 'Modern 3-Bedroom Family Home',
    price: 450000,
    address: '15 Oakwood Avenue',
    city: 'Hampstead',
    postcode: 'NW3 7UG',
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'Detached House',
    description: 'Stunning modern family home with open-plan living, fitted kitchen, and landscaped garden. Perfect for families with excellent schools nearby.',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    features: ['Garden', 'Garage', 'Open Plan', 'Near Schools'],
    listingType: 'sale',
    dateAdded: '2025-01-02',
    isFeatured: true,
    status: 'available',
    sellerName: 'Michael Brown',
    sellerPhone: '07234 567890',
    sellerEmail: 'michael.b@email.com'
  },
  {
    id: '3',
    title: 'Luxury 2-Bedroom Apartment',
    price: 2800,
    address: 'Tower Bridge Heights, 42 Shad Thames',
    city: 'London',
    postcode: 'SE1 2YE',
    bedrooms: 2,
    bathrooms: 2,
    propertyType: 'Apartment',
    description: 'Stunning luxury apartment with river views, concierge service, and premium finishes throughout. Located in the heart of London with excellent amenities.',
    images: [
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    features: ['River Views', 'Concierge', 'Balcony', 'City Centre'],
    listingType: 'rent',
    dateAdded: '2025-01-03',
    isFeatured: true,
    status: 'available',
    sellerName: 'Emma Wilson',
    sellerPhone: '07345 678901',
    sellerEmail: 'emma.w@email.com'
  },
  {
    id: '4',
    title: 'Countryside Cottage',
    price: 385000,
    address: '12 Meadow Lane',
    city: 'Cotswolds',
    postcode: 'GL7 2RP',
    bedrooms: 2,
    bathrooms: 1,
    propertyType: 'Cottage',
    description: 'Charming stone cottage in the heart of the Cotswolds with beautiful countryside views, original beams, and a lovely cottage garden.',
    images: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    features: ['Countryside Views', 'Original Features', 'Garden', 'Village Location'],
    listingType: 'sale',
    dateAdded: '2025-01-04',
    isFeatured: false,
    status: 'available',
    sellerName: 'David Taylor',
    sellerPhone: '07456 789012',
    sellerEmail: 'david.t@email.com'
  },
  {
    id: '5',
    title: 'Contemporary City Penthouse',
    price: 1250000,
    address: '88 High Street',
    city: 'Manchester',
    postcode: 'M1 2WD',
    bedrooms: 3,
    bathrooms: 3,
    propertyType: 'Penthouse',
    description: 'Spectacular penthouse apartment with panoramic city views, roof terrace, and luxury finishes throughout. Prime location in Manchester city centre.',
    images: [
      'https://images.unsplash.com/photo-1556912167-f556f1675906?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571090700692-d8a1f60c1f41?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    features: ['City Views', 'Roof Terrace', 'Luxury Finishes', 'Central Location'],
    listingType: 'sale',
    dateAdded: '2025-01-05',
    isFeatured: false,
    status: 'under_offer',
    sellerName: 'Jessica Davis',
    sellerPhone: '07567 890123',
    sellerEmail: 'jessica.d@email.com'
  },
  {
    id: '6',
    title: 'Traditional Farmhouse',
    price: 650000,
    address: 'Hillside Farm, Weston Road',
    city: 'Yorkshire Dales',
    postcode: 'BD23 5HG',
    bedrooms: 4,
    bathrooms: 3,
    propertyType: 'Farmhouse',
    description: 'Spacious traditional farmhouse with stunning rural views, large gardens, and outbuildings. Perfect for country living with easy access to market towns.',
    images: [
      'https://images.unsplash.com/photo-1505843795480-5cfb3c03f6ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    features: ['Rural Views', 'Large Garden', 'Outbuildings', 'Country Living'],
    listingType: 'sale',
    dateAdded: '2025-01-06',
    isFeatured: false,
    status: 'available',
    sellerName: 'Robert Wilson',
    sellerPhone: '07678 901234',
    sellerEmail: 'robert.w@email.com'
  }
];

export const getFeaturedProperties = () => {
  return mockProperties.filter(property => property.isFeatured);
};

export const getPropertyById = (id: string) => {
  return mockProperties.find(property => property.id === id);
};

export const searchProperties = (query: string) => {
  if (!query.trim()) return mockProperties;
  
  const searchTerm = query.toLowerCase();
  return mockProperties.filter(property => 
    property.title.toLowerCase().includes(searchTerm) ||
    property.address.toLowerCase().includes(searchTerm) ||
    property.city.toLowerCase().includes(searchTerm) ||
    property.postcode.toLowerCase().includes(searchTerm) ||
    property.propertyType.toLowerCase().includes(searchTerm)
  );
}; 