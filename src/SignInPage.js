import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <SignIn
      appearance={{
        baseTheme: undefined, // custom manually
        variables: {
          colorBackground: "#000",
          colorText: "#fff",
          colorPrimary: "#fff",
          colorInputBackground: "#000",
          colorInputText: "#fff",
          colorInputBorder: "#fff",
          colorAlphaShade: "#fff",
          colorTextSecondary: "#ccc",
          fontFamily: "'Dancing Script', cursive", // یا فونت دلخواه دیگه
        },
        elements: {
          rootBox: {
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000",
          },
          card: {
            backgroundColor: "#000",
            border: "none",
            boxShadow: "none",
            width: "100%",
            maxWidth: "420px",
          },
          headerTitle: {
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#fff",
            fontFamily: "'Dancing Script', cursive",
          },
          formButtonPrimary: {
            backgroundColor: "#fff",
            color: "#000",
            border: "none",
            fontWeight: "bold",
          },
          formFieldInput: {
            backgroundColor: "#000",
            border: "1px solid #fff",
            color: "#fff",
            padding: "0.5rem",
          },
          footer: {
            display: "none",
          },
        },
      }}
    />
  );
}
