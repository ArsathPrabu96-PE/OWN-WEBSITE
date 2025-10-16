const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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
      console.error('API Error:', error);
      throw error;
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