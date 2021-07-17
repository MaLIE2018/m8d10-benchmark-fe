export interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
  password?: string;
}

export interface Accommodation {
  _id: string;
  name: string;
  location: { _id: string; location: string; __v: number };
  description: string;
  maxGuests: number;
}
