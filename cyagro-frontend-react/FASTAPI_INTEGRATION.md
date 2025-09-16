# FastAPI Integration Guide

## Ολοκληρωμένη Ενημέρωση της CyAgro Εφαρμογής

Η εφαρμογή έχει ενημερωθεί για να χρησιμοποιεί το επεκτεταμένο FastAPI backend αντί για mock data.

## Τι Ενημερώθηκε

### 1. API Service (`src/services/apiService.js`)
- **Endpoint URL**: Αλλαγή από `http://localhost:3001/api` σε `http://localhost:8000`
- **Authentication**: Χρήση FastAPI JWT tokens αντί για mock tokens
- **Endpoints**: Ενημέρωση όλων των endpoints για να ταιριάζουν με το FastAPI:
  - Authentication: `/login`, `/register`
  - Plots: `/plots`, `/agricultural-plots`
  - Locations: `/regions`, `/provinces`, `/communities`
  - Cultivations: `/cultivation-groups`, `/cultivations`, `/varieties`
  - Declarations: `/cultivation-declarations`, `/damage-declarations`

### 2. Login Component (`src/components/LoginPage.tsx`)
- **Real Authentication**: Χρήση πραγματικού API call στο FastAPI `/login` endpoint
- **Error Handling**: Προσθήκη error display για αποτυχημένα login attempts
- **User Data**: Ανάγνωση user profile data από τη βάση δεδομένων

### 3. Database Integration
- **Πλήρης Schema**: 12 πίνακες με όλα τα απαραίτητα δεδομένα
- **Sample Data**: Δημιουργία realistικών test δεδομένων
- **Compatibility**: Διορθωμένο schema για πλήρη συμβατότητα με FastAPI

## Πώς να Ξεκινήσετε

### 1. Εκκίνηση MySQL Database
```sql
-- Εκτέλεση των scripts στη σειρά:
-- 1. cleanup_tables.sql (εάν χρειάζεται)
-- 2. schema_corrected.sql
-- 3. sample_data_corrected.sql
```

### 2. Εκκίνηση FastAPI Server
```powershell
cd "fastapi"
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Εκκίνηση React App
```powershell
npm run dev
# ή
yarn dev
```

## Διαθέσιμα Endpoints

### Authentication
- `POST /login` - User login με username/password
- `POST /register` - User registration
- `GET /users/me` - Current user profile

### Locations
- `GET /regions` - Όλες οι περιφέρειες
- `GET /provinces?region_id=X` - Νομαρχίες ανά περιφέρεια
- `GET /communities?province_id=X` - Κοινότητες ανά νομαρχία

### Plots
- `GET /plots` - Όλα τα plots
- `GET /users/{user_id}/plots` - User plots
- `POST /plots` - Δημιουργία νέου plot
- `GET /agricultural-plots` - Όλα τα αγροτεμάχια
- `POST /agricultural-plots` - Δημιουργία αγροτεμαχίου

### Cultivations
- `GET /cultivation-groups` - Ομάδες καλλιεργειών
- `GET /cultivations?group_id=X` - Καλλιέργειες ανά ομάδα
- `GET /varieties?cultivation_id=X` - Ποικιλίες ανά καλλιέργεια

### Declarations
- `GET /cultivation-declarations` - Όλες οι δηλώσεις καλλιέργειας
- `POST /cultivation-declarations` - Νέα δήλωση καλλιέργειας
- `GET /damage-declarations` - Όλες οι δηλώσεις ζημιάς
- `POST /damage-declarations` - Νέα δήλωση ζημιάς

## Test Users

Στη βάση δεδομένων υπάρχουν test users:

1. **farmer1@example.com** / password123
   - Role: farmer
   - Πλήρες προφίλ με plots και declarations

2. **inspector1@example.com** / password123
   - Role: inspector
   - Δικαιώματα επιθεώρησης

3. **admin1@example.com** / password123
   - Role: admin
   - Πλήρη δικαιώματα διαχείρισης

## API Documentation

Όταν τρέχει το FastAPI server, η τεκμηρίωση είναι διαθέσιμη στα:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Επόμενα Βήματα

1. **Δοκιμή Login**: Χρήση των test users για login
2. **Component Updates**: Ενημέρωση υπόλοιπων components για χρήση real data
3. **Error Handling**: Βελτίωση error handling σε όλα τα components
4. **Performance**: Προσθήκη loading states και caching όπου χρειάζεται

## Troubleshooting

### Common Issues:

1. **Database Connection Error**:
   - Βεβαιωθείτε ότι η MySQL τρέχει
   - Ελέγξτε τα credentials στο `fastapi/database.py`

2. **CORS Error**:
   - Το FastAPI έχει ήδη configured CORS για localhost:3000

3. **Login Failed**:
   - Χρησιμοποιήστε τους test users που αναφέρονται παραπάνω
   - Βεβαιωθείτε ότι τα passwords είναι σωστά hashed στη βάση

4. **Empty Data**:
   - Εκτελέστε το `sample_data_corrected.sql` για test data