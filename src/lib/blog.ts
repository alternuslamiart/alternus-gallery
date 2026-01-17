export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorAvatar: string;
  date: string;
  category: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Collecting: A Beginner's Guide",
    excerpt: "Starting your art collection can feel overwhelming. This comprehensive guide will help you understand what to look for, how to evaluate pieces, and where to start.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200&q=80",
    author: "Sarah Mitchell",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    date: "2024-12-15",
    category: "Collecting Tips",
    readTime: "8 min read",
  },
  {
    id: "2",
    title: "Contemporary Art Trends in 2024",
    excerpt: "Discover the latest movements shaping the contemporary art world. From digital art to sustainable materials, here's what's trending this year.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1200&q=80",
    author: "Marcus Chen",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    date: "2024-12-10",
    category: "Art Trends",
    readTime: "6 min read",
  },
  {
    id: "3",
    title: "How to Care for Your Art Collection",
    excerpt: "Proper care and maintenance of your artworks ensures they remain beautiful for generations. Learn the essential tips from conservation experts.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1200&q=80",
    author: "Emma Rodriguez",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    date: "2024-12-05",
    category: "Care & Maintenance",
    readTime: "7 min read",
  },
  {
    id: "4",
    title: "Behind the Canvas: Artist Interview Series",
    excerpt: "Get an exclusive look into the creative process of featured artist Lamiart. Discover what inspires their work and their journey to becoming a professional artist.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&q=80",
    author: "David Thompson",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    date: "2024-11-28",
    category: "Artist Spotlight",
    readTime: "10 min read",
  },
  {
    id: "5",
    title: "Understanding Art Valuations and Pricing",
    excerpt: "What determines the value of an artwork? Learn about the factors that influence art pricing and how to make informed purchasing decisions.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&q=80",
    author: "Lisa Anderson",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    date: "2024-11-20",
    category: "Investment",
    readTime: "9 min read",
  },
  {
    id: "6",
    title: "Creating the Perfect Gallery Wall at Home",
    excerpt: "Transform your living space with a stunning gallery wall. Our interior design expert shares tips for layout, spacing, and artwork selection.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&q=80",
    author: "James Wilson",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    date: "2024-11-15",
    category: "Interior Design",
    readTime: "5 min read",
  },
];

export const blogCategories = Array.from(new Set(blogPosts.map((post) => post.category)));

export function getBlogPostById(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}
