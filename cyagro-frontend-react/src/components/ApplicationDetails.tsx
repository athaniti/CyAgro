import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { LogOut, ArrowLeft, Home, Calendar, FileText, CheckCircle2, Clock, AlertTriangle, XCircle, MapPin, Sprout, Euro, User, Download, Eye } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

export default function ApplicationDetails({ application, userData, onBack, onLogout, onHome }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'under-review':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'expired':
        return <AlertTriangle className="w-5 h-5 text-gray-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'under-review':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'expired':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInteractionIcon = (type) => {
    switch (type) {
      case 'submission':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'payment':
        return <Euro className="w-4 h-4 text-green-600" />;
      case 'review':
        return <Eye className="w-4 h-4 text-orange-600" />;
      case 'approval':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'rejection':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'verification':
        return <CheckCircle2 className="w-4 h-4 text-blue-600" />;
      case 'acknowledgment':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'inspection_scheduled':
        return <Calendar className="w-4 h-4 text-purple-600" />;
      case 'expiration':
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getInteractionTypeText = (type) => {
    const types = {
      submission: 'Υποβολή',
      payment: 'Πληρωμή',
      review: 'Αξιολόγηση',
      approval: 'Έγκριση',
      rejection: 'Απόρριψη',
      verification: 'Επαλήθευση',
      acknowledgment: 'Επιβεβαίωση',
      inspection_scheduled: 'Προγραμματισμός',
      expiration: 'Λήξη'
    };
    return types[type] || 'Ενέργεια';
  };

  const canEdit = application.status === 'rejected' || 
    (application.status === 'under-review' && application.type !== 'damage-declaration');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#334692] text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Λεπτομέρειες Αίτησης</h1>
            <span className="text-white/80">|</span>
            <span className="text-white/80">Κωδικός: {application.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onHome}
              className="text-white hover:bg-white/10"
            >
              <Home className="w-4 h-4 mr-1" />
              Αρχική
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Πίσω
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

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Application Header */}
        <Card className={`border-2 ${getStatusColor(application.status).replace('bg-', 'border-').replace('text-', '')}`}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  {getStatusIcon(application.status)}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{application.title}</h2>
                    <p className="text-gray-600">{application.typeText}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{application.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Κωδικός:</span>
                    <p className="font-mono font-medium">{application.id}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Υποβολή:</span>
                    <p className="font-medium">
                      {new Date(application.submissionDate).toLocaleDateString('el-GR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Ώρα:</span>
                    <p className="font-medium">
                      {new Date(application.submissionDate).toLocaleTimeString('el-GR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Αλληλεπιδράσεις:</span>
                    <p className="font-medium">{application.interactions.length}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge className={`${getStatusColor(application.status)} border text-lg px-3 py-1 mb-4`}>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(application.status)}
                    <span>{application.statusText}</span>
                  </div>
                </Badge>
                {canEdit && (
                  <div>
                    <Button size="sm" className="bg-[#334692] hover:bg-[#2a3a7a] text-white">
                      Επεξεργασία
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Specific Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Plot Details */}
          {application.plotDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="text-[#334692] flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Στοιχεία Τεμαχίου
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {application.plotDetails.province && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-gray-600">Επαρχία:</span>
                    <span className="font-medium">{application.plotDetails.province}</span>
                  </div>
                )}
                {application.plotDetails.community && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-gray-600">Κοινότητα:</span>
                    <span className="font-medium">{application.plotDetails.community}</span>
                  </div>
                )}
                {application.plotDetails.sheet && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-gray-600">Φύλλο/Σχέδιο:</span>
                    <span className="font-medium">{application.plotDetails.sheet}</span>
                  </div>
                )}
                {application.plotDetails.block && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-gray-600">Μπλοκ:</span>
                    <span className="font-medium">{application.plotDetails.block}</span>
                  </div>
                )}
                {application.plotDetails.plotNumber && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-gray-600">Αριθμός Τεμαχίου:</span>
                    <span className="font-medium">{application.plotDetails.plotNumber}</span>
                  </div>
                )}
                {application.plotDetails.area && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-gray-600">Έκταση:</span>
                    <span className="font-medium">{application.plotDetails.area}</span>
                  </div>
                )}
                {application.plotDetails.totalArea && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-gray-600">Συνολική Έκταση:</span>
                    <span className="font-medium">{application.plotDetails.totalArea}</span>
                  </div>
                )}
                {application.plotDetails.includedPlots && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-gray-600">Συμπεριλαμβάνει Τεμάχια:</span>
                    <span className="font-medium">{application.plotDetails.includedPlots.join(', ')}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Cultivation Details */}
          {application.cultivationDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="text-[#334692] flex items-center gap-2">
                  <Sprout className="w-5 h-5" />
                  Στοιχεία Καλλιέργειας
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-600">Καλλιέργεια:</span>
                  <span className="font-medium">{application.cultivationDetails.crop}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-600">Ποικιλία:</span>
                  <span className="font-medium">{application.cultivationDetails.variety}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-600">Έκταση:</span>
                  <span className="font-medium">{application.cultivationDetails.area}</span>
                </div>
                {application.cultivationDetails.numberOfTrees && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-gray-600">Αριθμός Δέντρων:</span>
                    <span className="font-medium">{application.cultivationDetails.numberOfTrees}</span>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-600">Ημερομηνία Φύτευσης:</span>
                  <span className="font-medium">
                    {new Date(application.cultivationDetails.plantingDate).toLocaleDateString('el-GR')}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Damage Details */}
          {application.damageDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Στοιχεία Ζημιάς
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-600">Αίτιο:</span>
                  <span className="font-medium">{application.damageDetails.cause}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-600">Ημερομηνία Ζημιάς:</span>
                  <span className="font-medium">
                    {new Date(application.damageDetails.damageDate).toLocaleDateString('el-GR')}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-600">Εκτιμώμενη Ζημιά:</span>
                  <span className="font-medium">€{application.damageDetails.estimatedLoss}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-600">Ποσοστό Ζημιάς:</span>
                  <span className="font-medium">{application.damageDetails.damagePercentage}%</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-600">Επηρεασμένη Έκταση:</span>
                  <span className="font-medium">{application.damageDetails.affectedArea}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Details */}
          {application.paymentDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600 flex items-center gap-2">
                  <Euro className="w-5 h-5" />
                  Στοιχεία Πληρωμής
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-600">Ποσό:</span>
                  <span className="font-medium">€{application.paymentDetails.amount}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-600">Κωδικός Συναλλαγής:</span>
                  <span className="font-mono font-medium">{application.paymentDetails.transactionId}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-600">Κατάσταση:</span>
                  <Badge className="bg-green-100 text-green-800">
                    Ολοκληρώθηκε
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#334692] flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Επισυναπτόμενα Έγγραφα ({application.documents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {application.documents.map((document, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="flex-1 text-sm font-medium">{document}</span>
                  <Button size="sm" variant="ghost" className="p-1">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interactions Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#334692] flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Ιστορικό Αλληλεπιδράσεων ({application.interactions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {application.interactions.map((interaction, index) => (
                <div key={index} className="flex gap-4 relative">
                  {/* Timeline line */}
                  {index < application.interactions.length - 1 && (
                    <div className="absolute left-6 top-10 w-0.5 h-16 bg-gray-200"></div>
                  )}
                  
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                    {getInteractionIcon(interaction.type)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {getInteractionTypeText(interaction.type)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(interaction.date).toLocaleDateString('el-GR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">
                      {interaction.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <User className="w-3 h-3" />
                      <span>{interaction.user}</span>
                    </div>
                    {interaction.notes && (
                      <Alert className="mt-2 border-orange-200 bg-orange-50">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-orange-800">
                          <strong>Σημείωση:</strong> {interaction.notes}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between items-center pt-6">
          <Button 
            variant="outline"
            onClick={() => window.print()}
            className="border-[#334692] text-[#334692]"
          >
            Εκτύπωση Λεπτομερειών
          </Button>
          
          <div className="flex gap-3">
            {canEdit && (
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                Επεξεργασία Αίτησης
              </Button>
            )}
            
            <Button 
              onClick={onBack}
              className="bg-[#334692] hover:bg-[#2a3a7a] text-white"
            >
              Επιστροφή στη Λίστα
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}