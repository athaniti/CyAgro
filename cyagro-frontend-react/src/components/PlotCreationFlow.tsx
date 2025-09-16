import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { LogOut, ArrowLeft, Home } from "lucide-react";
import PlotSourceSelection from "./PlotSourceSelection";
import KoapSearch from "./KoapSearch";
import PlotNotFoundDialog from "./PlotNotFoundDialog";
import ManualPlotForm from "./ManualPlotForm";
import PlotCreationSuccess from "./PlotCreationSuccess";

const steps = [
  { id: 1, title: "Επιλογή Πηγής", description: "Επιλέξτε πηγή τεμαχίου" },
  { id: 2, title: "Αναζήτηση ΚΟΑΠ", description: "Αναζήτηση στη βάση ΚΟΑΠ" },
  { id: 3, title: "Καταχώρηση Τεμαχίου", description: "Χειροκίνητη καταχώρηση στοιχείων" },
  { id: 4, title: "Ολοκλήρωση", description: "Επιβεβαίωση καταχώρησης" }
];

export default function PlotCreationFlow({ userData, onLogout, onBack }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSource, setSelectedSource] = useState(null);
  const [searchData, setSearchData] = useState({});
  const [showNotFoundDialog, setShowNotFoundDialog] = useState(false);
  const [plotData, setPlotData] = useState({});

  const handleSourceSelection = (source) => {
    setSelectedSource(source);
    if (source === "koap") {
      setCurrentStep(2);
    } else {
      // Handle ΚΑΠ flow if needed
      setCurrentStep(3);
    }
  };

  const handleKoapSearch = (data) => {
    setSearchData(data);
    // Simulate ΚΟΑΠ search - always return not found for this demo
    setTimeout(() => {
      setShowNotFoundDialog(true);
    }, 1500);
  };

  const handleNotFoundRetry = () => {
    setShowNotFoundDialog(false);
    // Stay on search step
  };

  const handleManualRegistration = () => {
    setShowNotFoundDialog(false);
    setCurrentStep(3);
  };

  const handlePlotSubmit = (data) => {
    setPlotData(data);
    setCurrentStep(4);
  };

  const handleBack = () => {
    if (showNotFoundDialog) {
      setShowNotFoundDialog(false);
      return;
    }
    
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
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Καταχώρηση Νέου Τεμαχίου</h1>
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
            {currentStep > 1 && !showNotFoundDialog && (
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
      {currentStep < 4 && !showNotFoundDialog && (
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto p-6">
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
              {steps.map((step, index) => (
                <div 
                  key={step.id} 
                  className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
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
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-0.5 bg-gray-200 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        {currentStep === 1 && (
          <PlotSourceSelection onSelect={handleSourceSelection} />
        )}
        
        {currentStep === 2 && (
          <KoapSearch onSearch={handleKoapSearch} />
        )}
        
        {currentStep === 3 && (
          <ManualPlotForm 
            searchData={searchData}
            onSubmit={handlePlotSubmit}
          />
        )}
        
        {currentStep === 4 && (
          <PlotCreationSuccess 
            userData={userData}
            plotData={plotData}
            onBack={onBack}
            onLogout={onLogout}
          />
        )}
      </div>

      {/* Plot Not Found Dialog */}
      {showNotFoundDialog && (
        <PlotNotFoundDialog
          onRetry={handleNotFoundRetry}
          onManualRegistration={handleManualRegistration}
        />
      )}
    </div>
  );
}