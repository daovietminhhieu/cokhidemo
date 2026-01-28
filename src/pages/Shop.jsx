import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import Reveal, { StaggerContainer, StaggerItem } from '../components/Reveal';

export default function Shop() {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 12 looks good on 2, 3, 4 column grids

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortOption]);

  // Extract unique categories
  const categories = ['All', ...new Set(products.map(p => language === 'vi' ? p.category_vi : p.category))];

  // Filter and Sort products
  const filteredProducts = useMemo(() => {
    let result = products;

    // 1. Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(p => (language === 'vi' ? p.category_vi : p.category) === selectedCategory);
    }

    // 2. Filter by Search Query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p =>
        (language === 'vi' ? p.name_vi : p.name).toLowerCase().includes(lowerQuery)
      );
    }

    // 3. Sort
    result = [...result]; // Create a shallow copy to filter
    switch (sortOption) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name_asc':
        result.sort((a, b) => {
          const nameA = language === 'vi' ? a.name_vi : a.name;
          const nameB = language === 'vi' ? b.name_vi : b.name;
          return nameA.localeCompare(nameB);
        });
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortOption, products, language]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container section" style={{ marginTop: '80px' }}>
      <Reveal>
        <h1 style={{ marginBottom: '2rem' }}>{t('shop_title')}</h1>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* Controls Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          background: 'var(--bg-card)',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          {/* Search */}
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '0.8rem 1rem',
              borderRadius: '4px',
              border: '1px solid var(--secondary)',
              background: 'var(--bg-dark)',
              color: 'white',
              minWidth: '250px'
            }}
          />

          {/* Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>{t('sort_by')}:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              style={{
                padding: '0.8rem',
                borderRadius: '4px',
                border: '1px solid var(--secondary)',
                background: 'var(--bg-dark)',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="default">{t('sort_default')}</option>
              <option value="price_asc">{t('sort_price_asc')}</option>
              <option value="price_desc">{t('sort_price_desc')}</option>
              <option value="name_asc">{t('sort_name_asc')}</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
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
                        color: selectedCategory === cat ? 'var(--bg-dark)' : 'var(--text-muted)', /* Adjusted text color for contrast on active */
                        fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                        padding: '10px',
                        borderRadius: '4px',
                        transition: 'all 0.2s'
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
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                <h3>No products found.</h3>
              </div>
            ) : (
              <>
                <StaggerContainer className="grid">
                  {currentProducts.map((product) => (
                    <StaggerItem key={product.id} className="card">
                      <div style={{ height: '160px', overflow: 'hidden' }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {language === 'vi' ? product.category_vi : product.category}
                          </span>
                          <span style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '0.9rem' }}>
                            {product.price.toLocaleString()} VND
                          </span>
                        </div>
                        <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>{language === 'vi' ? product.name_vi : product.name}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {language === 'vi' ? product.description_vi : product.description}
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                          <button
                            onClick={() => addToCart(product)}
                            style={{ width: '100%', background: 'transparent', border: '1px solid var(--secondary)', color: 'var(--text-light)', padding: '0.5rem', fontSize: '0.8rem' }}
                            onMouseEnter={(e) => { e.target.style.background = 'var(--secondary)'; e.target.style.color = 'white'; }}
                            onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--text-light)'; }}
                          >
                            {t('add_to_cart')}
                          </button>
                          <button
                            onClick={() => alert('Proceeding to checkout with: ' + product.name)}
                            style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem' }}
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem' }}>
                    <button
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--secondary)',
                        color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-light)',
                        opacity: currentPage === 1 ? 0.5 : 1,
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      &lt;
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        style={{
                          background: currentPage === index + 1 ? 'var(--primary)' : 'transparent',
                          border: currentPage === index + 1 ? 'none' : '1px solid var(--secondary)',
                          color: currentPage === index + 1 ? 'var(--bg-dark)' : 'var(--text-light)',
                          width: '40px',
                          padding: '0.5rem'
                        }}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--secondary)',
                        color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-light)',
                        opacity: currentPage === totalPages ? 0.5 : 1,
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                      }}
                    >
                      &gt;
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
