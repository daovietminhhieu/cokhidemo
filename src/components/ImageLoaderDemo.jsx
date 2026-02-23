import React, { useState } from 'react';
import ImageLoader from './ImageLoader';

/**
 * ImageLoaderDemo Component
 * Load và hiển thị tất cả ảnh từ assets folder
 */
const ImageLoaderDemo = () => {
  // Auto-discover all images in ../assets using Vite's import.meta.glob
  // This makes newly added files in src/assets appear automatically
  const modules = import.meta.glob('../assets/*.{webp,png,jpg,jpeg,svg}', { eager: true, as: 'url' });

  const assetsImages = Object.keys(modules).map((p) => {
    const url = modules[p];
    const filename = p.split('/').pop();
    const nameNoExt = filename.replace(/\.[^.]+$/, '');
    const title = nameNoExt.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const rawCategory = filename.split('-')[0] || 'misc';
    const category = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);
    return {
      name: filename,
      url,
      title,
      category
    };
  }).sort((a,b) => a.name.localeCompare(b.name));

  const [selectedImage, setSelectedImage] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  // Lấy độc nhất categories
  const categories = ['All', ...new Set(assetsImages.map(img => img.category))];
  
  // Filter ảnh theo category
  const filteredImages = filterCategory === 'All' 
    ? assetsImages 
    : assetsImages.filter(img => img.category === filterCategory);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0a0a14, #1a1a2e)',
      minHeight: '100vh',
      padding: '2rem',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          🗂️ Assets Gallery
        </h1>
        <p style={{ color: '#aaa', fontSize: '1.1rem' }}>
          Tất cả ảnh trong /src/assets folder ({assetsImages.length} ảnh)
        </p>
      </div>

      {/* Filter Category */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        marginBottom: '2rem',
        display: 'flex',
        gap: '0.8rem',
        overflowX: 'auto',
        paddingBottom: '1rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            style={{
              padding: '0.8rem 1.5rem',
              background: filterCategory === cat ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              border: filterCategory === cat 
                ? '1px solid rgba(0, 212, 255, 0.5)' 
                : '1px solid rgba(255, 255, 255, 0.1)',
              color: filterCategory === cat ? '#00d4ff' : '#999',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: filterCategory === cat ? 'bold' : 'normal',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {filteredImages.map(img => (
            <div
              key={img.name}
              onClick={() => setSelectedImage(img)}
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: selectedImage?.name === img.name ? 'scale(1.05)' : 'scale(1)',
                boxShadow: selectedImage?.name === img.name 
                  ? '0 0 20px rgba(0, 212, 255, 0.3)' 
                  : 'none'
              }}
              onMouseOver={(e) => {
                if (selectedImage?.name !== img.name) {
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }
              }}
              onMouseOut={(e) => {
                if (selectedImage?.name !== img.name) {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              {/* Image Container */}
              <div style={{
                aspectRatio: '1/1',
                overflow: 'hidden',
                background: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ImageLoader
                  src={img.name}
                  alt={img.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  lazy={true}
                />
              </div>

              {/* Info */}
              <div style={{ padding: '1rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#00d4ff', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {img.category}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {img.title}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#999', wordBreak: 'break-all' }}>
                  {img.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Detail */}
      {selectedImage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              fontSize: '1.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            ✕
          </button>

          {/* Modal Content */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            maxWidth: '1200px',
            width: '100%',
            background: 'rgba(10, 10, 20, 0.8)',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {/* Image */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '12px',
              overflow: 'hidden',
              aspectRatio: '1/1'
            }}>
              <ImageLoader
                src={selectedImage.name}
                alt={selectedImage.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: '1rem'
                }}
                lazy={false}
              />
            </div>

            {/* Details */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.9rem', color: '#00d4ff', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                  {selectedImage.category}
                </div>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 'bold' }}>
                  {selectedImage.title}
                </h2>
                <div style={{
                  background: 'rgba(0, 212, 255, 0.1)',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  marginBottom: '1.5rem',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  wordBreak: 'break-all'
                }}>
                  {selectedImage.name}
                </div>
              </div>

              {/* Usage Example */}
              <div>
                <h3 style={{ marginBottom: '0.8rem', color: '#00d4ff' }}>📝 Cách sử dụng:</h3>
                <pre style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  padding: '1rem',
                  borderRadius: '8px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
{`import ImageLoader from '@/components/ImageLoader';

<ImageLoader
  src="${selectedImage.name}"
  alt="${selectedImage.title}"
  style={{ width: '100%' }}
  lazy={true}
/>`}
                </pre>

                {/* Copy Button */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedImage.name);
                    alert('Copied: ' + selectedImage.name);
                  }}
                  style={{
                    marginTop: '1rem',
                    width: '100%',
                    padding: '0.8rem 1.5rem',
                    background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '1rem'
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
                  📋 Copy Filename
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Footer */}
      <div style={{
        maxWidth: '1400px',
        margin: '3rem auto 0',
        padding: '2rem 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem'
      }}>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00d4ff' }}>
            {assetsImages.length}
          </div>
          <div style={{ color: '#999', marginTop: '0.5rem' }}>Tổng ảnh</div>
        </div>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00d4ff' }}>
            {categories.length - 1}
          </div>
          <div style={{ color: '#999', marginTop: '0.5rem' }}>Danh mục</div>
        </div>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00d4ff' }}>
            {filteredImages.length}
          </div>
          <div style={{ color: '#999', marginTop: '0.5rem' }}>Đang hiển thị</div>
        </div>
      </div>
    </div>
  );
};

export default ImageLoaderDemo;
