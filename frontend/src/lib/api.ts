const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  phone?: string;
  projectType?: string;
  budget?: string;
}

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export class ApiService {
  // Health check method
  static async healthCheck(): Promise<{ status: string; backend: string; timestamp: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        return {
          status: 'healthy',
          backend: API_BASE_URL,
          timestamp: new Date().toISOString()
        };
      } else {
        return {
          status: `error-${response.status}`,
          backend: API_BASE_URL,
          timestamp: new Date().toISOString()
        };
      }
    } catch (error) {
      console.error('❌ Backend health check failed:', error);
      return {
        status: 'unreachable',
        backend: API_BASE_URL,
        timestamp: new Date().toISOString()
      };
    }
  }

  private static async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      // Check if it's a network error (backend not running)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.warn('⚠️ Backend not available, using fallback data');
        
        // Return a structured error response instead of throwing
        return {
          success: false,
          message: 'Backend server is not running. Using fallback data.',
          data: undefined
        };
      }
      
      // Return structured error instead of throwing
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        data: undefined
      };
    }
  }

  // Contact API
  static async submitContactForm(data: ContactFormData): Promise<ApiResponse> {
    return this.makeRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async getContacts(): Promise<ApiResponse> {
    return this.makeRequest('/contact');
  }

  // Projects API
  static async getProjects(filters?: { category?: string; featured?: boolean }): Promise<ApiResponse> {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.featured !== undefined) params.append('featured', filters.featured.toString());
    
    const queryString = params.toString();
    return this.makeRequest(`/projects${queryString ? `?${queryString}` : ''}`);
  }

  static async getFeaturedProjects(): Promise<ApiResponse> {
    return this.makeRequest('/projects/featured');
  }

  static async getProjectsByCategory(category: string): Promise<ApiResponse> {
    return this.makeRequest(`/projects/category/${category}`);
  }

  static async getProject(id: string): Promise<ApiResponse> {
    return this.makeRequest(`/projects/${id}`);
  }

  static async getProjectStats(): Promise<ApiResponse> {
    return this.makeRequest('/projects/stats');
  }

  static async createProject(data: any): Promise<ApiResponse> {
    return this.makeRequest('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateProject(id: string, data: any): Promise<ApiResponse> {
    return this.makeRequest(`/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  static async deleteProject(id: string): Promise<ApiResponse> {
    return this.makeRequest(`/projects/${id}`, {
      method: 'DELETE',
    });
  }
}

// Types
export type { ContactFormData, ApiResponse };