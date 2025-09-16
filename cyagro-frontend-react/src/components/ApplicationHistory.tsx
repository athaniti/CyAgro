import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { LogOut, ArrowLeft, Home, Search, Filter, Calendar, FileText, CheckCircle2, Clock, AlertTriangle, XCircle, MapPin, Sprout, Euro } from "lucide-react";
import ApplicationDetails from "./ApplicationDetails";

// Mock data for user's historical applications
const mockApplicationHistory = [
  {
    id: "PLT-12345678",
    type: "plot-creation",
    typeText: "Καταχώρηση Τεμαχίου",
    title: "Καταχώρηση Τεμαχίου 123, Στρόβολος",
    submissionDate: "2024-03-15T10:30:00Z",
    status: "approved",
    statusText: "Εγκρίθηκε",
    description: "Καταχώρηση νέου γεωργικού τεμαχίου στον Στρόβολο",
    plotDetails: {
      province: "Λευκωσία",
      community: "Στρόβολος",
      sheet: "21/43",
      block: "Α",
      plotNumber: "123",
      area: "2.5 στρέμματα"
    },
    interactions: [
      {
        date: "2024-03-15T10:30:00Z",
        type: "submission",
        description: "Υποβολή αίτησης καταχώρησης τεμαχίου",
        user: "Σύστημα"
      },
      {
        date: "2024-03-16T09:15:00Z",
        type: "review",
        description: "Έναρξη αξιολόγησης από τμήμα κτηματολογίου",
        user: "Μ. Παπαδόπουλος"
      },
      {
        date: "2024-03-20T14:22:00Z",
        type: "approval",
        description: "Έγκριση καταχώρησης τεμαχίου",
        user: "Α. Γιάννου"
      }
    ],
    documents: [
      "Τίτλος ιδιοκτησίας",
      "Φωτοτυπία ταυτότητας",
      "Τοπογραφικό διάγραμμα"
    ]
  },
  {
    id: "AGR-12345680",
    type: "agricultural-plot",
    typeText: "Δημιουργία Αγροτεμαχίου",
    title: "Αγροτεμάχιο από συρραφή 3 τεμαχίων",
    submissionDate: "2024-03-10T14:45:00Z",
    status: "approved",
    statusText: "Εγκρίθηκε",
    description: "Δημιουργία ενιαίου αγροτεμαχίου από συρραφή τεμαχίων 123, 124, 125",
    plotDetails: {
      province: "Λεμεσός",
      community: "Γερμασόγεια",
      totalArea: "5.8 στρέμματα",
      includedPlots: ["123", "124", "125"]
    },
    interactions: [
      {
        date: "2024-03-10T14:45:00Z",
        type: "submission",
        description: "Υποβολή αίτησης δημιουργίας αγροτεμαχίου",
        user: "Σύστημα"
      },
      {
        date: "2024-03-12T11:30:00Z",
        type: "review",
        description: "Έλεγχος συμβατότητας τεμαχίων",
        user: "Κ. Αντωνίου"
      },
      {
        date: "2024-03-15T16:00:00Z",
        type: "approval",
        description: "Έγκριση δημιουργίας αγροτεμαχίου",
        user: "Π. Νικολάου"
      }
    ],
    documents: [
      "Χάρτης τεμαχίων",
      "Βεβαίωση όμορων ορίων"
    ]
  },
  {
    id: "DECL-2024-001",
    type: "cultivation-declaration",
    typeText: "Δήλωση Καλλιέργειας",
    title: "Δήλωση καλλιέργειας εσπεριδοειδών",
    submissionDate: "2024-02-28T09:20:00Z",
    status: "approved",
    statusText: "Εγκρίθηκε",
    description: "Δήλωση καλλιέργειας πορτοκαλιών στο τεμάχιο 123",
    cultivationDetails: {
      crop: "Εσπεριδοειδή",
      variety: "Πορτοκάλια",
      area: "2.0 στρέμματα",
      numberOfTrees: "80",
      plantingDate: "2024-01-15"
    },
    paymentDetails: {
      amount: "127.50",
      transactionId: "TXN-87654321",
      status: "completed"
    },
    interactions: [
      {
        date: "2024-02-28T09:20:00Z",
        type: "submission",
        description: "Υποβολή δήλωσης καλλιέργειας",
        user: "Σύστημα"
      },
      {
        date: "2024-02-28T09:25:00Z",
        type: "payment",
        description: "Ηλεκτρονική πληρωμή €127.50",
        user: "Σύστημα Πληρωμών"
      },
      {
        date: "2024-03-01T10:15:00Z",
        type: "verification",
        description: "Επαλήθευση στοιχείων δήλωσης",
        user: "Ε. Χαραλάμπους"
      },
      {
        date: "2024-03-05T13:45:00Z",
        type: "approval",
        description: "Έγκριση δήλωσης καλλιέργειας",
        user: "Γ. Μιχαήλ"
      }
    ],
    documents: [
      "Απόδειξη πληρωμής",
      "Φωτογραφίες καλλιέργειας"
    ]
  },
  {
    id: "DMG-DECL-2024-002",
    type: "damage-declaration",
    typeText: "Δήλωση Ζημιάς",
    title: "Αίτηση αποζημίωσης χαλαζιού",
    submissionDate: "2024-03-20T16:30:00Z",
    status: "under-review",
    statusText: "Υπό Αξιολόγηση",
    description: "Αίτηση αποζημίωσης για ζημιά από χαλάζι σε εσπεριδοειδή",
    damageDetails: {
      cause: "Χαλάζι",
      damageDate: "2024-03-15",
      estimatedLoss: "2500.00",
      damagePercentage: "70",
      affectedArea: "2.0 στρέμματα"
    },
    interactions: [
      {
        date: "2024-03-20T16:30:00Z",
        type: "submission",
        description: "Υποβολή δήλωσης ζημιάς",
        user: "Σύστημα"
      },
      {
        date: "2024-03-21T08:45:00Z",
        type: "acknowledgment",
        description: "Επιβεβαίωση παραλαβής δήλωσης",
        user: "Τμήμα Αποζημιώσεων"
      },
      {
        date: "2024-03-22T14:20:00Z",
        type: "inspection_scheduled",
        description: "Προγραμματισμός επιτόπιας επίσκεψης για 25/03/2024",
        user: "Α. Κώστα"
      }
    ],
    documents: [
      "Φωτογραφίες ζημιάς",
      "Μετεωρολογικά στοιχεία",
      "Εκτίμηση ζημιάς"
    ]
  },
  {
    id: "DECL-2023-005",
    type: "cultivation-declaration",
    typeText: "Δήλωση Καλλιέργειας",
    title: "Δήλωση καλλιέργειας σιταριού",
    submissionDate: "2023-03-10T11:15:00Z",
    status: "expired",
    statusText: "Ληγμένη",
    description: "Δήλωση καλλιέργειας σιταριού για περίοδο 2023",
    cultivationDetails: {
      crop: "Δημητριακά",
      variety: "Σιτάρι κοινό",
      area: "1.8 στρέμματα",
      plantingDate: "2023-02-15"
    },
    paymentDetails: {
      amount: "95.50",
      transactionId: "TXN-23456789",
      status: "completed"
    },
    interactions: [
      {
        date: "2023-03-10T11:15:00Z",
        type: "submission",
        description: "Υποβολή δήλωσης καλλιέργειας",
        user: "Σύστημα"
      },
      {
        date: "2023-03-10T11:18:00Z",
        type: "payment",
        description: "Ηλεκτρονική πληρωμή €95.50",
        user: "Σύστημα Πληρωμών"
      },
      {
        date: "2023-03-15T09:30:00Z",
        type: "approval",
        description: "Έγκριση δήλωσης καλλιέργειας",
        user: "Δ. Παναγιώτου"
      },
      {
        date: "2024-01-01T00:00:00Z",
        type: "expiration",
        description: "Λήξη δήλωσης καλλιέργειας",
        user: "Σύστημα"
      }
    ],
    documents: [
      "Απόδειξη πληρωμής",
      "Πιστοποιητικό παραγωγής"
    ]
  },
  {
    id: "PLT-12345679",
    type: "plot-creation",
    typeText: "Καταχώρηση Τεμαχίου",
    title: "Καταχώρηση Τεμαχίου 56, Λατσιά",
    submissionDate: "2024-03-25T13:45:00Z",
    status: "rejected",
    statusText: "Απορρίφθηκε",
    description: "Καταχώρηση γεωργικού τεμαχίου στη Λατσιά",
    plotDetails: {
      province: "Λευκωσία",
      community: "Λατσιά",
      sheet: "18/35",
      block: "Γ",
      plotNumber: "56",
      area: "4.1 στρέμματα"
    },
    interactions: [
      {
        date: "2024-03-25T13:45:00Z",
        type: "submission",
        description: "Υποβολή αίτησης καταχώρησης τεμαχίου",
        user: "Σύστημα"
      },
      {
        date: "2024-03-26T10:20:00Z",
        type: "review",
        description: "Έναρξη αξιολόγησης",
        user: "Λ. Δημητρίου"
      },
      {
        date: "2024-03-28T15:30:00Z",
        type: "rejection",
        description: "Απόρριψη - Ελλιπή δικαιολογητικά",
        user: "Λ. Δημητρίου",
        notes: "Απαιτείται επικαιροποιημένος τίτλος ιδιοκτησίας και τοπογραφικό διάγραμμα"
      }
    ],
    documents: [
      "Τίτλος ιδιοκτησίας (ληγμένος)",
      "Φωτοτυπία ταυτότητας"
    ]
  }
];

