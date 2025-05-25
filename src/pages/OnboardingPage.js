import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function OnboardingPage() {
  const [role, setRole] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role || !user) return;

    await user.update({
      publicMetadata: { role },
    });

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-black">
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-semibold">Choose your role</h2>
        <div className="space-y-2">
          <label className="block">
            <input
              type="radio"
              name="role"
              value="landlord"
              onChange={(e) => setRole(e.target.value)}
            />
            <span className="ml-2">🏠 Landlord</span>
          </label>
          <label className="block">
            <input
              type="radio"
              name="role"
              value="tenant"
              onChange={(e) => setRole(e.target.value)}
            />
            <span className="ml-2">🔍 Looking for a Home</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
