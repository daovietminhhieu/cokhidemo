import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

/**
 * FeaturedProductPopup Component
 * Display highlight/featured products in a centered modal popup with viral design
 */
const FeaturedProductPopup = ({ isOpen, onClose, products = [], onDontShowAgain }) => {
  const { addToCart } = useCart();
  const { language } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDontShowAgain = () => {
    localStorage.setItem('hideFeaturedPopup', new Date().toDateString());
    if (onDontShowAgain) {
      onDontShowAgain();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - Click to close */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: isOpen ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0)',
          backdropFilter: isOpen ? 'blur(10px)' : 'blur(0px)',
          zIndex: 999,
          opacity: isOpen ? 1 : 0,
          transition: 'all 0.4s ease-in-out',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: isOpen ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.85)',
          zIndex: 1000,
          opacity: isOpen ? 1 : 0,
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          width: '90%',
          maxWidth: '950px',
          maxHeight: '90vh',
          overflow: 'auto',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        {/* Modal Content */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(15,15,35,0.95) 0%, rgba(25,25,60,0.95) 50%, rgba(15,20,40,0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(144, 238, 144, 0.3)',
            borderRadius: isMobile ? '16px' : '24px',
            padding: isMobile ? '1.5rem 1rem' : '3rem',
            boxShadow: '0 25px 60px rgba(144, 238, 144, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
            animation: isOpen ? 'popupSlideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
            position: 'relative',
            overflow: 'hidden',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background glow effect */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(144, 238, 144, 0.15) 0%, rgba(144, 238, 144, 0) 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
              animation: 'float 6s ease-in-out infinite',
            }}
          />
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: isMobile ? '1.5rem' : '2.5rem',
              borderBottom: '2px solid rgba(144, 238, 144, 0.2)',
              paddingBottom: isMobile ? '1rem' : '1.5rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: isMobile ? '1.25rem' : '2.5rem',
                  color: 'white',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #90ee90 0%, #fff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                ✨ Sản Phẩm Nổi Bật
              </h2>
              <p
                style={{
                  fontSize: isMobile ? '0.75rem' : '0.9rem',
                  color: 'rgba(144, 238, 144, 0.7)',
                  margin: '0.5rem 0 0 0',
                  letterSpacing: '0.05em',
                }}
              >
                Những sản phẩm hot nhất ngày hôm nay
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Đóng bảng tin"
              style={{
                background: 'rgba(255, 107, 107, 0.15)',
                border: '2px solid rgba(255, 107, 107, 0.3)',
                color: 'white',
                width: isMobile ? '35px' : '45px',
                height: isMobile ? '35px' : '45px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                transition: 'all 0.3s ease',
                flexShrink: 0,
                fontWeight: 'bold',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 107, 107, 0.3)';
                e.target.style.borderColor = 'rgba(255, 107, 107, 0.8)';
                e.target.style.transform = 'rotate(90deg) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 107, 107, 0.15)';
                e.target.style.borderColor = 'rgba(255, 107, 107, 0.3)';
                e.target.style.transform = 'rotate(0deg) scale(1)';
              }}
            >
              ✕
            </button>
          </div>

          {/* Products Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: isMobile ? '0.75rem' : '1.8rem',
              marginBottom: isMobile ? '1rem' : '2rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                style={{
                  background: hoveredCard === product.id 
                    ? 'rgba(144, 238, 144, 0.12)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: hoveredCard === product.id 
                    ? '2px solid rgba(144, 238, 144, 0.5)' 
                    : '2px solid rgba(144, 238, 144, 0.2)',
                  borderRadius: isMobile ? '12px' : '16px',
                  padding: isMobile ? '0.75rem' : '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: (!isMobile && hoveredCard === product.id) ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
                  animation: `cardSlideIn 0.6s ease-out ${index * 0.1}s backwards`,
                }}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card glow background */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: hoveredCard === product.id 
                      ? 'linear-gradient(135deg, rgba(144, 238, 144, 0.1) 0%, transparent 100%)' 
                      : 'transparent',
                    transition: 'all 0.4s ease',
                    pointerEvents: 'none',
                  }}
                />

                {/* Trending Badge */}
                {index === 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.9), rgba(255, 150, 150, 0.7))',
                      color: 'white',
                      padding: '0.5rem 0.9rem',
                      fontSize: '0.75rem',
                      borderRadius: '20px',
                      fontWeight: '700',
                      zIndex: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      letterSpacing: '0.05em',
                      boxShadow: '0 4px 12px rgba(255, 107, 107, 0.4)',
                    }}
                  >
                    🔥 HOT
                  </div>
                )}

                {/* Discount Badge */}
                {product.discount && (
                  <div
                    style={{
                      position: 'absolute',
                      top: index === 0 ? (isMobile ? '35px' : '50px') : '12px',
                      right: '12px',
                      background: 'rgba(76, 175, 80, 0.9)',
                      color: 'white',
                      padding: isMobile ? '0.2rem 0.5rem' : '0.4rem 0.8rem',
                      fontSize: isMobile ? '0.65rem' : '0.8rem',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      zIndex: 2,
                    }}
                  >
                    -{product.discount}%
                  </div>
                )}

                {/* Product Image */}
                {product.image && (
                  <div
                    style={{
                      width: '100%',
                      height: isMobile ? '100px' : '160px',
                      background: 'rgba(100, 100, 150, 0.15)',
                      borderRadius: '12px',
                      marginBottom: isMobile ? '0.75rem' : '1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        objectPosition: 'center',
                        padding: '0.5rem',
                        transition: 'transform 0.4s ease',
                        transform: hoveredCard === product.id ? 'scale(1.1)' : 'scale(1)',
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<div style="font-size: ${isMobile ? '2rem' : '3.5rem'};">📦</div>`;
                      }}
                    />
                  </div>
                )}

                {/* Product Name */}
                <h3
                  style={{
                    fontSize: isMobile ? '0.85rem' : '1.1rem',
                    color: 'white',
                    margin: isMobile ? '0 0 0.5rem 0' : '0 0 0.75rem 0',
                    fontWeight: 700,
                    lineHeight: 1.3,
                    position: 'relative',
                    zIndex: 1,
                    height: isMobile ? '2.2rem' : 'auto',
                    overflow: 'hidden'
                  }}
                >
                  {language === 'vi' ? (product.name_vi || product.name) : product.name}
                </h3>

                {/* Price */}
                <p
                  style={{
                    fontSize: isMobile ? '1.1rem' : '1.4rem',
                    background: 'linear-gradient(135deg, #90ee90, #ffeb3b)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: 'bold',
                    margin: isMobile ? '0 0 0.5rem 0' : '0 0 0.75rem 0',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {product.price.toLocaleString()} <span style={{fontSize: isMobile ? '0.65rem' : '0.75rem'}}>VND</span>
                </p>

                {/* Category */}
                <p
                  style={{
                    fontSize: isMobile ? '0.75rem' : '0.85rem',
                    color: 'rgba(144, 238, 144, 0.7)',
                    margin: isMobile ? '0 0 0.75rem 0' : '0 0 1.2rem 0',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {language === 'vi' ? (product.category_vi || product.category) : product.category}
                </p>

                {/* Add to Cart Button */}
                <button
                  onClick={() => {
                    addToCart(product);
                    setSelectedProduct(product.id);
                    setTimeout(() => setSelectedProduct(null), 600);
                  }}
                  style={{
                    width: '100%',
                    padding: isMobile ? '0.6rem' : '0.9rem',
                    background: selectedProduct === product.id
                      ? 'linear-gradient(135deg, #90ee90 0%, #76d776 100%)'
                      : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,245,245,0.9) 100%)',
                    color: selectedProduct === product.id ? 'white' : '#000',
                    border: 'none',
                    borderRadius: isMobile ? '8px' : '10px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: isMobile ? '0.8rem' : '0.95rem',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    position: 'relative',
                    zIndex: 1,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    boxShadow: hoveredCard === product.id ? '0 8px 20px rgba(255,255,255,0.2)' : '0 4px 12px rgba(0,0,0,0.2)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile && selectedProduct !== product.id) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 12px 24px rgba(255,255,255,0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile && selectedProduct !== product.id) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                    }
                  }}
                >
                  {selectedProduct === product.id ? (isMobile ? '✓' : '✓ Đã Thêm') : (isMobile ? '🛒' : '🛒 Thêm Vào Giỏ')}
                </button>
              </div>
            ))}
          </div>

          {/* Footer Info */}
          <div
            style={{
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: isMobile ? '0.85rem' : '0.95rem',
              borderTop: '2px solid rgba(144, 238, 144, 0.2)',
              paddingTop: isMobile ? '1.5rem' : '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: isMobile ? '1rem' : '1.2rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <p style={{ margin: 0, fontWeight: 500 }}>
              🎉 <span style={{color: 'rgba(144, 238, 144, 0.9)'}}>Sản phẩm chất lượng cao</span> giá tốt nhất <br/>
              {!isMobile && <span>🚚 Miễn phí vận chuyển từ 500.000 VND | ✨ Hỗ trợ 24/7</span>}
            </p>
            <button
              onClick={handleDontShowAgain}
              aria-label="Không hiển thị lại bảng tin này hôm nay"
              style={{
                padding: isMobile ? '0.5rem 1rem' : '0.65rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                color: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: isMobile ? '0.75rem' : '0.85rem',
                transition: 'all 0.3s ease',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                e.target.style.color = 'rgba(255, 255, 255, 0.9)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.color = 'rgba(255, 255, 255, 0.7)';
              }}
            >
              ✕ Không hiển thị hôm nay
            </button>
          </div>
        </div>
      </div>

      {/* Add animation styles */}
      <style>{`
        @keyframes popupSlideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8) rotateX(10deg);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotateX(0deg);
          }
        }

        @keyframes cardSlideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0px, 0px);
          }
          50% {
            transform: translate(30px, -30px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(40px, -40px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(144, 238, 144, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(144, 238, 144, 0);
          }
        }
      `}</style>
    </>
  );
};

export default FeaturedProductPopup;
