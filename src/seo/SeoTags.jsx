import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const siteName = 'Inox Diệp Dương Hardware Store';
const defaultDescription =
  'Cửa hàng cơ khí, inox, ốc vít và vật liệu xây dựng chất lượng cao – giao hàng nhanh toàn quốc.';
const siteUrl = 'https://inoxdiepduong.example.com';

export function SeoTags({
  title,
  description = defaultDescription,
  image,
}) {
  const { language } = useLanguage();
  const { pathname } = useLocation();
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const url = `${siteUrl}${pathname}`;

  const ogImage = image || `${siteUrl}/og-default.jpg`;

  return (
    <Helmet>
      <html lang={language === 'vi' ? 'vi' : 'en'} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />
      <meta name="theme-color" content="#050505" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Basic business structured data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'HardwareStore',
          name: siteName,
          url: siteUrl,
          description,
        })}
      </script>
    </Helmet>
  );
}

