import { useUser } from "@clerk/clerk-react";

export default function Options() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role || "tenant";

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Options</h2>
      <p className="text-lg">
        <span className="font-semibold">Current Role:</span> {role}
      </p>
      {/* Future options can go here */}
    </div>
  );
}
