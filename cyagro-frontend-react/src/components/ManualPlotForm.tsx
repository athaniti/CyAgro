import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon, Info } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { format } from "date-fns";
import { el } from "date-fns/locale";

const provinces = [
  "Αμμόχωστος",
  "Κερύνεια", 
  "Λάρνακα",
  "Λεμεσός",
  "Λευκωσία",
  "Πάφος"
];

const communities = {
  "Λευκωσία": ["Λευκωσία", "Στρόβολος", "Λακατάμια", "Λατσιά", "Γέρι", "Τσέρι"],
  "Λεμεσός": ["Λεμεσός", "Γερμασόγεια", "Αγιος Τύχων", "Ύψωνας", "Κολόσσι"],
  "Λάρνακα": ["Λάρνακα", "Λίβαδια", "Αραδίππου", "Βοροκλινί", "Δρομολαξιά"],
  "Πάφος": ["Πάφος", "Γεροσκήπου", "Χλώρακας", "Κίσσονεργα", "Έμπα"],
  "Αμμόχωστος": ["Αμμόχωστος", "Παραλίμνι", "Αγια Νάπα", "Δερύνεια"],
  "Κερύνεια": ["Κερύνεια", "Λαπιθός", "Καραβάς"]
};

export default function ManualPlotForm({ searchData, onSubmit }) {
  const [formData, setFormData] = useState({
    province: searchData?.province || "",
    community: searchData?.community || "",
    sheet: searchData?.sheet || "",
    block: searchData?.block || "",
    plotNumber: searchData?.plotNumber || "",
    description: "",
    exploitationStatus: "",
    contractStartDate: null,
    contractEndDate: null
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
    
    // Reset community when province changes
    if (field === "province" && formData.community) {
      setFormData(prev => ({ ...prev, community: "" }));
    }

    // Clear contract dates if changing from Management to Ownership
    if (field === "exploitationStatus" && value === "ownership") {
      setFormData(prev => ({ 
        ...prev, 
        contractStartDate: null, 
        contractEndDate: null 
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.province) {
      newErrors.province = "Η επαρχία είναι υποχρεωτική";
    }
    
    if (!formData.community) {
      newErrors.community = "Η κοινότητα είναι υποχρεωτική";
    }
    
    if (!formData.sheet.trim()) {
      newErrors.sheet = "Το φύλλο/σχέδιο είναι υποχρεωτικό";
    }
    
    if (!formData.block.trim()) {
      newErrors.block = "Το μπλοκ είναι υποχρεωτικό";
    }
    
    if (!formData.plotNumber.trim()) {
      newErrors.plotNumber = "Ο αριθμός τεμαχίου είναι υποχρεωτικός";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Η περιγραφή/τοποθεσία είναι υποχρεωτική";
    }

    if (!formData.exploitationStatus) {
      newErrors.exploitationStatus = "Το καθεστώς εκμετάλλευσης είναι υποχρεωτικό";
    }

    if (formData.exploitationStatus === "management") {
      if (!formData.contractStartDate) {
        newErrors.contractStartDate = "Η ημερομηνία έναρξης συμβολαίου είναι υποχρεωτική";
      }
      if (!formData.contractEndDate) {
        newErrors.contractEndDate = "Η ημερομηνία λήξης συμβολαίου είναι υποχρεωτική";
      }
      if (formData.contractStartDate && formData.contractEndDate && formData.contractStartDate >= formData.contractEndDate) {
        newErrors.contractEndDate = "Η ημερομηνία λήξης πρέπει να είναι μετά την έναρξη";
      }
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
      onSubmit({
        ...formData,
        submittedAt: new Date().toISOString(),
        source: "manual",
        status: "inactive"
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const availableCommunities = formData.province ? communities[formData.province] || [] : [];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#334692] mb-2">
          Χειροκίνητη Καταχώρηση Τεμαχίου
        </h2>
        <p className="text-gray-600">
          Συμπληρώστε όλα τα απαραίτητα στοιχεία του τεμαχίου
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Τα στοιχεία που συμπληρώνετε θα αξιολογηθούν από την αρμόδια υπηρεσία πριν την οριστική καταχώρηση.
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Plot Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#334692]">Βασικά Στοιχεία Τεμαχίου</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="province">Επαρχία *</Label>
                <Select 
                  value={formData.province} 
                  onValueChange={(value) => handleInputChange('province', value)}
                >
                  <SelectTrigger className={errors.province ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Επιλέξτε επαρχία" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.province && (
                  <p className="text-red-500 text-sm">{errors.province}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="community">Κοινότητα *</Label>
                <Select 
                  value={formData.community} 
                  onValueChange={(value) => handleInputChange('community', value)}
                  disabled={!formData.province}
                >
                  <SelectTrigger className={errors.community ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Επιλέξτε κοινότητα" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCommunities.map((community) => (
                      <SelectItem key={community} value={community}>
                        {community}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.community && (
                  <p className="text-red-500 text-sm">{errors.community}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sheet">Φύλλο/Σχέδιο *</Label>
                <Input
                  id="sheet"
                  value={formData.sheet}
                  onChange={(e) => handleInputChange('sheet', e.target.value)}
                  placeholder="π.χ. 21/43"
                  className={errors.sheet ? 'border-red-500' : ''}
                />
                {errors.sheet && (
                  <p className="text-red-500 text-sm">{errors.sheet}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="block">Μπλοκ *</Label>
                <Input
                  id="block"
                  value={formData.block}
                  onChange={(e) => handleInputChange('block', e.target.value)}
                  placeholder="π.χ. Α"
                  className={errors.block ? 'border-red-500' : ''}
                />
                {errors.block && (
                  <p className="text-red-500 text-sm">{errors.block}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="plotNumber">Αριθμός Τεμαχίου *</Label>
                <Input
                  id="plotNumber"
                  value={formData.plotNumber}
                  onChange={(e) => handleInputChange('plotNumber', e.target.value)}
                  placeholder="π.χ. 123"
                  className={errors.plotNumber ? 'border-red-500' : ''}
                />
                {errors.plotNumber && (
                  <p className="text-red-500 text-sm">{errors.plotNumber}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#334692]">Περιγραφή Τεμαχίου</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="description">Περιγραφή/Τοποθεσία *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Περιγράψτε την τοποθεσία του τεμαχίου και άλλες σημαντικές πληροφορίες"
                rows={4}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Exploitation Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#334692]">Καθεστώς Εκμετάλλευσης</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label>Καθεστώς Εκμετάλλευσης *</Label>
              <RadioGroup 
                value={formData.exploitationStatus} 
                onValueChange={(value) => handleInputChange('exploitationStatus', value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ownership" id="ownership" />
                  <Label htmlFor="ownership" className="font-normal">
                    Ιδιοκτησία - Είμαι κύριος του τεμαχίου
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="management" id="management" />
                  <Label htmlFor="management" className="font-normal">
                    Διαχείριση - Διαχειρίζομαι το τεμάχιο βάσει συμβολαίου
                  </Label>
                </div>
              </RadioGroup>
              {errors.exploitationStatus && (
                <p className="text-red-500 text-sm">{errors.exploitationStatus}</p>
              )}
            </div>

            {/* Contract Dates - Only show if Management is selected */}
            {formData.exploitationStatus === "management" && (
              <div className="space-y-4 border-t pt-4">
                <h4 className="font-medium text-gray-900">Ημερομηνίες Συμβολαίου</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ημερομηνία Έναρξης *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${
                            !formData.contractStartDate ? "text-muted-foreground" : ""
                          } ${errors.contractStartDate ? 'border-red-500' : ''}`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.contractStartDate ? 
                            format(formData.contractStartDate, "dd/MM/yyyy", { locale: el }) : 
                            "Επιλέξτε ημερομηνία"
                          }
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.contractStartDate}
                          onSelect={(date) => handleInputChange('contractStartDate', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.contractStartDate && (
                      <p className="text-red-500 text-sm">{errors.contractStartDate}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Ημερομηνία Λήξης *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${
                            !formData.contractEndDate ? "text-muted-foreground" : ""
                          } ${errors.contractEndDate ? 'border-red-500' : ''}`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.contractEndDate ? 
                            format(formData.contractEndDate, "dd/MM/yyyy", { locale: el }) : 
                            "Επιλέξτε ημερομηνία"
                          }
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.contractEndDate}
                          onSelect={(date) => handleInputChange('contractEndDate', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.contractEndDate && (
                      <p className="text-red-500 text-sm">{errors.contractEndDate}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="bg-[#334692] hover:bg-[#2a3a7a] text-white px-8"
          >
            {isSubmitting ? "Γίνεται καταχώρηση..." : "Υποβολή Τεμαχίου"}
          </Button>
        </div>
      </form>
    </div>
  );
}