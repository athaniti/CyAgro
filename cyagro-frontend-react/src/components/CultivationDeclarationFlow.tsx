import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { LogOut, ArrowLeft, Home } from "lucide-react";
import DeclarationDashboard from "./DeclarationDashboard";
import ActiveDeclarations from "./ActiveDeclarations";
import DeclarationHistory from "./DeclarationHistory";
import CultivationForm from "./CultivationForm";
import FeeCalculation from "./FeeCalculation";
import PaymentGateway from "./PaymentGateway";
import DeclarationSuccess from "./DeclarationSuccess";

const steps = [
  { id: 1, title: "Επιλογή Δήλωσης", description: "Επιλέξτε τύπο δήλωσης" },
  { id: 2, title: "Επιλογή Τεμαχίου", description: "Επιλέξτε τεμάχιο για δήλωση" },
  { id: 3, title: "Ιστορικό Δηλώσεων", description: "Προηγούμενες και πρόχειρες δηλώσεις" },
  { id: 4, title: "Φόρμα Δήλωσης", description: "Συμπλήρωση στοιχείων καλλιέργειας" },
  { id: 5, title: "Υπολογισμός Εισφορών", description: "Έλεγχος και υπολογισμός κόστους" },
  { id: 6, title: "Πληρωμή", description: "Ηλεκτρονική πληρωμή εισφορών" },
  { id: 7, title: "Ολοκλήρωση", description: "Επιβεβαίωση υποβολής" }
];

export default function CultivationDeclarationFlow({ userData, onLogout, onBack }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDeclarationType, setSelectedDeclarationType] = useState(null);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [selectedDeclarationSource, setSelectedDeclarationSource] = useState(null); // 'new', 'previous', 'draft'
  const [selectedPreviousDeclaration, setSelectedPreviousDeclaration] = useState(null);
  const [declarationData, setDeclarationData] = useState({});
  const [calculatedFees, setCalculatedFees] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const handleDeclarationTypeSelection = (declarationType) => {
    setSelectedDeclarationType(declarationType);
    setCurrentStep(2);
  };

  const handlePlotSelection = (plot) => {
    setSelectedPlot(plot);
    setCurrentStep(3);
  };

  const handleDeclarationSourceSelection = (source, previousDeclaration = null) => {
    setSelectedDeclarationSource(source);
    setSelectedPreviousDeclaration(previousDeclaration);
    setCurrentStep(4);
  };

  const handleDeclarationSubmit = (data) => {
    setDeclarationData(data);
    setCurrentStep(5);
  };

  const handleFeesCalculated = (fees) => {
    setCalculatedFees(fees);
    setCurrentStep(6);
  };

  const handlePaymentComplete = (payment) => {
    setPaymentData(payment);
    setCurrentStep(7);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const progressValue = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#334692] text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Δήλωση Καλλιέργειας</h1>
            <span className="text-white/80">|</span>
            <span className="text-white/80">Χρήστης: {userData.fullName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-white hover:bg-white/10"
            >
              <Home className="w-4 h-4 mr-1" />
              Αρχική
            </Button>
            {currentStep > 1 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBack}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Πίσω
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onLogout}
              className="text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Αποσύνδεση
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {currentStep < 7 && (
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto p-6">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-medium text-[#334692]">
                  {steps[currentStep - 1].title}
                </h2>
                <span className="text-sm text-gray-500">
                  Βήμα {currentStep} από {steps.length}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                {steps[currentStep - 1].description}
              </p>
              <Progress value={progressValue} className="h-2" />
            </div>
            
            {/* Step indicators - Only show first 4 steps in compact view */}
            <div className="flex justify-between">
              {steps.slice(0, 4).map((step, index) => (
                <div 
                  key={step.id} 
                  className={`flex items-center ${index < 3 ? 'flex-1' : ''}`}
                >
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${currentStep >= step.id 
                      ? 'bg-[#334692] text-white' 
                      : 'bg-gray-200 text-gray-500'
                    }
                  `}>
                    {step.id}
                  </div>
                  <span className={`ml-2 text-sm ${
                    currentStep >= step.id ? 'text-[#334692]' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < 3 && (
                    <div className="flex-1 h-0.5 bg-gray-200 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        {currentStep === 1 && (
          <DeclarationDashboard onNext={handleDeclarationTypeSelection} />
        )}
        
        {currentStep === 2 && (
          <ActiveDeclarations 
            selectedType={selectedDeclarationType}
            onPlotSelect={handlePlotSelection} 
          />
        )}
        
        {currentStep === 3 && (
          <DeclarationHistory 
            selectedPlot={selectedPlot}
            onSourceSelect={handleDeclarationSourceSelection}
          />
        )}
        
        {currentStep === 4 && (
          <CultivationForm 
            selectedPlot={selectedPlot}
            declarationSource={selectedDeclarationSource}
            previousDeclaration={selectedPreviousDeclaration}
            onSubmit={handleDeclarationSubmit}
          />
        )}
        
        {currentStep === 5 && (
          <FeeCalculation 
            selectedPlot={selectedPlot}
            declarationData={declarationData}
            onFeesCalculated={handleFeesCalculated}
          />
        )}
        
        {currentStep === 6 && (
          <PaymentGateway 
            calculatedFees={calculatedFees}
            onPaymentComplete={handlePaymentComplete}
          />
        )}
        
        {currentStep === 7 && (
          <DeclarationSuccess 
            userData={userData}
            selectedPlot={selectedPlot}
            declarationData={declarationData}
            paymentData={paymentData}
            onBack={onBack}
            onLogout={onLogout}
          />
        )}
      </div>
    </div>
  );
}