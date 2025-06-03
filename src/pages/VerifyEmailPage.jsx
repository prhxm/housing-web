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
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <form
        onSubmit={handleVerify}
        className="bg-white/10 rounded-lg p-6 w-full max-w-sm flex flex-col space-y-4"
      >
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-400 mb-2">📩 Email</div>
          <p className="text-sm text-gray-300">
            We've sent a <span className="text-yellow-400 font-semibold">6-digit code</span> to your email.
          </p>
        </div>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 6-digit code"
          className="w-full p-2 rounded bg-black border border-white text-white text-center tracking-widest"
          required
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded"
        >
          ✅ Verify & Continue
        </button>
      </form>
    </div>
  );

}
