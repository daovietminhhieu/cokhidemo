import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
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
        height: isAdmin ? "70px" : "auto",
        padding: isAdmin ? "12px 0" : (scrolled ? "15px 0" : "25px 0"),
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 1000,
        background: isAdmin
          ? "#0f172a"
          : (scrolled || overlayActive ? "rgba(15,15,15,0.85)" : "transparent"),
        backdropFilter: scrolled || overlayActive ? "blur(12px)" : "none",
        borderBottom: isAdmin
          ? "1px solid rgba(255,255,255,0.1)"
          : (scrolled ? "1px solid rgba(255,255,255,0.08)" : "transparent"),
        color: "#ffffff",
        boxShadow: isAdmin ? "0 10px 30px -10px rgba(0,0,0,0.5)" : "none",
        display: "flex",
        alignItems: "center"
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
        className="navbar-content"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "100%",
          padding: "0 5%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <span
              style={{
                fontFamily: "'Audiowide', sans-serif",
                fontSize: "1.4rem",
                fontWeight: 900,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                lineHeight: 1,
                color: "#fff",
                textShadow: "0 0 10px rgba(255,165,0,0.3)"
              }}
            >
              inoxdiepduong
            </span>
          </Link>
        </div>

        {/* <div className="nav-audio-desktop" style={{ flex: 0, display: "flex", justifyContent: "center" }}>
          <AudioButton size={35} />
        </div> */}

        <div
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          role="button"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`nav-links ${isMenuOpen ? "active" : ""}`} style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
          <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
            <Link
              to="/shop"
              className={location.pathname === "/shop" ? "active-link" : ""}
              aria-label="Xem cửa hàng sản phẩm"
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: location.pathname === "/shop" ? "#FFA500" : (isAdmin ? "#f8fafc" : "inherit"),
                opacity: isAdmin ? 0.9 : 1,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFA500")}
              onMouseLeave={(e) => (e.currentTarget.style.color = location.pathname === "/shop" ? "#FFA500" : (isAdmin ? "#f8fafc" : "inherit"))}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav_products")}
            </Link>
            <Link
              to="/contact"
              className={location.pathname === "/contact" ? "active-link" : ""}
              aria-label="Liên hệ với chúng tôi"
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: location.pathname === "/contact" ? "#FFA500" : (isAdmin ? "#f8fafc" : "inherit"),
                opacity: isAdmin ? 0.9 : 1,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFA500")}
              onMouseLeave={(e) => (e.currentTarget.style.color = location.pathname === "/contact" ? "#FFA500" : (isAdmin ? "#f8fafc" : "inherit"))}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav_contact")}
            </Link>
            <Link
              to="/about"
              className={location.pathname === "/about" ? "active-link" : ""}
              aria-label="Về chúng tôi"
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: location.pathname === "/about" ? "#FFA500" : (isAdmin ? "#f8fafc" : "inherit"),
                opacity: isAdmin ? 0.9 : 1,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFA500")}
              onMouseLeave={(e) => (e.currentTarget.style.color = location.pathname === "/about" ? "#FFA500" : (isAdmin ? "#f8fafc" : "inherit"))}
              onClick={() => setIsMenuOpen(false)}
            >
              Về chúng tôi
            </Link>

            {/* Cart display */}
            <div style={{ position: "relative" }}>
              <span
                className={location.pathname === "/cart" ? "active-link" : ""}
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  color: location.pathname === "/cart" ? "#FFA500" : "#FFA500", // Keep yellow for cart toggle button or change to active
                }}
                onClick={() => setIsCartOpen((prev) => !prev)}
                role="button"
                aria-label={`Open cart, ${cartCount} items`}
              >
                Giỏ hàng ({cartCount})
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
                        letterSpacing: "0.15em",
                        color: "#FFA500",
                        fontWeight: "bold",
                      }}
                    >
                      Giỏ hàng
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
                          transition: "color 0.3s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#FFA500")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                      >
                        Xóa tất cả
                      </button>
                    )}
                  </div>

                  {cart.length === 0 ? (
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "rgba(255,255,255,0.6)",
                        textAlign: "center",
                        padding: "1rem 0",
                      }}
                    >
                      Giỏ hàng trống
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
                          paddingRight: "5px",
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
                              borderBottom: "1px solid rgba(255,165,0,0.1)",
                              paddingBottom: "0.5rem",
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
                                  fontSize: "0.85rem",
                                  fontWeight: 600,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  color: "#fff",
                                }}
                              >
                                {item.name}
                              </span>
                              <span
                                style={{
                                  fontSize: "0.75rem",
                                  color: "#FFA500",
                                  opacity: 0.9,
                                }}
                              >
                                {item.quantity} x {item.price?.toLocaleString()}đ
                              </span>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              style={{
                                background: "transparent",
                                border: "none",
                                color: "rgba(255,255,255,0.4)",
                                fontSize: "0.75rem",
                                cursor: "pointer",
                                transition: "color 0.3s ease",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = "#ff4d4d")}
                              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          setIsCartOpen(false);
                          setIsMenuOpen(false); // Đóng menu mobile khi chuyển sang thanh toán
                          navigate("/cart");
                        }}
                        style={{
                          width: "100%",
                          padding: "0.8rem 1rem",
                          borderRadius: "4px",
                          border: "1px solid #FFA500",
                          background: "transparent",
                          color: "#FFA500",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          marginTop: "0.5rem",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#FFA500";
                          e.currentTarget.style.color = "#000";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "#FFA500";
                        }}
                      >
                        Thanh toán
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
                  className={location.pathname === "/admin" ? "active-link" : ""}
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: location.pathname === "/admin" ? "#FFA500" : (isAdmin ? "#f8fafc" : "inherit"),
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFA500")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = location.pathname === "/admin" ? "#FFA500" : (isAdmin ? "#f8fafc" : "inherit"))}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav_admin")}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: isAdmin ? "#f8fafc" : "inherit",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFA500")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isAdmin ? "#f8fafc" : "inherit")}
                >
                  {t("nav_logout")}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={location.pathname === "/login" ? "active-link" : ""}
                onClick={() => setIsMenuOpen(false)}
                aria-label="Đăng nhập tài khoản"
              >
                <span
                  className={location.pathname === "/login" ? "active-link" : ""}
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: location.pathname === "/login" ? "#FFA500" : (isAdmin ? "#f8fafc" : "inherit"),
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFA500")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = location.pathname === "/login" ? "#FFA500" : (isAdmin ? "#f8fafc" : "inherit"))}
                >
                  {t("nav_login")}
                </span>
              </Link>
            )}
            {/* 
            <button
              onClick={() => {
                toggleLanguage();
                setIsMenuOpen(false);
              }}
              style={{ fontSize: "0.9rem", fontWeight: 500 }}
              aria-label={`Toggle language, current: ${language}`}
            >
              {language === "en" ? "EN" : "VI"}
            </button> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
