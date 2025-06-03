import { useSignUp } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function VerifyEmailPage() {
  const { signUp, setActive } = useSignUp();
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await signUp.attemptEmailAddressVerification({ code });
      const storedSessionId = localStorage.getItem("createdSessionId");
      await setActive({ session: storedSessionId });
      navigate("/dashboard");
    } catch (err) {
      setError("Verification failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleVerify} className="p-6 bg-white/10 rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">🔐 Verify your Email</h2>
        <p className="mb-2 text-sm">We sent a 6-digit code to <strong>{email}</strong></p>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 6-digit code"
          className="w-full p-2 rounded bg-black border border-white text-white mb-4"
          required
        />

        {error && <p className="text-red-400 mb-2 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded"
        >
          Verify & Continue
        </button>
      </form>
    </div>
  );
}
