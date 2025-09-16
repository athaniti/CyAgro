import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Sprout, Calendar, FileText, History, Plus } from "lucide-react";

export default function DeclarationDashboard({ onNext }) {
  const declarationTypes = [
    {
      id: "seasonal",
      title: "Εποχιακές Καλλιέργειες",
      description: "Δηλώσεις για εποχιακές και ετήσιες καλλιέργειες",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      period: "Ανοικτό έως 31/03/2024",
      status: "active"
    },
    {
      id: "permanent",
      title: "Μόνιμες Καλλιέργειες",
      description: "Δηλώσεις για δένδρα και μόνιμες φυτείες",
      icon: Sprout,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      period: "Εντός 21 ημερών από φύτευση",
      status: "active"
    }
  ];

  const stats = [
    { label: "Ενεργές Δηλώσεις", value: 3, color: "text-green-600" },
    { label: "Πρόχειρες Δηλώσεις", value: 1, color: "text-orange-600" },
    { label: "Υποβληθείσες Φέτος", value: 5, color: "text-blue-600" },
    { label: "Συνολικές Δηλώσεις", value: 12, color: "text-gray-600" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#334692] mb-2">
          Δηλώσεις Καλλιέργειας
        </h2>
        <p className="text-gray-600">
          Διαχειριστείτε τις δηλώσεις καλλιέργειας για τα τεμάχιά σας
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

      {/* Declaration Types */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <Plus className="w-5 h-5 text-[#334692]" />
          Νέα Δήλωση Καλλιέργειας
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {declarationTypes.map((type) => {
            const IconComponent = type.icon;
            
            return (
              <Card 
                key={type.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${type.bgColor} ${type.borderColor} border-2`}
                onClick={() => onNext(type.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-white ${type.color}`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 text-gray-900">
                        {type.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 mb-3">
                        {type.description}
                      </CardDescription>
                      <div className="space-y-2">
                        <Badge 
                          className={type.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                          }
                        >
                          {type.status === 'active' ? 'Διαθέσιμο' : 'Περιορισμένο'}
                        </Badge>
                        <p className="text-sm text-gray-600">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          {type.period}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="pt-6 text-center">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium mb-1">Πρόχειρες Δηλώσεις</h4>
            <p className="text-sm text-gray-600">Συνεχίστε μη ολοκληρωμένες δηλώσεις</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="pt-6 text-center">
            <History className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-medium mb-1">Ιστορικό Δηλώσεων</h4>
            <p className="text-sm text-gray-600">Δείτε προηγούμενες δηλώσεις</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="pt-6 text-center">
            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-medium mb-1">Προθεσμίες</h4>
            <p className="text-sm text-gray-600">Ελέγξτε προθεσμίες υποβολής</p>
          </CardContent>
        </Card>
      </div>

      {/* Important Notice */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Calendar className="w-6 h-6 text-orange-600 mt-1" />
            <div>
              <h3 className="font-medium text-orange-800 mb-2">Σημαντική Ενημέρωση</h3>
              <div className="space-y-2 text-sm text-orange-700">
                <p>• <strong>Εποχιακές καλλιέργειες:</strong> Η προθεσμία υποβολής είναι έως 31/03/2024</p>
                <p>• <strong>Μόνιμες καλλιέργειες:</strong> Πρέπει να δηλωθούν εντός 21 ημερών από τη φύτευση</p>
                <p>• <strong>Εκπρόθεσμες δηλώσεις:</strong> Υπόκεινται σε αυξημένες εισφορές</p>
                <p>• <strong>Πληρωμή:</strong> Απαιτείται ηλεκτρονική πληρωμή για την ολοκλήρωση</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}