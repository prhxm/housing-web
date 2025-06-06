import { useState } from "react";
import "../../styles/ProfileMenu.css";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="relative inline-block"
    >
      {/* Circle avatar button */}
      <div className="w-10 h-10 rounded-full border border-yellow-400 overflow-hidden cursor-pointer">
        <img
          src="/icons/avatar.png"  // <-- یک عکس آواتار ساده بذار اینجا برای تست
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hover panel */}
      <div className={`profile-menu-panel ${isOpen ? "block" : "hidden"}`}>
        <h2 className="text-xl font-bold mb-1">Parham Parvizi</h2>
        <p className="text-sm text-gray-400 mb-2">Parham.Parvizi@gmail.com</p>
        <p className="mb-1"><strong>340Days</strong></p>
        <p className="coin mb-3">2642.2 RG coin</p>
        <div className="flex space-x-1 mb-3">
          {Array(5).fill(0).map((_, i) => (
            <span key={i}>⭐</span>
          ))}
        </div>
        <button className="navbar-button w-full mb-2">Massage</button>
        <button className="navbar-button w-full">Options</button>
      </div>
    </div>
  );
}
