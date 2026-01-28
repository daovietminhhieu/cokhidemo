import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (isRegister) {
            if (password !== confirmPassword) {
                setError(t('Passwords do not match'));
                return;
            }
            // Mock Registration
            console.log("Registered:", { username, password });
            // For now, just login specifically
            if (login(username, password)) {
                navigate('/admin');
            } else {
                // If mock login fails (it checks specific credentials in AuthContext), maybe just simulate success for new user
                // But since we don't have a real backend for saving users, let's just pretend and redirect
                alert("Registration successful! (Mock)");
                setIsRegister(false); // Switch back to login
            }
        } else {
            if (login(username, password)) {
                navigate('/admin');
            } else {
                setError(t('login_error'));
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary)' }}>
                    {isRegister ? t('Register') : t('login_title')}
                </h2>
                {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>{t('login_username')}</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: '#2A2A2A',
                                border: '1px solid #444',
                                color: 'white',
                                borderRadius: '4px'
                            }}
                            required
                            autoComplete="username"
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>{t('login_password')}</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    paddingRight: '40px',
                                    background: '#2A2A2A',
                                    border: '1px solid #444',
                                    color: 'white',
                                    borderRadius: '4px'
                                }}
                                required
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    padding: '0',
                                    cursor: 'pointer',
                                    color: '#A0A0A0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {isRegister && (
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>{t('Confirm Password')}</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: '#2A2A2A',
                                    border: '1px solid #444',
                                    color: 'white',
                                    borderRadius: '4px'
                                }}
                                required={isRegister}
                                autoComplete="new-password"
                            />
                        </div>
                    )}

                    <button type="submit" style={{ width: '100%' }}>
                        {isRegister ? t('Register') : t('login_button')}
                    </button>

                    <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>
                            {isRegister ? "Already have an account? " : "Don't have an account? "}
                        </span>
                        <button
                            type="button"
                            onClick={() => { setIsRegister(!isRegister); setError(''); }}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                color: 'var(--primary)',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                fontSize: 'inherit'
                            }}
                        >
                            {isRegister ? "Login" : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
