import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import Magnetic from "./Magnetic";
import AudioButton from "./AudioButton";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        padding: scrolled ? "20px 0" : "40px 0",
        transition: "all 0.5s ease",
        zIndex: 1000,
        mixBlendMode: "difference", // Cool effect for white text on any background
        color: "white",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "var(--font-header)",
            fontSize: "1.5rem",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
          }}
        >
          Hardware<span style={{ opacity: 0.5 }}>.Store</span>
        </Link>

        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span style={{ background: "white" }}></span>
          <span style={{ background: "white" }}></span>
          <span style={{ background: "white" }}></span>
        </div>

        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>

          <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
            <AudioButton size={40} />
            <Link
              to="/shop"
              style={{
                fontSize: "0.9rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {t("nav_products")}
            </Link>
            <Link
              to="/contact"
              style={{
                fontSize: "0.9rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {t("nav_contact")}
            </Link>
            <Link
              to="/about"
              style={{
                fontSize: "0.9rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              About
            </Link>

            <div style={{ position: "relative", cursor: "pointer" }}>
              <span
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {" "}
                CART ({cartCount})
              </span>
            </div>

            {user ? (
              <>
                <Link
                  to="/admin"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {t("nav_admin")}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {t("nav_logout")}
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {t("nav_login")}
                </span>
              </Link>
            )}

            <button
              onClick={() => {
                toggleLanguage();
                setIsMenuOpen(false);
              }}
              style={{ fontSize: "0.9rem", fontWeight: 500 }}
            >
              {language === "en" ? "EN" : "VI"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
