export type ProductCategory =
  | "cafes-grains"
  | "cafes-moulus"
  | "capsules"
  | "packs"
  | "accessoires";

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  image: string;
  shortDescription: string;
  description: string;
  origin: string;
  intensity: 1 | 2 | 3 | 4 | 5;
  weight: string;
  stock: number;
  isFeatured: boolean;
  notes: string[];
  brewingAdvice: string;
};
