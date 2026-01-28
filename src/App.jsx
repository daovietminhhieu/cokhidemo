import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AnimatedRoutes from './components/AnimatedRoutes';
import ScrollProgress from './components/ScrollProgress';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Navbar />
      <ScrollProgress />
      <AnimatedRoutes />
      <Footer />
    </CartProvider>
  );
}

export default App;
