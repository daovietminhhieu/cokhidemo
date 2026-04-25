import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import Reveal, { StaggerContainer, StaggerItem } from '../components/Reveal';
import { SeoTags } from '../seo/SeoTags';
import { getItems } from '../services/api';

function ProductCard({ product }) {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    if (qty > 0) addToCart(product, qty);
  };

  const displayName = language === 'vi' ? (product.name_vi || product.name) : product.name;
  const displayCategory = language === 'vi' ? (product.category_vi || product.category) : product.category;

  return (
    <div className="product-card-glass">
      <div className="image-container">
        <Link to={`/shop/${encodeURIComponent(product.id)}`} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={product.image}
            alt={displayName}
            loading="lazy"
          />
        </Link>
      </div>

      <div className="category-tag">
        {displayCategory}
      </div>

      <Link to={`/shop/${encodeURIComponent(product.id)}`} style={{ textDecoration: 'none' }}>
        <h3>{displayName}</h3>
      </Link>

      <div className="card-footer">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="qty-control">
            <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
            <input
              type="number"
              className="qty-input"
              value={qty}
              onChange={(e) => {
                const v = parseInt(e.target.value);
                setQty(isNaN(v) || v < 1 ? 1 : v);
              }}
            />
            <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
          </div>
          {product.price > 0 && (
            <span style={{ color: '#fff', fontWeight: 'bold' }}>
              {product.price.toLocaleString()}đ
            </span>
          )}
        </div>

        <button className="add-btn" onClick={handleAddToCart}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          {t('add_to_cart')}
        </button>
      </div>
    </div>
  );
}

