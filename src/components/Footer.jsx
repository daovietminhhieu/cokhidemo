import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer style={{
            background: 'rgba(10, 10, 10, 0.8)',
            backdropFilter: 'blur(10px)',
            color: '#888',
            padding: '4rem 0 2rem',
            marginTop: 'auto',
            borderTop: '1px solid #333',
            position: 'relative',
            zIndex: 10
        }}>
            <Reveal width="100%">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>

                        {/* Brand */}
                        <div>
                            <h2 style={{ color: 'white', marginBottom: '1rem', letterSpacing: '1px' }}>
                                HARDWARE<span style={{ color: 'var(--primary)' }}>SHOP</span>
                            </h2>
                            <p style={{ lineHeight: '1.6' }}>
                                Precision tools for professionals. <br />
                                Designed for durability and performance.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 style={{ color: 'white', marginBottom: '1rem' }}>Quick Links</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '0.5rem' }}><Link to="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link></li>
                                <li style={{ marginBottom: '0.5rem' }}><Link to="/shop" style={{ color: '#888', textDecoration: 'none' }}>Products</Link></li>
                                <li style={{ marginBottom: '0.5rem' }}><Link to="/contact" style={{ color: '#888', textDecoration: 'none' }}>Contact</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 style={{ color: 'white', marginBottom: '1rem' }}>Contact</h3>
                            <p style={{ marginBottom: '0.5rem' }}>📍 123 Construction Ave, Hanoi</p>
                            <p style={{ marginBottom: '0.5rem' }}>📞 +84 123 456 789</p>
                            <p>✉️ sales@hardwareshop.vn</p>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid #222', paddingTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
                        &copy; {new Date().getFullYear()} HardwareShop. All rights reserved.
                    </div>
                </div>
            </Reveal>
        </footer>
    );
}
