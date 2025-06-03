import { useUser } from "@clerk/clerk-react";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signup");
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardLayout />
    </div>
  );
}
