import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { AlertTriangle, MapPin, Calendar, CheckCircle2, Info } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

// Mock data for user's plots that could be in affected areas
const mockUserPlotsInAffectedAreas = [
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
    description: "Γεωργικό τεμάχιο με εσπεριδοειδή",
    cultivations: ["Εσπεριδοειδή", "Λαχανικά"],
    inAffectedArea: true,
    damageReported: false
  },
  {
    id: "PLT-12345679", 
    province: "Λευκωσία",
    community: "Λατσιά",
    sheet: "18/35",
    block: "Γ",
    plotNumber: "56",
    area: "4.1 στρέμματα",
    status: "active",
    statusText: "Ενεργό",
    exploitationStatus: "ownership",
    exploitationText: "Ιδιοκτησία",
    description: "Μεγάλο τεμάχιο με αμπέλια",
    cultivations: ["Αμπέλια"],
    inAffectedArea: true,
    damageReported: false
  }
];

export default function ActiveDamageDeclarations({ selectedDeclaration, onNext }) {
  const [selectedPlot, setSelectedPlot] = useState(null);
  
  const handlePlotSelection = (plot) => {
    setSelectedPlot(plot);
  };

  const handleContinue = () => {
    if (selectedPlot) {
      // Find eligible plots in the affected area
      const eligiblePlots = mockUserPlotsInAffectedAreas.filter(plot => 
        plot.inAffectedArea && 
        selectedDeclaration.affectedCommunities.includes(plot.community) &&
        plot.cultivations.some(crop => selectedDeclaration.eligibleCrops.includes(crop))
      );
      
      onNext(eligiblePlots, selectedPlot);
    }
  };

  // Filter plots that are in the affected area and have eligible crops
  const eligiblePlots = mockUserPlotsInAffectedAreas.filter(plot => 
    plot.inAffectedArea && 
    selectedDeclaration.affectedCommunities.includes(plot.community) &&
    plot.cultivations.some(crop => selectedDeclaration.eligibleCrops.includes(crop))
  );

  const isDeadlinePassed = new Date() > new Date(selectedDeclaration.submissionDeadline);
  const daysRemaining = Math.ceil((new Date(selectedDeclaration.submissionDeadline) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#334692] mb-2">
          Επιλογή Τεμαχίου για Δήλωση Ζημιάς
        </h2>
        <p className="text-gray-600">
          Επιλέξτε το τεμάχιο που επηρεάστηκε από τη δηλωμένη ζημιά
        </p>
      </div>

      {/* Selected Damage Declaration Info */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            {selectedDeclaration.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-red-600 font-medium">Αίτιο Ζημιάς:</span>
              <p className="text-red-800">{selectedDeclaration.cause}</p>
            </div>
            <div>
              <span className="text-red-600 font-medium">Ημερομηνία Πρόκλησης:</span>
              <p className="text-red-800">{new Date(selectedDeclaration.dateOccurred).toLocaleDateString('el-GR')}</p>
            </div>
            <div>
              <span className="text-red-600 font-medium">Ποσοστό Αποζημίωσης:</span>
              <p className="text-red-800">{selectedDeclaration.compensationRate}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-red-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-red-600 font-medium text-sm">Πληγείσες Κοινότητες:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedDeclaration.affectedCommunities.map((community) => (
                    <Badge key={community} className="bg-red-100 text-red-800">
                      {community}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="text-red-600 font-medium text-sm">Επιλέξιμες Καλλιέργειες:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedDeclaration.eligibleCrops.map((crop) => (
                    <Badge key={crop} className="bg-blue-100 text-blue-800">
                      {crop}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deadline Warning */}
      {daysRemaining <= 7 && !isDeadlinePassed && (
        <Alert className="border-orange-500 bg-orange-50">
          <Calendar className="h-4 w-4" />
          <AlertDescription className="text-orange-800">
            <strong>Προσοχή:</strong> Απομένουν μόνο {daysRemaining} ημέρες για την υποβολή της αίτησης 
            (προθεσμία: {new Date(selectedDeclaration.submissionDeadline).toLocaleDateString('el-GR')}).
          </AlertDescription>
        </Alert>
      )}

      {isDeadlinePassed && (
        <Alert className="border-red-500 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            <strong>Λήξη Προθεσμίας:</strong> Η προθεσμία για υποβολή αίτησης έχει λήξει 
            ({new Date(selectedDeclaration.submissionDeadline).toLocaleDateString('el-GR')}). 
            Δεν μπορείτε να υποβάλετε νέα αίτηση.
          </AlertDescription>
        </Alert>
      )}

      {/* Eligible Plots */}
      {!isDeadlinePassed && eligiblePlots.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            Επιλέξιμα Τεμάχια ({eligiblePlots.length})
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            {eligiblePlots.map((plot) => {
              const isSelected = selectedPlot?.id === plot.id;
              const matchingCrops = plot.cultivations.filter(crop => 
                selectedDeclaration.eligibleCrops.includes(crop)
              );
              
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
                        <CardTitle className="text-lg mb-1">
                          Τεμάχιο {plot.plotNumber}
                        </CardTitle>
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
                          <Badge className="bg-red-100 text-red-800">
                            Πληγείσα Περιοχή
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
                    
                    <div>
                      <span className="text-sm text-gray-500">Επιλέξιμες Καλλιέργειες στο τεμάχιο:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {matchingCrops.map((crop) => (
                          <Badge key={crop} className="bg-green-100 text-green-800">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* No Eligible Plots */}
      {!isDeadlinePassed && eligiblePlots.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Δεν έχετε επιλέξιμα τεμάχια
          </h3>
          <p className="text-gray-600 mb-4">
            Δεν βρέθηκαν τεμάχια στις πληγείσες περιοχές με επιλέξιμες καλλιέργειες για αυτή τη δήλωση ζημιάς.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg text-left max-w-md mx-auto">
            <h4 className="font-medium text-blue-800 mb-2">Κριτήρια Επιλεξιμότητας:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Το τεμάχιο πρέπει να βρίσκεται σε πληγείσα κοινότητα</li>
              <li>• Πρέπει να καλλιεργούνται επιλέξιμα είδη</li>
              <li>• Το τεμάχιο πρέπει να είναι ενεργό</li>
            </ul>
          </div>
        </div>
      )}

      {/* Continue Button */}
      {!isDeadlinePassed && eligiblePlots.length > 0 && (
        <div className="flex justify-end pt-6">
          <Button 
            onClick={handleContinue}
            disabled={!selectedPlot}
            className="bg-[#334692] hover:bg-[#2a3a7a] text-white px-8"
          >
            Συνέχεια με Έλεγχο Δικαιώματος
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

      {/* Information Box */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Πληροφορία:</strong> Μπορείτε να υποβάλετε αίτηση αποζημίωσης μόνο για τεμάχια που 
          βρίσκονται στις επίσημα πληγείσες περιοχές και έχουν καλλιέργειες που επηρεάστηκαν από τη δηλωμένη ζημιά.
        </AlertDescription>
      </Alert>
    </div>
  );
}