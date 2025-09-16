import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, Sprout, FileText, CreditCard, Home, Calendar, MapPin } from "lucide-react";

export default function DeclarationSuccess({ 
  userData, 
  selectedPlot, 
  declarationData, 
  paymentData, 
  onBack, 
  onLogout 
}) {
  const declarationId = `DECL-${Date.now().toString().slice(-8)}`;
  
  const getCultivationTypeText = (type) => {
    return type === 'seasonal' ? 'Εποχιακή' : 'Μόνιμη';
  };

  const getCropLabel = (crop) => {
    const cropLabels = {
      wheat: 'Σιτάρι',
      barley: 'Κριθάρι', 
      corn: 'Καλαμπόκι',
      cotton: 'Βαμβάκι',
      tomato: 'Ντομάτα',
      olive: 'Ελιά',
      citrus: 'Εσπεριδοειδή',
      grape: 'Αμπέλι',
      apple: 'Μηλιά',
      almond: 'Αμυγδαλιά'
    };
    return cropLabels[crop] || crop;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Success Message */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Επιτυχής Υποβολή Δήλωσης!
            </h2>
            <p className="text-green-700 text-lg">
              Η δήλωση καλλιέργειας υποβλήθηκε και καταχωρήθηκε επιτυχώς στο σύστημα.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Declaration Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#334692] flex items-center gap-2">
            <Sprout className="w-5 h-5" />
            Στοιχεία Δήλωσης Καλλιέργειας
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
          </div>

          {/* Plot Information */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Στοιχεία Τεμαχίου
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>
                <span className="text-gray-600">Τοποθεσία:</span>
                <p className="font-medium">{selectedPlot.province}, {selectedPlot.community}</p>
              </div>
              <div>
                <span className="text-gray-600">Φ/Σ-Μπλοκ-Τεμάχιο:</span>
                <p className="font-medium">{selectedPlot.sheet}-{selectedPlot.block}-{selectedPlot.plotNumber}</p>
              </div>
              <div>
                <span className="text-gray-600">Συνολική Έκταση:</span>
                <p className="font-medium">{selectedPlot.area}</p>
              </div>
              <div>
                <span className="text-gray-600">Καλλιεργήσιμη:</span>
                <p className="font-medium">{declarationData.cultivatedArea} στρέμματα</p>
              </div>
            </div>
          </div>

          {/* Cultivation Details */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Στοιχεία Καλλιέργειας</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Τύπος Καλλιέργειας:</span>
                <p className="font-medium">{getCultivationTypeText(declarationData.cultivationType)}</p>
              </div>
              <div>
                <span className="text-gray-600">Είδος:</span>
                <p className="font-medium">{getCropLabel(declarationData.crop)}</p>
              </div>
              <div>
                <span className="text-gray-600">Ποικιλία:</span>
                <p className="font-medium">{declarationData.variety}</p>
              </div>
              <div>
                <span className="text-gray-600">Ημερομηνία Φύτευσης:</span>
                <p className="font-medium">
                  {new Date(declarationData.plantingDate).toLocaleDateString('el-GR')}
                </p>
              </div>
            </div>
            
            {declarationData.numberOfTrees && (
              <div className="mt-3">
                <span className="text-gray-600 text-sm">Αριθμός Δέντρων:</span>
                <span className="ml-2 font-medium">{declarationData.numberOfTrees}</span>
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Επιπλέον Στοιχεία</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Μέθοδος Άρδευσης:</span>
                <p className="font-medium">
                  {declarationData.irrigationMethod === 'drip' && 'Στάγδην'}
                  {declarationData.irrigationMethod === 'sprinkler' && 'Καταιονισμός'}
                  {declarationData.irrigationMethod === 'furrow' && 'Αυλάκια'}
                  {declarationData.irrigationMethod === 'none' && 'Χωρίς άρδευση'}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Βιολογική Καλλιέργεια:</span>
                <p className="font-medium">{declarationData.organicCertified === 'yes' ? 'Ναι' : 'Όχι'}</p>
              </div>
            </div>
            
            {declarationData.notes && (
              <div className="mt-3">
                <span className="text-gray-600 text-sm">Παρατηρήσεις:</span>
                <p className="font-medium bg-gray-50 p-2 rounded mt-1">{declarationData.notes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#334692] flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Στοιχεία Πληρωμής
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-600">Κωδικός Συναλλαγής:</span>
              <p className="font-mono font-medium">{paymentData.transactionId}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-600">Ποσό:</span>
              <p className="font-medium">€{paymentData.amount}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-600">Κατάσταση:</span>
              <Badge className="bg-green-100 text-green-800">Ολοκληρώθηκε</Badge>
            </div>
          </div>
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
                <p>• <strong>Αριθμός συναλλαγής:</strong> {paymentData.transactionId} καταχωρήθηκε</p>
                <p>• <strong>Αριθμός εξωτερικού χρήστη:</strong> {userData.id || 'USR-' + Date.now().toString().slice(-6)} ενημερώθηκε</p>
                <p>• <strong>Λογιστικό σύστημα:</strong> Ενημερώθηκε αυτόματα</p>
                <p>• <strong>Κατάσταση συναλλαγής:</strong> Ολοκληρώθηκε επιτυχώς</p>
                {selectedPlot.isAgriculturalPlot && (
                  <p>• <strong>Αγροτεμάχιο:</strong> Η δήλωση εφαρμόστηκε σε όλα τα συμπεριλαμβανόμενα τεμάχια</p>
                )}
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
            <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium">Παρακολούθηση Δήλωσης</h4>
              <p className="text-gray-600 text-sm">
                Μπορείτε να παρακολουθήσετε την κατάσταση της δήλωσής σας στην ενότητα "Δηλώσεις Καλλιέργειας".
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium">Επόμενη Περίοδος</h4>
              <p className="text-gray-600 text-sm">
                Για εποχιακές καλλιέργειες, η επόμενη δήλωση θα πρέπει να γίνει έως 31/03 του επόμενου έτους.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium">Αποδείξεις</h4>
              <p className="text-gray-600 text-sm">
                Οι αποδείξεις πληρωμής και δήλωσης θα σταλούν στο email σας εντός 24 ωρών.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

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