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

export interface uploadAccommodation {
  name: string;
  location: string;
  description: string;
  maxGuests: number;
  owner: string;
}

export interface Destination {
  location: string;
  _id?: string;
}

export const initialUser = {
  _id: "",
  name: "",
  email: "",
  password: "",
  role: "",
};
