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

        {/* Content always rendered, hidden or behind loading screen */}
        <div style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.8s ease-in-out',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: loading ? 'none' : 'auto',
          willChange: 'opacity' // Hint to browser to promote to layer
        }}>
          <Navbar />
          <ScrollProgress />
          <AnimatedRoutes />
        </div>
      </AudioProvider>
    </CartProvider>
  );
}

export default App;
