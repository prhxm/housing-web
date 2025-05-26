export default function Slide2Wandering() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-white gap-6 text-center">
      <h2 className="text-2xl md:text-4xl font-bold">Just looking around?</h2>
      <p className="text-lg md:text-xl text-gray-300 max-w-lg">
        No worries. You can browse listings without logging in.
        Explore neighborhoods, compare prices, and find inspiration.
      </p>
      <a
        href="/"
        className="border border-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-black transition"
      >
        Start Browsing
      </a>
    </div>
  );
}
