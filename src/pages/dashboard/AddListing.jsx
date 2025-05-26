import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast"; 


export default function AddListing() {
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("Studio");
  const [rooms, setRooms] = useState(1);
  const [hasMaster, setHasMaster] = useState(false);
  const [description, setDescription] = useState("");
  const { user } = useUser();
  const [imageFile, setImageFile] = useState(null);



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let imageUrl = "";
    if (imageFile) {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('listing-images')
        .upload(fileName, imageFile);

    if (uploadError) {
        toast.error("📛 Failed to upload image.");
        return;
    }

    const { data: urlData } = supabase
        .storage
        .from('listing-images')
        .getPublicUrl(fileName);

    imageUrl = urlData?.publicUrl || "";
    }


    const { data, error } = await supabase.from("listings").insert([
      {
        user_id: user.id,
        price: parseFloat(price),
        address,
        property_type: propertyType,
        rooms: parseInt(rooms),
        has_master: hasMaster,
        description,
        image_url: imageUrl,
      },
    ]);

    if (error) {
      console.error("Insert failed:", error.message);
      toast.error("❌ Failed to add listing!");
    } else {
      console.log("Listing added:", data);
      toast.success("🏠 Listing added successfully!");
      // Reset form
      setPrice("");
      setAddress("");
      setPropertyType("Studio");
      setRooms(1);
      setHasMaster(false);
      setDescription("");

    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">🏡 Add New Listing</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Price ($)</label>
          <input
            type="number"
            className="w-full p-2 rounded bg-black border border-white"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
        <label className="block mb-1">Listing Image</label>
        <input
            type="file"
            accept="image/*"
            className="w-full p-2 rounded bg-black border border-white"
            onChange={(e) => setImageFile(e.target.files[0])}
        />
        </div>


        <div>
          <label className="block mb-1">Address</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-black border border-white"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Property Type</label>
          <select
            className="w-full p-2 rounded bg-black border border-white"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option>Studio</option>
            <option>House</option>
            <option>Basement</option>
            <option>Apartment</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Number of Rooms</label>
          <input
            type="number"
            className="w-full p-2 rounded bg-black border border-white"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="master"
            checked={hasMaster}
            onChange={(e) => setHasMaster(e.target.checked)}
          />
          <label htmlFor="master">Includes Master Bedroom</label>
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            className="w-full p-2 rounded bg-black border border-white"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-white/80 transition"
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
}
