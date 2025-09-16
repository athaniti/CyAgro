import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Calendar, User, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

// Mock data for user's plots
const mockUserPlots = [
  {
    id: "PLT-12345678",
    province: "Λευκωσία",
    community: "Στρόβολος",
    sheet: "21/43",
    block: "Α",
    plotNumber: "123",
    area: "2.5 στρέμματα",
    status: "active",
    statusText: "Ενεργό",
    exploitationStatus: "ownership",
    exploitationText: "Ιδιοκτησία",
    description: "Γεωργικό τεμάχιο κοντά στο κέντρο του Στροβόλου",
    registrationDate: "2024-01-15"
  },
  {
    id: "PLT-12345679", 
    province: "Λευκωσία",
    community: "Στρόβολος",
    sheet: "21/43",
    block: "Α",
    plotNumber: "124",
    area: "1.8 στρέμματα",
    status: "active",
    statusText: "Ενεργό",
    exploitationStatus: "management",
    exploitationText: "Διαχείριση",
    description: "Όμορο τεμάχιο με το 123, κατάλληλο για συρραφή",
    registrationDate: "2024-02-20"
  },
  {
    id: "PLT-12345680",
    province: "Λεμεσός", 
    community: "Γερμασόγεια",
    sheet: "15/22",
    block: "Β",
    plotNumber: "87",
    area: "3.2 στρέμματα",
    status: "active",
    statusText: "Ενεργό",
    exploitationStatus: "ownership",
    exploitationText: "Ιδιοκτησία",
    description: "Παραθαλάσσιο τεμάχιο κατάλληλο για θερμοκήπια",
    registrationDate: "2024-03-10"
  },
  {
    id: "PLT-12345681",
    province: "Λευκωσία",
    community: "Λατσιά",
    sheet: "18/35",
    block: "Γ",
    plotNumber: "56",
    area: "4.1 στρέμματα",
    status: "pending",
    statusText: "Υπό Αξιολόγηση",
    exploitationStatus: "ownership",
    exploitationText: "Ιδιοκτησία",
    description: "Μεγάλο τεμάχιο κατάλληλο για καλλιέργεια δημητριακών",
    registrationDate: "2024-03-25"
  }
];

export default function MyPlotsSelection({ userData, onPlotSelect }) {
  const [selectedPlot, setSelectedPlot] = useState(null);

  const handlePlotSelection = (plot) => {
    setSelectedPlot(plot);
  };

  const handleContinue = () => {
    if (selectedPlot) {
      onPlotSelect(selectedPlot);
    }
  };

  const activePlots = mockUserPlots.filter(plot => plot.status === 'active');
  const pendingPlots = mockUserPlots.filter(plot => plot.status === 'pending');

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#334692] mb-2">
          Επιλογή Τεμαχίου για Συρραφή
        </h2>
        <p className="text-gray-600">
          Επιλέξτε ένα από τα καταχωρημένα τεμάχιά σας για να ξεκινήσετε τη διαδικασία συρραφής
        </p>
      </div>

      {/* Active Plots */}
      {activePlots.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            Ενεργά Τεμάχια ({activePlots.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activePlots.map((plot) => (
              <Card 
                key={plot.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedPlot?.id === plot.id 
                    ? 'border-2 border-[#334692] bg-blue-50 shadow-md' 
                    : 'border border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handlePlotSelection(plot)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">
                        Τεμάχιο {plot.plotNumber}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mb-2">
                        Κωδικός: {plot.id}
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {plot.statusText}
                        </Badge>
                        <Badge variant="outline">
                          {plot.exploitationText}
                        </Badge>
                      </div>
                    </div>
                    {selectedPlot?.id === plot.id && (
                      <CheckCircle2 className="w-6 h-6 text-[#334692]" />
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{plot.province}, {plot.community}</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Φ/Σ:</span>
                      <p className="font-medium">{plot.sheet}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Μπλοκ:</span>
                      <p className="font-medium">{plot.block}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Έκταση:</span>
                      <p className="font-medium">{plot.area}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                    {plot.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>Καταχώρηση: {new Date(plot.registrationDate).toLocaleDateString('el-GR')}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Pending Plots Info */}
      {pendingPlots.length > 0 && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertDescription className="text-orange-800">
            <strong>Τεμάχια υπό αξιολόγηση ({pendingPlots.length}):</strong> Τα τεμάχια που βρίσκονται υπό αξιολόγηση 
            δεν μπορούν να χρησιμοποιηθούν για συρραφή μέχρι την ολοκλήρωση της διαδικασίας έγκρισης.
          </AlertDescription>
        </Alert>
      )}

      {/* No Active Plots */}
      {activePlots.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Δεν έχετε ενεργά τεμάχια
          </h3>
          <p className="text-gray-600 mb-4">
            Για να δημιουργήσετε αγροτεμάχιο, χρειάζεστε τουλάχιστον ένα ενεργό τεμάχιο.
          </p>
          <Button variant="outline" className="border-[#334692] text-[#334692]">
            Καταχώρηση Νέου Τεμαχίου
          </Button>
        </div>
      )}

      {/* Continue Button */}
      {activePlots.length > 0 && (
        <div className="flex justify-end pt-6">
          <Button 
            onClick={handleContinue}
            disabled={!selectedPlot}
            className="bg-[#334692] hover:bg-[#2a3a7a] text-white px-8"
          >
            Συνέχεια με Συρραφή
          </Button>
        </div>
      )}

      {/* Selected Plot Summary */}
      {selectedPlot && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-[#334692] mb-2">Επιλεγμένο Τεμάχιο:</h4>
          <div className="text-sm text-gray-700">
            <span className="font-medium">{selectedPlot.province}, {selectedPlot.community}</span>
            <span className="mx-2">•</span>
            <span>Φ/Σ: {selectedPlot.sheet}</span>
            <span className="mx-2">•</span>
            <span>Μπλοκ: {selectedPlot.block}</span>
            <span className="mx-2">•</span>
            <span>Τεμάχιο: {selectedPlot.plotNumber}</span>
            <span className="mx-2">•</span>
            <span>{selectedPlot.area}</span>
          </div>
        </div>
      )}
    </div>
  );
}