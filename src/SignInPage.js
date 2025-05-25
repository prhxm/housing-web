import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  );
};

export default SignInPage;
