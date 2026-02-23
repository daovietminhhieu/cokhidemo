import React, { useState } from 'react';
import ImageLoader from './ImageLoader';

/**
 * ProductShowcase Component
 * Ví dụ về sử dụng ImageLoader trong một component bán hàng
 * Hiển thị sản phẩm với gallery ảnh từ assets folder
 */
const ProductShowcase = ({ 
  product = {
    id: 1,
    name: 'Premium Hardware Kit',
    category: 'Tools',
    price: 99.99,
    images: ['plates-hr-plates.webp'], // Ảnh từ assets folder
    description: 'High-quality hardware tools for professional use'
  }
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      padding: '2rem',
      background: 'linear-gradient(135deg, rgba(10, 10, 20, 0.8), rgba(20, 20, 40, 0.8))',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      {/* Image Gallery */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        {/* Main Image */}
        <div style={{
          aspectRatio: '1/1',
          borderRadius: '16px',
          overflow: 'hidden',
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ImageLoader
            src={product.images[selectedImageIndex]}
            alt={`${product.name} - Image ${selectedImageIndex + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '1.5rem',
            }}
            lazy={true}
            placeholderColor="rgba(255,255,255,0.05)"
          />
        </div>

        {/* Thumbnail Gallery */}
        {product.images && product.images.length > 1 && (
          <div style={{
            display: 'flex',
            gap: '0.8rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
          }}>
            {product.images.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '8px',
                  border: selectedImageIndex === idx 
                    ? '2px solid rgba(100, 200, 255, 0.8)' 
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(0, 0, 0, 0.2)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
                onMouseOver={(e) => {
                  if (selectedImageIndex !== idx) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedImageIndex !== idx) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
              >
                <ImageLoader
                  src={image}
                  alt={`${product.name} - Thumbnail ${idx + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  lazy={true}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: '#fff',
      }}>
        <div>
          <span style={{
            fontSize: '0.85rem',
            color: '#888',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '0.5rem',
            display: 'block',
          }}>
            {product.category}
          </span>

          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            letterSpacing: '0.5px',
          }}>
            {product.name}
          </h2>

          <p style={{
            color: '#aaa',
            lineHeight: '1.6',
            marginBottom: '1.5rem',
          }}>
            {product.description}
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}>
            <span style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#00d4ff',
            }}>
              ${product.price}
            </span>
            <span style={{
              fontSize: '0.9rem',
              color: '#666',
            }}>
              VAT included
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
        }}>
          <button style={{
            flex: 1,
            padding: '0.8rem 1.5rem',
            background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '1rem',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 212, 255, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            Add to Cart
          </button>

          <button style={{
            padding: '0.8rem 1.5rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '1rem',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          }}
          >
            ❤️ Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
