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

    if (role === "landlord") {
        fetchListings();
    }
    }, [user?.id]);

    const handleDelete = async (id) => {
        const { error } = await supabase.from("listings").delete().eq("id", id);

        if (error) {
            toast.error("❌ Failed to delete listing");
        } else {
            toast.success("🗑️ Listing deleted");
            setListings((prev) => prev.filter((l) => l.id !== id));
        }
    };



  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Situation</h2>

        {role === "landlord" ? (
        <div>
            <h3 className="text-xl mb-2">Your Listed Properties</h3>

            {listings.length === 0 ? (
            <p className="text-gray-400">You haven't listed any properties yet.</p>
            ) : (
            <ul className="space-y-2">
            {listings.map((listing) => (
                <li key={listing.id} className="border border-white p-3 rounded">
                {listing.image_url && (
                    <img
                    src={listing.image_url}
                    alt="Listing"
                    className="mb-2 rounded w-full max-h-48 object-cover border border-gray-700"
                    />
                )}
                <h4 className="text-lg font-bold">${listing.price}</h4>
                <p>{listing.address}</p>
                <p className="text-sm text-gray-400">
                    {listing.property_type} — {listing.rooms} rooms
                    {listing.has_master ? " — Master Room" : ""}
                </p>
                <p className="text-sm text-gray-500 mt-1">{listing.description}</p>
                <button
                onClick={() => handleDelete(listing.id)}
                className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                >
                Delete
                </button>
                </li>
            ))}
            </ul>
            )}
        </div>
        ) :  (
        <div>
          <h3 className="text-xl mb-2">Your Applications</h3>
          {/* TODO: Map through tenant's applications here */}
          <p className="text-gray-400">You haven't applied to any listings yet.</p>
        </div>
      )}
    </div>
  );
}
