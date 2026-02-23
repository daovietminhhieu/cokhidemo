import React, { useState, useEffect, useCallback } from 'react';

/**
 * ImageLoader Component
 * Chuyên dụng load ảnh từ folder assets với:
 * - Lazy loading (tải chỉ khi cần)
 * - Fallback ảnh mặc định
 * - Loading animation
 * - Error handling
 */
const ImageLoader = ({
  src,
  alt = 'Image',
  className = '',
  style = {},
  onLoad = null,
  onError = null,
  lazy = true,
  fallback = 'react.svg',
  placeholderColor = 'rgba(0,0,0,0.1)'
}) => {
  const [isLoged, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  // Hàm xử lý khi ảnh load thành công
  const handleImageLoad = useCallback((e) => {
    setIsLoaded(true);
    setIsError(false);
    if (onLoad) onLoad(e);
  }, [onLoad]);

  // Hàm xử lý khi ảnh load thất bại
  const handleImageError = useCallback((e) => {
    console.warn(`Failed to load image: ${src}`);
    
    // Nếu chưa dùng fallback, thử fallback
    if (!isError) {
      setIsError(true);
      setImageSrc(new URL(`../assets/${fallback}`, import.meta.url).href);
    }
    
    if (onError) onError(e);
  }, [src, isError, fallback, onError]);

  // Parse image source
  useEffect(() => {
    let finalSrc = src;

    if (src && !src.startsWith('http') && !src.startsWith('/')) {
      // Nếu là đường dẫn tương đối, thêm assets
      finalSrc = new URL(`../assets/${src}`, import.meta.url).href;
    }

    setImageSrc(finalSrc);
  }, [src]);

  const containerStyle = {
    display: 'inline-block',
    background: !isLoged ? placeholderColor : 'transparent',
    transition: 'background 0.3s ease',
    position: 'relative',
    ...style
  };

  const imageStyle = {
    opacity: isLoged ? 1 : 0.5,
    transition: 'opacity 0.3s ease',
    display: 'block'
  };

  return (
    <div style={containerStyle} className={className}>
      <img
        src={imageSrc}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={imageStyle}
        loading={lazy ? 'lazy' : 'eager'}
      />
      
      {/* Loading Spinner */}
      {!isLoged && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30px',
            height: '30px',
            border: '2px solid rgba(255,255,255,0.1)',
            borderTop: '2px solid rgba(255,255,255,0.6)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}
        >
          <style>{`
            @keyframes spin {
              to { transform: translate(-50%, -50%) rotate(360deg); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default ImageLoader;
