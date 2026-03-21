import React, { Suspense, useEffect, useMemo, useState, useCallback, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import { SeoTags } from "../seo/SeoTags";
import PullToReveal from "../components/PullToReveal";
import FeaturedProductPopup from "../components/FeaturedProductPopup";
import { getItems } from "../services/api";

// Lazy-loaded components for code splitting
const IntroSheet = lazy(() => import("../components/home/IntroSheet"));
const CategoriesSheet = lazy(() => import("../components/home/CategoriesSheet"));
const FeaturedSheet = lazy(() => import("../components/home/FeaturedSheet"));
const AdvantagesSheet = lazy(() => import("../components/home/AdvantagesSheet"));
const NewsSheet = lazy(() => import("../components/home/NewsSheet"));
const Stats = lazy(() => import("../components/Stats"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const Newsletter = lazy(() => import("../components/Newsletter"));
const Background3D = lazy(() => import("../components/home/Background3D"));

export default function Home() {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCharIndex, setHoveredCharIndex] = useState(-1);
  const [showProductPopup, setShowProductPopup] = useState(false);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getItems();
        setProducts(data || []);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const hiddenToday = localStorage.getItem('hideFeaturedPopup');
    const today = new Date().toDateString();
    if (hiddenToday !== today) {
      const timer = setTimeout(() => setShowProductPopup(true), 15000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dynamicCategories = useMemo(() => {
    if (!products || products.length === 0) return [];
    const catMap = {};
    products.forEach(p => {
      const catName = p.category || "Khác";
      if (!catMap[catName]) {
        catMap[catName] = { name: catName, count: 0, image: p.image, key: catName.toLowerCase() };
      }
      catMap[catName].count += 1;
    });
    return Object.values(catMap).sort((a, b) => b.count - a.count).slice(0, 4);
  }, [products]);

  const featuredProductsList = useMemo(() => {
    if (!products || products.length === 0) return [];
    const sortedByPrice = [...products].sort((a, b) => Number(a.price) - Number(b.price));
    if (sortedByPrice.length <= 6) return sortedByPrice;
    const combined = [...sortedByPrice.slice(0, 4)];
    sortedByPrice.slice(-2).forEach(item => {
      if (!combined.find(c => c.id === item.id)) combined.push(item);
    });
    return combined;
  }, [products]);

  const handleAddToCart = useCallback((product) => addToCart(product), [addToCart]);
  const handleNavigate = useCallback((path) => navigate(path), [navigate]);
  const handleShowPopup = useCallback(() => setShowProductPopup(true), []);

  const { sheet1Style, sheet2Style, sheet3Style, sheet4Style, sheet5Style } = useMemo(() => {
    const base = {
      height: isMobile ? "auto" : "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: isMobile ? "1.5rem 1rem" : "4rem",
      background: "rgba(10, 10, 10, 0.4)",
      backdropFilter: isMobile ? "none" : "blur(8px)",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      position: "relative",
      boxSizing: "border-box",
      boxShadow: isMobile ? "none" : "0 -20px 50px rgba(0,0,0,0.8)",
    };
    return {
      sheet1Style: { ...base, background: "linear-gradient(135deg, rgba(10, 10, 10, 0.5) 0%, rgba(15, 25, 35, 0.5) 100%)", borderLeft: "4px solid rgba(80, 90, 100, 0.6)" },
      sheet2Style: { ...base, background: "linear-gradient(135deg, rgba(15, 25, 35, 0.5) 0%, rgba(20, 30, 40, 0.5) 100%)", borderLeft: isMobile ? "none" : "4px solid rgba(80, 90, 100, 0.6)" },
      sheet3Style: { ...base, background: "linear-gradient(135deg, rgba(20, 30, 40, 0.5) 0%, rgba(10, 10, 10, 0.5) 100%)", borderLeft: isMobile ? "none" : "4px solid rgba(80, 90, 100, 0.6)", marginTop: isMobile ? "1.25rem" : 0 },
      sheet4Style: { ...base, background: "linear-gradient(135deg, rgba(10, 15, 25, 0.5) 0%, rgba(25, 15, 35, 0.5) 100%)", borderLeft: "4px solid rgba(80, 100, 100, 0.6)" },
      sheet5Style: { ...base, background: "linear-gradient(135deg, rgba(25, 15, 35, 0.5) 0%, rgba(15, 25, 35, 0.5) 100%)", borderLeft: "4px solid rgba(80, 100, 100, 0.6)" }
    };
  }, [isMobile]);

  return (
    <div>
      <SeoTags
        title={language === "vi" ? "Trang chủ" : "Home"}
        description={t("seo_home_desc") || "Khám phá kho cơ khí, inox, ốc vít và vật liệu xây dựng với trải nghiệm 3D sống động."}
      />
      
      {/* 3D Background - Lazy Loaded */}
      <Suspense fallback={<div style={{ position: "fixed", inset: 0, background: "radial-gradient(circle at 50% 50%, #1a1a1a 0%, #050505 100%)", zIndex: -1 }} />}>
        <Background3D />
      </Suspense>

      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1, background: "radial-gradient(circle at 50% 50%, #1a1a1a 0%, #050505 100%)" }} />

      <div style={{ position: "relative", zIndex: 10 }}>
        <PullToReveal>
          <Suspense fallback={<div style={{ height: "100vh", background: "rgba(0,0,0,0.2)" }} />}>
            <IntroSheet style={sheet1Style} t={t} hoveredCharIndex={hoveredCharIndex} setHoveredCharIndex={setHoveredCharIndex} />
          </Suspense>
          <Suspense fallback={<div style={{ height: "100vh", background: "rgba(0,0,0,0.2)" }} />}>
            <CategoriesSheet style={sheet2Style} dynamicCategories={dynamicCategories} onNavigate={handleNavigate} />
          </Suspense>
          <Suspense fallback={<div style={{ height: "100vh", background: "rgba(0,0,0,0.2)" }} />}>
            <FeaturedSheet style={sheet3Style} loading={loading} products={products} featuredProductsList={featuredProductsList} language={language} onAddToCart={handleAddToCart} onNavigate={handleNavigate} onShowPopup={handleShowPopup} />
          </Suspense>
          <Suspense fallback={<div style={{ height: "100vh", background: "rgba(0,0,0,0.2)" }} />}>
            <AdvantagesSheet style={sheet4Style} t={t} />
          </Suspense>
          <Suspense fallback={<div style={{ height: "100vh", background: "rgba(0,0,0,0.2)" }} />}>
            <NewsSheet style={sheet5Style} onNavigate={handleNavigate} />
          </Suspense>

        </PullToReveal>
      </div>

      <button onClick={() => setShowProductPopup(true)} style={{ position: "fixed", bottom: "30px", right: "30px", width: "60px", height: "60px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(144, 238, 144, 0.8), rgba(100, 200, 100, 0.9))", border: "2px solid rgba(144, 238, 144, 0.6)", color: "white", fontSize: "1.8rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(144, 238, 144, 0.4)", transition: "all 0.3s ease", zIndex: 900 }}>✨</button>

      {/* Featured Products Popup */}
      {!loading && products.length > 0 && (
        <FeaturedProductPopup
          isOpen={showProductPopup}
          onClose={() => setShowProductPopup(false)}
          onDontShowAgain={() => setShowProductPopup(false)}
          products={featuredProductsList.slice(0, 4)}
        />
      )}
    </div>
  );
}
