export interface AuthResponse {
  token: string;
  user: SafeUser;
}

export interface SafeUser {
  id: number;
  email: string;
  name: string;
  roles: string[];
  permissions: string[];
}
