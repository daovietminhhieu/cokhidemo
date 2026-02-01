import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import Reveal, { StaggerContainer, StaggerItem } from '../components/Reveal';
import { PRODUCTS } from '../data/mockData';
import AudioButton from '../components/AudioButton';

function ProductCard({ product }) {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    if (qty < 1) return;
    addToCart(product, parseInt(qty));
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '16px',
      padding: '1.5rem',
      border: '1px solid rgba(255,255,255,0.05)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{
        overflow: 'hidden',
        aspectRatio: '1/1',
        borderRadius: '12px',
        background: 'rgba(0,0,0,0.2)',
        marginBottom: '1.5rem',
        position: 'relative'
      }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1rem', transition: 'transform 0.5s ease' }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          gap: '1rem',
        }}
      >
        {/* LEFT */}
        <div>
          <h3
            style={{
              fontSize: '1.1rem',
              marginBottom: '0.3rem',
              fontWeight: 600,
              letterSpacing: '0.5px',
              color: '#fff',
            }}
          >
            {language === 'vi' ? product.name_vi : product.name}
          </h3>

          <span
            style={{
              fontSize: '0.75rem',
              color: '#888',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {language === 'vi' ? product.category_vi : product.category}
          </span>
        </div>

        {/* RIGHT */}
        <div>
          <span
            style={{
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: '#fff',
              whiteSpace: 'nowrap',
            }}
          >
            ${product.price}
          </span>
        </div>
      </div>


      <div style={{ marginTop: 'auto', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value) || 1)}
          style={{
            width: '60px',
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            borderRadius: '50px',
            color: 'white',
            padding: '0.75rem 0',
            textAlign: 'center',
            fontSize: '0.9rem',
            outline: 'none',
            appearance: 'textfield',
            mozAppearance: 'textfield'
          }}
        />

        <button
          onClick={handleAddToCart}
          style={{
            flex: 1,
            padding: '0.75rem 0',
            borderRadius: '50px',
            border: 'none',
            background: 'white', // High contrast
            color: 'black',
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            letterSpacing: '1px',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.02)';
            e.target.style.boxShadow = '0 5px 15px rgba(255,255,255,0.2)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = 'none';
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
  // Initialize with mock data
  const [products, setProducts] = useState(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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

  const categories = ['All', ...new Set(products.map(p => language === 'vi' ? p.category_vi : p.category))];

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedCategory !== 'All') {
      result = result.filter(p => (language === 'vi' ? p.category_vi : p.category) === selectedCategory);
    }
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p =>
        (language === 'vi' ? p.name_vi : p.name).toLowerCase().includes(lowerQuery)
      );
    }
    result = [...result];
    switch (sortOption) {
      case 'price_asc': result.sort((a, b) => a.price - b.price); break;
      case 'price_desc': result.sort((a, b) => b.price - a.price); break;
      case 'name_asc':
        result.sort((a, b) => {
          const nameA = language === 'vi' ? a.name_vi : a.name;
          const nameB = language === 'vi' ? b.name_vi : b.name;
          return nameA.localeCompare(nameB);
        });
        break;
      default: break;
    }
    return result;
  }, [selectedCategory, searchQuery, sortOption, products, language]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container section" style={{ marginTop: '40px' }}>
      <Reveal width="100%">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '4rem', textTransform: 'uppercase', lineHeight: 1.2, margin: 0, color: '#ffffff', userSelect: 'none', pointerEvents: 'none' }}>
            {t('shop_title')}
          </h1>
        </div>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 4fr', gap: '4rem' }}>

        {/* Filters - Minimal Sidebar */}
        <aside>
          <div style={{ position: 'sticky', top: '120px' }}>

            {/* Search */}
            <div style={{ mb: '2rem' }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #333',
                  padding: '1rem 0',
                  color: 'white',
                  fontSize: '1rem',
                  marginBottom: '2rem',
                  outline: 'none'
                }}
              />
            </div>

            <h3 style={{ fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', marginBottom: '1rem' }}>{t('categories')}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {categories.map(cat => (
                <li key={cat} style={{ marginBottom: '0.5rem' }}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      background: 'transparent',
                      color: selectedCategory === cat ? 'white' : '#666',
                      fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                      padding: '5px 0',
                      border: 'none',
                      fontSize: '1.1rem',
                      transition: 'color 0.3s'
                    }}
                  >
                    {cat === 'All' ? t('cat_all') : cat}
                  </button>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', marginBottom: '1rem' }}>Sort</h3>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  color: 'white',
                  border: 'none',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="default">{t('sort_default')}</option>
                <option value="price_asc">{t('sort_price_asc')}</option>
                <option value="price_desc">{t('sort_price_desc')}</option>
                <option value="name_asc">{t('sort_name_asc')}</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div style={{ minHeight: '50vh' }}>
          {filteredProducts.length === 0 ? (
            <div style={{ padding: '4rem', color: '#666' }}>
              <h3>No products found.</h3>
            </div>
          ) : (
            <>
              <StaggerContainer style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem'
              }}>
                {currentProducts.map((product) => (
                  <StaggerItem key={product.id}>
                    <ProductCard product={product} />
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ display: 'flex', gap: '1rem', marginTop: '4rem', justifyContent: 'center' }}>
                  {/* Simplistic Pagination */}
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    style={{ color: currentPage === 1 ? '#333' : 'white' }}
                  >
                    PREV
                  </button>
                  <span style={{ color: '#666' }}>{currentPage} / {totalPages}</span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    style={{ color: currentPage === totalPages ? '#333' : 'white' }}
                  >
                    NEXT
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
