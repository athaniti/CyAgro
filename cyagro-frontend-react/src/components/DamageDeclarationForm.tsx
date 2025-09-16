import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon, Sprout, Home, AlertTriangle, Info, Upload } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { format } from "date-fns";
import { el } from "date-fns/locale";

export default function DamageDeclarationForm({ selectedDeclaration, selectedPlot, onSubmit }) {
  const [formData, setFormData] = useState({
    damageType: "", // "cultivation", "livestock", "fixed_assets"
    
    // Cultivation/Livestock details
    affectedCrop: "",
    affectedArea: "",
    estimatedYield: "",
    actualYield: "",
    damagePercentage: "",
    
    // Fixed assets details
    assetType: "",
    assetDescription: "",
    assetValue: "",
    damageDescription: "",
    
    // Common fields
    damageDate: null,
    reportingDate: new Date(),
    damageCircumstances: "",
    witnessName: "",
    witnessContact: "",
    previousDamage: "",
    insuranceCovered: "",
    estimatedLoss: "",
    
    // Supporting documents
    documentsUploaded: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
    
    // Auto-calculate damage percentage when yields are entered
    if (field === 'estimatedYield' || field === 'actualYield') {
      const estimated = field === 'estimatedYield' ? parseFloat(value) : parseFloat(formData.estimatedYield);
      const actual = field === 'actualYield' ? parseFloat(value) : parseFloat(formData.actualYield);
      
      if (estimated > 0 && actual >= 0) {
        const damagePercent = Math.max(0, Math.min(100, ((estimated - actual) / estimated) * 100));
        setFormData(prev => ({ ...prev, damagePercentage: damagePercent.toFixed(1) }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.damageType) {
      newErrors.damageType = "Ο τύπος ζημιάς είναι υποχρεωτικός";
    }
    
    if (!formData.damageDate) {
      newErrors.damageDate = "Η ημερομηνία πρόκλησης ζημιάς είναι υποχρεωτική";
    }
    
    if (!formData.damageCircumstances.trim()) {
      newErrors.damageCircumstances = "Η περιγραφή των συνθηκών είναι υποχρεωτική";
    }
    
    if (formData.damageType === 'cultivation' || formData.damageType === 'livestock') {
      if (!formData.affectedCrop) {
        newErrors.affectedCrop = "Το είδος καλλιέργειας/ζώου είναι υποχρεωτικό";
      }
      if (!formData.affectedArea || parseFloat(formData.affectedArea) <= 0) {
        newErrors.affectedArea = "Η επηρεασμένη έκταση είναι υποχρεωτική";
      }
      if (!formData.estimatedYield || parseFloat(formData.estimatedYield) <= 0) {
        newErrors.estimatedYield = "Η εκτιμώμενη παραγωγή είναι υποχρεωτική";
      }
      if (formData.actualYield === "" || parseFloat(formData.actualYield) < 0) {
        newErrors.actualYield = "Η πραγματική παραγωγή είναι υποχρεωτική";
      }
    }
    
    if (formData.damageType === 'fixed_assets') {
      if (!formData.assetType) {
        newErrors.assetType = "Ο τύπος παγίου είναι υποχρεωτικός";
      }
      if (!formData.assetDescription.trim()) {
        newErrors.assetDescription = "Η περιγραφή του παγίου είναι υποχρεωτική";
      }
      if (!formData.assetValue || parseFloat(formData.assetValue) <= 0) {
        newErrors.assetValue = "Η αξία του παγίου είναι υποχρεωτική";
      }
      if (!formData.damageDescription.trim()) {
        newErrors.damageDescription = "Η περιγραφή της ζημιάς είναι υποχρεωτική";
      }
    }
    
    if (!formData.estimatedLoss || parseFloat(formData.estimatedLoss) <= 0) {
      newErrors.estimatedLoss = "Η εκτιμώμενη ζημιά είναι υποχρεωτική";
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
        submittedAt: new Date().toISOString(),
        plotId: selectedPlot.id,
        declarationId: selectedDeclaration.id,
        isOnTime: new Date() <= new Date(selectedDeclaration.submissionDeadline)
      };
      
      onSubmit(submissionData);
      setIsSubmitting(false);
    }, 2000);
  };

  const eligibleCrops = selectedPlot.cultivations.filter(crop => 
    selectedDeclaration.eligibleCrops.includes(crop)
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#334692] mb-2">
          Φόρμα Δήλωσης Ζημιάς
        </h2>
        <p className="text-gray-600">
          Συμπληρώστε λεπτομερώς τα στοιχεία της ζημιάς που υπέστη το τεμάχιό σας
        </p>
      </div>

      {/* Plot & Declaration Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <h4 className="font-medium text-[#334692] mb-2">Στοιχεία Τεμαχίου:</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><span className="font-medium">Τεμάχιο:</span> {selectedPlot.plotNumber}</p>
              <p><span className="font-medium">Κοινότητα:</span> {selectedPlot.community}</p>
              <p><span className="font-medium">Έκταση:</span> {selectedPlot.area}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <h4 className="font-medium text-red-800 mb-2">Δήλωση Ζημιάς:</h4>
            <div className="text-sm text-red-700 space-y-1">
              <p><span className="font-medium">Αίτιο:</span> {selectedDeclaration.cause}</p>
              <p><span className="font-medium">Ημερομηνία:</span> {new Date(selectedDeclaration.dateOccurred).toLocaleDateString('el-GR')}</p>
              <p><span className="font-medium">Αποζημίωση:</span> {selectedDeclaration.compensationRate}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Damage Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#334692] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Τύπος Ζημιάς
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Label>Τύπος Ζημιάς *</Label>
              <RadioGroup 
                value={formData.damageType} 
                onValueChange={(value) => handleInputChange('damageType', value)}
                className="grid grid-cols-1 gap-4"
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="cultivation" id="cultivation" />
                  <Label htmlFor="cultivation" className="font-normal cursor-pointer flex-1">
                    <div>
                      <p className="font-medium">Καλλιέργεια</p>
                      <p className="text-sm text-gray-600">Ζημιά σε καλλιέργειες, δένδρα ή φυτά</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="livestock" id="livestock" />
                  <Label htmlFor="livestock" className="font-normal cursor-pointer flex-1">
                    <div>
                      <p className="font-medium">Ζωικό Κεφάλαιο</p>
                      <p className="text-sm text-gray-600">Ζημιά σε ζώα ή πουλερικά</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="fixed_assets" id="fixed_assets" />
                  <Label htmlFor="fixed_assets" className="font-normal cursor-pointer flex-1">
                    <div>
                      <p className="font-medium">Πάγιο Κεφάλαιο</p>
                      <p className="text-sm text-gray-600">Ζημιά σε εγκαταστάσεις, μηχανήματα ή κτίρια</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
              {errors.damageType && (
                <p className="text-red-500 text-sm">{errors.damageType}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Cultivation/Livestock Details */}
        {(formData.damageType === 'cultivation' || formData.damageType === 'livestock') && (
          <Card>
            <CardHeader>
              <CardTitle className="text-[#334692] flex items-center gap-2">
                <Sprout className="w-5 h-5" />
                Στοιχεία {formData.damageType === 'cultivation' ? 'Καλλιέργειας' : 'Ζωικού Κεφαλαίου'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="affectedCrop">
                    {formData.damageType === 'cultivation' ? 'Είδος Καλλιέργειας' : 'Είδος Ζώου'} *
                  </Label>
                  <Select 
                    value={formData.affectedCrop} 
                    onValueChange={(value) => handleInputChange('affectedCrop', value)}
                  >
                    <SelectTrigger className={errors.affectedCrop ? 'border-red-500' : ''}>
                      <SelectValue placeholder={`Επιλέξτε ${formData.damageType === 'cultivation' ? 'καλλιέργεια' : 'είδος ζώου'}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {eligibleCrops.map((crop) => (
                        <SelectItem key={crop} value={crop}>
                          {crop}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.affectedCrop && (
                    <p className="text-red-500 text-sm">{errors.affectedCrop}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="affectedArea">
                    {formData.damageType === 'cultivation' ? 'Επηρεασμένη Έκταση (στρέμματα)' : 'Αριθμός Ζώων'} *
                  </Label>
                  <Input
                    id="affectedArea"
                    type="number"
                    step="0.1"
                    value={formData.affectedArea}
                    onChange={(e) => handleInputChange('affectedArea', e.target.value)}
                    placeholder={formData.damageType === 'cultivation' ? "π.χ. 2.5" : "π.χ. 50"}
                    className={errors.affectedArea ? 'border-red-500' : ''}
                  />
                  {errors.affectedArea && (
                    <p className="text-red-500 text-sm">{errors.affectedArea}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estimatedYield">
                    {formData.damageType === 'cultivation' ? 'Εκτιμώμενη Παραγωγή (κιλά)' : 'Εκτιμώμενη Αξία (€)'} *
                  </Label>
                  <Input
                    id="estimatedYield"
                    type="number"
                    step="0.1"
                    value={formData.estimatedYield}
                    onChange={(e) => handleInputChange('estimatedYield', e.target.value)}
                    placeholder="π.χ. 1000"
                    className={errors.estimatedYield ? 'border-red-500' : ''}
                  />
                  {errors.estimatedYield && (
                    <p className="text-red-500 text-sm">{errors.estimatedYield}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="actualYield">
                    {formData.damageType === 'cultivation' ? 'Πραγματική Παραγωγή (κιλά)' : 'Υπολειπόμενη Αξία (€)'} *
                  </Label>
                  <Input
                    id="actualYield"
                    type="number"
                    step="0.1"
                    value={formData.actualYield}
                    onChange={(e) => handleInputChange('actualYield', e.target.value)}
                    placeholder="π.χ. 300"
                    className={errors.actualYield ? 'border-red-500' : ''}
                  />
                  {errors.actualYield && (
                    <p className="text-red-500 text-sm">{errors.actualYield}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="damagePercentage">Ποσοστό Ζημιάς (%)</Label>
                  <Input
                    id="damagePercentage"
                    type="number"
                    step="0.1"
                    value={formData.damagePercentage}
                    onChange={(e) => handleInputChange('damagePercentage', e.target.value)}
                    placeholder="Αυτόματος υπολογισμός"
                    className="bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Fixed Assets Details */}
        {formData.damageType === 'fixed_assets' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-[#334692] flex items-center gap-2">
                <Home className="w-5 h-5" />
                Στοιχεία Παγίου Κεφαλαίου
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assetType">Τύπος Παγίου *</Label>
                  <Select 
                    value={formData.assetType} 
                    onValueChange={(value) => handleInputChange('assetType', value)}
                  >
                    <SelectTrigger className={errors.assetType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Επιλέξτε τύπο παγίου" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="building">Κτίριο</SelectItem>
                      <SelectItem value="machinery">Μηχανήματα</SelectItem>
                      <SelectItem value="greenhouse">Θερμοκήπιο</SelectItem>
                      <SelectItem value="irrigation">Αρδευτικό Σύστημα</SelectItem>
                      <SelectItem value="fence">Περίφραξη</SelectItem>
                      <SelectItem value="other">Άλλο</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.assetType && (
                    <p className="text-red-500 text-sm">{errors.assetType}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assetValue">Αξία Παγίου (€) *</Label>
                  <Input
                    id="assetValue"
                    type="number"
                    step="0.01"
                    value={formData.assetValue}
                    onChange={(e) => handleInputChange('assetValue', e.target.value)}
                    placeholder="π.χ. 15000"
                    className={errors.assetValue ? 'border-red-500' : ''}
                  />
                  {errors.assetValue && (
                    <p className="text-red-500 text-sm">{errors.assetValue}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assetDescription">Περιγραφή Παγίου *</Label>
                <Textarea
                  id="assetDescription"
                  value={formData.assetDescription}
                  onChange={(e) => handleInputChange('assetDescription', e.target.value)}
                  placeholder="Περιγράψτε λεπτομερώς το πάγιο που υπέστη ζημιά"
                  rows={3}
                  className={errors.assetDescription ? 'border-red-500' : ''}
                />
                {errors.assetDescription && (
                  <p className="text-red-500 text-sm">{errors.assetDescription}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="damageDescription">Περιγραφή Ζημιάς *</Label>
                <Textarea
                  id="damageDescription"
                  value={formData.damageDescription}
                  onChange={(e) => handleInputChange('damageDescription', e.target.value)}
                  placeholder="Περιγράψτε λεπτομερώς τη ζημιά που προκλήθηκε"
                  rows={3}
                  className={errors.damageDescription ? 'border-red-500' : ''}
                />
                {errors.damageDescription && (
                  <p className="text-red-500 text-sm">{errors.damageDescription}</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Common Details */}
        {formData.damageType && (
          <Card>
            <CardHeader>
              <CardTitle className="text-[#334692]">Γενικές Πληροφορίες</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ημερομηνία Πρόκλησης Ζημιάς *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                          !formData.damageDate ? "text-muted-foreground" : ""
                        } ${errors.damageDate ? 'border-red-500' : ''}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.damageDate ? 
                          format(formData.damageDate, "dd/MM/yyyy", { locale: el }) : 
                          "Επιλέξτε ημερομηνία"
                        }
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.damageDate}
                        onSelect={(date) => handleInputChange('damageDate', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.damageDate && (
                    <p className="text-red-500 text-sm">{errors.damageDate}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedLoss">Εκτιμώμενη Οικονομική Ζημιά (€) *</Label>
                  <Input
                    id="estimatedLoss"
                    type="number"
                    step="0.01"
                    value={formData.estimatedLoss}
                    onChange={(e) => handleInputChange('estimatedLoss', e.target.value)}
                    placeholder="π.χ. 3500"
                    className={errors.estimatedLoss ? 'border-red-500' : ''}
                  />
                  {errors.estimatedLoss && (
                    <p className="text-red-500 text-sm">{errors.estimatedLoss}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="damageCircumstances">Περιγραφή Συνθηκών Πρόκλησης Ζημιάς *</Label>
                <Textarea
                  id="damageCircumstances"
                  value={formData.damageCircumstances}
                  onChange={(e) => handleInputChange('damageCircumstances', e.target.value)}
                  placeholder="Περιγράψτε λεπτομερώς τις συνθήκες κάτω από τις οποίες προκλήθηκε η ζημιά"
                  rows={4}
                  className={errors.damageCircumstances ? 'border-red-500' : ''}
                />
                {errors.damageCircumstances && (
                  <p className="text-red-500 text-sm">{errors.damageCircumstances}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="witnessName">Όνομα Μάρτυρα</Label>
                  <Input
                    id="witnessName"
                    value={formData.witnessName}
                    onChange={(e) => handleInputChange('witnessName', e.target.value)}
                    placeholder="Προαιρετικό"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="witnessContact">Επικοινωνία Μάρτυρα</Label>
                  <Input
                    id="witnessContact"
                    value={formData.witnessContact}
                    onChange={(e) => handleInputChange('witnessContact', e.target.value)}
                    placeholder="Τηλέφωνο ή email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Προηγούμενη Ζημιά στο Τεμάχιο</Label>
                  <RadioGroup 
                    value={formData.previousDamage} 
                    onValueChange={(value) => handleInputChange('previousDamage', value)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="prev-yes" />
                      <Label htmlFor="prev-yes" className="font-normal">Ναι</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="prev-no" />
                      <Label htmlFor="prev-no" className="font-normal">Όχι</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Ασφαλιστική Κάλυψη</Label>
                  <RadioGroup 
                    value={formData.insuranceCovered} 
                    onValueChange={(value) => handleInputChange('insuranceCovered', value)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="ins-yes" />
                      <Label htmlFor="ins-yes" className="font-normal">Ναι</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="ins-no" />
                      <Label htmlFor="ins-no" className="font-normal">Όχι</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Supporting Documents */}
        {formData.damageType && (
          <Card>
            <CardHeader>
              <CardTitle className="text-[#334692] flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Δικαιολογητικά
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-2">Ανεβάστε φωτογραφίες και έγγραφα της ζημιάς</p>
                <p className="text-sm text-gray-500 mb-4">Αποδεκτά αρχεία: JPG, PNG, PDF (μέγιστο 10MB)</p>
                <Button type="button" variant="outline">
                  Επιλογή Αρχείων
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Important Notice */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Σημαντικό:</strong> Βεβαιωθείτε ότι όλα τα στοιχεία είναι ακριβή και πλήρη. 
            Η παροχή ψευδών στοιχείων συνιστά παράβαση του νόμου και μπορεί να οδηγήσει σε νομικές συνέπειες.
          </AlertDescription>
        </Alert>

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <Button 
            type="submit"
            disabled={isSubmitting || !formData.damageType}
            className="bg-[#334692] hover:bg-[#2a3a7a] text-white px-8"
          >
            {isSubmitting ? "Αποθήκευση δήλωσης..." : "Αποθήκευση και Υποβολή Δήλωσης"}
          </Button>
        </div>
      </form>
    </div>
  );
}