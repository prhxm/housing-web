import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Select from "react-select";
import ReactSlider from "react-slider";
import { supabase } from "../lib/supabase";

import houseIconUrl from "../icons/house.png";
import unknownIconUrl from "../icons/unknown.png";
import houseDark from "../icons/house-dark.png";

function FlyToSelected({ message }) {
  const map = useMap();
  useEffect(() => {
    if (message?.lat && message?.lng) {
      map.flyTo([message.lat, message.lng], 15, { duration: 1.5 });
    }
  }, [message]);
  return null;
}

export default function MainMapComponent() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchPrice, setSearchPrice] = useState("");
  const [priceRange, setPriceRange] = useState([0, 6000]);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const modalRef = useRef(null);

  const houseIcon = new L.Icon({
    iconUrl: darkMode ? houseDark : houseIconUrl,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });

  const unknownIcon = new L.Icon({
    iconUrl: unknownIconUrl,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("messages").select("*");
      if (data) setLocations(data);
    }
    fetchData();
  }, []);

  const filtered = locations.filter((msg) => {
    const priceValue = parseFloat(msg.price_num);
    const matchesLocation =
      !selectedLocation ||
      (msg.location && msg.location.split(",")[0].trim() === selectedLocation);
    const matchesType = msg.property?.toLowerCase().includes(searchType.toLowerCase());
    const matchesPrice = !priceValue || (priceValue >= priceRange[0] && priceValue <= priceRange[1]);
    return matchesLocation && matchesType && matchesPrice;
  });

  const locationOptions = Array.from(
    new Set(
      locations.map((l) => {
        const loc = l.location?.trim();
        if (!loc || loc === "N/A" || loc.toLowerCase() === "none") return null;
        return loc.split(",")[0].trim();
      }).filter(Boolean)
    )
  ).map((loc) => ({ label: loc, value: loc }));

  const filteredWithCoords = filtered.filter((msg) =>
    msg.lat && msg.lng && msg.price !== "N/A" && msg.property !== "N/A"
  );

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <header className="header">
        <h1>🏡 <span>Vancouver Housing Map</span></h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌝 Light Mode" : "🌑 Dark Mode"}
        </button>
      </header>

      <p className="description">
        Transparent, fast, and real — this map shows rental listings scraped directly from active Telegram groups.
        We extract prices, types, and locations, and show them live on the map. 📍 No middlemen. No fluff.
        Just raw housing data.
      </p>

      <div className="main">
        <div className="map-section">
          <MapContainer
            center={[49.2827, -123.1207]}
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url={
                darkMode
                  ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              }
              attribution="&copy; CARTO | OSM"
            />
            <FlyToSelected message={selectedMessage} />
            {filteredWithCoords.map((msg) => {
              const hasCoords = msg.lat && msg.lng;
              const icon = hasCoords ? houseIcon : unknownIcon;
              const position = hasCoords ? [msg.lat, msg.lng] : [49.28, -123.12];
              return (
                <Marker key={msg.id} position={position} icon={icon}>
                  <Popup>
                    {hasCoords ? (
                      <>
                        <strong>{msg.price || "No price"}</strong><br />
                        Type: {msg.property || "N/A"}<br />
                        Location: {msg.location || "N/A"}
                      </>
                    ) : (
                      <strong>Location not found</strong>
                    )}
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        <div className="list-section">
          <div className="filter-section">
            <input
              type="text"
              placeholder="Filter by keywords..."
              value={searchPrice}
              onChange={(e) => setSearchPrice(e.target.value)}
            />
            <Select
              options={locationOptions}
              placeholder="Filter by location..."
              onChange={(selected) => setSelectedLocation(selected?.value || "")}
              isClearable
            />
            <ReactSlider
              className="slider"
              min={0}
              max={6000}
              value={priceRange}
              onChange={(value) => setPriceRange(value)}
              pearling
              minDistance={50}
            />
          </div>

          <div className="housing-scroll">
            {filteredWithCoords.map((msg) => (
              <div
                key={msg.id}
                className="housing-card"
                onClick={() => msg.raw_text && setSelectedMessage(msg)}>
                <strong>{msg.price || "No price"}</strong><br />
                {msg.property}<br />
                {msg.location}
              </div>
            ))}

            {selectedMessage?.raw_text && (
              <div className="raw-modal" ref={modalRef}>
                <div className="raw-modal-close" onClick={() => setSelectedMessage(null)}>
                  <h4 style={{ marginBottom: "10px" }}>Raw Telegram Message</h4>
                  <p style={{ whiteSpace: "pre-wrap" }}>{selectedMessage.raw_text}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
