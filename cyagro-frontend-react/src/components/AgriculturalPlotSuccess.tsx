import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, MapPin, Calculator, FileText, Home, Combine } from "lucide-react";

export default function AgriculturalPlotSuccess({ 
  userData, 
  selectedPlot, 
  adjacentPlots, 
  agriculturalPlotData, 
  onBack, 
  onLogout 
}) {
  const agriculturalPlotId = `AGR-${Date.now().toString().slice(-8)}`;
  const allPlots = [selectedPlot, ...adjacentPlots];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Success Message */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Επιτυχής Δημιουργία Αγροτεμαχίου!
            </h2>
            <p className="text-green-700 text-lg">
              Το νέο αγροτεμάχιο δημιουργήθηκε επιτυχώς με ενοποιημένα στοιχεία και τίτλους ιδιοκτησίας.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Agricultural Plot Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#334692] flex items-center gap-2">
            <Combine className="w-5 h-5" />
            Στοιχεία Αγροτεμαχίου
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Κωδικός Αγροτεμαχίου</p>
              <p className="font-mono font-bold text-[#334692]">{agriculturalPlotId}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Ημερομηνία Δημιουργίας</p>
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

          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Βασικές Πληροφορίες</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Ονομασία:</span>
                <p className="font-medium">{agriculturalPlotData.plotName}</p>
              </div>
              <div>
                <span className="text-gray-600">Προβλεπόμενη Χρήση:</span>
                <p className="font-medium">{agriculturalPlotData.plannedUse}</p>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-gray-600">Περιγραφή:</span>
              <p className="font-medium bg-gray-50 p-3 rounded-lg mt-1">
                {agriculturalPlotData.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#334692] flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Στατιστικά Συρραφής
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{agriculturalPlotData.totalPlots}</div>
              <div className="text-sm text-gray-600">Συρραμμένα Τεμάχια</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{agriculturalPlotData.totalArea}</div>
              <div className="text-sm text-gray-600">Συνολικά Στρέμματα</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{agriculturalPlotData.ownedPlots}</div>
              <div className="text-sm text-gray-600">Ιδιοκτησία</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{agriculturalPlotData.managedPlots}</div>
              <div className="text-sm text-gray-600">Διαχείριση</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Merged Plots Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#334692] flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Συρραμμένα Τεμάχια
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {allPlots.map((plot, index) => (
              <div 
                key={plot.id} 
                className={`p-4 rounded-lg border ${
                  index === 0 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {index === 0 && (
                      <Badge className="bg-blue-600 text-white">Αρχικό</Badge>
                    )}
                    <div>
                      <h4 className="font-medium">Τεμάχιο {plot.plotNumber}</h4>
                      <p className="text-sm text-gray-600">
                        Κωδικός: {plot.id}
                      </p>
                      <p className="text-sm text-gray-600">
                        Τοποθεσία: {plot.sheet}-{plot.block}-{plot.plotNumber}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-lg">{plot.area}</p>
                    <Badge 
                      variant={
                        plot.exploitationStatus === 'ownership' || plot.ownershipType === 'Ιδιοκτησία' 
                          ? 'default' 
                          : 'secondary'
                      }
                    >
                      {plot.exploitationStatus === 'ownership' || plot.ownershipType === 'Ιδιοκτησία' 
                        ? 'Ιδιοκτησία' 
                        : 'Διαχείριση'
                      }
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Information */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <FileText className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-medium text-blue-800 mb-2">Τεχνικές Πληροφορίες</h3>
              <div className="space-y-2 text-sm text-blue-700">
                <p>• <strong>Ενοποιημένη έκταση:</strong> Όλα τα τεμάχια έχουν συρραφεί σε ένα ενιαίο αγροτεμάχιο</p>
                <p>• <strong>Τίτλοι ιδιοκτησίας:</strong> Διατηρούνται όλοι οι αρχικοί τίτλοι για λόγους ιχνηλασιμότητας</p>
                <p>• <strong>Υπό-τεμάχια:</strong> Τα αρχικά τεμάχια αποθηκεύονται ως υπό-τεμάχια του αγροτεμαχίου</p>
                <p>• <strong>Κατάσταση:</strong> Το αγροτεμάχιο είναι άμεσα διαθέσιμο για χρήση</p>
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
            <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium">Διαχείριση Αγροτεμαχίου</h4>
              <p className="text-gray-600 text-sm">
                Μπορείτε να διαχειριστείτε το νέο αγροτεμάχιο από την ενότητα "Τα Τεμάχιά Μου".
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium">Νέες Αιτήσεις</h4>
              <p className="text-gray-600 text-sm">
                Μπορείτε να υποβάλετε αιτήσεις που αφορούν το ενιαίο αγροτεμάχιο.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Combine className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium">Περαιτέρω Συρραφή</h4>
              <p className="text-gray-600 text-sm">
                Μπορείτε να συρράψετε το αγροτεμάχιο με άλλα τεμάχια στο μέλλον.
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