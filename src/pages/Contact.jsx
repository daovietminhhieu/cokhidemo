import { useLanguage } from '../context/LanguageContext';
import Reveal from '../components/Reveal';

export default function Contact() {
    const { t } = useLanguage();
    return (
        <div className="container section" style={{ marginTop: '80px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Reveal width="100%">
                    <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>{t('contact_title')}</h1>
                </Reveal>

                <Reveal width="100%">
                    <div className="card" style={{ padding: '2rem' }}>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>{t('contact_name')}</label>
                                <input
                                    type="text"
                                    placeholder="Le Van A"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        background: '#2A2A2A',
                                        border: '1px solid #444',
                                        color: 'white',
                                        borderRadius: '4px'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>{t('contact_email')}</label>
                                <input
                                    type="email"
                                    placeholder="email@example.com"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        background: '#2A2A2A',
                                        border: '1px solid #444',
                                        color: 'white',
                                        borderRadius: '4px'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>{t('contact_message')}</label>
                                <textarea
                                    rows="5"
                                    placeholder="I need a quote for..."
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        background: '#2A2A2A',
                                        border: '1px solid #444',
                                        color: 'white',
                                        borderRadius: '4px'
                                    }}
                                ></textarea>
                            </div>
                            <button type="submit">{t('contact_send')}</button>
                        </form>
                    </div>
                </Reveal>


            </div>
        </div>
    );
}
