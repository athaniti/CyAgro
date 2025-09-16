import { useState } from "react";
import LoginPage from "./components/LoginPage";
import RegistrationFlow from "./components/RegistrationFlow";
import Dashboard from "./components/Dashboard";
import PlotCreationFlow from "./components/PlotCreationFlow";
import AgriculturalPlotFlow from "./components/AgriculturalPlotFlow";
import CultivationDeclarationFlow from "./components/CultivationDeclarationFlow";
import DamageDeclarationFlow from "./components/DamageDeclarationFlow";
import ApplicationHistory from "./components/ApplicationHistory";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentView, setCurrentView] = useState("dashboard"); // Default view after login
  const [isRegistered, setIsRegistered] = useState(false);

  const handleLogin = (user) => {
    setUserData(user);
    setIsAuthenticated(true);
    
    // Check if user has already completed profile/registration
    if (user.hasProfile) {
      setIsRegistered(true);
      setCurrentView("dashboard");
    } else {
      setIsRegistered(false);
      setCurrentView("registration");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setCurrentView("dashboard");
    setIsRegistered(false);
  };

  const handleRegistrationComplete = () => {
    setIsRegistered(true);
    setCurrentView("dashboard");
  };

  const handleStartPlotCreation = () => {
    setCurrentView("plot-creation");
  };

  const handleStartAgriculturalPlot = () => {
    setCurrentView("agricultural-plot");
  };

  const handleStartCultivationDeclaration = () => {
    setCurrentView("cultivation-declaration");
  };

  const handleStartDamageDeclaration = () => {
    setCurrentView("damage-declaration");
  };

  const handleViewApplicationHistory = () => {
    setCurrentView("application-history");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthenticated ? (
        <LoginPage onLogin={handleLogin} />
      ) : currentView === "registration" && !isRegistered ? (
        <RegistrationFlow 
          userData={userData} 
          onLogout={handleLogout}
          onComplete={handleRegistrationComplete}
        />
      ) : currentView === "dashboard" ? (
        <Dashboard 
          userData={userData}
          onLogout={handleLogout}
          onStartPlotCreation={handleStartPlotCreation}
          onStartAgriculturalPlot={handleStartAgriculturalPlot}
          onStartCultivationDeclaration={handleStartCultivationDeclaration}
          onStartDamageDeclaration={handleStartDamageDeclaration}
          onViewApplicationHistory={handleViewApplicationHistory}
        />
      ) : currentView === "application-history" ? (
        <ApplicationHistory
          userData={userData}
          onLogout={handleLogout}
          onBack={handleBackToDashboard}
        />
      ) : currentView === "plot-creation" ? (
        <PlotCreationFlow
          userData={userData}
          onLogout={handleLogout}
          onBack={handleBackToDashboard}
        />
      ) : currentView === "agricultural-plot" ? (
        <AgriculturalPlotFlow
          userData={userData}
          onLogout={handleLogout}
          onBack={handleBackToDashboard}
        />
      ) : currentView === "cultivation-declaration" ? (
        <CultivationDeclarationFlow
          userData={userData}
          onLogout={handleLogout}
          onBack={handleBackToDashboard}
        />
      ) : currentView === "damage-declaration" ? (
        <DamageDeclarationFlow
          userData={userData}
          onLogout={handleLogout}
          onBack={handleBackToDashboard}
        />
      ) : null}
    </div>
  );
}