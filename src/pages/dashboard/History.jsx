import { useUser } from "@clerk/clerk-react";

export default function History() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role || "tenant";

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">History</h2>

      {role === "landlord" ? (
        <div>
          <h3 className="text-xl mb-2">Received Applications</h3>
          {/* TODO: Group by property and show received applications */}
          <p className="text-gray-400">
            You haven't received any applications yet.
          </p>
        </div>
      ) : (
        <div>
          <h3 className="text-xl mb-2">Your Application History</h3>
          {/* TODO: Map through tenant's past applications */}
          <p className="text-gray-400">
            You haven't submitted any applications yet.
          </p>
        </div>
      )}
    </div>
  );
}
