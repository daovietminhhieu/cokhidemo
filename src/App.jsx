import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AnimatedRoutes from "./components/AnimatedRoutes";
import ScrollProgress from "./components/ScrollProgress";
import { CartProvider } from "./context/CartContext";
import { AudioProvider } from "./context/AudioContext";
import LoadingScreen from "./components/LoadingScreen";
import { AnimatePresence } from "framer-motion";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <CartProvider>
      <AudioProvider>
        <AnimatePresence mode="wait">
          {loading && <LoadingScreen key="loading" onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <>
            <Navbar />
            <ScrollProgress />
            <AnimatedRoutes />
          </>
        )}
      </AudioProvider>
    </CartProvider>
  );
}

export default App;
