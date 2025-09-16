// API Configuration and Service Layer for React App
const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:8000';
const API_KEY = 'AIzaSyClzfrOzB818x55FASHvX4JuGQciR9lv7a';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('access_token');
  }

  // Authentication headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          this.clearToken();
          throw new Error('Authentication required');
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Authentication methods
  async login(credentials) {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await fetch(`${this.baseURL}/login`, {
      method: 'POST',
      headers: {
        'X-API-Key': API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Login failed');
    }

    const data = await response.json();
    this.token = data.access_token;
    localStorage.setItem('access_token', this.token);
    
    // Get user profile after login
    const user = await this.getCurrentUser();
    localStorage.setItem('user', JSON.stringify(user));
    
    return { access_token: this.token, user };
  }

  async register(userData) {
    return this.request('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    this.clearToken();
    return Promise.resolve();
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }

  isAuthenticated() {
    return !!this.token;
  }

  async getCurrentUser() {
    return this.request('/users/me');
  }

  // Location methods
  async getRegions() {
    return this.request('/regions');
  }

  async getProvincesByRegion(regionId) {
    return this.request(`/regions/${regionId}/provinces`);
  }

  async getCommunitiesByProvince(provinceId) {
    return this.request(`/provinces/${provinceId}/communities`);
  }

  // Department methods
  async getDepartments() {
    return this.request('/departments');
  }

  async getDepartment(depId) {
    return this.request(`/departments/${depId}`);
  }

  // Land Parcel methods
  async getLandParcels() {
    return this.request('/land_parcels');
  }

  async getLandParcel(lpId) {
    return this.request(`/land_parcels/${lpId}`);
  }

  async createLandParcel(parcelData) {
    return this.request('/land_parcels', {
      method: 'POST',
      body: JSON.stringify(parcelData),
    });
  }

  // Plot methods (User's plots)
  async getMyPlots() {
    return this.request('/plots');
  }

  async getPlot(plotId) {
    return this.request(`/plots/${plotId}`);
  }

  async createPlot(plotData) {
    return this.request('/plots', {
      method: 'POST',
      body: JSON.stringify(plotData),
    });
  }

  async updatePlot(plotId, plotData) {
    return this.request(`/plots/${plotId}`, {
      method: 'PUT',
      body: JSON.stringify(plotData),
    });
  }

  async deletePlot(plotId) {
    return this.request(`/plots/${plotId}`, {
      method: 'DELETE',
    });
  }

  // Agricultural Plot methods
  async getMyAgriculturalPlots() {
    return this.request('/agricultural-plots');
  }

  async getAgriculturalPlotsByPlot(plotId) {
    return this.request(`/plots/${plotId}/agricultural-plots`);
  }

  async createAgriculturalPlot(plotData) {
    return this.request('/agricultural-plots', {
      method: 'POST',
      body: JSON.stringify(plotData),
    });
  }

  // Cultivation Group methods
  async getCultivationGroups() {
    return this.request('/groups');
  }

  async getCultivationGroup(groupId) {
    return this.request(`/groups/${groupId}`);
  }

  // Cultivation methods
  async getCultivations() {
    return this.request('/cultivations');
  }

  async getCultivationsByGroup(groupId) {
    return this.request(`/cultivation-groups/${groupId}/cultivations`);
  }

  async getCultivation(cultId) {
    return this.request(`/cultivations/${cultId}`);
  }

  // Variety methods
  async getVarieties() {
    return this.request('/varieties');
  }

  async getVarietiesByCultivation(cultivationId) {
    return this.request(`/cultivations/${cultivationId}/varieties`);
  }

  async getVariety(varId) {
    return this.request(`/varieties/${varId}`);
  }

  // Harmful Cause methods
  async getHarmfulCauses() {
    return this.request('/harmful_causes');
  }

  async getHarmfulCause(hcId) {
    return this.request(`/harmful_causes/${hcId}`);
  }

  // Cultivation Declaration methods
  async getMyCultivationDeclarations() {
    return this.request('/cultivation-declarations');
  }

  async getCultivationDeclaration(declarationId) {
    return this.request(`/cultivation-declarations/${declarationId}`);
  }

  async createCultivationDeclaration(declarationData) {
    return this.request('/cultivation-declarations', {
      method: 'POST',
      body: JSON.stringify(declarationData),
    });
  }

  async updateCultivationDeclaration(declarationId, declarationData) {
    return this.request(`/cultivation-declarations/${declarationId}`, {
      method: 'PUT',
      body: JSON.stringify(declarationData),
    });
  }

  // Damage Declaration methods
  async getMyDamageDeclarations() {
    return this.request('/damage-declarations');
  }

  async getDamageDeclaration(declarationId) {
    return this.request(`/damage-declarations/${declarationId}`);
  }

  async createDamageDeclaration(declarationData) {
    return this.request('/damage-declarations', {
      method: 'POST',
      body: JSON.stringify(declarationData),
    });
  }

  async updateDamageDeclaration(declarationId, declarationData) {
    return this.request(`/damage-declarations/${declarationId}`, {
      method: 'PUT',
      body: JSON.stringify(declarationData),
    });
  }

  // Admin methods (require admin role)
  async getAllCultivationDeclarations(status = null) {
    const query = status ? `?status=${status}` : '';
    return this.request(`/admin/cultivation-declarations${query}`);
  }

  async getAllDamageDeclarations(status = null) {
    const query = status ? `?status=${status}` : '';
    return this.request(`/admin/damage-declarations${query}`);
  }

  async assignInspector(declarationId, inspectorId) {
    return this.request(`/admin/damage-declarations/${declarationId}/assign-inspector?inspector_id=${inspectorId}`, {
      method: 'PUT',
    });
  }

  // Token management (for backward compatibility)
  setToken(token) {
    this.token = token;
    localStorage.setItem('access_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;

// Example usage in React components:

/*
// In LoginPage.tsx - Replace the mock login
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await apiService.cyLogin(email, password);
    onLogin(response.user);
    
    if (response.token) {
      apiService.setToken(response.token);
    }
  } catch (error) {
    console.error('Login failed:', error);
    // Handle error - show message to user
  }

  setIsLoading(false);
};

// In CultivationForm.tsx - Load real cultivation data
useEffect(() => {
  const loadCultivationData = async () => {
    try {
      const groups = await apiService.getCultivationGroups();
      setCultivationGroups(groups.data);
    } catch (error) {
      console.error('Failed to load cultivation groups:', error);
    }
  };

  loadCultivationData();
}, []);

// When cultivation type changes
const handleCultivationTypeChange = async (groupId) => {
  try {
    const cultivations = await apiService.getCultivations(groupId);
    setCultivations(cultivations.data);
  } catch (error) {
    console.error('Failed to load cultivations:', error);
  }
};

// In Dashboard.tsx - Load user's plots
useEffect(() => {
  const loadUserPlots = async () => {
    if (userData?.id) {
      try {
        const plots = await apiService.getPlots(userData.id);
        setUserPlots(plots.data);
      } catch (error) {
        console.error('Failed to load plots:', error);
      }
    }
  };

  loadUserPlots();
}, [userData]);
*/