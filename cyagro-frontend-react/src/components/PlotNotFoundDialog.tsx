import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { AlertTriangle, RotateCcw, Edit } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

export default function PlotNotFoundDialog({ onRetry, onManualRegistration }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <CardTitle className="text-xl text-gray-900">
            Τεμάχιο Μη Εντοπίστηκε
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertDescription className="text-orange-800">
              Το τεμάχιο δεν εντοπίστηκε στη βάση ΚΟΑΠ. 
              Μπορείτε να προχωρήσετε με χειροκίνητη καταχώρηση.
            </AlertDescription>
          </Alert>

          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-medium">Πιθανοί λόγοι:</p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Το τεμάχιο δεν έχει καταχωρηθεί στον ΚΟΑΠ</li>
              <li>Λανθασμένα στοιχεία αναζήτησης</li>
              <li>Το τεμάχιο υπάρχει με διαφορετικά στοιχεία</li>
            </ul>
          </div>

          <div className="space-y-3 pt-4">
            <Button 
              onClick={onRetry}
              variant="outline"
              className="w-full border-[#334692] text-[#334692] hover:bg-[#334692] hover:text-white"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Επανάληψη Αναζήτησης
            </Button>
            
            <Button 
              onClick={onManualRegistration}
              className="w-full bg-[#334692] hover:bg-[#2a3a7a] text-white"
            >
              <Edit className="w-4 h-4 mr-2" />
              Συνέχεια με Χειροκίνητη Καταχώρηση
            </Button>
          </div>

          <div className="pt-2 text-center">
            <p className="text-xs text-gray-500">
              Η χειροκίνητη καταχώρηση θα αξιολογηθεί από την αρμόδια υπηρεσία
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}