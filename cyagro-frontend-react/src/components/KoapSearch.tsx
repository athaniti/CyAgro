import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Search, Info } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

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

export default function KoapSearch({ onSearch }) {
  const [formData, setFormData] = useState({
    province: "",
    community: "",
    sheet: "",
    block: "",
    plotNumber: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
    
    // Reset community when province changes
    if (field === "province" && formData.community) {
      setFormData(prev => ({ ...prev, community: "" }));
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      onSearch(formData);
    }, 2000);
  };

  const availableCommunities = formData.province ? communities[formData.province] || [] : [];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#334692] mb-2">
          Αναζήτηση Τεμαχίου στον ΚΟΑΠ
        </h2>
        <p className="text-gray-600">
          Συμπληρώστε τα στοιχεία του τεμαχίου για αναζήτηση στη βάση δεδομένων
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Τα στοιχεία του τεμαχίου μπορείτε να τα βρείτε στον τίτλο ιδιοκτησίας ή στα έγγραφα του Κτηματολογίου.
        </AlertDescription>
      </Alert>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-[#334692] flex items-center gap-2">
            <Search className="w-5 h-5" />
            Φόρμα Αναζήτησης ΚΟΑΠ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Province */}
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

              {/* Community */}
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
              {/* Sheet/Plan */}
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

              {/* Block */}
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

              {/* Plot Number */}
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

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button 
                type="submit"
                disabled={isSearching}
                className="bg-[#334692] hover:bg-[#2a3a7a] text-white px-8"
              >
                {isSearching ? (
                  <>
                    <Search className="w-4 h-4 mr-2 animate-spin" />
                    Αναζήτηση στον ΚΟΑΠ...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Αναζήτηση
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="max-w-2xl mx-auto bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <Info className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-medium text-blue-800 mb-2">Βοήθεια</h3>
            <p className="text-blue-700 text-sm leading-relaxed">
              Εάν δεν γνωρίζετε τα ακριβή στοιχεία του τεμαχίου, μπορείτε να επικοινωνήσετε με το Κτηματολόγιο 
              ή να ανατρέξετε στον τίτλο ιδιοκτησίας σας.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}