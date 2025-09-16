import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calculator, AlertTriangle, Info, CreditCard } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

const feeRates = {
  seasonal: {
    basic: 35, // €35 per στρέμμα
    late: 50   // €50 per στρέμμα (increased for late submission)
  },
  permanent: {
    basic: 45, // €45 per στρέμμα  
    late: 65   // €65 per στρέμμα (increased for late submission)
  }
};

export default function FeeCalculation({ selectedPlot, declarationData, onFeesCalculated }) {
  const [calculatedFees, setCalculatedFees] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Simulate fee calculation
    setTimeout(() => {
      calculateFees();
      setIsProcessing(false);
    }, 2000);
  }, [declarationData]);

  const calculateFees = () => {
    const area = parseFloat(declarationData.cultivatedArea);
    const isLate = declarationData.isLateSubmission;
    const cultivationType = declarationData.cultivationType;
    
    const rateType = isLate ? 'late' : 'basic';
    const rate = feeRates[cultivationType][rateType];
    
    const baseAmount = area * rate;
    const vatRate = 0.19; // 19% VAT
    const vatAmount = baseAmount * vatRate;
    const totalAmount = baseAmount + vatAmount;
    
    const fees = {
      area,
      rate,
      baseAmount: baseAmount.toFixed(2),
      vatRate,
      vatAmount: vatAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      isLate,
      cultivationType,
      currency: 'EUR'
    };
    
    setCalculatedFees(fees);
  };

  const handleProceedToPayment = () => {
    onFeesCalculated(calculatedFees);
  };

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

  if (isProcessing) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#334692] mb-2">
            Υπολογισμός Εισφορών
          </h2>
          <p className="text-gray-600">
            Παρακαλώ περιμένετε, υπολογίζουμε τις εισφορές για τη δήλωσή σας...
          </p>
        </div>
        
        <div className="text-center py-12">
          <Calculator className="w-16 h-16 text-[#334692] mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Επεξεργασία...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#334692] mb-2">
          Υπολογισμός Εισφορών
        </h2>
        <p className="text-gray-600">
          Έλεγχος και επιβεβαίωση των εισφορών για τη δήλωση καλλιέργειας
        </p>
      </div>

      {/* Late Submission Warning */}
      {calculatedFees?.isLate && (
        <Alert className="border-red-500 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            <strong>Εκπρόθεσμη Υποβολή:</strong> Η δήλωση υποβάλλεται εκτός προθεσμίας. 
            Εφαρμόζονται αυξημένες εισφορές (+{((feeRates[calculatedFees.cultivationType].late / feeRates[calculatedFees.cultivationType].basic - 1) * 100).toFixed(0)}%).
          </AlertDescription>
        </Alert>
      )}

      {/* Declaration Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#334692]">Περίληψη Δήλωσης</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Τεμάχιο</p>
              <p className="font-medium">{selectedPlot.plotNumber} - {selectedPlot.community}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Τύπος Καλλιέργειας</p>
              <p className="font-medium">{getCultivationTypeText(declarationData.cultivationType)}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Είδος</p>
              <p className="font-medium">{getCropLabel(declarationData.crop)} - {declarationData.variety}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Καλλιεργήσιμη Έκταση</p>
              <p className="font-medium">{declarationData.cultivatedArea} στρέμματα</p>
            </div>
          </div>

          {declarationData.numberOfTrees && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Αριθμός Δέντρων</p>
              <p className="font-medium">{declarationData.numberOfTrees} δέντρα</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fee Calculation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#334692] flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Αναλυτικός Υπολογισμός Εισφορών
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">Καλλιεργήσιμη έκταση:</span>
              <span className="font-medium">{calculatedFees.area} στρέμματα</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b">
              <div className="flex items-center gap-2">
                <span className="text-gray-700">Βασική εισφορά ανά στρέμμα:</span>
                {calculatedFees.isLate && (
                  <Badge className="bg-red-100 text-red-800">Εκπρόθεσμη</Badge>
                )}
              </div>
              <span className="font-medium">€{calculatedFees.rate}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">Σύνολο πριν ΦΠΑ:</span>
              <span className="font-medium">€{calculatedFees.baseAmount}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">ΦΠΑ ({(calculatedFees.vatRate * 100).toFixed(0)}%):</span>
              <span className="font-medium">€{calculatedFees.vatAmount}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-t-2 border-[#334692] bg-blue-50 px-3 rounded-lg">
              <span className="text-[#334692] font-bold text-lg">Συνολικό Ποσό:</span>
              <span className="text-[#334692] font-bold text-xl">€{calculatedFees.totalAmount}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <CreditCard className="w-6 h-6 text-green-600 mt-1" />
            <div>
              <h3 className="font-medium text-green-800 mb-2">Πληρωμή</h3>
              <div className="space-y-2 text-sm text-green-700">
                <p>• Η πληρωμή γίνεται ηλεκτρονικά με πιστωτική/χρεωστική κάρτα</p>
                <p>• Μετά την επιτυχή πληρωμή η δήλωση θα καταχωρηθεί στο σύστημα</p>
                <p>• Θα λάβετε αποδείξεις πληρωμής και επιβεβαίωσης δήλωσης</p>
                <p>• Η συναλλαγή είναι ασφαλής και κρυπτογραφημένη</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Σημαντικό:</strong> Μετά την πληρωμή η δήλωση θα είναι οριστική και δεν θα μπορεί να τροποποιηθεί. 
          Παρακαλώ ελέγξτε προσεκτικά όλα τα στοιχεία πριν προχωρήσετε.
        </AlertDescription>
      </Alert>

      {/* Continue to Payment Button */}
      <div className="flex justify-end pt-6">
        <Button 
          onClick={handleProceedToPayment}
          className="bg-[#334692] hover:bg-[#2a3a7a] text-white px-8"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Προχώρηση σε Ηλεκτρονική Πληρωμή (€{calculatedFees.totalAmount})
        </Button>
      </div>
    </div>
  );
}