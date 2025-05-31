import { Link } from "react-router-dom";
import background from "../icons/back.png";
import loginIcon from "../icons/login link.png";

export default function SlideIntro() {
  return (
    <section
      className="relative h-screen w-screen overflow-hidden text-white font-console bg-black bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* دکمه ورود بالا سمت راست */}
      <Link
        to="/sign-up"
        className="absolute top-6 right-6 flex items-center gap-2 text-white"
      >
        <span className="text-xs text-right leading-tight">
          Get<br />Home
        </span>
        <img src={loginIcon} alt="login" className="w-10 h-10" />
      </Link>

      {/* متن مرکزی */}
      <div className="flex flex-col justify-center items-center h-full text-center px-6 max-w-2xl mx-auto">
        <h1 className="text-5xl mb-6">RoofGarden</h1>
        <p className="text-lg text-white/90 leading-relaxed">
          Transparent, fast, and real — this map shows rental listings scraped
          directly from active Telegram groups. We extract prices, types, and
          locations, and show them live on the map. 📍 No middlemen. No fluff.
          Just raw housing data.
        </p>

        {/* آیکون اسکرول */}
        <div className="flex justify-center mt-12">
          <svg
            className="w-6 h-6 text-white animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
