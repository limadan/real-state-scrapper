export interface Property {
  id: number;
  source_id: string;
  source_website: string;
  price: number;
  address: string;
  number_of_rooms: number;
  number_of_parking_spaces?: number;
  photo_url: string;
  access_link: string;
  favorite: boolean;
}
