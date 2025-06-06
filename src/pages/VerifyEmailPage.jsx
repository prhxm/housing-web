import { useEffect, useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/SignupPage.css";

export default function SignupPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useSignUp();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email || "Unknown email";

  // پاک‌سازی استایل root و تنظیم ظاهر signup
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.removeAttribute("style"); // ❗ تمام background و color قبلی رو پاک می‌کنه
      root.style.background = "black";
      root.style.color = "white";
      root.style.fontFamily = `"Segoe UI", sans-serif`;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!signUp) {
      setError("SignUp context not ready. Please reload.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signUp.attemptEmailAddressVerification({ code });
      navigate("/dashboard");
    } catch (err) {
      console.error("Verification Error:", err);
      setError("Invalid or expired code. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>📨 Email Verification</h2>
        <p>Code sent to <strong>{email}</strong></p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
