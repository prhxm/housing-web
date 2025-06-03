import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "react-hot-toast";

export default function Situation() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role || "tenant";
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("user_id", user?.id);
      if (error) {
        console.error("Error fetching listings:", error.message);
      } else {
        setListings(data);
      }
    };
    if (role === "landlord") fetchListings();
  }, [user?.id]);

  const handleDelete = async (id) => {
    const { error } = await supabase.from("listings").delete().eq("id", id);
    if (error) toast.error("❌ Failed to delete listing");
    else {
      toast.success("🗑️ Listing deleted");
      setListings((prev) => prev.filter((l) => l.id !== id));
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-6 min-h-screen text-white">
      {/* Sidebar with profile and house list */}
      <div className="col-span-3 bg-black border border-yellow-600 rounded-xl p-4">
        <div className="text-center mb-6">
          <img
            src="/icons/bee-icon.png"
            alt="Avatar"
            className="w-16 h-16 rounded-full mx-auto mb-2"
          />
          <h2 className="text-xl font-bold">{user?.username || "Landlord"}</h2>
          <p className="text-yellow-400">⭐ 4.8 • 231 RG Coins</p>
        </div>

        <div className="overflow-y-auto max-h-[400px] space-y-3 pr-2 custom-scroll">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="border border-yellow-700 p-3 rounded hover:bg-yellow-800/10 transition"
            >
              <p className="font-bold text-yellow-400">{listing.address}</p>
              <p className="text-sm">{listing.property_type}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="col-span-9">
        <h2 className="text-2xl font-bold mb-4 text-yellow-300">🏠 Your Listed Properties</h2>
        {listings.length === 0 ? (
          <p className="text-gray-400">You haven't listed any properties yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {listings.map((listing) => (
              <div key={listing.id} className="border border-yellow-600 p-4 rounded-xl bg-black/30">
                {listing.image_url && (
                  <img
                    src={listing.image_url}
                    alt="Listing"
                    className="rounded w-full h-48 object-cover mb-3 border border-yellow-700"
                  />
                )}
                <h3 className="text-xl font-bold text-yellow-400">${listing.price}</h3>
                <p>{listing.address}</p>
                <p className="text-sm text-gray-400">
                  {listing.property_type} — {listing.rooms} rooms
                  {listing.has_master ? " — Master Room" : ""}
                </p>
                <p className="text-sm text-gray-500 mt-1">{listing.description}</p>
                <button
                  onClick={() => handleDelete(listing.id)}
                  className="mt-3 px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
