import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <SignIn
      appearance={{
        baseTheme: undefined,
        variables: {
          colorBackground: "#000",
          colorText: "#fff",
          colorPrimary: "#fff",
          colorInputBackground: "#000",
          colorInputText: "#fff",
          colorInputBorder: "#fff",
          colorAlphaShade: "#fff",
          colorTextSecondary: "#ccc",
          fontFamily: "'Dancing Script', cursive",
        },
        elements: {
          rootBox: {
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000",
            padding: "2rem",
          },
          card: {
            backgroundColor: "#000",
            border: "none",
            boxShadow: "0 0 20px rgba(255,255,255,0.1)",
            width: "100%",
            maxWidth: "600px", 
            padding: "2rem",
          },
          headerTitle: {
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#fff",
            fontFamily: "'Dancing Script', cursive",
          },
          formButtonPrimary: {
            backgroundColor: "#fff",
            color: "#000",
            border: "none",
            fontWeight: "bold",
            fontSize: "1rem",
            padding: "0.75rem",
          },
          formFieldInput: {
            backgroundColor: "#000",
            border: "1px solid #fff",
            color: "#fff",
            padding: "0.75rem",
            fontSize: "1rem",
          },
          footer: {
            display: "none",
          },
        },
      }}
    />
  );
}
