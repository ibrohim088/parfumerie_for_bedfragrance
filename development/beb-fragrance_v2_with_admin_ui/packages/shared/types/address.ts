export interface Address {
  id: string;
  userId: string;
  label?: string; // "Uy", "Ish" etc.
  fullName: string;
  phone: string;
  region: string;
  district: string;
  street: string;
  apartment?: string;
  landmark?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}