import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Tractor, Beef, Factory, Truck, Users, Building } from "lucide-react";

const profileTypes = [
  {
    id: "farmer",
    title: "Γεωργός",
    description: "Καλλιέργεια γεωργικών προϊόντων",
    icon: Tractor,
    color: "text-green-600"
  },
  {
    id: "livestock",
    title: "Κτηνοτρόφος", 
    description: "Εκτροφή ζώων και παραγωγή κτηνοτροφικών προϊόντων",
    icon: Beef,
    color: "text-amber-600"
  },
  {
    id: "manufacturer",
    title: "Κατασκευαστής",
    description: "Παραγωγή και κατασκευή προϊόντων",
    icon: Factory,
    color: "text-blue-600"
  },
  {
    id: "transporter",
    title: "Μεταφορέας",
    description: "Μεταφορά αγαθών και προϊόντων",
    icon: Truck,
    color: "text-purple-600"
  },
  {
    id: "cooperative",
    title: "Συνεταιρισμός",
    description: "Συνεταιριστική επιχείρηση",
    icon: Users,
    color: "text-teal-600"
  },
  {
    id: "company",
    title: "Εταιρεία",
    description: "Εμπορική ή βιομηχανική επιχείρηση",
    icon: Building,
    color: "text-gray-600"
  }
];

export default function ProfileSelection({ onSubmit }) {
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  const handleProfileToggle = (profileId) => {
    setSelectedProfiles(prev => 
      prev.includes(profileId)
        ? prev.filter(id => id !== profileId)
        : [...prev, profileId]
    );
  };

  const handleSubmit = () => {
    if (selectedProfiles.length > 0) {
      onSubmit(selectedProfiles);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#334692] mb-2">
          Επιλογή Τύπου Προφίλ
        </h2>
        <p className="text-gray-600">
          Επιλέξτε έναν ή περισσότερους τύπους προφίλ που σας αντιπροσωπεύουν
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profileTypes.map((profile) => {
          const IconComponent = profile.icon;
          const isSelected = selectedProfiles.includes(profile.id);
          
          return (
            <Card 
              key={profile.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected 
                  ? 'border-[#334692] bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleProfileToggle(profile.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IconComponent className={`w-6 h-6 ${profile.color}`} />
                    <CardTitle className="text-lg">{profile.title}</CardTitle>
                  </div>
                  <Checkbox
                    checked={isSelected}
                    onChange={() => handleProfileToggle(profile.id)}
                    className="data-[state=checked]:bg-[#334692] data-[state=checked]:border-[#334692]"
                  />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm">{profile.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedProfiles.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-[#334692] mb-2">Επιλεγμένα Προφίλ:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedProfiles.map(profileId => {
              const profile = profileTypes.find(p => p.id === profileId);
              return (
                <span 
                  key={profileId}
                  className="bg-[#334692] text-white px-3 py-1 rounded-full text-sm"
                >
                  {profile.title}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-end pt-6">
        <Button 
          onClick={handleSubmit}
          disabled={selectedProfiles.length === 0}
          className="bg-[#334692] hover:bg-[#2a3a7a] text-white px-8"
        >
          Συνέχεια
        </Button>
      </div>
    </div>
  );
}