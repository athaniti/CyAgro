import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { MapPin, Users, Info } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

// Mock data for adjacent plots
const generateAdjacentPlots = (selectedPlot) => [
  {
    id: "PLT-ADJ-001",
    province: selectedPlot.province,
    community: selectedPlot.community,
    sheet: selectedPlot.sheet,
    block: selectedPlot.block,
    plotNumber: (parseInt(selectedPlot.plotNumber) + 1).toString(),
    area: "1.2 στρέμματα",
    owner: "Μαρία Κωνσταντίνου",
    ownershipType: "Ιδιοκτησία",
    status: "available",
    distance: "Συνορεύει βόρεια",
    landUse: "Γεωργική γη",
    compatible: true
  },
  {
    id: "PLT-ADJ-002", 
    province: selectedPlot.province,
    community: selectedPlot.community,
    sheet: selectedPlot.sheet,
    block: selectedPlot.block,
    plotNumber: (parseInt(selectedPlot.plotNumber) - 1).toString(),
    area: "2.1 στρέμματα",
    owner: "Γιώργος Παπαδόπουλος",
    ownershipType: "Διαχείριση",
    status: "available",
    distance: "Συνορεύει νότια",
    landUse: "Γεωργική γη",
    compatible: true
  },
  {
    id: "PLT-ADJ-003",
    province: selectedPlot.province,
    community: selectedPlot.community,
    sheet: selectedPlot.sheet,
    block: selectedPlot.block,
    plotNumber: (parseInt(selectedPlot.plotNumber) + 2).toString(),
    area: "0.8 στρέμματα",
    owner: "Κώστας Δημητρίου",
    ownershipType: "Ιδιοκτησία",
    status: "available",
    distance: "Συνορεύει ανατολικά",
    landUse: "Γεωργική γη",
    compatible: true
  },
  {
    id: "PLT-ADJ-004",
    province: selectedPlot.province,
    community: selectedPlot.community,
    sheet: selectedPlot.sheet,
    block: "Β",
    plotNumber: "45",
    area: "1.5 στρέμματα",
    owner: "Ελένη Βασιλείου",
    ownershipType: "Ιδιοκτησία",
    status: "restricted",
    distance: "Συνορεύει δυτικά",
    landUse: "Αστική γη",
    compatible: false,
    restriction: "Διαφορετική χρήση γης"
  }
];

