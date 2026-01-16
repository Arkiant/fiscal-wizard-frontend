console.log('✅ api.ts loaded');

// Use environment variable for API base URL, fallback to localhost for development
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

console.log('🔗 API Base URL:', API_BASE);

export interface UploadResponse {
  id: string;
  status: string;
  message?: string;
}

export interface ApiError {
  error: string;
  details?: string;
}

export const taxApi = {
  // Upload CSV y obtener UUID del reporte
  uploadCSV: async (file: File): Promise<UploadResponse> => {
    console.log('🚀 Starting upload to:', API_BASE);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('broker', 'interactive-brokers');
    formData.append('language', 'es');

    try {
      console.log('📤 Sending request...');
      const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
      });

      console.log('📥 Response status:', response.status, 'OK:', response.ok);

      if (!response.ok) {
        console.log('❌ Upload failed, parsing error...');
        const errorData = await response.json() as ApiError;
        console.error('Backend error:', errorData);
        throw new Error(`${errorData.error}: ${errorData.details || ''}`);
      }

      console.log('✅ Parsing success response...');
      const result = await response.json();
      console.log('✅ Upload successful:', result);
      return result;
      
    } catch (error) {
      console.error('❌ Upload error:', error);
      throw error;
    }
  },

  // Descargar HTML del reporte
  downloadReport: async (reportId: string): Promise<string> => {
    console.log('📥 Starting download for report:', reportId);
    
    try {
      const response = await fetch(`${API_BASE}/reports/${reportId}/download?lang=es`, {
        headers: {
          'Accept': 'text/html',
        },
      });

      console.log('📥 Download response status:', response.status);

      if (!response.ok) {
        throw new Error(`Failed to download report: ${response.statusText}`);
      }

      console.log('📥 Parsing HTML response...');
      const htmlContent = await response.text();
      console.log('✅ HTML downloaded, length:', htmlContent.length);
      return htmlContent;
      
    } catch (error) {
      console.error('❌ Download error:', error);
      throw error;
    }
  },

  // Verificar estado del backend (opcional)
  health: async (): Promise<{status: string}> => {
    console.log('🏥 Checking backend health...');
    try {
      const response = await fetch(`${API_BASE}/health`);
      if (!response.ok) {
        throw new Error('Backend not available');
      }
      const health = await response.json();
      console.log('✅ Backend health:', health);
      return health;
    } catch (error) {
      console.error('❌ Health check failed:', error);
      throw error;
    }
  }
};