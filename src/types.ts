export type ServiceCategory =
  | 'Placements'
  | 'Education'
  | 'Agriculture & Solar'
  | 'Real Estate'
  | 'Vehicles'
  | 'Publicity'
  | 'Travel';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  features: string[];
  badge?: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  status: 'New' | 'In Progress' | 'Contacted' | 'Closed';
  date: string;
  notes?: string;
  rating?: number; // Priority or quality rating in admin panel
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  clicks?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  category: ServiceCategory | 'General';
  rating: number;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface SuccessStory {
  id: string;
  title: string;
  metric: string;
  description: string;
  category: string;
  icon: string;
}
