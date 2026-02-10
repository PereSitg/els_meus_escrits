import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const location = useLocation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const professionalItem = { name: t('nav.projects'), path: '/projects' };

    const writingItems = [
        { name: t('nav.sitges'), path: '/category/sitges' },
        { name: t('nav.ecos'), path: '/category/ecos' },
        { name: t('nav.altres'), path: '/category/altres' },
    ];

    const isActive = (path) => location.pathname === path;

    const LangSwitcher = ({ mobile = false }) => (
        <div className={mobile ? "mobile-lang-switcher" : "lang-switcher"}>
            {['ca', 'es', 'en'].map((lng) => (
                <button
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    className={i18n.language === lng ? 'active' : ''}
                >
                    {lng.toUpperCase()}
                </button>
            ))}
        </div>
    );

    return (
        <header className="header glass">
            <div className="container header-content">
                <Link to="/" style={{ fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
                    Pere Badia i Lorenz
                </Link>

                {/* Desktop Nav */}
                <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center' }}>
                    <Link
                        to={professionalItem.path}
                        className={`nav-link ${isActive(professionalItem.path) ? 'active' : ''}`}
                        style={{ marginLeft: '1.5rem' }}
                    >
                        {professionalItem.name}
                    </Link>

                    <div className="nav-separator"></div>

                    {writingItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                            style={{ margin: '0 0.75rem' }}
                        >
                            {item.name}
                        </Link>
                    ))}

                    <div className="nav-separator"></div>

                    <Link
                        to="/contact"
                        className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                        style={{ margin: '0 1rem 0 0.75rem' }}
                    >
                        {t('nav.contact')}
                    </Link>

                    <LangSwitcher />
                </nav>

                {/* Mobile Menu Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: 'hidden', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--bg-primary)' }}
                    >
                        <div className="container" style={{ display: 'flex', flexDirection: 'column', padding: '1rem 0' }}>
                            <LangSwitcher mobile />

                            <Link
                                to={professionalItem.path}
                                style={{
                                    padding: '1rem 0',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    color: isActive(professionalItem.path) ? 'var(--accent-primary)' : 'var(--text-primary)'
                                }}
                                onClick={() => setIsOpen(false)}
                            >
                                {professionalItem.name}
                            </Link>

                            <div className="nav-separator"></div>

                            {writingItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    style={{
                                        padding: '0.75rem 0',
                                        fontSize: '1.1rem',
                                        color: isActive(item.path) ? 'var(--accent-primary)' : 'var(--text-secondary)'
                                    }}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <div className="nav-separator"></div>

                            <Link
                                to="/contact"
                                style={{
                                    padding: '1rem 0',
                                    fontSize: '1.2rem',
                                    color: isActive('/contact') ? 'var(--accent-primary)' : 'var(--text-secondary)'
                                }}
                                onClick={() => setIsOpen(false)}
                            >
                                {t('nav.contact')}
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
