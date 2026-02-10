import { Outlet } from 'react-router-dom';
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
                <p>&copy; {new Date().getFullYear()} Pere Badia i Lorenz. {t('footer.made_with')}</p>
            </footer>
        </div>
    );
}
