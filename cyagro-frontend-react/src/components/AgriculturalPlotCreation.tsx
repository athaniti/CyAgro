import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { MapPin, Calculator, FileText, Combine } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

export default function AgriculturalPlotCreation({ selectedPlot, adjacentPlots, onSubmit }) {
  const [formData, setFormData] = useState({
    plotName: "",
    description: "",
    plannedUse: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate totals
  const allPlots = [selectedPlot, ...adjacentPlots];
  const totalArea = allPlots.reduce((total, plot) => {
    const area = parseFloat(plot.area.split(' ')[0]);
    return total + area;
  }, 0);

  const totalPlots = allPlots.length;
  const ownedPlots = allPlots.filter(plot => 
    plot.exploitationStatus === 'ownership' || plot.ownershipType === 'Ιδιοκτησία'
  ).length;
  const managedPlots = totalPlots - ownedPlots;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.plotName.trim()) {
      newErrors.plotName = "Η ονομασία αγροτεμαχίου είναι υποχρεωτική";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Η περιγραφή είναι υποχρεωτική";
    }

    if (!formData.plannedUse.trim()) {
      newErrors.plannedUse = "Η προβλεπόμενη χρήση είναι υποχρεωτική";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      const submissionData = {
        ...formData,
        totalArea: totalArea.toFixed(1),
        totalPlots,
        ownedPlots,
        managedPlots,
        plots: allPlots,
        submittedAt: new Date().toISOString()
      };
      
      onSubmit(submissionData);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#334692] mb-2">
          Δημιουργία Αγροτεμαχίου
        </h2>
        <p className="text-gray-600">
          Ολοκληρώστε τα στοιχεία για τη δημιουργία του νέου αγροτεμαχίου
        </p>
      </div>

      {/* Summary Overview */}
      <Card className="border-[#334692] bg-blue-50">
        <CardHeader>
          <CardTitle className="text-[#334692] flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Περίληψη Συρραφής
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#334692]">{totalPlots}</div>
              <div className="text-sm text-gray-600">Συνολικά Τεμάχια</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalArea.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Στρέμματα</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{ownedPlots}</div>
              <div className="text-sm text-gray-600">Ιδιοκτησία</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{managedPlots}</div>
              <div className="text-sm text-gray-600">Διαχείριση</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plot Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#334692] flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Τεμάχια προς Συρραφή
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {allPlots.map((plot, index) => (
              <div 
                key={plot.id} 
                className={`p-3 rounded-lg border ${
                  index === 0 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {index === 0 && (
                      <Badge className="bg-blue-600 text-white">Αρχικό</Badge>
                    )}
                    <div>
                      <h4 className="font-medium">
                        Τεμάχιο {plot.plotNumber}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {plot.sheet}-{plot.block}-{plot.plotNumber}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{plot.area}</p>
                    <p className="text-sm text-gray-600">
                      {plot.exploitationStatus === 'ownership' || plot.ownershipType === 'Ιδιοκτησία' 
                        ? 'Ιδιοκτησία' 
                        : 'Διαχείριση'
                      }
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Agricultural Plot Details Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#334692] flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Στοιχεία Αγροτεμαχίου
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="plotName">Ονομασία Αγροτεμαχίου *</Label>
              <Input
                id="plotName"
                value={formData.plotName}
                onChange={(e) => handleInputChange('plotName', e.target.value)}
                placeholder="π.χ. Αγροτεμάχιο Στροβόλου Α"
                className={errors.plotName ? 'border-red-500' : ''}
              />
              {errors.plotName && (
                <p className="text-red-500 text-sm">{errors.plotName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Περιγραφή Αγροτεμαχίου *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Περιγράψτε το αγροτεμάχιο, την τοποθεσία και τα χαρακτηριστικά του"
                rows={4}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="plannedUse">Προβλεπόμενη Χρήση *</Label>
              <Input
                id="plannedUse"
                value={formData.plannedUse}
                onChange={(e) => handleInputChange('plannedUse', e.target.value)}
                placeholder="π.χ. Καλλιέργεια δημητριακών, Θερμοκήπια, Κτηνοτροφία"
                className={errors.plannedUse ? 'border-red-500' : ''}
              />
              {errors.plannedUse && (
                <p className="text-red-500 text-sm">{errors.plannedUse}</p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Technical Information */}
      <Alert>
        <Combine className="h-4 w-4" />
        <AlertDescription>
          <strong>Τεχνικές Πληροφορίες:</strong> Το νέο αγροτεμάχιο θα δημιουργηθεί με ενοποιημένα στοιχεία 
          έκτασης, τίτλους ιδιοκτησίας και υπό-τεμάχια. Θα διατηρηθούν όλες οι σχετικές πληροφορίες των 
          αρχικών τεμαχίων για λόγους ιχνηλασιμότητας.
        </AlertDescription>
      </Alert>

      {/* Submit Button */}
      <div className="flex justify-end pt-6">
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-[#334692] hover:bg-[#2a3a7a] text-white px-8"
        >
          {isSubmitting ? "Γίνεται δημιουργία αγροτεμαχίου..." : "Δημιουργία Αγροτεμαχίου"}
        </Button>
      </div>
    </div>
  );
}