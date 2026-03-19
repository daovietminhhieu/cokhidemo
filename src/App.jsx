import Navbar from "./components/Navbar";
import AnimatedRoutes from "./components/AnimatedRoutes";
import ScrollProgress from "./components/ScrollProgress";
import { CartProvider } from "./context/CartContext";
import { AudioProvider } from "./context/AudioContext";
import LoadingScreen from "./components/LoadingScreen";
import { AnimatePresence } from "framer-motion";
import { SeoProvider } from "./seo/SeoProvider";
import { useState, useTransition } from "react";
function App() {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const handleComplete = () => {
    startTransition(() => {
      setLoading(false);
    });
  };

  return (
    <SeoProvider>
      <CartProvider>
        <AudioProvider>
          <AnimatePresence mode="wait">
            {loading && <LoadingScreen key="loading" onComplete={handleComplete} />}
          </AnimatePresence>

          <div style={{
            opacity: loading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: loading ? 'none' : 'auto',
            willChange: 'opacity'
          }}>
            <Navbar />
            <ScrollProgress />
            <AnimatedRoutes />
          </div>
        </AudioProvider>
      </CartProvider>
    </SeoProvider>
  );
}

export default App;
