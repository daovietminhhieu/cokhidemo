import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Newsletter = () => {
    const { t } = useLanguage();

    return (
        <div className="container" style={{ marginBottom: '1.5rem', paddingTop: '1rem', paddingBottom: '1rem' }}>
            <div className="glass" style={{
                padding: '2.2rem 1.3rem',
                borderRadius: '16px',
                textAlign: 'center',
                background: 'rgba(40, 0, 0, 0.82)',
                border: '1px solid rgba(255, 98, 52, 0.88)',
                boxShadow: '0 18px 38px rgba(255, 102, 62, 0.45)'
            }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t('newsletter_title')}</h2>
                <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>{t('newsletter_desc')}</p>

                <form
                    onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '1rem',
                        flexWrap: 'wrap',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}
                >
                    <input
                        type="email"
                        placeholder={t('newsletter_placeholder')}
                        required
                        style={{
                            padding: '1rem 1.5rem',
                            borderRadius: '50px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(0,0,0,0.3)',
                            color: 'white',
                            flex: '1',
                            minWidth: '250px'
                        }}
                    />
                    <button type="submit" style={{
                        borderRadius: '50px',
                        padding: '1rem 2.5rem',
                        boxShadow: '0 0 20px rgba(229, 231, 235, 0.2)'
                    }}>
                        {t('newsletter_btn')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;
