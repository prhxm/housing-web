export default function SlideNavigationButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 bottom-4 md:right-10 md:bottom-10 text-white bg-white/10 hover:bg-white/20 
                 transition-all duration-300 rounded-full p-3 md:p-4 shadow-lg"
      aria-label="Next slide"
    >
      <span className="text-xl md:text-2xl">→</span>
    </button>
  );
}
