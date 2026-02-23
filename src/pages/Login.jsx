import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();

    // Reset error when switching modes
    useEffect(() => {
        setError('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    }, [isRegister]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate minimal network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        if (isRegister) {
            if (password !== confirmPassword) {
                setError(t('Passwords do not match') || "Passwords do not match");
                setIsLoading(false);
                return;
            }
            if (login(username, password)) {
                navigate('/admin');
            } else {
                alert("Registration successful! (Mock)");
                setIsRegister(false);
            }
        } else {
            if (login(username, password)) {
                navigate('/admin');
            } else {
                setError(t('login_error') || 'Invalid Credentials');
            }
        }
        setIsLoading(false);
    };

    const primaryColor = "#ff9557"; // Safety Orange

    return (
        <div className="login-page" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#050505',
            fontFamily: 'var(--font-body)',
            padding: '20px',
            position: 'relative'
        }}>



            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="login-card"
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: '2.5rem',
                    background: '#0a0a0a',
                    border: '1px solid #222',
                    borderRadius: '12px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: primaryColor,
                        borderRadius: '8px',
                        margin: '0 auto 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
                        </svg>
                    </div>
                    <h2 style={{
                        color: 'white',
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        fontFamily: 'var(--font-header)'
                    }}>
                        {isRegister ? t('login_create_account') : t('login_welcome')}
                    </h2>
                    <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
                        {isRegister ? t('register_desc') : t('login_desc')}
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{
                                background: 'rgba(255, 68, 68, 0.1)',
                                border: '1px solid rgba(255, 68, 68, 0.2)',
                                color: '#ff6b6b',
                                marginBottom: '1.5rem',
                                padding: '10px 14px',
                                borderRadius: '6px',
                                fontSize: '0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#888', fontWeight: '500' }}>
                            {t('email_username_label')}
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                background: '#111',
                                border: '1px solid #333',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '0.95rem',
                                transition: 'border-color 0.2s, box-shadow 0.2s',
                                outline: 'none'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = primaryColor;
                                e.target.style.boxShadow = `0 0 0 2px ${primaryColor}22`;
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#333';
                                e.target.style.boxShadow = 'none';
                            }}
                            required
                            autoComplete="username"
                            placeholder={t('email_username_placeholder')}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#888', fontWeight: '500' }}>
                            {t('login_password')}
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    paddingRight: '40px',
                                    background: '#111',
                                    border: '1px solid #333',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontSize: '0.95rem',
                                    transition: 'border-color 0.2s, box-shadow 0.2s',
                                    outline: 'none'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = primaryColor;
                                    e.target.style.boxShadow = `0 0 0 2px ${primaryColor}22`;
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#333';
                                    e.target.style.boxShadow = 'none';
                                }}
                                required
                                autoComplete={isRegister ? "new-password" : "current-password"}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    padding: '4px',
                                    cursor: 'pointer',
                                    color: '#666',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'color 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.color = '#fff'}
                                onMouseLeave={(e) => e.target.style.color = '#666'}
                            >
                                {showPassword ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {isRegister && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginBottom: '1.5rem' }}
                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#888', fontWeight: '500' }}>
                                    {t('confirm_password')}
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        background: '#111',
                                        border: '1px solid #333',
                                        borderRadius: '8px',
                                        color: 'white',
                                        fontSize: '0.95rem',
                                        transition: 'border-color 0.2s, box-shadow 0.2s',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = primaryColor;
                                        e.target.style.boxShadow = `0 0 0 2px ${primaryColor}22`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#333';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    required={isRegister}
                                    autoComplete="new-password"
                                    placeholder={t('confirm_password_placeholder')}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: primaryColor,
                            border: 'none',
                            borderRadius: '8px',
                            color: '#000',
                            fontWeight: '600',
                            fontSize: '1rem',
                            cursor: isLoading ? 'wait' : 'pointer',
                            transition: 'transform 0.1s, opacity 0.2s',
                            opacity: isLoading ? 0.7 : 1
                        }}
                        onMouseEnter={(e) => !isLoading && (e.target.style.transform = 'translateY(-1px)')}
                        onMouseLeave={(e) => !isLoading && (e.target.style.transform = 'translateY(0)')}
                        onMouseDown={(e) => !isLoading && (e.target.style.transform = 'translateY(1px)')}
                    >
                        {isLoading ? t('processing') : (isRegister ? t('sign_up') : t('sign_in'))}
                    </button>

                    <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                        <span style={{ color: '#666' }}>
                            {isRegister ? t('has_account') : t('no_account')}
                        </span>
                        <button
                            type="button"
                            onClick={() => setIsRegister(!isRegister)}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                color: primaryColor,
                                fontWeight: '500',
                                cursor: 'pointer',
                                fontSize: 'inherit',
                                marginLeft: '5px'
                            }}
                            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                        >
                            {isRegister ? t('sign_in') : t('sign_up')}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
