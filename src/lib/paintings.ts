export interface Painting {
  id: string;
  title: string;
  description: string;
  price: number;
  dimensions: string;
  medium: string;
  year: number;
  category: string; // Medium type: Painting, Photography, Sculpture, Drawing, Mixed Media
  style: string; // Artistic style: Abstract, Landscape, Portrait, Still Life, Urban, Contemporary, etc.
  image: string;
  available: boolean;
  isPreOrder?: boolean;
  preOrderReleaseDate?: string;
  preOrderDiscount?: number;
  artistId?: string;
  artist?: string;
}

export const paintings: Painting[] = [];

export const categories = Array.from(new Set(paintings.map((p) => p.category)));

// Get unique styles and sort with Baroque first
const uniqueStyles = Array.from(new Set(paintings.map((p) => p.style)));
export const styles = uniqueStyles.sort((a, b) => {
  if (a === "Baroque") return -1;
  if (b === "Baroque") return 1;
  return a.localeCompare(b);
});

export function getPaintingById(id: string): Painting | undefined {
  return paintings.find((p) => p.id === id);
}

export function getPaintingsByCategory(category: string): Painting[] {
  return paintings.filter((p) => p.category === category);
}

export function getPaintingsByStyle(style: string): Painting[] {
  return paintings.filter((p) => p.style === style);
}
