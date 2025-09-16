import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { CreditCard, Lock, CheckCircle2, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

export default function PaymentGateway({ calculatedFees, onPaymentComplete }) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState("input"); // "input", "processing", "success"
  const [errors, setErrors] = useState({});

  const handleCardDataChange = (field, value) => {
    setCardData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
    
    // Format card number
    if (field === "cardNumber") {
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formatted !== value) {
        setCardData(prev => ({ ...prev, [field]: formatted }));
      }
    }
    
    // Format expiry date
    if (field === "expiryDate") {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
      if (formatted !== value) {
        setCardData(prev => ({ ...prev, [field]: formatted }));
      }
    }
  };

  const validatePayment = () => {
    const newErrors = {};
    
    if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = "Παρακαλώ εισάγετε έγκυρο αριθμό κάρτας";
    }
    
    if (!cardData.expiryDate || !/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      newErrors.expiryDate = "Παρακαλώ εισάγετε έγκυρη ημερομηνία λήξης (MM/YY)";
    }
    
    if (!cardData.cvv || cardData.cvv.length !== 3) {
      newErrors.cvv = "Παρακαλώ εισάγετε έγκυρο CVV (3 ψηφία)";
    }
    
    if (!cardData.cardholderName.trim()) {
      newErrors.cardholderName = "Παρακαλώ εισάγετε το όνομα κατόχου κάρτας";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validatePayment()) {
      return;
    }

    setIsProcessing(true);
    setPaymentStep("processing");
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep("success");
      
      // Generate payment data
      const paymentData = {
        transactionId: `TXN-${Date.now().toString().slice(-8)}`,
        amount: calculatedFees.totalAmount,
        currency: calculatedFees.currency,
        paymentMethod: "credit_card",
        cardLast4: cardData.cardNumber.slice(-4),
        timestamp: new Date().toISOString(),
        status: "completed"
      };
      
      setTimeout(() => {
        onPaymentComplete(paymentData);
        setIsProcessing(false);
      }, 2000);
    }, 3000);
  };

  if (paymentStep === "processing") {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#334692] mb-2">
            Επεξεργασία Πληρωμής
          </h2>
          <p className="text-gray-600">
            Παρακαλώ περιμένετε, επεξεργαζόμαστε την πληρωμή σας...
          </p>
        </div>
        
        <div className="text-center py-12">
          <Loader2 className="w-16 h-16 text-[#334692] mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 mb-2">Επεξεργασία πληρωμής...</p>
          <p className="text-sm text-gray-500">Μην κλείσετε ή ανανεώσετε τη σελίδα</p>
        </div>
      </div>
    );
  }

  if (paymentStep === "success") {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#334692] mb-2">
            Επιτυχής Πληρωμή
          </h2>
          <p className="text-gray-600">
            Η πληρωμή ολοκληρώθηκε επιτυχώς
          </p>
        </div>
        
        <div className="text-center py-12">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <p className="text-green-600 text-lg font-medium mb-2">Πληρωμή Επιτυχής!</p>
          <p className="text-gray-600">Προχωρούμε στην ολοκλήρωση της δήλωσης...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#334692] mb-2">
          Ηλεκτρονική Πληρωμή
        </h2>
        <p className="text-gray-600">
          Ολοκληρώστε την πληρωμή για να υποβάλετε τη δήλωση καλλιέργειας
        </p>
      </div>

      {/* Payment Summary */}
      <Card className="border-[#334692] bg-blue-50">
        <CardHeader>
          <CardTitle className="text-[#334692]">Περίληψη Πληρωμής</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Βασική εισφορά:</span>
              <span>€{calculatedFees.baseAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>ΦΠΑ ({(calculatedFees.vatRate * 100).toFixed(0)}%):</span>
              <span>€{calculatedFees.vatAmount}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Συνολικό ποσό:</span>
              <span>€{calculatedFees.totalAmount}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#334692]">Μέθοδος Πληρωμής</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="card">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Πιστωτική/Χρεωστική Κάρτα</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Card Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#334692] flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Στοιχεία Κάρτας
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Αριθμός Κάρτας *</Label>
            <Input
              id="cardNumber"
              value={cardData.cardNumber}
              onChange={(e) => handleCardDataChange("cardNumber", e.target.value)}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={errors.cardNumber ? 'border-red-500' : ''}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm">{errors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Ημερομηνία Λήξης *</Label>
              <Input
                id="expiryDate"
                value={cardData.expiryDate}
                onChange={(e) => handleCardDataChange("expiryDate", e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
                className={errors.expiryDate ? 'border-red-500' : ''}
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm">{errors.expiryDate}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">CVV *</Label>
              <Input
                id="cvv"
                type="password"
                value={cardData.cvv}
                onChange={(e) => handleCardDataChange("cvv", e.target.value)}
                placeholder="123"
                maxLength={3}
                className={errors.cvv ? 'border-red-500' : ''}
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm">{errors.cvv}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardholderName">Όνομα Κατόχου Κάρτας *</Label>
            <Input
              id="cardholderName"
              value={cardData.cardholderName}
              onChange={(e) => handleCardDataChange("cardholderName", e.target.value)}
              placeholder="ΟΝΟΜΑ ΕΠΩΝΥΜΟ"
              className={errors.cardholderName ? 'border-red-500' : ''}
            />
            {errors.cardholderName && (
              <p className="text-red-500 text-sm">{errors.cardholderName}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Alert className="border-green-200 bg-green-50">
        <Lock className="h-4 w-4" />
        <AlertDescription className="text-green-800">
          <strong>Ασφαλής Συναλλαγή:</strong> Όλες οι πληροφορίες της κάρτας σας είναι κρυπτογραφημένες 
          και προστατευμένες. Δεν αποθηκεύουμε τα στοιχεία της κάρτας σας.
        </AlertDescription>
      </Alert>

      {/* Payment Button */}
      <div className="flex justify-end pt-6">
        <Button 
          onClick={handlePayment}
          disabled={isProcessing}
          className="bg-green-600 hover:bg-green-700 text-white px-8"
        >
          <Lock className="w-4 h-4 mr-2" />
          Ολοκλήρωση Πληρωμής €{calculatedFees.totalAmount}
        </Button>
      </div>
    </div>
  );
}