export default function ApplicationHistory({ userData, onLogout, onBack }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'under-review':
        return <Clock className="w-4 h-4 text-orange-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'expired':
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'under-review':
        return 'bg-orange-100 text-orange-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'plot-creation':
        return <MapPin className="w-4 h-4" />;
      case 'agricultural-plot':
        return <MapPin className="w-4 h-4" />;
      case 'cultivation-declaration':
        return <Sprout className="w-4 h-4" />;
      case 'damage-declaration':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  // Filter applications
  const filteredApplications = mockApplicationHistory.filter(app => {
    const matchesSearch = searchTerm === "" || 
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || app.type === typeFilter;
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Sort by submission date (newest first)
  const sortedApplications = filteredApplications.sort((a, b) => 
    new Date(b.submissionDate) - new Date(a.submissionDate)
  );

  if (selectedApplication) {
    return (
      <ApplicationDetails 
        application={selectedApplication}
        userData={userData}
        onBack={() => setSelectedApplication(null)}
        onLogout={onLogout}
        onHome={onBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#334692] text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Ιστορικό Αιτήσεων/Δηλώσεων</h1>
            <span className="text-white/80">|</span>
            <span className="text-white/80">Χρήστης: {userData.fullName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-white hover:bg-white/10"
            >
              <Home className="w-4 h-4 mr-1" />
              Αρχική
            </Button>
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
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#334692] mb-2">
            Παρακολούθηση Ιστορικού Αιτήσεων/Δηλώσεων
          </h2>
          <p className="text-gray-600">
            Δείτε όλες τις αιτήσεις και δηλώσεις που έχετε υποβάλει στο σύστημα
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-[#334692] flex items-center gap-2">
              <Search className="w-5 h-5" />
              Αναζήτηση και Φίλτρα
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Αναζήτηση</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Αριθμός αίτησης, τίτλος ή περιγραφή"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Τύπος Αίτησης</label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Όλοι οι τύποι</SelectItem>
                    <SelectItem value="plot-creation">Καταχώρηση Τεμαχίου</SelectItem>
                    <SelectItem value="agricultural-plot">Δημιουργία Αγροτεμαχίου</SelectItem>
                    <SelectItem value="cultivation-declaration">Δήλωση Καλλιέργειας</SelectItem>
                    <SelectItem value="damage-declaration">Δήλωση Ζημιάς</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Κατάσταση</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Όλες οι καταστάσεις</SelectItem>
                    <SelectItem value="approved">Εγκρίθηκε</SelectItem>
                    <SelectItem value="under-review">Υπό Αξιολόγηση</SelectItem>
                    <SelectItem value="rejected">Απορρίφθηκε</SelectItem>
                    <SelectItem value="expired">Ληγμένη</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-[#334692]">
                {mockApplicationHistory.length}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Συνολικές Αιτήσεις
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {mockApplicationHistory.filter(app => app.status === 'approved').length}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Εγκεκριμένες
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600">
                {mockApplicationHistory.filter(app => app.status === 'under-review').length}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Υπό Αξιολόγηση
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600">
                €{mockApplicationHistory
                  .filter(app => app.paymentDetails)
                  .reduce((sum, app) => sum + parseFloat(app.paymentDetails.amount), 0)
                  .toFixed(2)}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Συνολικές Πληρωμές
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Αιτήσεις και Δηλώσεις ({sortedApplications.length})
            </h3>
            <div className="text-sm text-gray-500">
              Ταξινόμηση: Νεότερες πρώτα
            </div>
          </div>

          {sortedApplications.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Δεν βρέθηκαν αιτήσεις
                </h3>
                <p className="text-gray-600">
                  Δοκιμάστε να αλλάξετε τα κριτήρια αναζήτησης ή φίλτρων.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {sortedApplications.map((application) => (
                <Card 
                  key={application.id}
                  className="cursor-pointer transition-all duration-200 hover:shadow-md hover:bg-gray-50"
                  onClick={() => setSelectedApplication(application)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            {getTypeIcon(application.type)}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{application.title}</h4>
                            <p className="text-sm text-gray-600">{application.typeText}</p>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-3">
                          {application.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(application.submissionDate).toLocaleDateString('el-GR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            <span>Κωδ: {application.id}</span>
                          </div>
                          {application.paymentDetails && (
                            <div className="flex items-center gap-1">
                              <Euro className="w-3 h-3" />
                              <span>€{application.paymentDetails.amount}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getStatusColor(application.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(application.status)}
                            <span>{application.statusText}</span>
                          </div>
                        </Badge>
                        
                        <div className="text-xs text-gray-500">
                          {application.interactions.length} αλληλεπιδράσεις
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}