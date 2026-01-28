import React, { useState, useMemo, useEffect } from 'react';
// import { products } from '../data/products'; // REMOVED STATIC IMPORT
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import Reveal, { StaggerContainer, StaggerItem } from '../components/Reveal';

export default function Shop() {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);

  // Extract unique categories
  const categories = ['All', ...new Set(products.map(p => language === 'vi' ? p.category_vi : p.category))];

  // Filter products
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter(p => (language === 'vi' ? p.category_vi : p.category) === selectedCategory);
  }, [selectedCategory, language]);

  return (
    <div className="container section" style={{ marginTop: '80px' }}>
      <Reveal>
        <h1 style={{ marginBottom: '2rem' }}>{t('shop_title')}</h1>
      </Reveal>

      <div style={{ display: 'flex', gap: '3rem', flexDirection: 'row' }}>
        {/* Left Library/Sidebar */}
        <aside style={{ width: '250px', flexShrink: 0 }}>
          <div style={{ position: 'sticky', top: '100px', background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px' }}>
            <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '1rem' }}>{t('categories')}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {categories.map(cat => (
                <li key={cat} style={{ marginBottom: '0.5rem' }}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      background: selectedCategory === cat ? 'var(--primary)' : 'transparent',
                      color: selectedCategory === cat ? 'white' : 'var(--text-muted)',
                      padding: '10px',
                      borderRadius: '4px'
                    }}
                  >
                    {cat === 'All' ? t('cat_all') : cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Right Product Grid */}
        <div style={{ flex: 1 }}>
          <StaggerContainer className="grid">
            {filteredProducts.map((product) => (
              <StaggerItem key={product.id} className="card">
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {language === 'vi' ? product.category_vi : product.category}
                    </span>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>
                      {product.price.toLocaleString()} VND
                    </span>
                  </div>
                  <h3 style={{ marginBottom: '0.5rem' }}>{language === 'vi' ? product.name_vi : product.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    {language === 'vi' ? product.description_vi : product.description}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <button
                      onClick={() => addToCart(product)}
                      style={{ width: '100%', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' }}
                    >
                      {t('add_to_cart')}
                    </button>
                    <button
                      onClick={() => alert('Proceeding to checkout with: ' + product.name)}
                      style={{ width: '100%' }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </div>
  );
}
