import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { MenuPlanning } from "./components/MenuPlanning";
import { Ingredients } from "./components/Ingredients";
import { StaffManagement } from "./components/StaffManagement";
import { Feedback } from "./components/Feedback";

export default function App() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <Dashboard />;
      case "menu":
        return <MenuPlanning />;
      case "ingredients":
        return <Ingredients />;
      case "staff":
        return <StaffManagement />;
      case "feedback":
        return <Feedback />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-gray-50/50 overflow-auto">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}
