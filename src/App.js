import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import OnboardingPage from './pages/OnboardingPage';
import MainMapComponent from './components/MainMapComponent';

function App() {
  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <a
            href="/sign-in"
            className="bg-white text-black px-3 py-1.5 rounded font-medium text-sm shadow hover:bg-gray-200 transition-all"
          >
            Sign in / Sign up
          </a>
        </SignedOut>
      </div>

      <Routes>
        <Route path="/" element={<MainMapComponent />} />
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
    </>
  );
}

export default App;
