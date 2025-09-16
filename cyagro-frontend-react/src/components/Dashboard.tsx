import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "./ui/card";
import { LogOut, Plus, MapPin, Settings, Combine, Sprout, AlertTriangle, History } from "lucide-react";

export default function Dashboard({ userData, onLogout, onStartPlotCreation, onStartAgriculturalPlot, onStartCultivationDeclaration, onStartDamageDeclaration, onViewApplicationHistory }) {
  const services = [
    {
      id: "new-plot",
      title: "Καταχώρηση Νέου Τεμαχίου",
      description: "Καταχωρήστε νέο γεωργικό τεμάχιο στο σύστημα",
      icon: Plus,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      onClick: onStartPlotCreation
    },
    {
      id: "agricultural-plot",
      title: "Δημιουργία Αγροτεμαχίου",
      description: "Συρραφή υπαρχόντων τεμαχίων σε ενιαίο αγροτεμάχιο",
      icon: Combine,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      onClick: onStartAgriculturalPlot
    },
    {
      id: "cultivation-declaration",
      title: "Δήλωση Καλλιέργειας",
      description: "Υποβολή δήλωσης καλλιέργειας για τα τεμάχιά σας",
      icon: Sprout,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      onClick: onStartCultivationDeclaration
    },
    {
      id: "damage-declaration",
      title: "Δήλωση Ζημιάς",
      description: "Αίτηση αποζημίωσης για πληγείσες καλλιέργειες",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      onClick: onStartDamageDeclaration
    },
    {
      id: "application-history",
      title: "Ιστορικό Αιτήσεων",
      description: "Παρακολούθηση ιστορικού αιτήσεων και δηλώσεων",
      icon: History,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      onClick: onViewApplicationHistory
    },
    {
      id: "my-plots",
      title: "Τα Τεμάχιά Μου",
      description: "Διαχείριση των καταχωρημένων τεμαχίων σας",
      icon: MapPin,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: "profile",
      title: "Προφίλ & Ρυθμίσεις",
      description: "Ενημέρωση στοιχείων και ρυθμίσεων λογαριασμού",
      icon: Settings,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#334692] text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Ψηφιακή Πύλη Εξυπηρέτησης του Πολίτη</h1>
            <span className="text-white/80">|</span>
            <span className="text-white/80">Χρήστης: {userData.fullName}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onLogout}
            className="text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Αποσύνδεση
          </Button>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto p-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-[#334692] mb-2">
              Καλώς ήρθατε, {userData.fullName.split(' ')[0]}!
            </h2>
            <p className="text-gray-600">
              Επιλέξτε μία από τις παρακάτω υπηρεσίες για να συνεχίσετε
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = service.icon;
            
            return (
              <Card 
                key={service.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${service.bgColor} ${service.borderColor} border-2`}
                onClick={service.onClick}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-white ${service.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-gray-900 mb-1">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 text-sm leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-[#334692]">0</div>
            <div className="text-sm text-gray-600">Ενεργά Τεμάχια</div>
          </div>
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-[#334692]">1</div>
            <div className="text-sm text-gray-600">Εκκρεμείς Αιτήσεις</div>
          </div>
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-[#334692]">0</div>
            <div className="text-sm text-gray-600">Επόμενα Ραντεβού</div>
          </div>
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-green-600">Ενεργός</div>
            <div className="text-sm text-gray-600">Κατάσταση Λογαριασμού</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#334692]">Πρόσφατη Δραστηριότητα</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-green-800">Εγγραφή ��το Μητρώο Ολοκληρώθηκε</p>
                    <p className="text-green-600 text-sm">
                      {new Date().toLocaleDateString('el-GR', { 
                        day: '2-digit', 
                        month: 'long', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="text-center py-8 text-gray-500">
                  <History className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Δεν υπάρχει άλλη δραστηριότητα</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}