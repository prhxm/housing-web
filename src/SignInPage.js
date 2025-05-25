import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <SignIn
      appearance={{
        variables: {
          colorPrimary: "#eab308", 
          colorBackground: "#111827", 
          colorText: "#f3f4f6",
          fontFamily: "'Dancing Script', cursive",
        },
        elements: {
          card: "shadow-xl border border-yellow-500 rounded-2xl",
          headerTitle: "text-yellow-300 text-3xl font-semibold",
          formButtonPrimary: "bg-yellow-500 hover:bg-yellow-600 text-black font-bold",
          footer: "hidden",
          formFieldInput: "bg-slate-800 text-white border border-yellow-500 placeholder-gray-400",
        },
      }}
    />
  );
}
