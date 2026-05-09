import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Mostrem el bàner amb un petit retard per millorar l'experiència
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookie-consent', 'rejected');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0, x: '-50%' }}
                    animate={{ y: 0, opacity: 1, x: '-50%' }}
                    exit={{ y: 100, opacity: 0, x: '-50%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    style={{
                        position: 'fixed',
                        bottom: '2rem',
                        left: '50%',
                        width: 'calc(100% - 2rem)',
                        maxWidth: '600px',
                        zIndex: 2000,
                        padding: '1.5rem',
                        borderRadius: '1.25rem',
                        backgroundColor: 'rgba(15, 23, 42, 0.75)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.25rem'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                        <div style={{
                            backgroundColor: 'rgba(59, 130, 246, 0.15)',
                            padding: '0.85rem',
                            borderRadius: '1rem',
                            color: 'var(--accent-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: 'inset 0 0 10px rgba(59, 130, 246, 0.1)'
                        }}>
                            <ShieldCheck size={28} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ 
                                fontSize: '1.25rem', 
                                margin: '0 0 0.35rem 0', 
                                fontWeight: 600,
                                color: '#fff',
                                fontFamily: 'var(--font-heading)',
                                letterSpacing: '-0.02em'
                            }}>
                                {t('cookieBanner.title')}
                            </h3>
                            <p style={{ 
                                fontSize: '0.95rem', 
                                margin: 0, 
                                color: 'var(--text-secondary)',
                                lineHeight: '1.6',
                                opacity: 0.9
                            }}>
                                {t('cookieBanner.description')}
                            </p>
                        </div>
                    </div>

                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'flex-end', 
                        gap: '1.25rem',
                        marginTop: '0.25rem',
                        flexWrap: 'wrap'
                    }}>
                        <Link 
                            to="/politica-cookies" 
                            style={{ 
                                fontSize: '0.9rem', 
                                color: 'var(--text-secondary)', 
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                transition: 'color 0.2s ease'
                            }}
                            className="cookie-link-hover"
                        >
                            <Settings size={16} />
                            {t('cookieBanner.configure')}
                        </Link>
                        
                        <button 
                            onClick={handleReject}
                            style={{ 
                                background: 'transparent',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                color: 'rgba(255, 255, 255, 0.8)',
                                padding: '0.65rem 1.25rem',
                                borderRadius: '0.75rem',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                                e.target.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'transparent';
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                                e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                            }}
                        >
                            {t('cookieBanner.reject')}
                        </button>

                        <button 
                            onClick={handleAccept}
                            style={{ 
                                background: 'var(--accent-primary)',
                                border: '1px solid var(--accent-primary)',
                                color: 'white',
                                padding: '0.65rem 1.5rem',
                                borderRadius: '0.75rem',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                boxShadow: '0 8px 20px -6px var(--accent-glow)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 12px 25px -6px var(--accent-glow)';
                                e.target.style.filter = 'brightness(1.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 8px 20px -6px var(--accent-glow)';
                                e.target.style.filter = 'brightness(1)';
                            }}
                        >
                            {t('cookieBanner.acceptAll')}
                        </button>
                    </div>

                    <style>{`
                        .cookie-link-hover:hover {
                            color: var(--accent-primary) !important;
                        }
                        @media (max-width: 480px) {
                            div[style*="justify-content: flex-end"] {
                                justify-content: center !important;
                                width: 100%;
                            }
                            button {
                                flex: 1;
                                min-width: 120px;
                            }
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
