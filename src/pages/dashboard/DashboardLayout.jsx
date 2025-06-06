// src/pages/dashboard/DashboardLayout.jsx
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import "../../styles/DashboardPage.css";
import ProfileMenu from "./ProfileMenu";
import "../../styles/ProfileMenu.css";



export default function DashboardLayout() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role || "landlord";
  const [activeTab, setActiveTab] = useState("Global");

  const fakeHouses = ["My House", "North House-2", "West Apartment"];

  console.log("DashboardLayout loaded ✅");

  // Function to render main tab content
  const renderMainContent = () => {
    if (activeTab === "Global") {
      return (
        <div>
          <h2 className="text-2xl mb-4">🌍 Global Feed (Coming soon)</h2>
          <div className="space-y-2">
            {fakeHouses.map((house, i) => (
              <div key={i} className="house-item">
                {house}
              </div>
            ))}
          </div>
        </div>
      );
    } else if (activeTab === "History") {
      return (
        <div>
          <h2 className="text-2xl mb-4">📜 Your History (Coming soon)</h2>
          <p>Here you will see your activity history.</p>
        </div>
      );
    } else if (activeTab === "Finance") {
      return (
        <div>
          <h2 className="text-2xl mb-4">💰 Finance Dashboard (Coming soon)</h2>
          <p>Here you will see your financial stats.</p>
        </div>
      );
    } else {
      return <p>Unknown tab.</p>;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-black text-white font-console p-8 overflow-hidden">
      {/* Background */}
      <div
        className="dashboard-background"
        style={{ backgroundImage: 'url("/icons/astrospace.png")' }}
      ></div>

      {/* Blur mask */}
      <div className="blur-mask"></div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-yellow-700 pb-2 z-10">
        <div className="flex space-x-6 text-lg">
          <button className="navbar-button">Dashboard</button>
          <button className="navbar-button">Search</button>
          <button className="navbar-button">Massage</button>
          <button className="navbar-button">Options</button>
        </div>
        <div className="relative flex items-center justify-end space-x-2 w-52">
          <p className="text-sm text-yellow-400">{role === "landlord" ? "LandlorD" : "Tenant"}</p>
          <ProfileMenu />
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-12 gap-6 z-10 flex-grow">
        {/* Sidebar */}
        <div className="col-span-3 border-r border-yellow-700 pr-4">
          <div className="flex flex-col space-y-2 mb-6 text-yellow-400">
            {["Global", "History", "Finance"].map((tab) => (
              <button
                key={tab}
                className={`text-left ${
                  activeTab === tab ? "border-b-2 border-yellow-400 pb-1" : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main tab content + Profile Card */}
        <div className="col-span-9 flex flex-col space-y-6">
          {/* Main tab content */}
          <div className="border border-yellow-600 p-4 rounded-xl bg-black bg-opacity-70 flex-grow">
            {renderMainContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
