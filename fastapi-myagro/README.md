# CyAgro FastAPI Server - Επεκτεταμένη Έκδοση

## Επισκόπηση

Αυτή είναι η επεκτεταμένη έκδοση του CyAgro FastAPI server που περιλαμβάνει:

### Νέα Χαρακτηριστικά
- 👥 **Διαχείριση Χρηστών**: Εγγραφή, authentication, προφίλ
- 🗺️ **Γεωγραφικά Δεδομένα**: Περιφέρειες, νομοί, κοινότητες
- 🏞️ **Διαχείριση Τεμαχίων**: Plots και Agricultural Plots
- 📋 **Δηλώσεις Καλλιέργειας**: Πλήρης lifecycle management
- ⚠️ **Δηλώσεις Ζημιάς**: Αναφορά και επιθεώρηση ζημιών
- 📄 **Διαχείριση Εγγράφων**: Upload και αποθήκευση αρχείων
- 🔐 **Βελτιωμένη Ασφάλεια**: JWT tokens, role-based access

### Υπάρχοντα Χαρακτηριστικά (Διατηρημένα)
- 🏢 **Departments**: Υπηρεσίες/Τμήματα
- 🏞️ **Land Parcels**: Γήπεδα/Εκτάσεις  
- 🌾 **Cultivation Groups**: Ομάδες καλλιεργειών
- 🌱 **Cultivations**: Καλλιέργειες
- 🧬 **Varieties**: Ποικιλίες
- ⚠️ **Harmful Causes**: Αίτια ζημιάς

## API Endpoints

### Authentication
- `POST /login` - Login με username/password
- `POST /users/register` - Εγγραφή νέου χρήστη
- `GET /users/me` - Στοιχεία τρέχοντος χρήστη
- `PUT /users/me` - Ενημέρωση προφίλ

### Geographic Data
- `GET /regions` - Λίστα περιφερειών
- `GET /regions/{id}/provinces` - Νομοί περιφέρειας
- `GET /provinces/{id}/communities` - Κοινότητες νομού

### Plot Management
- `GET /plots` - Τα τεμάχιά μου
- `POST /plots` - Δημιουργία νέου τεμαχίου
- `GET /plots/{id}` - Στοιχεία τεμαχίου
- `PUT /plots/{id}` - Ενημέρωση τεμαχίου
- `DELETE /plots/{id}` - Διαγραφή τεμαχίου

### Agricultural Plots
- `GET /agricultural-plots` - Τα αγροτεμάχιά μου
- `POST /agricultural-plots` - Δημιουργία αγροτεμαχίου
- `GET /plots/{id}/agricultural-plots` - Αγροτεμάχια τεμαχίου

### Cultivation Data
- `GET /groups` - Ομάδες καλλιεργειών (υπάρχον)
- `GET /cultivations` - Καλλιέργειες (υπάρχον)
- `GET /varieties` - Ποικιλίες (υπάρχον)
- `GET /cultivation-groups/{id}/cultivations` - Καλλιέργειες ομάδας
- `GET /cultivations/{id}/varieties` - Ποικιλίες καλλιέργειας

### Cultivation Declarations
- `GET /cultivation-declarations` - Οι δηλώσεις μου
- `POST /cultivation-declarations` - Νέα δήλωση
- `GET /cultivation-declarations/{id}` - Στοιχεία δήλωσης
- `PUT /cultivation-declarations/{id}` - Ενημέρωση δήλωσης

### Damage Declarations
- `GET /damage-declarations` - Οι δηλώσεις ζημιάς μου
- `POST /damage-declarations` - Νέα δήλωση ζημιάς
- `GET /damage-declarations/{id}` - Στοιχεία δήλωσης ζημιάς
- `PUT /damage-declarations/{id}` - Ενημέρωση δήλωσης ζημιάς

### Admin Endpoints
- `GET /admin/cultivation-declarations` - Όλες οι δηλώσεις (admin)
- `GET /admin/damage-declarations` - Όλες οι δηλώσεις ζημιάς (admin/inspector)
- `PUT /admin/damage-declarations/{id}/assign-inspector` - Ανάθεση επιθεωρητή

## Database Schema

