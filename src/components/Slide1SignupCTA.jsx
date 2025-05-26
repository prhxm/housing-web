export default function Slide1SignupCTA() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-6 text-white transition-all">
      <h2 className="text-3xl md:text-5xl font-bold text-center">
        Ready to find your next home?
      </h2>
      <p className="text-lg md:text-xl text-gray-300 text-center max-w-lg">
        Sign up or log in to start exploring rental listings and connect with landlords.
      </p>
      <div className="flex gap-4">
        <a
          href="/sign-up"
          className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Sign Up
        </a>
        <a
          href="/sign-in"
          className="border border-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-black transition"
        >
          Sign In
        </a>
      </div>
    </div>
  );
}
