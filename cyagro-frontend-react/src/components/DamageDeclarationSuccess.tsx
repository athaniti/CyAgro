import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, AlertTriangle, FileText, Calendar, MapPin, Home, Euro } from "lucide-react";

export default function DamageDeclarationSuccess({ 
  userData, 
  selectedDeclaration, 
  selectedPlot, 
  damageDeclarationData, 
  onBack, 
  onLogout 
}) {
  const declarationId = `DMG-DECL-${Date.now().toString().slice(-8)}`;
  
  const getDamageTypeText = (type) => {
    switch (type) {
      case 'cultivation': return 'Καλλιέργεια';
      case 'livestock': return 'Ζωικό Κεφάλαιο';
      case 'fixed_assets': return 'Πάγιο Κεφάλαιο';
      default: return type;
    }
  };

  const getAssetTypeText = (type) => {
    const assetTypes = {
      building: 'Κτίριο',
      machinery: 'Μηχανήματα',
      greenhouse: 'Θερμοκήπιο',
      irrigation: 'Αρδευτικό Σύστημα',
      fence: 'Περίφραξη',
      other: 'Άλλο'
    };
    return assetTypes[type] || type;
  };

  const estimatedCompensation = parseFloat(damageDeclarationData.estimatedLoss) * 
    (parseFloat(selectedDeclaration.compensationRate) / 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Success Message */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Επιτυχής Υποβολή Δήλωσης Ζημιάς!
            </h2>
            <p className="text-green-700 text-lg">
              Η δήλωση ζημιάς υποβλήθηκε και καταχωρήθηκε επιτυχώς στο σύστημα.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Declaration Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#334692] flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Στοιχεία Δήλωσης Ζημιάς
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Κωδικός Δήλωσης</p>
              <p className="font-mono font-bold text-[#334692]">{declarationId}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Ημερομηνία Υποβολής</p>
              <p className="font-medium">
                {new Date().toLocaleDateString('el-GR', {
                  day: '2-digit',
                  month: 'long', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Κατάσταση</p>
              <Badge className={damageDeclarationData.isOnTime ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}>
                {damageDeclarationData.isOnTime ? "Εμπρόθεσμη" : "Εκπρόθεσμη"}
              </Badge>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Τύπος Ζημιάς</p>
              <p className="font-medium">{getDamageTypeText(damageDeclarationData.damageType)}</p>
            </div>
          </div>

          {/* Plot Information */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Στοιχεία Τεμαχίου
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>
                <span className="text-gray-600">Τεμάχιο:</span>
                <p className="font-medium">{selectedPlot.plotNumber}</p>
              </div>
              <div>
                <span className="text-gray-600">Κοινότητα:</span>
                <p className="font-medium">{selectedPlot.community}</p>
              </div>
              <div>
                <span className="text-gray-600">Φ/Σ-Μπλοκ:</span>
                <p className="font-medium">{selectedPlot.sheet}-{selectedPlot.block}</p>
              </div>
              <div>
                <span className="text-gray-600">Έκταση:</span>
                <p className="font-medium">{selectedPlot.area}</p>
              </div>
            </div>
          </div>

          {/* Damage Event Information */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Στοιχεία Ζημιάς</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Αίτιο Ζημιάς:</span>
                <p className="font-medium">{selectedDeclaration.cause}</p>
              </div>
              <div>
                <span className="text-gray-600">Ημερομηνία Πρόκλησης:</span>
                <p className="font-medium">
                  {new Date(damageDeclarationData.damageDate).toLocaleDateString('el-GR')}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Εκτιμώμενη Ζημιά:</span>
                <p className="font-medium">€{parseFloat(damageDeclarationData.estimatedLoss).toFixed(2)}</p>
              </div>
              <div>
                <span className="text-gray-600">Ποσοστό Αποζημίωσης:</span>
                <p className="font-medium">{selectedDeclaration.compensationRate}</p>
              </div>
            </div>
          </div>

          {/* Specific Details Based on Damage Type */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Λεπτομέρειες Ζημιάς</h4>
            
            {(damageDeclarationData.damageType === 'cultivation' || damageDeclarationData.damageType === 'livestock') && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">
                    {damageDeclarationData.damageType === 'cultivation' ? 'Καλλιέργεια:' : 'Είδος Ζώου:'}
                  </span>
                  <p className="font-medium">{damageDeclarationData.affectedCrop}</p>
                </div>
                <div>
                  <span className="text-gray-600">
                    {damageDeclarationData.damageType === 'cultivation' ? 'Επηρεασμένη Έκταση:' : 'Αριθμός Ζώων:'}
                  </span>
                  <p className="font-medium">
                    {damageDeclarationData.affectedArea} 
                    {damageDeclarationData.damageType === 'cultivation' ? ' στρέμματα' : ' ζώα'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Ποσοστό Ζημιάς:</span>
                  <p className="font-medium">{damageDeclarationData.damagePercentage}%</p>
                </div>
              </div>
            )}

            {damageDeclarationData.damageType === 'fixed_assets' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Τύπος Παγίου:</span>
                  <p className="font-medium">{getAssetTypeText(damageDeclarationData.assetType)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Αξία Παγίου:</span>
                  <p className="font-medium">€{parseFloat(damageDeclarationData.assetValue).toFixed(2)}</p>
                </div>
              </div>
            )}

            <div className="mt-3">
              <span className="text-gray-600 text-sm">Περιγραφή Συνθηκών:</span>
              <p className="font-medium bg-gray-50 p-3 rounded-lg mt-1">
                {damageDeclarationData.damageCircumstances}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compensation Estimate */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <Euro className="w-5 h-5" />
            Εκτιμώμενη Αποζημίωση
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">€{parseFloat(damageDeclarationData.estimatedLoss).toFixed(2)}</div>
              <div className="text-sm text-gray-600">Δηλωθείσα Ζημιά</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{selectedDeclaration.compensationRate}</div>
              <div className="text-sm text-gray-600">Ποσοστό Αποζημίωσης</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">€{estimatedCompensation.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Εκτιμώμενη Αποζημίωση</div>
            </div>
          </div>
          <p className="text-center text-sm text-green-700 mt-4">
            * Η τελική αποζημίωση θα καθοριστεί μετά την αξιολόγηση από την αρμόδια επιτροπή
          </p>
        </CardContent>
      </Card>

      {/* System Processing Info */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <FileText className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-medium text-blue-800 mb-2">Επεξεργασία Συστήματος</h3>
              <div className="space-y-2 text-sm text-blue-700">
                <p>• <strong>Δήλωση ζημιάς:</strong> Καταχωρήθηκε με κωδικό {declarationId}</p>
                <p>• <strong>Κατάσταση:</strong> {damageDeclarationData.isOnTime ? 'Εμπρόθεσμη υποβολή' : 'Εκπρόθεσμη υποβολή'}</p>
                <p>• <strong>Επαλήθευση στοιχείων:</strong> Ολοκληρώθηκε επιτυχώς</p>
                <p>• <strong>Βάση δεδομένων:</strong> Αποθηκεύτηκε και συνδέθηκε με το τεμάχιο</p>
                <p>• <strong>Επόμενο βήμα:</strong> Η δήλωση θα σταλεί για αξιολόγηση στην επιτροπή</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#334692]">Επόμενα Βήματα</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium">Αξιολόγηση Δήλωσης</h4>
              <p className="text-gray-600 text-sm">
                Η δήλωσή σας θα αξιολογηθεί από την αρμόδια επιτροπή εντός 30 εργάσιμων ημερών.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium">Επιτόπια Αξιολόγηση</h4>
              <p className="text-gray-600 text-sm">
                Ενδέχεται να πραγματοποιηθεί επιτόπια επίσκεψη για επαλήθευση της ζημιάς.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Euro className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium">Καταβολή Αποζημίωσης</h4>
              <p className="text-gray-600 text-sm">
                Μετά την έγκριση, η αποζημίωση θα καταβληθεί στον τραπεζικό σας λογαριασμό.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Witness Information */}
      {damageDeclarationData.witnessName && (
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="pt-6">
            <h4 className="font-medium text-purple-800 mb-2">Στοιχεία Μάρτυρα</h4>
            <div className="text-sm text-purple-700">
              <p><strong>Όνομα:</strong> {damageDeclarationData.witnessName}</p>
              {damageDeclarationData.witnessContact && (
                <p><strong>Επικοινωνία:</strong> {damageDeclarationData.witnessContact}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-center gap-4 pt-6">
        <Button 
          variant="outline" 
          className="border-[#334692] text-[#334692]"
          onClick={() => window.print()}
        >
          Εκτύπωση Επιβεβαίωσης
        </Button>
        
        <Button 
          onClick={onBack}
          className="bg-[#334692] hover:bg-[#2a3a7a] text-white"
        >
          <Home className="w-4 h-4 mr-2" />
          Επιστροφή στην Αρχική
        </Button>
        
        <Button 
          variant="outline"
          onClick={onLogout}
          className="border-gray-300 text-gray-700"
        >
          Αποσύνδεση
        </Button>
      </div>
    </div>
  );
}