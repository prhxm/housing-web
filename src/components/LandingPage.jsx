import React from 'react';
import { Link } from 'react-router-dom';
import background from '../icons/back.png';
import loginIcon from '../icons/login link.png';

export default function LandingPage() {
  return (
    <section className="relative h-screen w-screen bg-black">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-30"
        style={{ 
          backgroundImage: `url(${background})`,
          backgroundAttachment: 'fixed'
        }}
      />

      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-between py-6">
        {/* Top Navigation */}
        <div className="w-full flex justify-end px-6">
          <Link 
            to="/map" 
            className="flex items-center gap-2 text-[#5c8ab5] hover:opacity-80"
          >
            <span className="text-sm leading-tight text-right">
              Get<br />Home
            </span>
            <img src={loginIcon} alt="login" className="w-8 h-8" />
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center text-center max-w-4xl px-6">
          <h1 className="text-6xl font-bold text-white mb-8" style={{
            WebkitTextStroke: '2px white',
            textStroke: '2px white',
            color: 'transparent',
            fontFamily: "'Architects Daughter', cursive"
          }}>
            RoofGarden
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Transparent, fast, and real – this map shows rental listings scraped directly 
            from active Telegram groups. We extract prices, types, and locations, and show 
            them live on the map. 📍 No middlemen. No fluff. Just raw housing data.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-1 mb-12">
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="animate-bounce opacity-80"
          >
            <path d="M7 13l5 5 5-5" />
          </svg>
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="animate-bounce opacity-60"
            style={{ animationDelay: '0.15s' }}
          >
            <path d="M7 13l5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
} 