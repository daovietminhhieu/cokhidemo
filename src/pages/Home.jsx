import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Experience from '../components/Experience';
import { Link } from 'react-router-dom';
// import { products } from '../data/products'; // REMOVED STATIC IMPORT
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import Reveal, { StaggerContainer, StaggerItem } from '../components/Reveal';
import ScrollIndicator from '../components/ScrollIndicator';
import Magnetic from '../components/Magnetic';

export default function Home() {
    const { t, language } = useLanguage();
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Failed to fetch products:", err));
    }, []);
    return (
        <div>
            {/* Hero Section with 3D Background */}
            {/* Fixed 3D Background */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <Suspense fallback={null}>
                        <Experience />
                        <Environment preset="city" />
                        <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            autoRotate
                            autoRotateSpeed={0.5}
                            minDistance={5}
                            maxDistance={5}
                        />
                    </Suspense>
                </Canvas>
            </div>

            <div style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
                {/* Hero Section Content Container */}
                <div style={{ position: 'relative', height: '100vh', width: '100%' }}>

                    <div className="container" style={{
                        position: 'relative',
                        zIndex: 1,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        pointerEvents: 'none' // Allow clicks to pass through to canvas if needed, but usually text needs interaction
                    }}>
                        <div style={{ pointerEvents: 'auto', maxWidth: '600px' }}>
                            <h1 style={{ fontSize: '4rem', marginBottom: '1rem', lineHeight: 1.1 }}>
                                {t('hero_precision')} <br />
                                <span style={{ color: 'var(--primary)' }}>{t('hero_engineering')}</span>
                            </h1>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                                {t('hero_desc')}
                            </p>
                            <Link to="/shop">
                                <Magnetic>
                                    <button>{t('hero_cta')}</button>
                                </Magnetic>
                            </Link>
                        </div>
                    </div>
                    {/* Scroll Indicator */}
                    <ScrollIndicator />
                </div>

                {/* Featured Section */}
                <div className="section container">
                    <Reveal width="100%">
                        <h2 style={{ borderBottom: '2px solid var(--primary)', display: 'inline-block', paddingBottom: '10px', pointerEvents: 'auto' }}>
                            {t('why_choose_us')}
                        </h2>
                    </Reveal>
                    <StaggerContainer className="grid" style={{ marginTop: '2rem', pointerEvents: 'auto' }}>
                        <StaggerItem className="card" style={{ padding: '2rem' }}>
                            <h3 style={{ color: 'var(--secondary)' }}>{t('choose_durable')}</h3>
                            <p>{t('choose_durable_desc')}</p>
                        </StaggerItem>
                        <StaggerItem className="card" style={{ padding: '2rem' }}>
                            <h3 style={{ color: 'var(--secondary)' }}>{t('choose_precision')}</h3>
                            <p>{t('choose_precision_desc')}</p>
                        </StaggerItem>
                        <StaggerItem className="card" style={{ padding: '2rem' }}>
                            <h3 style={{ color: 'var(--secondary)' }}>{t('choose_shipping')}</h3>
                            <p>{t('choose_shipping_desc')}</p>
                        </StaggerItem>
                    </StaggerContainer>
                </div>


                {/* Featured Products */}
                <div className="section container">
                    <Reveal width="100%">
                        <h2 style={{ borderBottom: '2px solid var(--primary)', display: 'inline-block', paddingBottom: '10px', pointerEvents: 'auto' }}>
                            {t('featured_products')}
                        </h2>
                    </Reveal>
                    <StaggerContainer className="grid" style={{ marginTop: '2rem', pointerEvents: 'auto' }}>
                        {products.slice(0, 3).map((product) => (
                            <StaggerItem key={product.id} className="card">
                                <div style={{ height: '200px', overflow: 'hidden' }}>
                                    <img
                                        src={product.image}
                                        alt={language === 'vi' ? product.name_vi : product.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            {language === 'vi' ? product.category_vi : product.category}
                                        </span>
                                        <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>
                                            {product.price.toLocaleString()} VND
                                        </span>
                                    </div>
                                    <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{language === 'vi' ? product.name_vi : product.name}</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '1rem' }}>
                                        <button
                                            onClick={() => addToCart(product)}
                                            style={{ width: '100%', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '8px 4px', fontSize: '0.8rem' }}
                                        >
                                            {t('add_to_cart')}
                                        </button>
                                        <button
                                            onClick={() => alert('Proceeding to checkout')}
                                            style={{ width: '100%', padding: '8px 4px', fontSize: '0.8rem' }}
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </div>
        </div>
    );
}
