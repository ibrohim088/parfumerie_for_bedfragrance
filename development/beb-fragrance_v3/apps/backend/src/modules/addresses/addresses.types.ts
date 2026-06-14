export interface CreateAddressRequest {
  label?: string;
  fullName: string;
  phone: string;
  region: string;
  district: string;
  street: string;
  apartment?: string;
  landmark?: string;
  isDefault?: boolean;
}

export interface UpdateAddressRequest extends Partial<CreateAddressRequest> {}
