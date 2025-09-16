import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { CheckCircle, Clock, FileText, User, Building, Mail } from "lucide-react";

export default function SuccessPage({ userData, registrationData, onLogout, onComplete }) {
  const applicationId = `REG-${Date.now().toString().slice(-8)}`;
  
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success Message */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Επιτυχής Καταχώρηση!
            </h2>
            <p className="text-green-700 text-lg">
              Η εγγραφή σας καταχωρήθηκε με επιτυχία στο Μητρώο. 
              Βρίσκεται υπό αξιολόγηση από τις αρμόδιες υπηρεσίες.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Application Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#334692] flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Στοιχεία Αίτησης
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Αριθμός Αίτησης</p>
              <p className="font-mono font-bold text-[#334692]">{applicationId}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Ημερομηνία Υποβολής</p>
              <p className="font-medium">
                {new Date().toLocaleDateString('el-GR', {
                  day: '2-digit',
                  month: '2-digit', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Προσωπικά Στοιχεία
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">Ονοματεπώνυμο:</span>
                <span className="ml-2 font-medium">{userData.fullName}</span>
              </div>
              <div>
                <span className="text-gray-600">Α.Δ.Τ.:</span>
                <span className="ml-2 font-medium">{userData.idNumber}</span>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 font-medium">{userData.email}</span>
              </div>
              <div>
                <span className="text-gray-600">Τηλέφωνο:</span>
                <span className="ml-2 font-medium">{userData.phone}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Building className="w-4 h-4" />
              Στοιχεία Εταιρείας
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">Επωνυμία:</span>
                <span className="ml-2 font-medium">{registrationData.companyName}</span>
              </div>
              <div>
                <span className="text-gray-600">Α.Μ. Εταιρείας:</span>
                <span className="ml-2 font-medium">{registrationData.companyRegistry}</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-gray-600">Διεύθυνση:</span>
                <span className="ml-2 font-medium">{registrationData.address}</span>
              </div>
              {registrationData.additionalEmail && (
                <div className="md:col-span-2">
                  <span className="text-gray-600">Επιπλέον Email:</span>
                  <span className="ml-2 font-medium">{registrationData.additionalEmail}</span>
                </div>
              )}
            </div>
          </div>

          {registrationData.documents && registrationData.documents.length > 0 && (
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">
                Μεταφορτωμένα Έγγραφα ({registrationData.documents.length})
              </h4>
              <div className="space-y-2">
                {registrationData.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span>{doc.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Status Information */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-orange-600 mt-1" />
            <div>
              <h3 className="font-medium text-orange-800 mb-2">Κατάσταση: Ανενεργός (Υπό Αξιολόγηση)</h3>
              <p className="text-orange-700 text-sm mb-3">
                Η αίτησή σας έχει ανατεθεί σε εσωτερικό χρήστη για διοικητικό έλεγχο. 
                Θα ενημερωθείτε για την πρόοδο μέσω email.
              </p>
              <div className="space-y-1 text-sm text-orange-700">
                <p>• Ελέγχεται η πληρότητα των στοιχείων</p>
                <p>• Επαληθεύονται τα υποβληθέντα δικαιολογητικά</p>
                <p>• Διενεργείται διοικητικός έλεγχος</p>
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
            <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium">Παρακολούθηση Πορείας</h4>
              <p className="text-gray-600 text-sm">
                Θα λάβετε ενημερώσεις στο email σας ({userData.email}) για την πρόοδο της αίτησης.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium">Διατήρηση Αριθμού Αίτησης</h4>
              <p className="text-gray-600 text-sm">
                Κρατήστε τον αριθμό αίτησης <strong>{applicationId}</strong> για μελλοντική αναφορά.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium">Χρόνος Επεξεργασίας</h4>
              <p className="text-gray-600 text-sm">
                Η αξιολόγηση συνήθως ολοκληρώνεται εντός 5-10 εργάσιμων ημερών.
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
          onClick={onComplete}
          className="bg-[#334692] hover:bg-[#2a3a7a] text-white"
        >
          Συνέχεια στις Υπηρεσίες
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