import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import Reveal, { StaggerContainer, StaggerItem } from '../components/Reveal';
import { getAssetProducts } from '../data/assetsProducts';

function ProductCard({ product }) {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    if (qty > 0) addToCart(product, qty);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '16px',
      padding: '1.5rem',
      border: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{
        aspectRatio: '1/1',
        borderRadius: '12px',
        background: 'rgba(0,0,0,0.2)',
        marginBottom: '1.5rem',
        overflow: 'hidden'
      }}>
        <Link to={`/shop/${encodeURIComponent(product.id)}`}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1rem' }}
          />
        </Link>
      </div>

      <Link to={`/shop/${encodeURIComponent(product.id)}`} style={{ textDecoration: 'none' }}>
        <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>
          {language === 'vi' ? product.name_vi : product.name}
        </h3>
      </Link>

      <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase' }}>
        {language === 'vi' ? product.category_vi : product.category}
      </span>

      <div style={{ marginTop: 'auto', display: 'flex', gap: '0.8rem' }}>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => {
            const v = parseInt(e.target.value);
            setQty(isNaN(v) || v < 1 ? 1 : v);
          }}
          style={{
            width: '60px',
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            borderRadius: '50px',
            color: 'white',
            textAlign: 'center'
          }}
        />

        <button
          onClick={handleAddToCart}
          style={{
            flex: 1,
            padding: '0.75rem 0',
            borderRadius: '50px',
            border: 'none',
            background: 'white',
            color: 'black',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {t('add_to_cart')}
        </button>
      </div>
    </div>
  );
}

export default function Shop() {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const products = useMemo(() => getAssetProducts(), []);

  const selectedCategory =
    (searchParams.get('category') || 'all').toLowerCase();

  const searchQuery =
    (searchParams.get('search') || '').toLowerCase();

  const currentPageRaw = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = Number.isFinite(currentPageRaw) && currentPageRaw > 0 ? currentPageRaw : 1;
  const itemsPerPage = 12;

  const categoryKeys = useMemo(
    () => ['all', ...new Set(products.map((p) => p.categoryKey))],
    [products]
  );

  const getCategoryLabel = (key) => {
    if (key === 'all') return t('cat_all');
    const sample = products.find((p) => p.categoryKey === key);
    if (!sample) return key.toUpperCase();
    return language === 'vi' ? sample.category_vi : sample.category;
  };

  const filteredProducts = useMemo(() => {
    const normalize = (s) =>
      String(s || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    const inKeys = categoryKeys.includes(selectedCategory);
    let base = products;

    if (inKeys && selectedCategory !== 'all') {
      base = base.filter((p) => p.categoryKey === selectedCategory);
    }

    const q = (searchQuery || (!inKeys && selectedCategory !== 'all' ? selectedCategory : '')).trim();
    if (q) {
      const nq = normalize(q);
      base = base.filter((p) => normalize(language === 'vi' ? p.name_vi : p.name).includes(nq));
    }

    return base;
  }, [products, selectedCategory, searchQuery, language, categoryKeys]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);

  const paginated = filteredProducts.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  const updateCategory = (key) => {
    const p = new URLSearchParams(searchParams);
    if (key === 'all') p.delete('category');
    else p.set('category', key);
    p.delete('search');
    p.set('page', '1');
    setSearchParams(p);
  };

  const updateSearch = (value) => {
    const p = new URLSearchParams(searchParams);
    if (!value) p.delete('search');
    else p.set('search', value);
    p.set('page', '1');
    setSearchParams(p);
  };

  const updatePage = (page) => {
    const p = new URLSearchParams(searchParams);
    const maxPage = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
    const next = Math.max(1, Math.min(page, maxPage));
    p.set('page', String(next));
    setSearchParams(p);
  };

  return (
    <div className="container section" style={{ marginTop: '40px' }}>
      <Reveal width="100%">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '4rem', color: '#fff' }}>
            {t('shop_title')}
          </h1>
        </div>
      </Reveal>

      <div className="shop-grid">
        <aside>
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={searchQuery}
            onChange={(e) => updateSearch(e.target.value)}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid #333',
              padding: '1rem 0',
              color: 'white',
              marginBottom: '2rem'
            }}
          />

          <h3 style={{ color: '#666', marginBottom: '1rem' }}>
            {t('categories')}
          </h3>

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {categoryKeys.map((key) => (
              <li key={key}>
                <button
                  onClick={() => updateCategory(key)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: selectedCategory === key ? 'white' : '#666',
                    fontWeight: selectedCategory === key ? 'bold' : 'normal',
                    cursor: 'pointer',
                    padding: '6px 0'
                  }}
                >
                  {getCategoryLabel(key)}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div>
          {paginated.length === 0 ? (
            <div style={{ padding: '4rem', color: '#666' }}>
              <h3>{t('no_results')}</h3>
            </div>
          ) : (
            <StaggerContainer
              key={`${selectedCategory}-${searchQuery}-${safePage}`}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem'
              }}
            >
              {
              paginated.map(product => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => updatePage(currentPage - 1)}
            disabled={currentPage <= 1}
            style={{
              padding: '0.5rem 0.8rem',
              borderRadius: '8px',
              border: '1px solid #333',
              background: 'transparent',
              color: currentPage <= 1 ? '#555' : '#ccc',
              cursor: currentPage <= 1 ? 'not-allowed' : 'pointer'
            }}
          >
            {t('prev') || 'Prev'}
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => updatePage(p)}
              style={{
                minWidth: '36px',
                padding: '0.5rem 0.8rem',
                borderRadius: '8px',
                border: '1px solid #333',
                background: p === currentPage ? 'white' : 'transparent',
                color: p === currentPage ? 'black' : '#ccc',
                cursor: 'pointer'
              }}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => updatePage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            style={{
              padding: '0.5rem 0.8rem',
              borderRadius: '8px',
              border: '1px solid #333',
              background: 'transparent',
              color: currentPage >= totalPages ? '#555' : '#ccc',
              cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer'
            }}
          >
            {t('next') || 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
