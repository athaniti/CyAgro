# CyAgro API Documentation

## Περιγραφή

REST API για την εφαρμογή CyAgro που διαχειρίζεται γεωργικά τεμάχια, καλλιέργειες και δηλώσεις ζημιάς στην Κύπρο.

## Εγκατάσταση

### Προαπαιτούμενα

- Node.js (v16 ή νεότερη)
- MySQL (v8.0 ή νεότερη)
- npm ή yarn

### Βήματα Εγκατάστασης

1. **Clone το repository και μεταβείτε στον φάκελο api:**
   ```bash
   cd "c:\Users\athan\Downloads\CyAgro Demo\api"
   ```

2. **Εγκαταστήστε τις εξαρτήσεις:**
   ```bash
   npm install
   ```

3. **Δημιουργήστε την βάση δεδομένων:**
   ```sql
   CREATE DATABASE cyagro_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

4. **Εκτελέστε τα migration scripts:**
   ```bash
   mysql -u your_username -p cyagro_db < ../database/migration.sql
   mysql -u your_username -p cyagro_db < ../database/schema_extension.sql
   mysql -u your_username -p cyagro_db < ../database/sample_data.sql
   ```

5. **Δημιουργήστε το .env αρχείο:**
   ```bash
   cp .env.example .env
   ```

6. **Επεξεργαστείτε το .env με τα δικά σας στοιχεία:**
   ```env
   NODE_ENV=development
   PORT=3001
   
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=cyagro_db
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRES_IN=7d
   
   FRONTEND_URL=http://localhost:3000
   ```

7. **Ξεκινήστε τον server:**
   ```bash
   npm run dev  # για development
   # ή
   npm start    # για production
   ```

## API Endpoints

### Authentication

- `POST /api/auth/cy-login` - Mock CY-Login authentication
- `POST /api/auth/register` - Complete user profile/registration

### Plots (Τεμάχια)

- `GET /api/plots?userId=X` - Λήψη τεμαχίων χρήστη
- `GET /api/plots/:id` - Λήψη συγκεκριμένου τεμαχίου
- `POST /api/plots` - Δημιουργία νέου τεμαχίου
- `PUT /api/plots/:id` - Ενημέρωση τεμαχίου
- `DELETE /api/plots/:id` - Διαγραφή τεμαχίου
- `GET /api/plots/meta/communities` - Λήψη κοινοτήτων

### Cultivations (Καλλιέργειες)

- `GET /api/cultivations/groups` - Λήψη ομάδων καλλιεργειών
- `GET /api/cultivations/simple/groups` - Απλή λίστα ομάδων
- `GET /api/cultivations/simple/cultivations` - Απλή λίστα καλλιεργειών
- `GET /api/cultivations/simple/varieties` - Απλή λίστα ποικιλιών

### Declarations (Δηλώσεις Καλλιέργειας)

- `GET /api/declarations?userId=X` - Λήψη δηλώσεων χρήστη
- `GET /api/declarations/:id` - Λήψη συγκεκριμένης δήλωσης
- `POST /api/declarations` - Δημιουργία νέας δήλωσης
- `PATCH /api/declarations/:id/status` - Ενημέρωση κατάστασης δήλωσης

### Health Check

- `GET /api/health` - Έλεγχος κατάστασης API

## Δομή Βάσης Δεδομένων

### Κύριοι Πίνακες

1. **users** - Στοιχεία χρηστών
2. **regions** - Περιφέρειες
3. **provinces** - Επαρχίες  
4. **communities** - Κοινότητες
5. **land_plots** - Γεωργικά τεμάχια
6. **agricultural_plots** - Αγροτεμάχια
7. **cultivation_declarations** - Δηλώσεις καλλιέργειας
8. **damage_declarations** - Δηλώσεις ζημιάς
9. **documents** - Έγγραφα
10. **application_history** - Ιστορικό αιτήσεων

### Υπάρχοντες Πίνακες

- **cultivation_groups** - Ομάδες καλλιεργειών
- **cultivations** - Καλλιέργειες
- **varieties** - Ποικιλίες
- **harmful_causes** - Ζημιογόνα αίτια

## Παραδείγματα Χρήσης

### 1. Login χρήστη

```javascript
const response = await fetch('http://localhost:3001/api/auth/cy-login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  }),
});

const data = await response.json();
console.log(data.user);
```

### 2. Λήψη τεμαχίων χρήστη

```javascript
const response = await fetch('http://localhost:3001/api/plots?userId=1');
const data = await response.json();
console.log(data.data); // Array of plots
```

### 3. Δημιουργία νέου τεμαχίου

```javascript
const plotData = {
  userId: 1,
  communityId: 4,
  sheetNumber: 'XXI-52',
  blockNumber: '8',
  plotNumber: '149',
  totalArea: 20.50,
  cultivableArea: 19.00,
  irrigationMethod: 'drip',
  soilType: 'Αργιλλώδες',
  ownershipType: 'owned',
  registrationDate: '2024-03-15'
};

const response = await fetch('http://localhost:3001/api/plots', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(plotData),
});
```

## Ασφάλεια

- Rate limiting: 100 αιτήσεις ανά 15 λεπτά
- CORS configuration για συγκεκριμένα domains
- Helmet.js για security headers
- Input validation με express-validator
- JWT tokens για authentication (σε μελλοντική έκδοση)

## Development

```bash
# Εκκίνηση σε development mode με auto-restart
npm run dev

# Εκτέλεση tests (όταν προστεθούν)
npm test
```

## Production Deployment

1. Θέστε `NODE_ENV=production`
2. Χρησιμοποιήστε ισχυρό JWT secret
3. Ρυθμίστε SSL/HTTPS
4. Χρησιμοποιήστε process manager (π.χ. PM2)
5. Ρυθμίστε database backups

## Support

Για υποστήριξη ή ερωτήσεις, επικοινωνήστε με την ομάδα ανάπτυξης.