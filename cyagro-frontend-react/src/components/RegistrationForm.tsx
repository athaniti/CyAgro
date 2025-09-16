import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Upload, X, FileText, Plus } from "lucide-react";

export default function RegistrationForm({ userData, selectedProfiles, onSubmit }) {
  const [formData, setFormData] = useState({
    companyName: "",
    companyRegistry: "",
    address: "",
    additionalEmail: ""
  });
  
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.slice(0, 5 - uploadedFiles.length);
    
    const fileObjects = newFiles.map((file, index) => ({
      id: Date.now() + index,
      file,
      name: file.name,
      size: file.size
    }));
    
    setUploadedFiles(prev => [...prev, ...fileObjects]);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Η επωνυμία εταιρείας είναι υποχρεωτική";
    }
    
    if (!formData.companyRegistry.trim()) {
      newErrors.companyRegistry = "Ο αριθμός μητρώου εταιρείας είναι υποχρεωτικός";
    }
    
    if (!formData.address.trim()) {
      newErrors.address = "Η διεύθυνση είναι υποχρεωτική";
    }

    if (formData.additionalEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.additionalEmail)) {
      newErrors.additionalEmail = "Παρακαλώ εισάγετε έγκυρο email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      const submissionData = {
        ...formData,
        profiles: selectedProfiles,
        documents: uploadedFiles,
        submittedAt: new Date().toISOString()
      };
      
      onSubmit(submissionData);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* User Info from CY-Login */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#334692]">Στοιχεία από CY-Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Ονοματεπώνυμο</Label>
              <Input 
                id="fullName"
                value={userData.fullName}
                disabled
                className="bg-gray-50"
              />
            </div>
            
            <div>
              <Label htmlFor="idNumber">Αριθμός Δελτίου Ταυτότητας</Label>
              <Input 
                id="idNumber"
                value={userData.idNumber}
                disabled
                className="bg-gray-50"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Ηλεκτρονικό Ταχυδρομείο</Label>
              <Input 
                id="email"
                value={userData.email}
                disabled
                className="bg-gray-50"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Τηλέφωνο Επικοινωνίας</Label>
              <Input 
                id="phone"
                value={userData.phone}
                disabled
                className="bg-gray-50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#334692]">Στοιχεία Εταιρείας</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="companyName">Επωνυμία Εταιρείας *</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              placeholder="Εισάγετε την επωνυμία της εταιρείας"
              className={errors.companyName ? 'border-red-500' : ''}
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="companyRegistry">Αριθμός Μητρώου Εταιρείας *</Label>
            <Input
              id="companyRegistry"
              value={formData.companyRegistry}
              onChange={(e) => handleInputChange('companyRegistry', e.target.value)}
              placeholder="π.χ. ΗΕ123456"
              className={errors.companyRegistry ? 'border-red-500' : ''}
            />
            {errors.companyRegistry && (
              <p className="text-red-500 text-sm mt-1">{errors.companyRegistry}</p>
            )}
          </div>

          <div>
            <Label htmlFor="address">Διεύθυνση *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Εισάγετε την πλήρη διεύθυνση"
              rows={3}
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#334692]">Επιπλέον Επικοινωνία</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="additionalEmail">Επιπλέον Email Επικοινωνίας (Προαιρετικό)</Label>
            <Input
              id="additionalEmail"
              type="email"
              value={formData.additionalEmail}
              onChange={(e) => handleInputChange('additionalEmail', e.target.value)}
              placeholder="additional@email.com"
              className={errors.additionalEmail ? 'border-red-500' : ''}
            />
            {errors.additionalEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.additionalEmail}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Document Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#334692]">Δικαιολογητικά Έγγραφα</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 text-sm">
            Μπορείτε να μεταφορτώσετε έως 5 δικαιολογητικά έγγραφα (PDF, DOC, DOCX, JPG, PNG)
          </p>

          {uploadedFiles.length < 5 && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">Κάντε κλικ για να επιλέξετε αρχεία</p>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button 
                type="button"
                variant="outline"
                onClick={() => document.getElementById('file-upload').click()}
              >
                <Plus className="w-4 h-4 mr-2" />
                Επιλογή Αρχείων
              </Button>
            </div>
          )}

          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Μεταφορτωμένα Αρχεία ({uploadedFiles.length}/5)</h4>
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* GDPR Notice */}
      <Alert>
        <AlertDescription className="text-sm">
          <strong className="text-[#c25400]">Προστασία δεδομένων προσωπικού χαρακτήρα:</strong> 
          Ο Φορέας, κατ' εφαρμογή του Γενικού Κανονισμού για την Προστασία των Προσωπικών Δεδομένων (GDPR) ΕΕ 2016/679, 
          σας ενημερώνει ότι η χρήση των δεδομένων σας, θα πραγματοποιηθεί αποκλειστικά για τη διεκπεραίωση της εκάστοτε 
          αίτησής σας, στο πλαίσιο της εκπλήρωσης καθηκόντων που εκτελούνται προς το δημόσιο συμφέρον και κατά την ενάσκηση 
          δημόσιας εξουσίας.
        </AlertDescription>
      </Alert>

      {/* Submit Button */}
      <div className="flex justify-end pt-6">
        <Button 
          type="submit"
          disabled={isSubmitting}
          className="bg-[#334692] hover:bg-[#2a3a7a] text-white px-8"
        >
          {isSubmitting ? "Γίνεται υποβολή..." : "Υποβολή Αίτησης"}
        </Button>
      </div>
    </form>
  );
}