// DashboardLayout.jsx
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import Overview from "./Overview";
import History from "./History";
import Situation from "./Situation";
import Options from "./Options";

const tabsByRole = {
  landlord: ["Overview", "Situation", "History", "Options"],
  tenant: ["Overview", "History", "Situation", "Options"],
};

const componentsByTab = {
  Overview,
  History,
  Situation,
  Options,
};

export default function DashboardLayout() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role || "tenant"; 
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = tabsByRole[role] || [];

  const ActiveComponent = componentsByTab[activeTab];

  return (
    <div className="min-h-screen p-4">
      <div className="flex gap-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? "bg-white text-black" : "border border-white"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <ActiveComponent />
      </div>
    </div>
  );
}
