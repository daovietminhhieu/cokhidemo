import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import Reveal from '../components/Reveal';

export default function CartPage() {
  const { cart, cartCount, removeFromCart, clearCart } = useCart();
  const { t, language } = useLanguage();

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  return (
    <div className="container section" style={{ marginTop: '80px', marginBottom: '80px' }} key={language}>
      <Reveal width="100%">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem' }}>
          <h1
            style={{
              fontSize: '3rem',
              textTransform: 'uppercase',
              lineHeight: 1.2,
              margin: 0,
              color: '#ffffff',
            }}
          >
            {t('cart_title') || 'Your Cart'}
          </h1>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              style={{
                padding: '0.8rem 1.8rem',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.3)',
                background: 'transparent',
                color: '#fff',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
              }}
            >
              {t('cart_clear') || 'Clear cart'}
            </button>
          )}
        </div>
      </Reveal>

      {cart.length === 0 ? (
        <div
          style={{
            padding: '4rem 2rem',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.02)',
            textAlign: 'center',
            color: '#888',
          }}
        >
          <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>
            {t('cart_empty') || 'Your cart is currently empty.'}
          </p>
          <Link
            to="/shop"
            style={{
              display: 'inline-block',
              padding: '0.9rem 2.2rem',
              borderRadius: '999px',
              border: 'none',
              background: '#ffffff',
              color: '#000000',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {t('cart_back_to_shop') || 'Back to shop'}
          </Link>
        </div>
      ) : (
        <div className="cart-grid">
          {/* Items list */}
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
              padding: '1.5rem',
            }}
          >
            <div className="cart-header">
              <span>{t('cart_column_product') || 'Product'}</span>
              <span>{t('cart_column_qty') || 'Qty'}</span>
              <span>{t('cart_column_price') || 'Price'}</span>
              <span />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div>
                    <div
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        color: '#fff',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {language === 'vi' ? item.name_vi || item.name : item.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#777' }}>
                      {language === 'vi' ? item.category_vi || item.category : item.category}
                    </div>
                  </div>

                  <div style={{ fontSize: '0.9rem', color: '#fff' }}>x{item.quantity}</div>

                  <div style={{ fontSize: '0.9rem', color: '#fff' }}>
                    ${item.price || 0}
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
              padding: '1.5rem',
            }}
          >
            <h2
              style={{
                fontSize: '1.1rem',
                margin: 0,
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#fff',
              }}
            >
              {t('cart_summary') || 'Summary'}
            </h2>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.8rem',
                fontSize: '0.9rem',
                color: '#aaa',
              }}
            >
              <span>{t('cart_items') || 'Items'}</span>
              <span>{cartCount}</span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '1.2rem',
                paddingTop: '1.2rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#fff',
              }}
            >
              <span>{t('cart_total') || 'Total'}</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              disabled
              style={{
                marginTop: '1.8rem',
                width: '100%',
                padding: '0.9rem 1.5rem',
                borderRadius: '999px',
                border: 'none',
                background: 'rgba(255,255,255,0.2)',
                color: '#000',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'not-allowed',
              }}
            >
              {t('cart_checkout_soon') || 'Checkout coming soon'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

