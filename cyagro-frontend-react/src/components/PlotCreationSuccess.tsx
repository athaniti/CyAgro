import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { CheckCircle, Clock, MapPin, User, Building, FileText, Home } from "lucide-react";
import { format } from "date-fns";
import { el } from "date-fns/locale";

export default function PlotCreationSuccess({ userData, plotData, onBack, onLogout }) {
  const plotId = `PLT-${Date.now().toString().slice(-8)}`;
  
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Success Message */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Επιτυχής Καταχώρηση!
            </h2>
            <p className="text-green-700 text-lg">
              Το τεμάχιο καταχωρήθηκε επιτυχώς και βρίσκεται υπό αξιολόγηση από την Υπηρεσία.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Plot Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#334692] flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Στοιχεία Τεμαχίου
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Κωδικός Τεμαχίου</p>
              <p className="font-mono font-bold text-[#334692]">{plotId}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Ημερομηνία Καταχώρησης</p>
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

          {/* Location Information */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Building className="w-4 h-4" />
              Γεωγραφικά Στοιχεία
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
              <div>
                <span className="text-gray-600">Επαρχία:</span>
                <p className="font-medium">{plotData.province}</p>
              </div>
              <div>
                <span className="text-gray-600">Κοινότητα:</span>
                <p className="font-medium">{plotData.community}</p>
              </div>
              <div>
                <span className="text-gray-600">Φ/Σ:</span>
                <p className="font-medium">{plotData.sheet}</p>
              </div>
              <div>
                <span className="text-gray-600">Μπλοκ:</span>
                <p className="font-medium">{plotData.block}</p>
              </div>
              <div>
                <span className="text-gray-600">Αρ. Τεμαχίου:</span>
                <p className="font-medium">{plotData.plotNumber}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-2">Περιγραφή/Τοποθεσία</h4>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
              {plotData.description}
            </p>
          </div>

          {/* Exploitation Status */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Καθεστώς Εκμετάλλευσης
            </h4>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="font-medium text-gray-900 mb-2">
                {plotData.exploitationStatus === 'ownership' ? 'Ιδιοκτησία' : 'Διαχείριση'}
              </p>
              {plotData.exploitationStatus === 'management' && plotData.contractStartDate && plotData.contractEndDate && (
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Έναρξη Συμβολαίου:</span> {' '}
                    {format(plotData.contractStartDate, "dd/MM/yyyy", { locale: el })}
                  </p>
                  <p>
                    <span className="font-medium">Λήξη Συμβολαίου:</span> {' '}
                    {format(plotData.contractEndDate, "dd/MM/yyyy", { locale: el })}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* User Information */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Στοιχεία Αιτούντα</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">Ονοματεπώνυμο:</span>
                <span className="ml-2 font-medium">{userData.fullName}</span>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 font-medium">{userData.email}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Information */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-orange-600 mt-1" />
            <div>
              <h3 className="font-medium text-orange-800 mb-2">Κατάσταση: Ανενεργό (Υπό Αξιολόγηση)</h3>
              <p className="text-orange-700 text-sm mb-3">
                Το τεμάχιο έχει καταχωρηθεί ως χειροκίνητα εισαγόμενο και έχει σημειωθεί ως εκτός ΚΟΑΠ. 
                Στάλθηκε για αξιολόγηση σε εσωτερικό χρήστη.
              </p>
              <div className="space-y-1 text-sm text-orange-700">
                <p>• Προέλευση: Εκτός ΚΟΑΠ (Χειροκίνητη καταχώρηση)</p>
                <p>• Ελέγχεται η ορθότητα των στοιχείων</p>
                <p>• Επαληθεύεται η νομιμότητα εκμετάλλευσης</p>
                <p>• Διενεργείται τεχνικός έλεγχος</p>
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
              <h4 className="font-medium">Παρακολούθηση Αίτησης</h4>
              <p className="text-gray-600 text-sm">
                Μπορείτε να παρακολουθήσετε την πορεία της αίτησής σας στην ενότητα "Τα Τεμάχιά Μου".
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium">Χρόνος Επεξεργασίας</h4>
              <p className="text-gray-600 text-sm">
                Η αξιολόγηση χειροκίνητων καταχωρήσεων συνήθως ολοκληρώνεται εντός 7-15 εργάσιμων ημερών.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Building className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium">Επιπλέον Στοιχεία</h4>
              <p className="text-gray-600 text-sm">
                Η υπηρεσία μπορεί να επικοινωνήσει μαζί σας για επιπλέον διευκρινίσεις ή έγγραφα.
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