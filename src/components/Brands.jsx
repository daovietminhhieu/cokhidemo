import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Reveal from './Reveal';

// Placeholder logos (text for now, can be replaced with SVGs or Images)
const BrandLogo = ({ name }) => (
    <div style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'var(--text-muted)',
        opacity: 0.6,
        padding: '1rem',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        textAlign: 'center',
        transition: 'all 0.3s'
    }}
        onMouseEnter={(e) => { e.target.style.opacity = '1'; e.target.style.borderColor = 'var(--primary)'; e.target.style.color = 'var(--text-light)'; }}
        onMouseLeave={(e) => { e.target.style.opacity = '0.6'; e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.color = 'var(--text-muted)'; }}
    >
        {name}
    </div>
);

const Brands = () => {
    const { t } = useLanguage();

    return (
        <div className="section container">
            <Reveal width="100%">
                <h2 style={{ textAlign: 'center', marginBottom: '3rem', opacity: 0.8 }}>{t('trusted_brands')}</h2>
            </Reveal>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '2rem',
                alignItems: 'center'
            }}>
                <BrandLogo name="BOSCH" />
                <BrandLogo name="MAKITA" />
                <BrandLogo name="DEWALT" />
                <BrandLogo name="MILWAUKEE" />
                <BrandLogo name="STANLEY" />
            </div>
        </div>
    );
};

export default Brands;
