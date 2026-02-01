import { useLanguage } from '../context/LanguageContext';
import Reveal from '../components/Reveal';

export default function Contact() {
    const { t } = useLanguage();
    return (
        <div className="container section" style={{ marginTop: '80px', minHeight: '80vh' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Reveal width="100%">
                    <h1 style={{
                        fontSize: '6vw',
                        marginBottom: '4rem',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.02em',
                        lineHeight: 0.9,
                        color: "rgba(255, 255, 255, 1)"
                    }}>
                        {t('contact_title')}
                    </h1>
                </Reveal>

                <Reveal width="100%">
                    <div style={{ padding: '2rem 0' }}>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            <div style={{ position: 'relative' }}>
                                <label style={{
                                    position: 'absolute',
                                    top: '-1.5rem',
                                    left: 0,
                                    fontSize: '0.8rem',
                                    textTransform: 'uppercase',
                                    color: '#666'
                                }}>
                                    {t('contact_name')}
                                </label>
                                <input
                                    type="text"
                                    placeholder="LE VAN A"
                                    style={{
                                        width: '100%',
                                        padding: '1rem 0',
                                        background: 'transparent',
                                        border: 'none',
                                        borderBottom: '1px solid #333',
                                        color: 'white',
                                        fontSize: '1.5rem',
                                        outline: 'none',
                                        borderRadius: 0
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'white'}
                                    onBlur={(e) => e.target.style.borderColor = '#333'}
                                />
                            </div>

                            <div style={{ position: 'relative' }}>
                                <label style={{
                                    position: 'absolute',
                                    top: '-1.5rem',
                                    left: 0,
                                    fontSize: '0.8rem',
                                    textTransform: 'uppercase',
                                    color: '#666'
                                }}>
                                    {t('contact_email')}
                                </label>
                                <input
                                    type="email"
                                    placeholder="EMAIL@EXAMPLE.COM"
                                    style={{
                                        width: '100%',
                                        padding: '1rem 0',
                                        background: 'transparent',
                                        border: 'none',
                                        borderBottom: '1px solid #333',
                                        color: 'white',
                                        fontSize: '1.5rem',
                                        outline: 'none',
                                        borderRadius: 0
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'white'}
                                    onBlur={(e) => e.target.style.borderColor = '#333'}
                                />
                            </div>

                            <div style={{ position: 'relative' }}>
                                <label style={{
                                    position: 'absolute',
                                    top: '-1.5rem',
                                    left: 0,
                                    fontSize: '0.8rem',
                                    textTransform: 'uppercase',
                                    color: '#666'
                                }}>
                                    {t('contact_message')}
                                </label>
                                <textarea
                                    rows="4"
                                    placeholder="TELL US ABOUT YOUR PROJECT..."
                                    style={{
                                        width: '100%',
                                        padding: '1rem 0',
                                        background: 'transparent',
                                        border: 'none',
                                        borderBottom: '1px solid #333',
                                        color: 'white',
                                        fontSize: '1.5rem',
                                        outline: 'none',
                                        resize: 'none',
                                        fontFamily: 'inherit',
                                        borderRadius: 0
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'white'}
                                    onBlur={(e) => e.target.style.borderColor = '#333'}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                style={{
                                    alignSelf: 'flex-start',
                                    background: 'transparent',
                                    color: '#fff',
                                    border: '1px solid #fff',
                                    padding: '1rem 3rem',
                                    borderRadius: '50px',
                                    textTransform: 'uppercase',
                                    marginTop: '2rem',
                                    cursor: 'pointer',
                                    transition: 'background 0.3s ease, color 0.3s ease',
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.background = '#fff';
                                    e.target.style.color = '#000';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.background = 'transparent';
                                    e.target.style.color = '#fff';
                                }}
                            >
                                {t('contact_send')}
                            </button>

                        </form>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
