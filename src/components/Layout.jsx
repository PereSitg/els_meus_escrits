import { Outlet, Link } from 'react-router-dom';
import Header from './Header';
import { useTranslation } from 'react-i18next';
import { Linkedin, Instagram } from 'lucide-react';

export default function Layout() {
    const { t } = useTranslation();
    return (
        <div className="app-container">
            <Header />
            <main>
                <Outlet />
            </main>
            <footer style={{
                padding: '3rem 0',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                borderTop: '1px solid var(--bg-secondary)',
                marginTop: 'auto',
                backgroundColor: 'var(--bg-primary)',
                position: 'relative',
                zIndex: 100
            }}>
                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
                    <Link to="/politica-cookies" className="footer-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>
                        {t('cookies.title')}
                    </Link>
                    <span style={{ color: 'var(--text-secondary)', opacity: 0.3, fontSize: '0.8rem' }}>|</span>
                    <Link to="/politica-privacitat" className="footer-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>
                        {t('privacy.title')}
                    </Link>
                    <span style={{ color: 'var(--text-secondary)', opacity: 0.3, fontSize: '0.8rem' }}>|</span>
                    <Link to="/avis-legal" className="footer-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>
                        {t('legal.title')}
                    </Link>
                </div>

                <div className="footer-socials" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                    marginBottom: '2rem',
                    flexDirection: 'row' // Default for desktop
                }}>
                    <a
                        href="https://www.linkedin.com/in/pbadialorenz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#ffffff', transition: 'opacity 0.2s', opacity: 1 }}
                        onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                        onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                        <Linkedin size={24} />
                    </a>
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#ffffff', transition: 'opacity 0.2s', opacity: 1 }}
                        onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                        onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                        <Instagram size={24} />
                    </a>
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#ffffff', transition: 'opacity 0.2s', opacity: 1, display: 'flex', alignItems: 'center' }}
                        onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                        onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                        </svg>
                    </a>
                </div>

                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
                    &copy; {new Date().getFullYear()} Pere Badia i Lorenz. {t('footer.made_with') || 'Fet amb ❤️ i IA'}
                    <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.75rem', opacity: 0.5 }}>(v1.3)</span>
                </p>
                <style>{`
                    @media (max-width: 768px) {
                        .footer-socials {
                            flex-direction: column !important;
                            gap: 1.5rem !important;
                            align-items: center;
                        }
                    }
                `}</style>
            </footer>
        </div>
    );
}
