import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifyEmailPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { signUp, setActive } = useSignUp();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await signUp.attemptEmailAddressVerification({ code });
      await setActive({ session: signUp.createdSessionId });
      navigate("/dashboard");
    } catch (err) {
      console.error("VERIFICATION ERROR:", err);
      setError(err?.errors?.[0]?.message || err.message || "Verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleVerify} className="p-6 bg-white/10 rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">📩 Verify your Email</h2>
        <p className="mb-2 text-sm text-center">We sent a 6-digit code to <strong>{email}</strong></p>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 6-digit code"
          className="w-full p-2 rounded bg-black border border-white text-white mb-4"
          required
        />

        {error && <p className="text-red-400 mb-2 text-sm text-center">{error}</p>}

        <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded">
          Verify & Continue
        </button>
      </form>
    </div>
  );
}
