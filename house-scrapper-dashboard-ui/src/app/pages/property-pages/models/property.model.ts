export interface Property {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: number;
  virtualTourUrl?: string;
}
