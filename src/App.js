import MainLanding from "./components/MainLanding";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="h-screen w-screen bg-black text-white font-console overflow-hidden relative">
      <MainLanding />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            fontFamily: "Courier New",
          },
        }}
      />
    </div>
  );
}
