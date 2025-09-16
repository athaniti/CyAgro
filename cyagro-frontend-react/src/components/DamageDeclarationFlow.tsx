import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { LogOut, ArrowLeft, Home } from "lucide-react";
import DamageDashboard from "./DamageDashboard";
import ActiveDamageDeclarations from "./ActiveDamageDeclarations";
import DamageEligibilityCheck from "./DamageEligibilityCheck";
import DamageDeclarationForm from "./DamageDeclarationForm";
import DamageDeclarationSuccess from "./DamageDeclarationSuccess";

const steps = [
  { id: 1, title: "Ενεργές Δηλώσεις", description: "Δείτε διαθέσιμες δηλώσεις ζημιάς" },
  { id: 2, title: "Επιλογή Δήλωσης", description: "Επιλέξτε δήλωση για υποβολή" },
  { id: 3, title: "Έλεγχος Δικαιώματος", description: "Επιβεβαίωση δικαιώματος υποβολής" },
  { id: 4, title: "Φόρμα Δήλωσης", description: "Συμπλήρωση στοιχείων ζημιάς" },
  { id: 5, title: "Ολοκλήρωση", description: "Επιβεβαίωση υποβολής" }
];

export default function DamageDeclarationFlow({ userData, onLogout, onBack }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDamageDeclaration, setSelectedDamageDeclaration] = useState(null);
  const [eligiblePlots, setEligiblePlots] = useState([]);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [damageDeclarationData, setDamageDeclarationData] = useState({});

  const handleDamageDeclarationSelect = (declaration) => {
    setSelectedDamageDeclaration(declaration);
    setCurrentStep(2);
  };

  const handleEligibilityConfirmed = (plots, selectedPlot) => {
    setEligiblePlots(plots);
    setSelectedPlot(selectedPlot);
    setCurrentStep(3);
  };

  const handleDeclarationSubmit = (data) => {
    setDamageDeclarationData(data);
    setCurrentStep(5);
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
            <h1 className="text-xl font-bold">Δήλωση Ζημιάς</h1>
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
      {currentStep < 5 && (
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
            
            {/* Step indicators */}
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
          <DamageDashboard 
            userData={userData}
            onNext={handleDamageDeclarationSelect} 
          />
        )}
        
        {currentStep === 2 && (
          <ActiveDamageDeclarations 
            selectedDeclaration={selectedDamageDeclaration}
            onNext={handleEligibilityConfirmed}
          />
        )}
        
        {currentStep === 3 && (
          <DamageEligibilityCheck 
            selectedDeclaration={selectedDamageDeclaration}
            eligiblePlots={eligiblePlots}
            selectedPlot={selectedPlot}
            onNext={() => setCurrentStep(4)}
          />
        )}
        
        {currentStep === 4 && (
          <DamageDeclarationForm 
            selectedDeclaration={selectedDamageDeclaration}
            selectedPlot={selectedPlot}
            onSubmit={handleDeclarationSubmit}
          />
        )}
        
        {currentStep === 5 && (
          <DamageDeclarationSuccess 
            userData={userData}
            selectedDeclaration={selectedDamageDeclaration}
            selectedPlot={selectedPlot}
            damageDeclarationData={damageDeclarationData}
            onBack={onBack}
            onLogout={onLogout}
          />
        )}
      </div>
    </div>
  );
}