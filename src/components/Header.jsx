import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: 'Política', path: '/category/politica' },
        { name: 'Ecos de Sociedad', path: '/category/ecos' },
        { name: 'Sitges', path: '/category/sitges' },
        { name: 'Contacte', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className="header">
            <div className="container header-content">
                <Link to="/" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                    Els meus escrits
                </Link>

                {/* Desktop Nav */}
                <nav className="desktop-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
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
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    style={{
                                        padding: '1rem 0',
                                        fontSize: '1.2rem',
                                        color: isActive(item.path) ? 'var(--accent-primary)' : 'var(--text-secondary)'
                                    }}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
