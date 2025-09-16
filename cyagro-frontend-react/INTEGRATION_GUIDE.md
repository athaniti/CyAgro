# Οδηγίες Ενσωμάτωσης API με React App

## Επισκόπηση

Αυτός ο οδηγός περιγράφει πώς να ενσωματώσετε το CyAgro API με την υπάρχουσα React εφαρμογή.

## Βήματα Ενσωμάτωσης

### 1. Εγκατάσταση και Εκκίνηση του API

```bash
# Μεταβείτε στον φάκελο API
cd "c:\Users\athan\Downloads\CyAgro Demo\api"

# Εγκαταστήστε dependencies
npm install

# Ρυθμίστε το .env αρχείο
cp .env.example .env
# Επεξεργαστείτε το .env με τα στοιχεία της βάσης σας

# Εκτελέστε τα database migrations
mysql -u your_username -p cyagro_db < ../database/migration.sql
mysql -u your_username -p cyagro_db < ../database/schema_extension.sql  
mysql -u your_username -p cyagro_db < ../database/sample_data.sql

# Ξεκινήστε το API server
npm run dev
```

### 2. Ρύθμιση React App για χρήση API

#### Α. Προσθήκη Environment Variables

Δημιουργήστε ή ενημερώστε το `.env` αρχείο στο root του React project:

```env
REACT_APP_API_URL=http://localhost:3001/api
```

#### Β. Χρήση του ApiService

Το αρχείο `src/services/apiService.js` είναι έτοιμο για χρήση. Εισάγετε το σε οποιοδήποτε component:

```javascript
import apiService from '../services/apiService';
```

### 3. Αντικατάσταση Mock Data

#### LoginPage.tsx

Αντικαταστήστε τη mock λογική login:

```javascript
// Παλιό
setTimeout(() => {
  const mockUserData = { ... };
  onLogin(mockUserData);
}, 2000);

// Νέο
try {
  const response = await apiService.cyLogin(email, password);
  onLogin(response.user);
} catch (error) {
  setError('Login failed');
}
```

#### CultivationForm.tsx

Φορτώστε πραγματικά δεδομένα καλλιεργειών:

```javascript
// Αντικαταστήστε το στατικό cropTypes object
useEffect(() => {
  const loadCultivationData = async () => {
    try {
      const [groups, cultivations, varieties] = await Promise.all([
        apiService.getCultivationGroups(),
        apiService.getCultivations(),
        apiService.getVarieties()
      ]);
      
      setCultivationGroups(groups.data);
      setCultivations(cultivations.data);
      setVarieties(varieties.data);
    } catch (error) {
      console.error('Failed to load cultivation data:', error);
    }
  };

  loadCultivationData();
}, []);
```

#### Dashboard.tsx

Φορτώστε στατιστικά από την βάση:

```javascript
useEffect(() => {
  const loadDashboardData = async () => {
    if (userData?.id) {
      try {
        const plots = await apiService.getPlots(userData.id);
        const declarations = await apiService.getDeclarations(userData.id);
        
        setUserPlots(plots.data);
        setUserDeclarations(declarations.data);
        
        // Υπολογισμός στατιστικών
        const activeDeclarations = declarations.data.filter(d => d.status === 'approved');
        setPlotsCount(plots.data.length);
        setDeclarationsCount(activeDeclarations.length);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      }
    }
  };

  loadDashboardData();
}, [userData]);
```

### 4. Προσθήκη Error Handling

Δημιουργήστε ένα Error Context για global error handling:

```javascript
// src/contexts/ErrorContext.js
import React, { createContext, useContext, useState } from 'react';

const ErrorContext = createContext();

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  const clearError = () => setError(null);

  return (
    <ErrorContext.Provider value={{ error, showError, clearError }}>
      {children}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg">
          {error}
          <button onClick={clearError} className="ml-2">×</button>
        </div>
      )}
    </ErrorContext.Provider>
  );
};
```

### 5. Προσθήκη Loading States

Δημιουργήστε ένα Loading Context:

```javascript
// src/contexts/LoadingContext.js
import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const showLoading = (message = 'Loading...') => {
    setLoadingMessage(message);
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
    setLoadingMessage('');
  };

  return (
    <LoadingContext.Provider value={{ loading, loadingMessage, showLoading, hideLoading }}>
      {children}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>{loadingMessage}</p>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};
```

### 6. Ενημέρωση App.tsx

```javascript
import { ErrorProvider } from './contexts/ErrorContext';
import { LoadingProvider } from './contexts/LoadingContext';

export default function App() {
  return (
    <ErrorProvider>
      <LoadingProvider>
        <div className="min-h-screen bg-gray-50">
          {/* Existing app content */}
        </div>
      </LoadingProvider>
    </ErrorProvider>
  );
}
```

### 7. Testing του API Integration

#### Α. Έλεγχος API Health

```javascript
// Προσθέστε στο Dashboard ή σε ένα test component
useEffect(() => {
  const testApiConnection = async () => {
    try {
      const health = await apiService.healthCheck();
      console.log('API Status:', health);
    } catch (error) {
      console.error('API Connection Failed:', error);
    }
  };

  testApiConnection();
}, []);
```

#### Β. Console Logging

Προσθέστε console.log στα API calls για debugging:

```javascript
const handleSubmit = async (formData) => {
  try {
    console.log('Submitting form data:', formData);
    const response = await apiService.createDeclaration(formData);
    console.log('API Response:', response);
    // Handle success
  } catch (error) {
    console.error('Form submission failed:', error);
    // Handle error
  }
};
```

### 8. Προσθήκη Authentication Token Management

```javascript
// Στο LoginPage, μετά από επιτυχή login
if (response.token) {
  apiService.setToken(response.token);
}

// Στο logout
const handleLogout = () => {
  apiService.clearToken();
  // Existing logout logic
};
```

### 9. Performance Optimization

#### Α. Data Caching

```javascript
// Χρήση React Query ή SWR για caching
import { useQuery } from 'react-query';

const { data: cultivationGroups, isLoading } = useQuery(
  'cultivationGroups',
  () => apiService.getCultivationGroups(),
  { staleTime: 5 * 60 * 1000 } // 5 minutes cache
);
```

#### Β. Lazy Loading

```javascript
// Φορτώστε δεδομένα μόνο όταν χρειάζονται
const [varieties, setVarieties] = useState([]);

const handleCultivationChange = async (cultivationId) => {
  if (cultivationId && varieties.length === 0) {
    const response = await apiService.getVarieties(cultivationId);
    setVarieties(response.data);
  }
};
```

## Debugging Tips

1. **Network Tab**: Ελέγξτε το Network tab στα Developer Tools
2. **API Logs**: Παρακολουθήστε τα logs του API server  
3. **CORS Issues**: Βεβαιωθείτε ότι το FRONTEND_URL στο .env είναι σωστό
4. **Database Connection**: Ελέγξτε τη σύνδεση με τη βάση δεδομένων

## Επόμενα Βήματα

1. Ενσωματώστε τα υπόλοιπα endpoints (damage declarations, documents)
2. Προσθέστε authentication middleware
3. Implement file upload για documents
4. Προσθέστε real-time notifications
5. Κάντε production deployment

## Υποστήριξη

Για προβλήματα κατά την ενσωμάτωση, ελέγξτε:
1. Τη σύνδεση βάσης δεδομένων
2. Τα ports (React: 3000, API: 3001)
3. Τα CORS settings
4. Τα environment variables