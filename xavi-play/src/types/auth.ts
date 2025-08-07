export interface LoginPageProps {
  onLogin?: () => void;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
} 