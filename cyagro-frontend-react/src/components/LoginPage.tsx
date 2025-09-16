import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "./ui/card";
import apiService from "../services/apiService";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Try to login with FastAPI
      const response = await apiService.login({
        email: email,
        password: password
      });

      // Check if user has a complete profile
      const user = response.user;
      const userData = {
        fullName: `${user.first_name} ${user.last_name}`,
        email: user.email,
        uniqueCode: user.username,
        idNumber: user.id_number,
        phone: user.phone,
        hasProfile: user.has_profile // Use the has_profile field from API
      };
      
      onLogin(userData);
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message || 'Αποτυχία σύνδεσης. Παρακαλώ ελέγξτε τα στοιχεία σας.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#334692] to-[#48599d] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-white p-4 rounded-lg mb-4 shadow-lg">
            <h1 className="font-bold text-[#334692] text-xl">
              Ψηφιακή Πύλη Εξυπηρέτησης του Πολίτη
            </h1>
          </div>
          <h2 className="text-white text-lg mb-2">Εγγραφή στο Μητρώο</h2>
          <p className="text-white/90 text-sm">
            Παρακαλώ συνδεθείτε μέσω CY-Login για να συνεχίσετε
          </p>
        </div>

        {/* CY-Login Card */}
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-[#334692]">CY-Login</CardTitle>
            <CardDescription>
              Εισάγετε τα στοιχεία σας για αυθεντικοποίηση
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Ηλεκτρονικό Ταχυδρομείο</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Κωδικός Πρόσβασης</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#334692] hover:bg-[#2a3a7a] text-white"
                disabled={isLoading}
              >
                {isLoading ? "Γίνεται επιτυχής αυθεντικοποίηση..." : "Σύνδεση"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Δεν έχετε λογαριασμό;</p>
              <Button variant="outline" className="text-[#334692] border-[#334692]">
                Δημιουργία Λογαριασμού CY-Login
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <div className="mt-6 text-center text-white/80 text-xs">
          <p>Χρησιμοποιείται διαλειτουργικότητα με την πλατφόρμα CY-Login</p>
        </div>
      </div>
    </div>
  );
}