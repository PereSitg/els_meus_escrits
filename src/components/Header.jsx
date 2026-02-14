import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();

    const isAdminPage = location.pathname.startsWith('/admin');

    async function handleLogout() {
        try {
            await logout();
            navigate('/admin/login');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const professionalItems = [
        { name: t('nav.dev_ia'), path: '/projects?tag=IA' },
        { name: t('nav.consultancy'), path: '/projects?tag=Consultoria' },
        { name: t('nav.tal_com_erem'), path: '/projects/tal-com-erem' },
    ];

    const writingItems = [
        { name: t('nav.sitges'), path: '/category/sitges' },
        { name: t('nav.ecos'), path: '/category/ecos' },
        { name: t('nav.altres'), path: '/category/altres' },
    ];

    const isActive = (path) => location.pathname === path;
    const isWritingsActive = writingItems.some(item => isActive(item.path));
    const isProjectsActive = isActive('/projects') || professionalItems.some(item => location.pathname + location.search === item.path);

    const LangSwitcher = ({ mobile = false }) => (
        <div className={mobile ? "mobile-lang-switcher" : "lang-switcher"}>
            {['ca', 'es', 'en'].map((lng) => (
                <button
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    className={i18n.language.startsWith(lng) ? 'active' : ''}
                >
                    {lng.toUpperCase()}
                </button>
            ))}
        </div>
    );

    return (
        <header className="header glass">
            <div className="container header-content">
                <Link to="/" className="header-logo" style={{ fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
                    Pere Badia i Lorenz
                </Link>

                {/* Desktop Nav */}
                <nav className="desktop-nav">
                    <Link
                        to="/"
                        className={`nav-link ${isActive('/') ? 'active' : ''}`}
                        style={{ marginLeft: '1.5rem', marginRight: '0.75rem' }}
                    >
                        {t('nav.home') || 'Inici'}
                    </Link>

                    <div className="nav-separator"></div>
                    <div className="nav-item-dropdown desktop-only" style={{ margin: '0 0.75rem' }}>
                        <Link
                            to="/projects"
                            className={`dropdown-trigger ${isProjectsActive ? 'active' : ''}`}
                        >
                            {t('nav.projects')} <ChevronDown size={16} />
                        </Link>
                        <div className="dropdown-content">
                            {professionalItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="dropdown-link"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="nav-separator"></div>

                    {/* Dropdown for "Els meus escrits" */}
                    <div className="nav-item-dropdown desktop-only" style={{ margin: '0 0.75rem' }}>
                        <Link
                            to="/category/sitges"
                            className={`dropdown-trigger ${isWritingsActive ? 'active' : ''}`}
                        >
                            {t('nav.writings')} <ChevronDown size={16} />
                        </Link>
                        <div className="dropdown-content">
                            {writingItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="dropdown-link"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="nav-separator"></div>

                    <Link
                        to="/stack"
                        className={`nav-link ${isActive('/stack') ? 'active' : ''}`}
                        style={{ marginLeft: '1.5rem', marginRight: '0.75rem' }}
                    >
                        {t('nav.stack')}
                    </Link>

                    <div className="nav-separator"></div>

                    <Link
                        to="/contact"
                        className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                        style={{ margin: '0 1rem 0 0.75rem' }}
                    >
                        {t('nav.contact')}
                    </Link>

                    <LangSwitcher />

                    {currentUser && (
                        <button
                            onClick={handleLogout}
                            className="nav-link logout-btn"
                            style={{
                                marginLeft: '1rem',
                                color: 'var(--danger)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            <LogOut size={18} /> {t('nav.logout') || 'Sortir'}
                        </button>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <div className="mobile-menu-container">
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
                        style={{
                            overflowY: 'auto',
                            maxHeight: 'calc(100vh - 80px)',
                            background: 'var(--bg-secondary)',
                            borderBottom: '1px solid var(--bg-primary)'
                        }}
                    >
                        <div className="container mobile-nav-content" style={{ display: 'flex', flexDirection: 'column', padding: '1rem 1.5rem' }}>
                            <LangSwitcher mobile />

                            <Link
                                to="/"
                                style={{
                                    padding: '1rem 0',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    color: isActive('/') ? 'var(--accent-primary)' : 'var(--text-primary)'
                                }}
                                onClick={() => setIsOpen(false)}
                            >
                                {t('nav.home') || 'Inici'}
                            </Link>

                            <div className="nav-separator"></div>

                            <div
                                className={`nav-item-dropdown mobile ${dropdownOpen ? 'open' : ''}`}
                                style={{ padding: '0.5rem 0' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                    <Link
                                        to="/projects"
                                        className={`dropdown-trigger ${isProjectsActive ? 'active' : ''}`}
                                        style={{
                                            fontSize: '1.2rem',
                                            color: isProjectsActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                            flex: 1,
                                            padding: '1rem 0'
                                        }}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {t('nav.projects')}
                                    </Link>
                                    <div
                                        style={{ padding: '1rem', cursor: 'pointer' }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setDropdownOpen(!dropdownOpen);
                                        }}
                                    >
                                        <ChevronDown size={20} style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
                                    </div>
                                </div>
                                <div className="dropdown-content">
                                    {professionalItems.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            style={{
                                                display: 'block',
                                                padding: '0.75rem 0',
                                                fontSize: '1.1rem',
                                                color: isActive(item.path) ? 'var(--accent-primary)' : 'var(--text-secondary)'
                                            }}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="nav-separator"></div>

                            {/* Mobile Dropdown for "Els meus escrits" */}
                            <div
                                className={`nav-item-dropdown mobile ${dropdownOpen ? 'open' : ''}`}
                                style={{ padding: '0.5rem 0' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                    <Link
                                        to="/category/sitges"
                                        className={`dropdown-trigger ${isWritingsActive ? 'active' : ''}`}
                                        style={{
                                            fontSize: '1.2rem',
                                            color: isWritingsActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                            flex: 1,
                                            padding: '1rem 0'
                                        }}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {t('nav.writings')}
                                    </Link>
                                    <div
                                        style={{ padding: '1rem', cursor: 'pointer' }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setDropdownOpen(!dropdownOpen);
                                        }}
                                    >
                                        <ChevronDown size={20} style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
                                    </div>
                                </div>
                                <div className="dropdown-content">
                                    {writingItems.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            style={{
                                                display: 'block',
                                                padding: '0.75rem 0',
                                                fontSize: '1.1rem',
                                                color: isActive(item.path) ? 'var(--accent-primary)' : 'var(--text-secondary)'
                                            }}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="nav-separator"></div>

                            <Link
                                to="/stack"
                                style={{
                                    padding: '1rem 0',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    color: isActive('/stack') ? 'var(--accent-primary)' : 'var(--text-secondary)'
                                }}
                                onClick={() => setIsOpen(false)}
                            >
                                {t('nav.stack')}
                            </Link>

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

                            {currentUser && (
                                <>
                                    <div className="nav-separator"></div>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }}
                                        style={{
                                            padding: '1rem 0',
                                            fontSize: '1.2rem',
                                            color: '#ef4444',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            border: 'none',
                                            background: 'transparent',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            width: '100%',
                                            textAlign: 'left'
                                        }}
                                    >
                                        <LogOut size={20} /> {t('nav.logout') || 'Sortir'}
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
