import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "./ui/card";
import { Database, FileText } from "lucide-react";

const sources = [
  {
    id: "koap",
    title: "ΚΟΑΠ",
    fullTitle: "Κτηματολόγιο Αγροτικής Ανάπτυξης Παραγωγής",
    description: "Αναζήτηση τεμαχίου στη βάση δεδομένων του ΚΟΑΠ για αυτόματη καταχώρηση",
    icon: Database,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    recommended: true
  },
  {
    id: "kap",
    title: "ΚΑΠ",
    fullTitle: "Κοινή Αγροτική Πολιτική",
    description: "Αναζήτηση τεμαχίου στη βάση δεδομένων της ΚΑΠ",
    icon: FileText,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  }
];

export default function PlotSourceSelection({ onSelect }) {
  const [selectedSource, setSelectedSource] = useState(null);

  const handleSelect = (sourceId) => {
    setSelectedSource(sourceId);
  };

  const handleContinue = () => {
    if (selectedSource) {
      onSelect(selectedSource);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#334692] mb-2">
          Επιλογή Πηγής Τεμαχίου
        </h2>
        <p className="text-gray-600">
          Επιθυμείτε καταχώρηση τεμαχίου μέσω ΚΟΑΠ ή ΚΑΠ;
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {sources.map((source) => {
          const IconComponent = source.icon;
          const isSelected = selectedSource === source.id;
          
          return (
            <Card 
              key={source.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg relative ${
                isSelected 
                  ? `border-2 ${source.borderColor} ${source.bgColor} shadow-md` 
                  : 'border-2 border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleSelect(source.id)}
            >
              {source.recommended && (
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  Προτείνεται
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${isSelected ? 'bg-white' : source.bgColor} ${source.color}`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-1">{source.title}</CardTitle>
                    <p className="text-sm font-medium text-gray-600">{source.fullTitle}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected 
                      ? 'border-[#334692] bg-[#334692]' 
                      : 'border-gray-300'
                  }`}>
                    {isSelected && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <CardDescription className="text-gray-600 leading-relaxed">
                  {source.description}
                </CardDescription>
                
                {source.id === "koap" && (
                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span>Αυτόματη συμπλήρωση στοιχείων</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span>Ταχύτερη διαδικασία</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span>Μειωμένα λάθη</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedSource && (
        <div className="text-center pt-6">
          <Button 
            onClick={handleContinue}
            className="bg-[#334692] hover:bg-[#2a3a7a] text-white px-8"
          >
            Συνέχεια με {sources.find(s => s.id === selectedSource)?.title}
          </Button>
        </div>
      )}
    </div>
  );
}