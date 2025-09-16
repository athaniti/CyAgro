import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle2, AlertTriangle, MapPin, Sprout } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

export default function DamageEligibilityCheck({ selectedDeclaration, eligiblePlots, selectedPlot, onNext }) {
  const [verificationComplete, setVerificationComplete] = useState(false);

  const handleVerificationComplete = () => {
    setVerificationComplete(true);
    
    // Simulate eligibility verification
    setTimeout(() => {
      onNext();
    }, 2000);
  };

  const matchingCrops = selectedPlot.cultivations.filter(crop => 
    selectedDeclaration.eligibleCrops.includes(crop)
  );

  const eligibilityScore = calculateEligibilityScore();

  function calculateEligibilityScore() {
    let score = 0;
    
    // Plot is in affected area
    if (selectedPlot.inAffectedArea && selectedDeclaration.affectedCommunities.includes(selectedPlot.community)) {
      score += 30;
    }
    
    // Has eligible crops
    if (matchingCrops.length > 0) {
      score += 40;
    }
    
    // Plot is active and owned/managed
    if (selectedPlot.status === 'active') {
      score += 20;
    }
    
    // No previous damage reported for this event
    if (!selectedPlot.damageReported) {
      score += 10;
    }
    
    return score;
  }

  if (verificationComplete) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#334692] mb-2">
            Έλεγχος Δικαιώματος
          </h2>
          <p className="text-gray-600">
            Επιβεβαίωση δικαιώματος υποβολής αίτησης αποζημίωσης...
          </p>
        </div>
        
        <div className="text-center py-12">
          <div className="animate-pulse">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Επαλήθευση στοιχείων...</p>
            <p className="text-sm text-gray-500">Παρακαλώ περιμένετε</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#334692] mb-2">
          Έλεγχος Δικαιώματος Υποβολής
        </h2>
        <p className="text-gray-600">
          Επιβεβαίωση ότι πληροίτε τα κριτήρια για υποβολή αίτησης αποζημίωσης
        </p>
      </div>

      {/* Selected Declaration & Plot Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Δήλωση Ζημιάς
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <span className="text-red-600 font-medium">Τίτλος:</span>
              <p className="text-red-800">{selectedDeclaration.title}</p>
            </div>
            <div>
              <span className="text-red-600 font-medium">Αίτιο:</span>
              <p className="text-red-800">{selectedDeclaration.cause}</p>
            </div>
            <div>
              <span className="text-red-600 font-medium">Περιοχή:</span>
              <p className="text-red-800">{selectedDeclaration.affectedArea}</p>
            </div>
            <div>
              <span className="text-red-600 font-medium">Αποζημίωση:</span>
              <p className="text-red-800">{selectedDeclaration.compensationRate}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-[#334692] flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Επιλεγμένο Τεμάχιο
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <span className="text-blue-600 font-medium">Τεμάχιο:</span>
              <p className="text-blue-800">{selectedPlot.plotNumber} - {selectedPlot.community}</p>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Έκταση:</span>
              <p className="text-blue-800">{selectedPlot.area}</p>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Κατάσταση:</span>
              <p className="text-blue-800">{selectedPlot.exploitationText}</p>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Καλλιέργειες:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedPlot.cultivations.map((crop) => (
                  <Badge key={crop} className="bg-blue-100 text-blue-800">
                    {crop}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Eligibility Criteria Check */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#334692] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Έλεγχος Κριτηρίων Επιλεξιμότητας
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {/* Geographic Eligibility */}
            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-green-800">Γεωγραφική Επιλεξιμότητα</h4>
                <p className="text-sm text-green-700 mt-1">
                  Το τεμάχιο βρίσκεται στην πληγείσα κοινότητα "{selectedPlot.community}" 
                  που περιλαμβάνεται στη δήλωση ζημιάς.
                </p>
              </div>
            </div>

            {/* Crop Eligibility */}
            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-green-800">Επιλεξιμότητα Καλλιεργειών</h4>
                <p className="text-sm text-green-700 mt-1">
                  Το τεμάχιο έχει επιλέξιμες καλλιέργειες που επηρεάστηκαν από τη ζημιά:
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {matchingCrops.map((crop) => (
                    <Badge key={crop} className="bg-green-100 text-green-800">
                      <Sprout className="w-3 h-3 mr-1" />
                      {crop}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Ownership Status */}
            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-green-800">Κατάσταση Ιδιοκτησίας</h4>
                <p className="text-sm text-green-700 mt-1">
                  Έχετε δικαίωμα υποβολής ως {selectedPlot.exploitationText.toLowerCase()} του τεμαχίου.
                </p>
              </div>
            </div>

            {/* Previous Submissions */}
            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-green-800">Προηγούμενες Υποβολές</h4>
                <p className="text-sm text-green-700 mt-1">
                  Δεν έχετε υποβάλει ήδη αίτηση για αυτή τη δήλωση ζημιάς.
                </p>
              </div>
            </div>
          </div>

          {/* Eligibility Score */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-blue-800">Βαθμολογία Επιλεξιμότητας</h4>
              <span className="text-2xl font-bold text-blue-600">{eligibilityScore}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-500" 
                style={{ width: `${eligibilityScore}%` }}
              ></div>
            </div>
            <p className="text-sm text-blue-700 mt-2">
              Πληροίτε πλήρως τα κριτήρια για υποβολή αίτησης αποζημίωσης.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* System Verification */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 mt-1" />
            <div>
              <h3 className="font-medium text-green-800 mb-2">Επιβεβαίωση Συστήματος</h3>
              <div className="space-y-2 text-sm text-green-700">
                <p>✓ Το τεμάχιο έχει επαληθευτεί ως μέρος της πληγείσας περιοχής</p>
                <p>✓ Οι καλλιέργειες έχουν επιβεβαιωθεί ως επιλέξιμες για αποζημίωση</p>
                <p>✓ Τα δικαιώματα ιδιοκτησίας/διαχείρισης έχουν επαληθευτεί</p>
                <p>✓ Η προθεσμία υποβολής είναι εντός των καθορισμένων ορίων</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Σημαντικό:</strong> Η υποβολή αίτησης αποζημίωσης συνεπάγεται την υποχρέωση παροχής 
          ακριβών και πλήρων στοιχείων. Ψευδή στοιχεία μπορεί να οδηγήσουν σε νομικές συνέπειες.
        </AlertDescription>
      </Alert>

      {/* Continue Button */}
      <div className="flex justify-end pt-6">
        <Button 
          onClick={handleVerificationComplete}
          className="bg-[#334692] hover:bg-[#2a3a7a] text-white px-8"
        >
          Επιβεβαίωση Δικαιώματος και Συνέχεια
        </Button>
      </div>
    </div>
  );
}