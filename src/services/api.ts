import { LoginRequest, RegisterRequest, AuthResponse } from '@/types/auth';

// Используем наш внутренний прокси для обхода CORS
const BACKEND_URL = '/api/proxy';

class ApiClient {
  private baseURL = BACKEND_URL;

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Registration failed' }));
      throw new Error(error.message || 'Registration failed');
    }

    return response.json();
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    console.log('🌐 API Client: Making login request to:', `${this.baseURL}/v1/auth/login`);
    console.log('📤 API Client: Request data:', { ...data, password: '[HIDDEN]' });
    
    const response = await fetch(`${this.baseURL}/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    console.log('📥 API Client: Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('💥 API Client: Login error response text:', errorText);
      
      let error;
      try {
        error = JSON.parse(errorText);
      } catch (e) {
        error = { message: errorText || 'Login failed' };
      }
      
      console.error('💥 API Client: Login error object:', error);
      throw new Error(error.message || error.detail || 'Login failed');
    }

    const authResponse = await response.json();
    console.log('✨ API Client: Login successful:', { 
      user: authResponse.user, 
      hasAccessToken: !!authResponse.access_token,
      hasRefreshToken: !!authResponse.refresh_token
    });

    return authResponse;
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/v1/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken })
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    return response.json();
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/v1/auth/validate`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const apiClient = new ApiClient();