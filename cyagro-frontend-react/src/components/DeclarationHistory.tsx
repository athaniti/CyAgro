import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { History, FileText, Plus, Calendar, CheckCircle2 } from "lucide-react";

// Mock data for previous declarations
const mockPreviousDeclarations = [
  {
    id: "DECL-2023-001",
    year: "2023",
    cultivationType: "Εποχιακή",
    crop: "Σιτάρι",
    variety: "Κοινό",
    area: "2.0 στρέμματα",
    submissionDate: "2023-03-10",
    status: "approved",
    fees: "€85.00"
  },
  {
    id: "DECL-2022-002", 
    year: "2022",
    cultivationType: "Εποχιακή",
    crop: "Βαμβάκι",
    variety: "Υβρίδιο",
    area: "1.8 στρέμματα",
    submissionDate: "2022-03-15",
    status: "approved",
    fees: "€92.50"
  }
];

const mockDraftDeclarations = [
  {
    id: "DRAFT-2024-001",
    cultivationType: "Εποχιακή",
    crop: "Καλαμπόκι",
    variety: "Υβρίδιο",
    area: "2.2 στρέμματα",
    savedDate: "2024-03-01",
    completeness: 75
  }
];

export default function DeclarationHistory({ selectedPlot, onSourceSelect }) {
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedDeclaration, setSelectedDeclaration] = useState(null);

  const handleSourceChange = (value) => {
    setSelectedSource(value);
    setSelectedDeclaration(null);
  };

  const handleDeclarationSelect = (declaration) => {
    setSelectedDeclaration(declaration);
  };

  const handleContinue = () => {
    if (selectedSource === 'new') {
      onSourceSelect('new');
    } else if (selectedSource === 'previous' && selectedDeclaration) {
      onSourceSelect('previous', selectedDeclaration);
    } else if (selectedSource === 'draft' && selectedDeclaration) {
      onSourceSelect('draft', selectedDeclaration);
    }
  };

  const canContinue = selectedSource === 'new' || 
    (selectedSource === 'previous' && selectedDeclaration) ||
    (selectedSource === 'draft' && selectedDeclaration);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#334692] mb-2">
          Επιλογή Τύπου Δήλωσης
        </h2>
        <p className="text-gray-600">
          Επιλέξτε εάν θέλετε να υποβάλετε νέα δήλωση ή να χρησιμοποιήσετε προηγούμενη/πρόχειρη
        </p>
      </div>

      {/* Selected Plot Info */}
      <Card className="border-[#334692] bg-blue-50">
        <CardContent className="pt-6">
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
        </CardContent>
      </Card>

      {/* Source Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#334692]">Επιλογή Πηγής Δήλωσης</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedSource} onValueChange={handleSourceChange}>
            <div className="space-y-4">
              {/* New Declaration */}
              <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="new" id="new" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="new" className="cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <Plus className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Νέα Δήλωση Καλλιέργειας</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Δημιουργήστε μια εντελώς νέα δήλωση καλλιέργειας για το τεμάχιο
                    </p>
                  </Label>
                </div>
              </div>

              {/* Previous Declarations */}
              <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="previous" id="previous" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="previous" className="cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <History className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Χρήση Προηγούμενης Δήλωσης</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        {mockPreviousDeclarations.length} διαθέσιμες
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Χρησιμοποιήστε στοιχεία από προηγούμενη δήλωση ως βάση
                    </p>
                  </Label>
                </div>
              </div>

              {/* Draft Declarations */}
              <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="draft" id="draft" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="draft" className="cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-5 h-5 text-orange-600" />
                      <span className="font-medium">Συνέχεια Πρόχειρης Δήλωσης</span>
                      <Badge className="bg-orange-100 text-orange-800">
                        {mockDraftDeclarations.length} αποθηκευμένη
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Συνεχίστε την επεξεργασία μιας αποθηκευμένης πρόχειρης δήλωσης
                    </p>
                  </Label>
                </div>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Previous Declarations List */}
      {selectedSource === 'previous' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-[#334692] flex items-center gap-2">
              <History className="w-5 h-5" />
              Προηγούμενες Δηλώσεις
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockPreviousDeclarations.map((declaration) => (
                <div
                  key={declaration.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedDeclaration?.id === declaration.id
                      ? 'border-[#334692] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleDeclarationSelect(declaration)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{declaration.crop} - {declaration.variety}</h4>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Εγκρίθηκε
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                        <div>
                          <span>Έτος: </span>
                          <span className="font-medium">{declaration.year}</span>
                        </div>
                        <div>
                          <span>Τύπος: </span>
                          <span className="font-medium">{declaration.cultivationType}</span>
                        </div>
                        <div>
                          <span>Έκταση: </span>
                          <span className="font-medium">{declaration.area}</span>
                        </div>
                        <div>
                          <span>Εισφορές: </span>
                          <span className="font-medium">{declaration.fees}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>Υποβλήθηκε: {new Date(declaration.submissionDate).toLocaleDateString('el-GR')}</span>
                      </div>
                    </div>
                    {selectedDeclaration?.id === declaration.id && (
                      <CheckCircle2 className="w-5 h-5 text-[#334692]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Draft Declarations List */}
      {selectedSource === 'draft' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-[#334692] flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Πρόχειρες Δηλώσεις
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockDraftDeclarations.map((draft) => (
                <div
                  key={draft.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedDeclaration?.id === draft.id
                      ? 'border-[#334692] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleDeclarationSelect(draft)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{draft.crop} - {draft.variety}</h4>
                        <Badge className="bg-orange-100 text-orange-800">
                          {draft.completeness}% ολοκληρωμένη
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600">
                        <div>
                          <span>Τύπος: </span>
                          <span className="font-medium">{draft.cultivationType}</span>
                        </div>
                        <div>
                          <span>Έκταση: </span>
                          <span className="font-medium">{draft.area}</span>
                        </div>
                        <div>
                          <span>Αποθηκεύτηκε: </span>
                          <span className="font-medium">{new Date(draft.savedDate).toLocaleDateString('el-GR')}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full" 
                            style={{ width: `${draft.completeness}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    {selectedDeclaration?.id === draft.id && (
                      <CheckCircle2 className="w-5 h-5 text-[#334692]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Continue Button */}
      <div className="flex justify-end pt-6">
        <Button 
          onClick={handleContinue}
          disabled={!canContinue}
          className="bg-[#334692] hover:bg-[#2a3a7a] text-white px-8"
        >
          {selectedSource === 'new' && 'Δημιουργία Νέας Δήλωσης'}
          {selectedSource === 'previous' && 'Χρήση Προηγούμενης Δήλωσης'}
          {selectedSource === 'draft' && 'Συνέχεια Πρόχειρης Δήλωσης'}
          {!selectedSource && 'Επιλέξτε τύπο δήλωσης'}
        </Button>
      </div>
    </div>
  );
}