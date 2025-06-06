import { useUser } from "@clerk/clerk-react";
import DashboardLayout from "./dashboard/DashboardLayout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !user) {
      navigate("/signup");
    }
  }, [user, isLoaded, navigate]);

  if (!isLoaded) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  console.log("DashboardPage loaded ✅");

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardLayout />
    </div>
  );
}
