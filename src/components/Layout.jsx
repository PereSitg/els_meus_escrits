import { Outlet, Link } from 'react-router-dom';
import Header from './Header';
import { useTranslation } from 'react-i18next';

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
                marginTop: '4rem'
            }}>
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.8rem', position: 'relative', zIndex: 10 }}>
                    <Link to="/politica-cookies" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', opacity: 1 }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                        {t('footer.cookies') || 'Política de Cookies'}
                    </Link>
                    <span style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>|</span>
                    <Link to="/politica-privacitat" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', opacity: 1 }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                        {t('footer.privacy') || 'Política de Privacitat'}
                    </Link>
                    <span style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>|</span>
                    <Link to="/avis-legal" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', opacity: 1 }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                        {t('footer.legal') || 'Avís Legal'}
                    </Link>
                </div>
                <p>&copy; {new Date().getFullYear()} Pere Badia i Lorenz. {t('footer.made_with') || 'Fet amb ❤️ i IA'} <small style={{ opacity: 0.5 }}>(v1.2)</small></p>
            </footer>
        </div>
    );
}
