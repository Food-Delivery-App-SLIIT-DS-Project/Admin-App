export interface Restaurant {
    restaurant_id: string;
    user_id: string;
    restaurant_name: string | null;
    address: string;
    location: Coordinates | undefined;
    phone: string;
    cuisine_type: string;
    description: string;
    opening_hours: string;
    image_reference: string;
    number_of_ratings: number;
    is_open: boolean;
    is_verified: boolean;
  }

  export interface Coordinates {
    latitude: number;
    longitude: number;
  }