import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

export function SeoProvider({ children }) {
  return <HelmetProvider>{children}</HelmetProvider>;
}

