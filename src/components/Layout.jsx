import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
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
                <p>&copy; {new Date().getFullYear()} Els meus escrits. Fet amb ❤️ des de Sitges.</p>
            </footer>
        </div>
    );
}
