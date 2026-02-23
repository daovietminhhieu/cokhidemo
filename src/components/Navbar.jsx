import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import Magnetic from "./Magnetic";
import AudioButton from "./AudioButton";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const { cart, cartCount, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const overlayActive = isMenuOpen || isCartOpen;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = overlayActive ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayActive]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
    setIsCartOpen(false);
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
        background: scrolled || overlayActive ? "rgba(15,15,15,0.55)" : "transparent",
        backdropFilter: scrolled || overlayActive ? "blur(6px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "transparent",
        color: "#fff",
      }}
    >
      {overlayActive && (
        <div
          className="nav-overlay"
          onClick={() => {
            setIsMenuOpen(false);
            setIsCartOpen(false);
          }}
        />
      )}
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
          Inox<span style={{ opacity: 0.5 }}>diepduong</span>
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

            {/* Cart display */}
            <div style={{ position: "relative" }}>
              <span
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
                onClick={() => setIsCartOpen((prev) => !prev)}
              >
                CART ({cartCount})
              </span>

              {isCartOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "150%",
                    minWidth: "260px",
                    maxWidth: "320px",
                    background: "rgba(0,0,0,0.9)",
                    borderRadius: "12px",
                    padding: "1rem",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    zIndex: 1200,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        opacity: 0.7,
                      }}
                    >
                      {t("nav_cart") || "Cart"}
                    </span>
                    {cart.length > 0 && (
                      <button
                        onClick={() => clearCart()}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "0.7rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          cursor: "pointer",
                        }}
                      >
                        {t("cart_clear") || "Clear"}
                      </button>
                    )}
                  </div>

                  {cart.length === 0 ? (
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {t("cart_empty") || "Your cart is empty."}
                    </div>
                  ) : (
                    <>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.75rem",
                          maxHeight: "220px",
                          overflowY: "auto",
                          marginBottom: "0.75rem",
                        }}
                      >
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: "0.75rem",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.2rem",
                                maxWidth: "70%",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "0.8rem",
                                  fontWeight: 500,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {item.name}
                              </span>
                              <span
                                style={{
                                  fontSize: "0.75rem",
                                  opacity: 0.7,
                                }}
                              >
                                x{item.quantity}
                              </span>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              style={{
                                background: "transparent",
                                border: "none",
                                color: "rgba(255,255,255,0.6)",
                                fontSize: "0.75rem",
                                cursor: "pointer",
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          setIsCartOpen(false);
                          navigate("/cart");
                        }}
                        style={{
                          width: "100%",
                          padding: "0.6rem 1rem",
                          borderRadius: "999px",
                          border: "none",
                          background: "#ffffff",
                          color: "#000000",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          cursor: "pointer",
                        }}
                      >
                        {t("nav_view_cart") || "View cart"}
                      </button>
                    </>
                  )}
                </div>
              )}
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
