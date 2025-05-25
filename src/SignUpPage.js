import {
  SignUp,
  useSignUp,
  useClerk,
  useUser
} from "@clerk/clerk-react";

import { useEffect } from "react";

export default function SignUpPage() {
  return (
    <SignUp
      appearance={{
        elements: {
          formFieldLabel: "text-white",
          formFieldInput: "bg-black border border-white text-white",
          card: "bg-black text-white rounded-xl shadow-lg",
        }
      }}
      redirectUrl="/"
      afterSignUpUrl="/onboarding"
      signInUrl="/sign-in"
      additionalFields={[
        {
          name: "role",
          label: "You are registering as...",
          type: "select",
          required: true,
          options: [
            { value: "host", label: "🐝 HoneyHost (I want to rent out my place)" },
            { value: "seeker", label: "🕵️‍♂️ PlaceSeeker (I’m looking for a place)" }
          ]
        }
      ]}
    />
  );
}
