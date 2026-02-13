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
                <div style={{ marginBottom: '1rem' }}>
                    <Link to="/avis-legal" style={{ color: 'var(--text-secondary)', textDecoration: 'none', margin: '0 1rem', fontSize: '0.9rem' }}>
                        {t('footer.legal')}
                    </Link>
                    <Link to="/politica-cookies" style={{ color: 'var(--text-secondary)', textDecoration: 'none', margin: '0 1rem', fontSize: '0.9rem' }}>
                        {t('footer.cookies')}
                    </Link>
                    <Link to="/politica-privacitat" style={{ color: 'var(--text-secondary)', textDecoration: 'none', margin: '0 1rem', fontSize: '0.9rem' }}>
                        {t('footer.privacy')}
                    </Link>
                </div>
                <p>&copy; {new Date().getFullYear()} Pere Badia i Lorenz. {t('footer.made_with')} <small style={{ opacity: 0.5 }}>(v1.1)</small></p>
            </footer>
        </div>
    );
}
