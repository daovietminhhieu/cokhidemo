import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { getAssetProducts } from '../data/assetsProducts';

export default function ProductDetail() {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const { productId } = useParams();
  const [qty, setQty] = useState(1);

  const products = useMemo(() => getAssetProducts(), []);
  const decodedId = useMemo(() => {
    if (!productId) return '';
    try {
      return decodeURIComponent(productId);
    } catch {
      return productId;
    }
  }, [productId]);

  const product = useMemo(
    () => products.find((p) => p.id === decodedId),
    [products, decodedId]
  );

  const handleAddToCart = () => {
    if (!product) return;
    if (qty < 1) return;
    addToCart(product, parseInt(qty));
  };

  if (!product) {
    return (
      <div className="container section" style={{ marginTop: '80px', minHeight: '70vh' }}>
        <Reveal width="100%">
          <h1 style={{ color: '#fff', marginBottom: '1rem' }}>{t('not_found_title')}</h1>
        </Reveal>
        <p style={{ color: '#999', marginBottom: '2rem' }}>{t('not_found_message')}</p>
        <Link to="/shop" style={{ color: '#fff', textDecoration: 'underline' }}>
          ← {t('back_to_shop')}
        </Link>
      </div>
    );
  }

  const displayName = language === 'vi' ? product.name_vi : product.name;
  const displayCategory = language === 'vi' ? product.category_vi : product.category;

  return (
    <div className="container section" style={{ marginTop: '60px', minHeight: '80vh' }}>
      <Reveal width="100%">
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/shop" style={{ color: '#aaa', textDecoration: 'none' }}>
            ← {t('nav_products') || 'Shop'}
          </Link>
        </div>
      </Reveal>

      <div className="product-detail-grid">
        <Reveal width="100%">
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', overflow: 'hidden' }}>
            <div style={{ aspectRatio: '1/1', background: 'rgba(0,0,0,0.25)', display: 'grid', placeItems: 'center' }}>
              <img
                src={product.image}
                alt={displayName}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2rem' }}
              />
            </div>
          </div>
        </Reveal>

        <Reveal width="100%">
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#777', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>
                {displayCategory}
              </div>
              <h1 style={{ color: '#fff', fontSize: '2.2rem', margin: '0.4rem 0 0' }}>
                {displayName}
              </h1>
            </div>

            <div style={{ color: '#999', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              {language === 'vi' ? product.description_vi : product.description}
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '1.2rem' }}>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(parseInt(e.target.value) || 1)}
                style={{
                  width: '90px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '50px',
                  color: 'white',
                  padding: '0.85rem 0',
                  textAlign: 'center',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />

              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  padding: '0.9rem 0',
                  borderRadius: '50px',
                  border: 'none',
                  background: 'white',
                  color: 'black',
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                }}
              >
                {t('add_to_cart')}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <Link
                to="/contact"
                state={{
                  productId: product.id,
                  productName: displayName,
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.9rem 1.4rem',
                  borderRadius: '50px',
                  border: '1px solid rgba(255,255,255,0.6)',
                  color: '#fff',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                  letterSpacing: '1px',
                }}
              >
                {t('contact_cta')}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

