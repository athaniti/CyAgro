import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

// Mock data for user's plots available for declarations
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
    registrationDate: "2024-01-15",
    lastDeclaration: "2023-03-15",
    declarationStatus: "submitted"
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
    description: "Όμορο τεμάχιο με το 123, κατάλληλο για καλλιέργεια",
    registrationDate: "2024-02-20",
    lastDeclaration: null,
    declarationStatus: "none"
  },
  {
    id: "AGR-12345680",
    province: "Λεμεσός", 
    community: "Γερμασόγεια",
    sheet: "15/22",
    block: "Β",
    plotNumber: "Αγροτεμάχιο 1",
    area: "5.8 στρέμματα",
    status: "active",
    statusText: "Ενεργό",
    exploitationStatus: "ownership",
    exploitationText: "Ιδιοκτησία",
    description: "Ενιαίο αγροτεμάχιο από συρραφή 3 τεμαχίων",
    registrationDate: "2024-03-10",
    lastDeclaration: "2024-02-28",
    declarationStatus: "draft",
    isAgriculturalPlot: true
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
    registrationDate: "2024-03-25",
    lastDeclaration: null,
    declarationStatus: "unavailable"
  }
];

export default function ActiveDeclarations({ selectedType, onPlotSelect }) {
  const [selectedPlot, setSelectedPlot] = useState(null);

  const handlePlotSelection = (plot) => {
    setSelectedPlot(plot);
  };

  const handleContinue = () => {
    if (selectedPlot) {
      onPlotSelect(selectedPlot);
    }
  };

  const availablePlots = mockUserPlots.filter(plot => plot.status === 'active');
  const unavailablePlots = mockUserPlots.filter(plot => plot.status !== 'active');

  const getDeclarationStatusInfo = (status) => {
    switch (status) {
      case 'submitted':
        return { 
          icon: CheckCircle2, 
          text: 'Υποβλήθηκε φέτος', 
          color: 'text-green-600',
          bgColor: 'bg-green-100'
        };
      case 'draft':
        return { 
          icon: Clock, 
          text: 'Πρόχειρη δήλωση', 
          color: 'text-orange-600',
          bgColor: 'bg-orange-100'
        };
      case 'none':
        return { 
          icon: AlertTriangle, 
          text: 'Δεν έχει δηλωθεί', 
          color: 'text-red-600',
          bgColor: 'bg-red-100'
        };
      default:
        return { 
          icon: AlertTriangle, 
          text: 'Μη διαθέσιμο', 
          color: 'text-gray-500',
          bgColor: 'bg-gray-100'
        };
    }
  };

  const declarationTypeText = selectedType === 'seasonal' ? 'Εποχιακών' : 'Μόνιμων';

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#334692] mb-2">
          Επιλογή Τεμαχίου για Δήλωση {declarationTypeText} Καλλιεργειών
        </h2>
        <p className="text-gray-600">
          Επιλέξτε το τεμάχιο για το οποίο θέλετε να υποβάλετε δήλωση καλλιέργειας
        </p>
      </div>

      {/* Available Plots */}
      {availablePlots.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            Διαθέσιμα Τεμάχια ({availablePlots.length})
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            {availablePlots.map((plot) => {
              const statusInfo = getDeclarationStatusInfo(plot.declarationStatus);
              const StatusIcon = statusInfo.icon;
              const isSelected = selectedPlot?.id === plot.id;
              
              return (
                <Card 
                  key={plot.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected 
                      ? 'border-2 border-[#334692] bg-blue-50 shadow-md' 
                      : 'border border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handlePlotSelection(plot)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">
                            {plot.isAgriculturalPlot ? plot.plotNumber : `Τεμάχιο ${plot.plotNumber}`}
                          </CardTitle>
                          {plot.isAgriculturalPlot && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              Αγροτεμάχιο
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Κωδικός: {plot.id}
                        </p>
                        <div className="flex gap-2 mb-3">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {plot.statusText}
                          </Badge>
                          <Badge variant="outline">
                            {plot.exploitationText}
                          </Badge>
                          <Badge className={statusInfo.bgColor + ' ' + statusInfo.color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusInfo.text}
                          </Badge>
                        </div>
                      </div>
                      {isSelected && (
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
                    
                    {plot.lastDeclaration && (
                      <div className="text-xs text-gray-500 border-t pt-2">
                        <span>Τελευταία δήλωση: {new Date(plot.lastDeclaration).toLocaleDateString('el-GR')}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Unavailable Plots Info */}
      {unavailablePlots.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-600 mt-1" />
              <div>
                <h3 className="font-medium text-orange-800 mb-2">
                  Μη Διαθέσιμα Τεμάχια ({unavailablePlots.length})
                </h3>
                <p className="text-orange-700 text-sm mb-3">
                  Τα παρακάτω τεμάχια δεν είναι διαθέσιμα για δήλωση καλλιέργειας:
                </p>
                <div className="space-y-2">
                  {unavailablePlots.map((plot) => (
                    <div key={plot.id} className="text-sm text-orange-700">
                      <span className="font-medium">{plot.plotNumber}</span> - {plot.statusText}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Available Plots */}
      {availablePlots.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Δεν έχετε διαθέσιμα τεμάχια
          </h3>
          <p className="text-gray-600 mb-4">
            Για να υποβάλετε δήλωση καλλιέργειας, χρειάζεστε τουλάχιστον ένα ενεργό τεμάχιο.
          </p>
          <Button variant="outline" className="border-[#334692] text-[#334692]">
            Καταχώρηση Νέου Τεμαχίου
          </Button>
        </div>
      )}

      {/* Continue Button */}
      {availablePlots.length > 0 && (
        <div className="flex justify-end pt-6">
          <Button 
            onClick={handleContinue}
            disabled={!selectedPlot}
            className="bg-[#334692] hover:bg-[#2a3a7a] text-white px-8"
          >
            Συνέχεια με Δήλωση
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