export default function AdjacentPlotsSelection({ selectedPlot, onPlotsSelect }) {
  const [selectedAdjacentPlots, setSelectedAdjacentPlots] = useState([]);
  const adjacentPlots = generateAdjacentPlots(selectedPlot);
  const availablePlots = adjacentPlots.filter(plot => plot.compatible);

  const handlePlotToggle = (plotId) => {
    setSelectedAdjacentPlots(prev => 
      prev.includes(plotId)
        ? prev.filter(id => id !== plotId)
        : [...prev, plotId]
    );
  };

  const handleContinue = () => {
    const selectedPlotsData = adjacentPlots.filter(plot => 
      selectedAdjacentPlots.includes(plot.id)
    );
    onPlotsSelect(selectedPlotsData);
  };

  const totalSelectedArea = selectedAdjacentPlots.reduce((total, plotId) => {
    const plot = adjacentPlots.find(p => p.id === plotId);
    if (plot) {
      const area = parseFloat(plot.area.split(' ')[0]);
      return total + area;
    }
    return total;
  }, 0);

  const selectedPlotArea = parseFloat(selectedPlot.area.split(' ')[0]);
  const totalCombinedArea = selectedPlotArea + totalSelectedArea;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#334692] mb-2">
          Επιλογή Όμορων Τεμαχίων
        </h2>
        <p className="text-gray-600">
          Επιλέξτε τα όμορα τεμάχια που θέλετε να συρράψετε με το αρχικό τεμάχιο
        </p>
      </div>

      {/* Selected Plot Info */}
      <Card className="border-[#334692] bg-blue-50">
        <CardHeader>
          <CardTitle className="text-[#334692] flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Αρχικό Τεμάχιο
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Τοποθεσία:</span>
              <p className="font-medium">{selectedPlot.community}</p>
            </div>
            <div>
              <span className="text-gray-600">Φ/Σ-Μπλοκ-Τεμάχιο:</span>
              <p className="font-medium">{selectedPlot.sheet}-{selectedPlot.block}-{selectedPlot.plotNumber}</p>
            </div>
            <div>
              <span className="text-gray-600">Έκταση:</span>
              <p className="font-medium">{selectedPlot.area}</p>
            </div>
            <div>
              <span className="text-gray-600">Κατάσταση:</span>
              <p className="font-medium">{selectedPlot.exploitationText}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Adjacent Plots */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          Δι��θέσιμα Όμορα Τεμάχια ({availablePlots.length})
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {availablePlots.map((plot) => {
            const isSelected = selectedAdjacentPlots.includes(plot.id);
            
            return (
              <Card 
                key={plot.id}
                className={`cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'border-2 border-[#334692] bg-blue-50 shadow-md' 
                    : 'border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
                onClick={() => handlePlotToggle(plot.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handlePlotToggle(plot.id)}
                      className="mt-1 data-[state=checked]:bg-[#334692] data-[state=checked]:border-[#334692]"
                    />
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Τεμάχιο {plot.plotNumber}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {plot.sheet}-{plot.block}-{plot.plotNumber}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-green-700 border-green-200">
                          {plot.area}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div>
                          <span className="text-gray-500">Ιδιοκτήτης:</span>
                          <p className="font-medium">{plot.owner}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Κατάσταση:</span>
                          <p className="font-medium">{plot.ownershipType}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Θέση:</span>
                          <p className="font-medium">{plot.distance}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Χρήση γης:</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {plot.landUse}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Restricted Plots Info */}
      {adjacentPlots.some(plot => !plot.compatible) && (
        <Alert className="border-orange-200 bg-orange-50">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-orange-800">
            <strong>Μη διαθέσιμα τεμάχια:</strong> Ορισμένα όμορα τεμάχια δεν είναι διαθέσιμα για συρραφή 
            λόγω διαφορετικής χρήσης γης ή άλλων περιορισμών.
          </AlertDescription>
        </Alert>
      )}

      {/* Selection Summary */}
      {selectedAdjacentPlots.length > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <h4 className="font-medium text-green-800 mb-3">Περίληψη Επιλογής</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-green-600">Επιλεγμένα τεμάχια:</span>
                <p className="font-medium text-green-800">{selectedAdjacentPlots.length}</p>
              </div>
              <div>
                <span className="text-green-600">Συνολική έκταση συρραφής:</span>
                <p className="font-medium text-green-800">{totalSelectedArea.toFixed(1)} στρέμματα</p>
              </div>
              <div>
                <span className="text-green-600">Τελική έκταση αγροτεμαχίου:</span>
                <p className="font-medium text-green-800">{totalCombinedArea.toFixed(1)} στρέμματα</p>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-green-200">
              <span className="text-green-600 text-sm">Επιλεγμένα τεμάχια:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedAdjacentPlots.map(plotId => {
                  const plot = adjacentPlots.find(p => p.id === plotId);
                  return (
                    <Badge key={plotId} className="bg-green-200 text-green-800">
                      {plot.plotNumber} ({plot.area})
                    </Badge>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Continue Button */}
      <div className="flex justify-end pt-6">
        <Button 
          onClick={handleContinue}
          disabled={selectedAdjacentPlots.length === 0}
          className="bg-[#334692] hover:bg-[#2a3a7a] text-white px-8"
        >
          Δημιουργία Αγροτεμαχίου ({selectedAdjacentPlots.length + 1} τεμάχια)
        </Button>
      </div>

      {/* Help Info */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Συμβουλή:</strong> Η συρραφή τεμαχίων δημιουργεί ένα ενιαίο αγροτεμάχιο με συνολική έκταση, 
          ενοποιημένους τίτλους ιδιοκτησίας και κοινή διαχείριση. Μπορείτε να επιλέξετε όσα τεμάχια θέλετε.
        </AlertDescription>
      </Alert>
    </div>
  );
}