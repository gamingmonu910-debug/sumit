export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  description: string;
  specifications: { [key: string]: string };
  variants?: {
    sizes?: string[];
    colors?: string[];
  };
  inStock: boolean;
  stockCount?: number;
  featured?: boolean;
  new?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const categories = [
  {
    id: '1',
    name: 'Watches',
    image: 'https://images.unsplash.com/photo-1704961212944-524f56df23fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2F0Y2h8ZW58MXx8fHwxNzY4NTYyNjU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    count: 45
  },
  {
    id: '2',
    name: 'Handbags',
    image: 'https://images.unsplash.com/photo-1601924928357-22d3b3abfcfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGhhbmRiYWd8ZW58MXx8fHwxNzY4NjQxMzM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    count: 38
  },
  {
    id: '3',
    name: 'Fragrances',
    image: 'https://images.unsplash.com/photo-1615160460367-dcccd27e11ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lfGVufDF8fHx8MTc2ODYxOTgyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    count: 52
  },
  {
    id: '4',
    name: 'Footwear',
    image: 'https://images.unsplash.com/photo-1625622176700-e55445383b85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHNob2VzfGVufDF8fHx8MTc2ODU2Nzg3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    count: 67
  },
  {
    id: '5',
    name: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5fGVufDF8fHx8MTc2ODY3ODUwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    count: 41
  },
  {
    id: '6',
    name: 'Sunglasses',
    image: 'https://images.unsplash.com/photo-1762706334838-ea8425b43116?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc3VuZ2xhc3Nlc3xlbnwxfHx8fDE3Njg2MjQ2NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    count: 29
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Leather Watch',
    price: 299.99,
    originalPrice: 399.99,
    category: 'Watches',
    brand: 'Elegance',
    image: 'https://images.unsplash.com/photo-1704961212944-524f56df23fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2F0Y2h8ZW58MXx8fHwxNzY4NTYyNjU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1704961212944-524f56df23fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2F0Y2h8ZW58MXx8fHwxNzY4NTYyNjU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800'
    ],
    rating: 4.8,
    reviews: 124,
    description: 'Timeless elegance meets modern craftsmanship in this classic leather watch. Perfect for both formal and casual occasions.',
    specifications: {
      'Case Material': 'Stainless Steel',
      'Band Material': 'Genuine Leather',
      'Water Resistance': '50m',
      'Movement': 'Quartz',
      'Warranty': '2 Years'
    },
    variants: {
      colors: ['Black', 'Brown', 'Tan']
    },
    inStock: true,
    stockCount: 45,
    featured: true
  },
  {
    id: '2',
    name: 'Designer Shoulder Bag',
    price: 549.99,
    category: 'Handbags',
    brand: 'Luxora',
    image: 'https://images.unsplash.com/photo-1601924928357-22d3b3abfcfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGhhbmRiYWd8ZW58MXx8fHwxNzY4NjQxMzM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1601924928357-22d3b3abfcfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGhhbmRiYWd8ZW58MXx8fHwxNzY4NjQxMzM2fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.9,
    reviews: 89,
    description: 'Elevate your style with this premium designer shoulder bag, crafted from the finest materials.',
    specifications: {
      'Material': 'Premium Leather',
      'Dimensions': '12" x 8" x 4"',
      'Closure': 'Magnetic Snap',
      'Strap': 'Adjustable'
    },
    variants: {
      colors: ['Beige', 'Black', 'Navy']
    },
    inStock: true,
    stockCount: 23,
    featured: true
  },
  {
    id: '3',
    name: 'Luxury Eau de Parfum',
    price: 189.99,
    originalPrice: 249.99,
    category: 'Fragrances',
    brand: 'Essence',
    image: 'https://images.unsplash.com/photo-1615160460367-dcccd27e11ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lfGVufDF8fHx8MTc2ODYxOTgyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1615160460367-dcccd27e11ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lfGVufDF8fHx8MTc2ODYxOTgyMHww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.7,
    reviews: 156,
    description: 'An intoxicating blend of floral and woody notes that captures sophistication and allure.',
    specifications: {
      'Volume': '100ml',
      'Type': 'Eau de Parfum',
      'Notes': 'Rose, Sandalwood, Vanilla',
      'Longevity': '8-10 hours'
    },
    variants: {
      sizes: ['50ml', '100ml', '150ml']
    },
    inStock: true,
    stockCount: 67,
    featured: true,
    new: true
  },
  {
    id: '4',
    name: 'Premium Leather Sneakers',
    price: 329.99,
    category: 'Footwear',
    brand: 'StepLux',
    image: 'https://images.unsplash.com/photo-1625622176700-e55445383b85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHNob2VzfGVufDF8fHx8MTc2ODU2Nzg3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1625622176700-e55445383b85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHNob2VzfGVufDF8fHx8MTc2ODU2Nzg3N3ww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.6,
    reviews: 203,
    description: 'Comfort meets luxury in these handcrafted leather sneakers, perfect for the modern lifestyle.',
    specifications: {
      'Upper Material': 'Premium Leather',
      'Sole': 'Rubber',
      'Lining': 'Breathable Mesh',
      'Closure': 'Lace-up'
    },
    variants: {
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['White', 'Black', 'Gray']
    },
    inStock: true,
    stockCount: 89,
    featured: true
  },
  {
    id: '5',
    name: 'Diamond Tennis Bracelet',
    price: 1299.99,
    originalPrice: 1599.99,
    category: 'Jewelry',
    brand: 'Brilliance',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5fGVufDF8fHx8MTc2ODY3ODUwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5fGVufDF8fHx8MTc2ODY3ODUwNXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 5.0,
    reviews: 67,
    description: 'Stunning diamond tennis bracelet featuring brilliant-cut stones in a classic setting.',
    specifications: {
      'Metal': '18K White Gold',
      'Diamonds': '2.5 Carats',
      'Length': '7 inches',
      'Clarity': 'VS1',
      'Color': 'F'
    },
    inStock: true,
    stockCount: 12,
    featured: true
  },
  {
    id: '6',
    name: 'Aviator Sunglasses',
    price: 249.99,
    category: 'Sunglasses',
    brand: 'Vista',
    image: 'https://images.unsplash.com/photo-1762706334838-ea8425b43116?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc3VuZ2xhc3Nlc3xlbnwxfHx8fDE3Njg2MjQ2NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1762706334838-ea8425b43116?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc3VuZ2xhc3Nlc3xlbnwxfHx8fDE3Njg2MjQ2NTB8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.5,
    reviews: 98,
    description: 'Classic aviator design with polarized lenses and premium metal frames.',
    specifications: {
      'Lens Material': 'Polarized Glass',
      'Frame Material': 'Titanium',
      'UV Protection': '100%',
      'Lens Width': '58mm'
    },
    variants: {
      colors: ['Gold/Brown', 'Silver/Gray', 'Black/Green']
    },
    inStock: true,
    stockCount: 34,
    new: true
  },
  {
    id: '7',
    name: 'Silk Evening Clutch',
    price: 199.99,
    category: 'Handbags',
    brand: 'Luxora',
    image: 'https://images.unsplash.com/photo-1569388330292-79cc1ec67270?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzY4NjcyMTk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1569388330292-79cc1ec67270?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzY4NjcyMTk2fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.7,
    reviews: 45,
    description: 'Elegant silk clutch perfect for evening events and special occasions.',
    specifications: {
      'Material': 'Pure Silk',
      'Dimensions': '9" x 5" x 2"',
      'Closure': 'Magnetic',
      'Chain': 'Detachable Gold Chain'
    },
    variants: {
      colors: ['Champagne', 'Navy', 'Rose Gold', 'Black']
    },
    inStock: true,
    stockCount: 18
  },
  {
    id: '8',
    name: 'Chronograph Sports Watch',
    price: 799.99,
    originalPrice: 999.99,
    category: 'Watches',
    brand: 'Elegance',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800'
    ],
    rating: 4.9,
    reviews: 178,
    description: 'Professional-grade chronograph with premium materials and precision movement.',
    specifications: {
      'Case Material': 'Titanium',
      'Band Material': 'Stainless Steel',
      'Water Resistance': '200m',
      'Movement': 'Automatic',
      'Warranty': '5 Years'
    },
    variants: {
      colors: ['Silver', 'Black', 'Blue']
    },
    inStock: true,
    stockCount: 29,
    new: true
  }
];

export const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Fashion Blogger',
    content: 'Absolutely love the quality and elegance of the products. The shopping experience was seamless and the customer service was exceptional!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Business Executive',
    content: 'Premium quality products at reasonable prices. My watch arrived perfectly packaged and looks even better in person.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=12'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Style Enthusiast',
    content: 'The attention to detail and craftsmanship is unmatched. I\'ve recommended this store to all my friends!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=5'
  }
];

export const productReviews: Review[] = [
  {
    id: 'r1',
    productId: '1',
    userName: 'James Wilson',
    rating: 5,
    comment: 'Excellent watch! The leather strap is incredibly comfortable and the design is timeless.',
    date: '2026-01-10'
  },
  {
    id: 'r2',
    productId: '1',
    userName: 'Lisa Anderson',
    rating: 4,
    comment: 'Beautiful watch, great value for money. Only minor issue is the strap took a few days to break in.',
    date: '2026-01-08'
  },
  {
    id: 'r3',
    productId: '2',
    userName: 'Amanda Foster',
    rating: 5,
    comment: 'This bag exceeded my expectations! The leather quality is superb and it fits all my essentials.',
    date: '2026-01-12'
  }
];
