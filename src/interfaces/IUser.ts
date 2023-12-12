export interface IUser {
  name?: string;
  email: string;
  password: string;
  fullAddress?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  lat?: number;
  lng?: number;
}
