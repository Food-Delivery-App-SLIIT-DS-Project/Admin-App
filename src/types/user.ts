export interface User {
    userId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: string;
    isVerified: boolean;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  }