export default function Shop() {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getItems();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const selectedCategory = (searchParams.get('category') || 'all').toLowerCase();
  const searchQuery = (searchParams.get('search') || '').toLowerCase();
  const [inputValue, setInputValue] = useState(searchQuery);

  const currentPageRaw = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = Number.isFinite(currentPageRaw) && currentPageRaw > 0 ? currentPageRaw : 1;
  const itemsPerPage = 12;

  // Sync input with URL search query (e.g. when clearing search or back/forward)
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const categoryKeys = useMemo(
    () => ['all', ...new Set(products.map((p) => (p.categoryKey || p.category || 'misc').toLowerCase()))],
    [products]
  );

  const getCategoryLabel = (key) => {
    if (key === 'all') return t('cat_all');
    const sample = products.find((p) => (p.categoryKey || p.category || 'misc').toLowerCase() === key);
    if (!sample) return key.toUpperCase();
    return language === 'vi' ? (sample.category_vi || sample.category) : sample.category;
  };

  const suggestions = useMemo(() => {
    if (!inputValue.trim()) return [];
    
    const normalize = (s) =>
      String(s || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    const q = normalize(inputValue);

    return products
      .map(p => {
        const name = language === 'vi' ? (p.name_vi || p.name) : p.name;
        const cat = language === 'vi' ? (p.category_vi || p.category) : p.category;
        const normName = normalize(name);
        const normCat = normalize(cat);
        const normAll = normalize(JSON.stringify(p));

        let score = 0;
        if (normName.includes(q)) score += 100; // Priority 1: Name
        if (normCat.includes(q)) score += 50;   // Priority 2: Category
        if (normAll.includes(q) && score === 0) score += 10; // Priority 3: Other chars

        return { ...p, score, displayName: name };
      })
      .filter(p => p.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6); // Show top 6 suggestions
  }, [products, inputValue, language]);

  const filteredProducts = useMemo(() => {
    const normalize = (s) =>
      String(s || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    const inKeys = categoryKeys.includes(selectedCategory);
    let base = products;

    if (inKeys && selectedCategory !== 'all') {
      base = base.filter((p) => (p.categoryKey || p.category || 'misc').toLowerCase() === selectedCategory);
    }

    const q = (searchQuery || (!inKeys && selectedCategory !== 'all' ? selectedCategory : '')).trim();
    if (q) {
      const nq = normalize(q);
      base = base.filter((p) => {
        const name = language === 'vi' ? (p.name_vi || p.name) : p.name;
        return normalize(name).includes(nq);
      });
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

  // Pagination helper logic
  const getPaginationRange = () => {
    const delta = isMobile ? 1 : 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    range.push(1);
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i < totalPages && i > 1) {
        range.push(i);
      }
    }
    if (totalPages > 1) range.push(totalPages);

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  return (
    <div className="container section" style={{ marginTop: '40px' }}>
      <SeoTags
        title={t('shop_title')}
        description={t('seo_shop_desc') || 'Tìm kiếm và lọc hàng nghìn sản phẩm cơ khí, inox, ốc vít và vật liệu xây dựng.'}
      />
      <Reveal width="100%">
        <div className="shop-header" style={{ textAlign: isMobile ? 'left' : 'center', marginBottom: isMobile ? '2rem' : '4rem' }}>
          <h1 className="shop-title" style={{ fontSize: isMobile ? '2.5rem' : '4rem', color: '#fff' }}>
            {t('shop_title')}
          </h1>
        </div>
      </Reveal>

      <div className="shop-grid">
        <aside className="shop-sidebar">
          <div className="shop-sidebar-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            {t('search_placeholder')}
          </div>
          
          <div className="search-container" ref={searchContainerRef}>
            <input
              type="text"
              placeholder={t('search_placeholder')}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateSearch(inputValue);
                  setShowSuggestions(false);
                }
              }}
              onFocus={() => setShowSuggestions(true)}
              className="shop-search-input"
            />
            
            {showSuggestions && suggestions.length > 0 && (
              <div className="search-suggestions">
                {suggestions.map((item) => (
                  <div 
                    key={item.id} 
                    className="suggestion-item"
                    onClick={() => {
                      setInputValue(item.displayName);
                      updateSearch(item.displayName);
                      setShowSuggestions(false);
                    }}
                  >
                    <img src={item.image} alt="" className="suggestion-img" />
                    <div className="suggestion-info">
                      <p className="suggestion-name">{item.displayName}</p>
                      <p className="suggestion-cat">{language === 'vi' ? (item.category_vi || item.category) : item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="shop-sidebar-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
            {t('categories')}
          </div>

          <ul className="category-list">
            {categoryKeys.map((key) => (
              <li key={key} className="category-item">
                <button
                  onClick={() => updateCategory(key)}
                  className={selectedCategory === key ? 'active' : ''}
                >
                  {getCategoryLabel(key)}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div>
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ height: '400px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', animation: 'pulse 1.5s infinite' }} />
              ))}
            </div>
          ) : paginated.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#666' }}>
              <h3>{t('no_results')}</h3>
            </div>
          ) : (
            <StaggerContainer
              key={`${selectedCategory}-${searchQuery}-${safePage}-${isMobile}`}
              className={isMobile ? "product-grid-mobile" : ""}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: isMobile ? '0.75rem' : '2rem'
              }}
            >
              {paginated.map(product => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}

          {/* New Modern Pagination */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <button
                className="pagination-btn"
                onClick={() => updatePage(1)}
                disabled={currentPage === 1}
              >
                Đầu
              </button>
              <button
                className="pagination-btn"
                onClick={() => updatePage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>

              {getPaginationRange().map((p, i) => (
                p === '...' ? (
                  <span key={`dots-${i}`} className="pagination-ellipsis">...</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => updatePage(p)}
                    className={`pagination-btn ${p === currentPage ? 'active' : ''}`}
                  >
                    {p}
                  </button>
                )
              ))}

              <button
                className="pagination-btn"
                onClick={() => updatePage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
              <button
                className="pagination-btn"
                onClick={() => updatePage(totalPages)}
                disabled={currentPage === totalPages}
              >
                Cuối
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
