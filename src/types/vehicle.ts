export interface Vehicle {
    vehicle_id: string;
    driver_id: string;
    vehicle_type: string;
    brand_name: string;
    model_name: string;
    registration_number: string;
    color: string;
    year: number;
    insurance_number: string;
    insurance_expiry: string; // ISO date string
    availability: boolean;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
  }