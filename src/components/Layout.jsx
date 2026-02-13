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
                marginTop: 'auto',
                backgroundColor: 'var(--bg-primary)',
                position: 'relative',
                zIndex: 100
            }}>
                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
                    <Link to="/politica-cookies" className="footer-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>
                        Política de Cookies
                    </Link>
                    <span style={{ color: 'var(--text-secondary)', opacity: 0.3, fontSize: '0.8rem' }}>|</span>
                    <Link to="/politica-privacitat" className="footer-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>
                        Política de Privacitat
                    </Link>
                    <span style={{ color: 'var(--text-secondary)', opacity: 0.3, fontSize: '0.8rem' }}>|</span>
                    <Link to="/avis-legal" className="footer-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>
                        Avís Legal
                    </Link>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
                    &copy; {new Date().getFullYear()} Pere Badia i Lorenz. {t('footer.made_with') || 'Fet amb ❤️ i IA'}
                    <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.75rem', opacity: 0.5 }}>(v1.3)</span>
                </p>
            </footer>
        </div>
    );
}
