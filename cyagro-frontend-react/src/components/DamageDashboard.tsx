import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { AlertTriangle, Calendar, FileText, History, Bell, MapPin } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

// Mock data for active damage declarations
const mockActiveDamageDeclarations = [
  {
    id: "DMG-2024-001",
    title: "Χαλάζι στην περιοχή Λευκωσίας",
    affectedArea: "Λευκωσία - Στρόβολος, Λατσιά, Δευτερά",
    damageType: "Καιρικά Φαινόμενα",
    cause: "Χαλάζι",
    dateOccurred: "2024-03-15",
    submissionDeadline: "2024-04-15",
    status: "active",
    description: "Έντονο χαλάζι που προκάλεσε ζημιές σε εσπεριδοειδή και λαχανικά",
    eligibleCrops: ["Εσπεριδοειδή", "Λαχανικά", "Αμπέλια"],
    compensationRate: "85%",
    affectedCommunities: ["Στρόβολος", "Λατσιά", "Δευτερά", "Καϊμακλί"]
  },
  {
    id: "DMG-2024-002", 
    title: "Καύσωνας στην περιοχή Λεμεσού",
    affectedArea: "Λεμεσός - Γερμασόγεια, Λιμασσόλ",
    damageType: "Ακραίες Θερμοκρασίες",
    cause: "Καύσωνας",
    dateOccurred: "2024-03-20",
    submissionDeadline: "2024-04-20",
    status: "active",
    description: "Παρατεταμένος καύσωνας με θερμοκρασίες άνω των 40°C",
    eligibleCrops: ["Λαχανικά", "Δημητριακά"],
    compensationRate: "75%",
    affectedCommunities: ["Γερμασόγεια", "Λιμασσόλ", "Επισκοπή"]
  },
  {
    id: "DMG-2024-003",
    title: "Παγετός στην περιοχή Τροόδους",
    affectedArea: "Τρόοδος - Ορεινές Κοινότητες",
    damageType: "Καιρικά Φαινόμενα", 
    cause: "Παγετός",
    dateOccurred: "2024-02-28",
    submissionDeadline: "2024-03-30",
    status: "expired",
    description: "Απρόβλεπτος παγετός που επηρέασε οπωροφόρα δένδρα",
    eligibleCrops: ["Οπωροφόρα", "Εσπεριδοειδή"],
    compensationRate: "90%",
    affectedCommunities: ["Τρόοδος", "Πλάτρες", "Πεδουλάς"]
  }
];

const stats = [
  { label: "Ενεργές Δηλώσεις Ζημιάς", value: 2, color: "text-red-600" },
  { label: "Υποβληθείσες Αιτήσεις", value: 0, color: "text-blue-600" },
  { label: "Εγκεκριμένες Αιτήσεις", value: 3, color: "text-green-600" },
  { label: "Συνολικές Αποζημιώσεις", value: "€2,450", color: "text-purple-600" }
];

export default function DamageDashboard({ userData, onNext }) {
  const activeDamageDeclarations = mockActiveDamageDeclarations.filter(d => d.status === 'active');
  const expiredDeclarations = mockActiveDamageDeclarations.filter(d => d.status === 'expired');

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#334692] mb-2">
          Δηλώσεις Ζημιάς
        </h2>
        <p className="text-gray-600">
          Υποβάλετε αίτηση αποζημίωσης για πληγείσες καλλιέργειες και περιουσιακά στοιχεία
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="text-center">
            <CardContent className="pt-6">
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Damage Declarations */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          Ενεργές Δηλώσεις Ζημιάς ({activeDamageDeclarations.length})
        </h3>
        
        {activeDamageDeclarations.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {activeDamageDeclarations.map((declaration) => (
              <Card 
                key={declaration.id}
                className="cursor-pointer transition-all duration-200 hover:shadow-lg border-red-200 bg-red-50"
                onClick={() => onNext(declaration)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 text-gray-900 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        {declaration.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 mb-3">
                        {declaration.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className="bg-red-100 text-red-800">
                          Ενεργή
                        </Badge>
                        <Badge variant="outline">
                          {declaration.cause}
                        </Badge>
                        <Badge className="bg-green-100 text-green-800">
                          Αποζημίωση: {declaration.compensationRate}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Πληγείσες Περιοχές</p>
                        <p className="text-sm text-gray-600">{declaration.affectedArea}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Κοινότητες: {declaration.affectedCommunities.join(', ')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Προθεσμίες</p>
                        <p className="text-sm text-gray-600">
                          Ημερομηνία ζημιάς: {new Date(declaration.dateOccurred).toLocaleDateString('el-GR')}
                        </p>
                        <p className="text-sm text-red-600">
                          Προθεσμία: {new Date(declaration.submissionDeadline).toLocaleDateString('el-GR')}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Επιλέξιμες Καλλιέργειες</p>
                    <div className="flex flex-wrap gap-2">
                      {declaration.eligibleCrops.map((crop) => (
                        <Badge key={crop} variant="secondary" className="bg-blue-100 text-blue-800">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border">
                    <div className="flex items-center gap-2 text-sm text-blue-700">
                      <Bell className="w-4 h-4" />
                      <span className="font-medium">Κάντε κλικ για να υποβάλετε αίτηση αποζημίωσης</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Δεν υπάρχουν ενεργές δηλώσεις ζημιάς
              </h3>
              <p className="text-gray-600">
                Δεν έχουν ανακοινωθεί ζημιές στην περιοχή σας αυτή τη στιγμή.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Expired Declarations Info */}
      {expiredDeclarations.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-6 h-6 text-orange-600 mt-1" />
              <div>
                <h3 className="font-medium text-orange-800 mb-2">
                  Ληγμένες Δηλώσεις ({expiredDeclarations.length})
                </h3>
                <p className="text-orange-700 text-sm mb-3">
                  Οι παρακάτω δηλώσεις έχουν λήξει και δεν μπορείτε πλέον να υποβάλετε αίτηση:
                </p>
                <div className="space-y-2">
                  {expiredDeclarations.map((declaration) => (
                    <div key={declaration.id} className="text-sm text-orange-700">
                      <span className="font-medium">{declaration.title}</span>
                      <span className="mx-2">-</span>
                      <span>Έληξε: {new Date(declaration.submissionDeadline).toLocaleDateString('el-GR')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="pt-6 text-center">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium mb-1">Ιστορικό Δηλώσεων</h4>
            <p className="text-sm text-gray-600">Δείτε προηγούμενες δηλώσεις ζημιάς</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="pt-6 text-center">
            <History className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-medium mb-1">Αποζημιώσεις</h4>
            <p className="text-sm text-gray-600">Δείτε πληρωμές και αποζημιώσεις</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="pt-6 text-center">
            <Bell className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-medium mb-1">Ειδοποιήσεις</h4>
            <p className="text-sm text-gray-600">Ρυθμίσεις ειδοποιήσεων ζημιών</p>
          </CardContent>
        </Card>
      </div>

      {/* Important Notice */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Σημαντικό:</strong> Οι αιτήσεις αποζημίωσης πρέπει να υποβληθούν εντός της προκαθορισμένης 
          προθεσμίας. Βεβαιωθείτε ότι τα τεμάχιά σας βρίσκονται στις πληγείσες περιοχές πριν την υποβολή.
        </AlertDescription>
      </Alert>
    </div>
  );
}