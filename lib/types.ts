export interface Restaurant {
  id: string;
  name: string;
  neighborhood: string;
  borough: string;
  cuisine_type: string;
  address: string;
  description: string;
  why_support: string;
  submitted_by: string;
  photo_urls: string[];
  needs_support: boolean;
  status: 'pending' | 'approved';
  created_at: string;
}

export const BOROUGHS = ['Brooklyn', 'Queens'] as const;

export const NEIGHBORHOODS: Record<string, string[]> = {
  Brooklyn: [
    'Bed-Stuy',
    'Bushwick',
    'Crown Heights',
    'East Flatbush',
    'Flatbush',
    'Fort Greene',
    'Park Slope',
    'Prospect Heights',
    'Sunset Park',
    'Williamsburg',
    'Bay Ridge',
    'Bensonhurst',
    'Borough Park',
    'Brownsville',
    'Canarsie',
    'Clinton Hill',
    'Cobble Hill',
    'Ditmas Park',
    'East New York',
    'Greenpoint',
    'Kensington',
    'Red Hook',
    'Sheepshead Bay',
    'Windsor Terrace',
  ],
  Queens: [
    'Astoria',
    'Corona',
    'Elmhurst',
    'Flushing',
    'Forest Hills',
    'Jackson Heights',
    'Jamaica',
    'Long Island City',
    'Ridgewood',
    'Sunnyside',
    'Woodside',
    'Bayside',
    'Briarwood',
    'College Point',
    'Far Rockaway',
    'Fresh Meadows',
    'Kew Gardens',
    'Maspeth',
    'Ozone Park',
    'Rego Park',
    'Richmond Hill',
    'South Ozone Park',
    'Woodhaven',
  ],
};

export const CUISINE_TYPES = [
  'Dominican',
  'Mexican',
  'Chinese',
  'Jamaican',
  'Trinidadian',
  'Haitian',
  'Puerto Rican',
  'Ecuadorian',
  'Colombian',
  'Salvadoran',
  'Thai',
  'Indian',
  'Bangladeshi',
  'Pakistani',
  'Filipino',
  'Korean',
  'Vietnamese',
  'Japanese',
  'Italian',
  'Greek',
  'Polish',
  'Middle Eastern',
  'Ethiopian',
  'West African',
  'Southern / Soul Food',
  'Peruvian',
  'Brazilian',
  'Guyanese',
  'Uzbek',
  'Tibetan',
  'Nepali',
  'American Diner',
  'Bakery / Cafe',
  'Seafood',
  'Pizza',
  'Other',
] as const;
