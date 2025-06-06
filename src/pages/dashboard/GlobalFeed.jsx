import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function GlobalFeed() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [limit, setLimit] = useState(20); // pagination

  const fetchMessages = async () => {
    setLoading(true);
    let query = supabase
      .from("messages")
      .select("id, raw_text, price, location, property, created_at")
      .order("created_at", { ascending: false })
      .limit(limit);

    // Apply filters
    if (searchLocation.trim() !== "") {
      query = query.ilike("location", `%${searchLocation.trim()}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching messages:", error);
    } else {
      // Filter price locally because Supabase free tier has some issues with nulls + range sometimes
      const filtered = data.filter((msg) => {
        const price = msg.price || 0;
        const passMin = minPrice === "" || price >= parseFloat(minPrice);
        const passMax = maxPrice === "" || price <= parseFloat(maxPrice);
        return passMin && passMax;
      });
      setMessages(filtered);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line
  }, [searchLocation, minPrice, maxPrice, limit]);

  return (
    <div>
      <h2 className="text-2xl mb-4">🌍 Global Feed</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="border border-yellow-600 rounded px-3 py-1 bg-black text-white"
        />
        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-yellow-600 rounded px-3 py-1 bg-black text-white w-32"
        />
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-yellow-600 rounded px-3 py-1 bg-black text-white w-32"
        />
      </div>

      {/* Posts */}
      {loading ? (
        <p>Loading housing posts...</p>
      ) : messages.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="space-y-3 mb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="border border-yellow-600 p-3 rounded-lg bg-black bg-opacity-60 hover:bg-yellow-900/20 transition"
            >
              <p className="text-yellow-400 font-bold mb-1">
                {msg.price ? `$${msg.price}` : "No price"} - {msg.property || "Unknown property"}
              </p>
              <p className="text-sm text-gray-400 mb-1">
                📍 {msg.location || "Unknown location"}
              </p>
              <p className="text-sm text-white">{msg.raw_text.slice(0, 200)}...</p>
            </div>
          ))}
        </div>
      )}

      {/* Load more */}
      {!loading && messages.length >= limit && (
        <button
          onClick={() => setLimit((prev) => prev + 20)}
          className="navbar-button px-6 py-2 text-lg mt-2"
        >
          Load more ↓
        </button>
      )}
    </div>
  );
}
