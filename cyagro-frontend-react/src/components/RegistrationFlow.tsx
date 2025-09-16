import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { LogOut, ArrowLeft } from "lucide-react";
import ProfileSelection from "./ProfileSelection";
import RegistrationForm from "./RegistrationForm";
import SuccessPage from "./SuccessPage";

const steps = [
  { id: 1, title: "Επιλογή Προφίλ", description: "Επιλέξτε τύπο προφίλ" },
  { id: 2, title: "Στοιχεία Μητρώου", description: "Συμπληρώστε τα απαραίτητα στοιχεία" },
  { id: 3, title: "Ολοκλήρωση", description: "Επιβεβαίωση εγγραφής" }
];

export default function RegistrationFlow({ userData, onLogout, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [registrationData, setRegistrationData] = useState({});

  const handleProfileSubmit = (profiles) => {
    setSelectedProfiles(profiles);
    setCurrentStep(2);
  };

  const handleRegistrationSubmit = (data) => {
    setRegistrationData(data);
    setCurrentStep(3);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressValue = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#334692] text-white p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Εγγραφή στο Μητρώο</h1>
            <span className="text-white/80">|</span>
            <span className="text-white/80">Χρήστης: {userData.fullName}</span>
          </div>
          <div className="flex items-center gap-2">
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
      {currentStep < 3 && (
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
          <ProfileSelection onSubmit={handleProfileSubmit} />
        )}
        
        {currentStep === 2 && (
          <RegistrationForm 
            userData={userData}
            selectedProfiles={selectedProfiles}
            onSubmit={handleRegistrationSubmit}
          />
        )}
        
        {currentStep === 3 && (
          <SuccessPage 
            userData={userData}
            registrationData={registrationData}
            onLogout={onLogout}
            onComplete={onComplete}
          />
        )}
      </div>
    </div>
  );
}