### Νέοι Πίνακες
- `users` - Χρήστες συστήματος
- `regions` - Περιφέρειες
- `provinces` - Νομοί  
- `communities` - Κοινότητες
- `plots` - Τεμάχια
- `agricultural_plots` - Αγροτεμάχια
- `cultivation_declarations` - Δηλώσεις καλλιέργειας
- `damage_declarations` - Δηλώσεις ζημιάς
- `documents` - Έγγραφα/Αρχεία

### Υπάρχοντες Πίνακες (Διατηρημένοι)
- `departments` - Υπηρεσίες
- `land_parcels` - Γήπεδα
- `cultivation_groups` - Ομάδες καλλιεργειών
- `cultivations` - Καλλιέργειες
- `varieties` - Ποικιλίες
- `harmful_causes` - Αίτια ζημιάς

## Εγκατάσταση & Εκκίνηση

### 1. Εγκατάσταση Dependencies
```bash
cd fastapi
pip install -r requirements.txt
```

### 2. Διαμόρφωση Database
```bash
# Δημιουργία .env αρχείου
cp .env.example .env

# Επεξεργασία .env με τα στοιχεία της βάσης σας
# DATABASE_URL=mysql+pymysql://username:password@host:port/database

# Εκτέλεση migrations στη βάση δεδομένων
mysql -u your_user -p cyagro < ../database/schema_extension.sql
mysql -u your_user -p cyagro < ../database/sample_data.sql
```

### 3. Εκκίνηση Server
```bash
# Development mode
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Production mode
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### 4. Έλεγχος λειτουργίας
- API Documentation: http://localhost:8000/docs
- API Health: http://localhost:8000/
- Alternative docs: http://localhost:8000/redoc

## Χρήση

### Authentication Flow
1. Χρήστης κάνει register: `POST /users/register`
2. Χρήστης κάνει login: `POST /login` 
3. Λαμβάνει JWT token
4. Χρησιμοποιεί token σε Authorization header: `Bearer <token>`

### Δημιουργία Plot & Agricultural Plot
1. Δημιουργία Plot: `POST /plots`
2. Δημιουργία Agricultural Plot στο Plot: `POST /agricultural-plots`
3. Δημιουργία Cultivation Declaration: `POST /cultivation-declarations`

### Αναφορά Ζημιάς
1. Δημιουργία Damage Declaration: `POST /damage-declarations`
2. Admin αναθέτει inspector: `PUT /admin/damage-declarations/{id}/assign-inspector`
3. Inspector ενημερώνει αποτελέσματα: `PUT /damage-declarations/{id}`

## Ασφάλεια

### Roles
- **farmer**: Δημιουργία/διαχείριση δικών τους plots και declarations
- **inspector**: Επιθεώρηση damage declarations
- **admin**: Πλήρης πρόσβαση σε όλα τα δεδομένα

### Authentication
- JWT tokens με configurable expiration
- Password hashing με bcrypt
- Role-based access control

## Testing

### Test Users (από το αρχικό auth.py)
- Username: `admin`, Password: `1234`
- Username: `demo`, Password: `demo`

### API Testing
- Χρησιμοποιήστε το Postman collection: `CyAgro_Demo.postman_collection.json`
- Ή το built-in Swagger UI: http://localhost:8000/docs

## Παραμετροποίηση

Επεξεργαστείτε το `.env` αρχείο για:
- Database connection
- JWT secret key
- CORS settings  
- File upload settings
- Debug mode

## Troubleshooting

### Συνήθη Προβλήματα

1. **Database Connection Error**
   - Ελέγξτε τα στοιχεία στο .env
   - Βεβαιωθείτε ότι η MySQL τρέχει
   - Ελέγξτε ότι η βάση cyagro υπάρχει

2. **Import Errors**
   - Εγκαταστήστε τα missing packages: `pip install -r requirements.txt`
   - Ελέγξτε Python version (3.8+)

3. **CORS Errors**
   - Ενημερώστε τα FRONTEND_URL και ANGULAR_URL στο .env
   - Επανεκκινήστε τον server

4. **Token Errors**
   - Ελέγξτε ότι το SECRET_KEY είναι σωστό
   - Βεβαιωθείτε ότι στέλνετε το token στο Authorization header

## Επόμενα Βήματα

1. ✅ Εγκαταστήστε τις dependencies
2. ✅ Ρυθμίστε τη βάση δεδομένων
3. ✅ Εκκινήστε τον server
4. 🔄 Ενσωματώστε με το React frontend
5. 🔄 Δοκιμάστε όλα τα endpoints
6. 🔄 Προσθέστε production configurations