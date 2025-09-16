import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Sprout, AlertTriangle, Info } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { differenceInDays } from "date-fns";
import apiService from "../services/apiService";

export default function CultivationForm({ selectedPlot, declarationSource, previousDeclaration, onSubmit }) {
  const [formData, setFormData] = useState({
    cultivationType: "",
    crop: "",
    variety: "",
    plantingDate: null,
    cultivatedArea: "",
    numberOfTrees: "",
    notes: "",
    irrigationMethod: "",
    organicCertified: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLateSubmission, setIsLateSubmission] = useState(false);
  
  // API data
  const [cultivationGroups, setCultivationGroups] = useState([]);
  const [cultivations, setCultivations] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cultivation groups on component mount
  useEffect(() => {
    loadCultivationGroups();
  }, []);

  const loadCultivationGroups = async () => {
    try {
      setLoading(true);
      const groups = await apiService.getCultivationGroups();
      setCultivationGroups(groups);
    } catch (error) {
      console.error('Failed to load cultivation groups:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load cultivations when group is selected
  useEffect(() => {
    if (formData.cultivationType) {
      loadCultivations(formData.cultivationType);
    } else {
      setCultivations([]);
      setVarieties([]);
    }
  }, [formData.cultivationType]);

  const loadCultivations = async (groupId) => {
    try {
      setLoading(true);
      const cultivationList = await apiService.getCultivationsByGroup(groupId);
      setCultivations(cultivationList);
    } catch (error) {
      console.error('Failed to load cultivations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load varieties when cultivation is selected
  useEffect(() => {
    if (formData.crop) {
      loadVarieties(formData.crop);
    } else {
      setVarieties([]);
    }
  }, [formData.crop]);

  const loadVarieties = async (cultivationId) => {
    try {
      setLoading(true);
      const varietyList = await apiService.getVarietiesByCultivation(cultivationId);
      setVarieties(varietyList);
    } catch (error) {
      console.error('Failed to load varieties:', error);
    } finally {
      setLoading(false);
    }
  };

  // Pre-fill form if using previous or draft declaration
  useEffect(() => {
    if (declarationSource !== 'new' && previousDeclaration) {
      // Handle date parsing safely
      let plantingDate = null;
      if (previousDeclaration.plantingDate) {
        const parsedDate = new Date(previousDeclaration.plantingDate);
        if (!isNaN(parsedDate.getTime())) {
          plantingDate = parsedDate;
        }
      }
      
      setFormData({
        cultivationType: previousDeclaration.cultivationType === 'Εποχιακή' ? 'seasonal' : 'permanent',
        crop: getCropValue(previousDeclaration.crop),
        variety: previousDeclaration.variety || "",
        plantingDate: plantingDate,
        cultivatedArea: previousDeclaration.area?.replace(' στρέμματα', '') || "",
        numberOfTrees: previousDeclaration.numberOfTrees || "",
        notes: previousDeclaration.notes || "",
        irrigationMethod: previousDeclaration.irrigationMethod || "",
        organicCertified: previousDeclaration.organicCertified || ""
      });
    }
  }, [declarationSource, previousDeclaration]);

  // Check if submission is late for permanent crops
  useEffect(() => {
    if (formData.cultivationType === 'permanent' && formData.plantingDate) {
      const daysSincePlanting = differenceInDays(new Date(), formData.plantingDate);
      setIsLateSubmission(daysSincePlanting > 21);
    } else {
      setIsLateSubmission(false);
    }
  }, [formData.cultivationType, formData.plantingDate]);

  const getCropValue = (cropLabel) => {
    return cultivations.find(crop => crop.name === cropLabel)?.id || "";
  };  const handleInputChange = (field, value) => {
    // Clear related errors
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
    
    // Update form data based on field type
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Reset crop and variety when cultivation type changes
      if (field === "cultivationType") {
        newData.crop = "";
        newData.variety = "";
      }
      
      // Reset variety when crop changes
      if (field === "crop") {
        newData.variety = "";
      }
      
      return newData;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cultivationType) {
      newErrors.cultivationType = "Ο τύπος καλλιέργειας είναι υποχρεωτικός";
    }
    
    if (!formData.crop) {
      newErrors.crop = "Το είδος καλλιέργειας είναι υποχρεωτικό";
    }
    
    if (!formData.variety) {
      newErrors.variety = "Η ποικιλία είναι υποχρεωτική";
    }
    
    if (!formData.plantingDate) {
      newErrors.plantingDate = "Η ημερομηνία φύτευσης είναι υποχρεωτική";
    }
    
    if (!formData.cultivatedArea || parseFloat(formData.cultivatedArea) <= 0) {
      newErrors.cultivatedArea = "Η καλλιεργήσιμη έκταση είναι υποχρεωτική";
    }
    
    if (parseFloat(formData.cultivatedArea) > parseFloat(selectedPlot.area.split(' ')[0])) {
      newErrors.cultivatedArea = "Η καλλιεργήσιμη έκταση δεν μπορεί να υπερβαίνει την έκταση του τεμαχίου";
    }
    
    if (formData.cultivationType === 'permanent' && (!formData.numberOfTrees || parseInt(formData.numberOfTrees) <= 0)) {
      newErrors.numberOfTrees = "Ο αριθμός δέντρων είναι υποχρεωτικός για μόνιμες καλλιέργειες";
    }

    if (!formData.irrigationMethod) {
      newErrors.irrigationMethod = "Η μέθοδος άρδευσης είναι υποχρεωτική";
    }

    if (!formData.organicCertified) {
      newErrors.organicCertified = "Η δήλωση βιολογικής καλλιέργειας είναι υποχρεωτική";
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
    
    // Simulate form processing
    setTimeout(() => {
      const submissionData = {
        ...formData,
        isLateSubmission,
        submittedAt: new Date().toISOString(),
        plotId: selectedPlot.id
      };
      
      onSubmit(submissionData);
      setIsSubmitting(false);
    }, 2000);
  };

  const availableCrops = cultivations;
  const selectedCrop = availableCrops.find(crop => crop.id === parseInt(formData.crop));
  const availableVarieties = varieties;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#334692] mb-2">
          Φόρμα Δήλωσης Καλλιέργειας
        </h2>
        <p className="text-gray-600">
          Συμπληρώστε τα στοιχεία της καλλιέργειας που θέλετε να δηλώσετε
        </p>
      </div>

      {/* Plot Info */}
      <Card className="border-[#334692] bg-blue-50">
        <CardContent className="pt-6">
          <h4 className="font-medium text-[#334692] mb-2">Στοιχεία Τεμαχίου:</h4>
          <div className="text-sm text-gray-700">
            <span className="font-medium">{selectedPlot.province}, {selectedPlot.community}</span>
            <span className="mx-2">•</span>
            <span>Φ/Σ: {selectedPlot.sheet}</span>
            <span className="mx-2">•</span>
            <span>Μπλοκ: {selectedPlot.block}</span>
            <span className="mx-2">•</span>
            <span>Τεμάχιο: {selectedPlot.plotNumber}</span>
            <span className="mx-2">•</span>
            <span>Διαθέσιμη έκταση: {selectedPlot.area}</span>
          </div>
        </CardContent>
      </Card>

      {/* Late Submission Warning */}
      {isLateSubmission && (
        <Alert className="border-red-500 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            <strong>Εκπρόθεσμη Δήλωση:</strong> Η δήλωση υποβάλλεται εκτός της προβλεπόμενης προθεσμίας 
            των 21 ημερών από τη φύτευση. Θα εφαρμοστούν αυξημένες εισφορές.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Cultivation Type */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#334692] flex items-center gap-2">
              <Sprout className="w-5 h-5" />
              Τύπος Καλλιέργειας
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Label>Ομάδα Καλλιέργειας *</Label>
              <Select 
                value={formData.cultivationType} 
                onValueChange={(value) => handleInputChange('cultivationType', value)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Επιλέξτε ομάδα καλλιέργειας" />
                </SelectTrigger>
                <SelectContent>
                  {cultivationGroups.map((group) => (
                    <SelectItem key={group.id} value={group.id.toString()}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.cultivationType && (
                <p className="text-red-500 text-sm">{errors.cultivationType}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Crop Details */}
        {formData.cultivationType && (
          <Card>
            <CardHeader>
              <CardTitle className="text-[#334692]">Στοιχεία Καλλιέργειας</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="crop">Είδος Καλλιέργειας *</Label>
                  <Select 
                    value={formData.crop} 
                    onValueChange={(value) => handleInputChange('crop', value)}
                  >
                    <SelectTrigger className={errors.crop ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Επιλέξτε είδος καλλιέργειας" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCrops.map((crop) => (
                        <SelectItem key={crop.id} value={crop.id.toString()}>
                          {crop.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.crop && (
                    <p className="text-red-500 text-sm">{errors.crop}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="variety">Ποικιλία *</Label>
                  <Select 
                    value={formData.variety} 
                    onValueChange={(value) => handleInputChange('variety', value)}
                    disabled={!formData.crop}
                  >
                    <SelectTrigger className={errors.variety ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Επιλέξτε ποικιλία" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVarieties.map((variety) => (
                        <SelectItem key={variety.id} value={variety.id.toString()}>
                          {variety.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.variety && (
                    <p className="text-red-500 text-sm">{errors.variety}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ημερομηνία Φύτευσης *</Label>
                  <Input
                    type="date"
                    value={formData.plantingDate ? 
                      formData.plantingDate.toISOString().split('T')[0] : 
                      ""
                    }
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value) : null;
                      handleInputChange('plantingDate', date);
                    }}
                    className={errors.plantingDate ? 'border-red-500' : ''}
                  />
                  {errors.plantingDate && (
                    <p className="text-red-500 text-sm">{errors.plantingDate}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cultivatedArea">Καλλιεργήσιμη Έκταση (στρέμματα) *</Label>
                  <Input
                    id="cultivatedArea"
                    type="number"
                    step="0.1"
                    value={formData.cultivatedArea}
                    onChange={(e) => handleInputChange('cultivatedArea', e.target.value)}
                    placeholder="π.χ. 2.5"
                    className={errors.cultivatedArea ? 'border-red-500' : ''}
                  />
                  {errors.cultivatedArea && (
                    <p className="text-red-500 text-sm">{errors.cultivatedArea}</p>
                  )}
                </div>
              </div>

              {formData.cultivationType === 'permanent' && (
                <div className="space-y-2">
                  <Label htmlFor="numberOfTrees">Αριθμός Δέντρων *</Label>
                  <Input
                    id="numberOfTrees"
                    type="number"
                    value={formData.numberOfTrees}
                    onChange={(e) => handleInputChange('numberOfTrees', e.target.value)}
                    placeholder="π.χ. 150"
                    className={errors.numberOfTrees ? 'border-red-500' : ''}
                  />
                  {errors.numberOfTrees && (
                    <p className="text-red-500 text-sm">{errors.numberOfTrees}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Additional Information */}
        {formData.cultivationType && (
          <Card>
            <CardHeader>
              <CardTitle className="text-[#334692]">Επιπλέον Στοιχεία</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="irrigationMethod">Μέθοδος Άρδευσης *</Label>
                  <Select 
                    value={formData.irrigationMethod} 
                    onValueChange={(value) => handleInputChange('irrigationMethod', value)}
                  >
                    <SelectTrigger className={errors.irrigationMethod ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Επιλέξτε μέθοδο άρδευσης" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drip">Στάγδην</SelectItem>
                      <SelectItem value="sprinkler">Καταιονισμός</SelectItem>
                      <SelectItem value="furrow">Αυλάκια</SelectItem>
                      <SelectItem value="none">Χωρίς άρδευση</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.irrigationMethod && (
                    <p className="text-red-500 text-sm">{errors.irrigationMethod}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Βιολογική Καλλιέργεια *</Label>
                  <RadioGroup 
                    value={formData.organicCertified} 
                    onValueChange={(value) => handleInputChange('organicCertified', value)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="organic-yes" />
                      <Label htmlFor="organic-yes" className="font-normal">Ναι</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="organic-no" />
                      <Label htmlFor="organic-no" className="font-normal">Όχι</Label>
                    </div>
                  </RadioGroup>
                  {errors.organicCertified && (
                    <p className="text-red-500 text-sm">{errors.organicCertified}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Επιπλέον Παρατηρήσεις</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Προαιρετικές παρατηρήσεις για την καλλιέργεια"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Important Info */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Σημαντικό:</strong> Βεβαιωθείτε ότι όλα τα στοιχεία είναι σωστά πριν προχωρήσετε. 
            Μετά την υποβολή και πληρωμή, η δήλωση δεν μπορεί να τροποποιηθεί.
          </AlertDescription>
        </Alert>

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="bg-[#334692] hover:bg-[#2a3a7a] text-white px-8"
          >
            {isSubmitting ? "Επεξεργασία δήλωσης..." : "Συνέχεια στον Υπολογισμό Εισφορών"}
          </Button>
        </div>
      </form>
    </div>
  );
}