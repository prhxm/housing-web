import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import "@/styles/DashboardPage.css"; // اگر فایلی برای استایل خاص داری اینجا ایمپورت کن

export default function DashboardLayout() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role || "landlord"; // فرض بر اینکه فقط landlord داری فعلاً
  const [activeTab, setActiveTab] = useState("Situation");

  const fakeHouses = ["My House", "North House-2", "West Apartment"];

  return (
    <div className="min-h-screen bg-black text-white p-4 font-console">
      {/* Navbar بالا */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-2">
        <div className="flex space-x-6 text-lg">
          <button className="hover:text-yellow-400">Dashboard</button>
          <button className="hover:text-yellow-400">Search</button>
          <button className="hover:text-yellow-400">Massage</button>
          <button className="hover:text-yellow-400">Options</button>
        </div>
        <div className="text-right">
          <p className="text-sm text-yellow-400">{role === "landlord" ? "LandlorD" : "Tenant"}</p>
          <div className="rounded-full border border-yellow-400 px-3 py-1 inline-block mt-1">
            <span className="uppercase font-bold text-sm">pro<br />file</span>
          </div>
        </div>
      </div>

      {/* محتوای وسط - دو ستون */}
      <div className="grid grid-cols-12 gap-6">
        {/* ستون لیست خانه‌ها */}
        <div className="col-span-3 border-r border-yellow-700 pr-4">
          <div className="flex space-x-4 mb-4 text-yellow-400">
            <button className="border-b-2 border-yellow-400 pb-1">Situation</button>
            <button className="text-gray-500">History</button>
            <button className="text-gray-500">Finance</button>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[300px] custom-scroll pr-2">
            {fakeHouses.map((house, i) => (
              <div
                key={i}
                className="hover:bg-yellow-900/20 p-2 rounded border border-yellow-700"
              >
                {house}
              </div>
            ))}
          </div>
        </div>

        {/* ستون پروفایل سمت راست */}
        <div className="col-span-9">
          <div className="border border-yellow-600 p-4 rounded-xl max-w-sm ml-auto">
            <h2 className="text-xl font-bold mb-1">Parham Parvizi</h2>
            <p className="text-sm text-gray-400 mb-4">Parham.Parvizi@gmail.com</p>
            <p className="mb-2">
              <strong>340Days</strong>
            </p>
            <p className="text-yellow-400 font-bold text-xl mb-2">
              2642.2 <span className="text-sm">RG coin</span>
            </p>
            <div className="flex space-x-1 mb-4">
              {Array(5).fill(0).map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
            <button className="block w-full border border-yellow-400 text-yellow-300 py-1 mb-2">
              Massage
            </button>
            <button className="block w-full border border-yellow-400 text-yellow-300 py-1">
              Options
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
