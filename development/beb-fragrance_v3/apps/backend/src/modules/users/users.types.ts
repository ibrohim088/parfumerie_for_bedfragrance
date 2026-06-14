export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface AdminUpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: 'user' | 'admin';
  isActive?: boolean;
}

export interface UserListQuery {
  page?: number;
  limit?: number;
  search?: string;
}
