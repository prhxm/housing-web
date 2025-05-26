export default function SlideIntro() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center animate-fadeIn">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
        Welcome to Housing Web
      </h1>
      <p className="text-base md:text-xl max-w-xl text-gray-300">
        Your gateway to rental listings — transparent, fast, and real. No middlemen. Just pure housing data.
      </p>
    </div>
  );
}
