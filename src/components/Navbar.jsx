import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import Magnetic from './Magnetic';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { language, toggleLanguage, t } = useLanguage();
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            padding: '20px 0',
            background: 'rgba(18, 18, 18, 0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            borderBottom: '1px solid #333'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', letterSpacing: '1px' }}>
                    Materials<span style={{ color: 'white' }}>SHOP</span>
                </Link>

                <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexDirection: 'inherit' }}>
                        {/* Mobile Cart Link optional, but keeping Icon near logo or in menu? Let's put everything in menu for now or keep Cart outside?
                            The design usually has Cart outside or inside. Implementation Plan said separate container.
                            Let's keep the original structure but wrapped.
                         */}

                        {/* Cart Icon - Moved inside nav-links for mobile menu, or keep outside?
                            Let's keep it inside the flex container for simplicity based on previous code
                         */}
                        <div style={{ position: 'relative', cursor: 'pointer', marginRight: '-1rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-light)' }}>
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            {cartCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-8px',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    fontSize: '0.7rem',
                                    padding: '2px 6px',
                                    borderRadius: '50%'
                                }}>
                                    {cartCount}
                                </span>
                            )}
                        </div>

                        <Link to="/" onClick={() => setIsMenuOpen(false)}>{t('nav_home')}</Link>
                        <Link to="/shop" onClick={() => setIsMenuOpen(false)}>{t('nav_products')}</Link>
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>{t('nav_contact')}</Link>
                        {user ? (
                            <>
                                <Link to="/admin" style={{ color: 'var(--primary)' }} onClick={() => setIsMenuOpen(false)}>{t('nav_admin')}</Link>
                                <Magnetic>
                                    <button
                                        onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                        style={{ padding: '5px 10px', fontSize: '0.9rem', background: 'transparent', border: '1px solid var(--text-muted)' }}
                                    >
                                        {t('nav_logout')}
                                    </button>
                                </Magnetic>
                            </>
                        ) : (
                            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                <Magnetic>
                                    <button style={{ padding: '5px 15px', fontSize: '0.9rem' }}>{t('nav_login')}</button>
                                </Magnetic>
                            </Link>
                        )}

                        <button
                            onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
                            style={{ padding: '5px 10px', fontSize: '0.9rem' }}
                        >
                            {language === 'en' ? 'EN' : 'VI'}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
