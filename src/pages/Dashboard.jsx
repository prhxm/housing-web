import { useUser } from "@clerk/clerk-react";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !user) {
      navigate("/signup");
    }
  }, [user, isLoaded]);

  if (!isLoaded) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardLayout />
    </div>
  );
}
