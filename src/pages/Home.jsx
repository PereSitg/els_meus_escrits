import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Palmtree, Briefcase, ChevronRight } from 'lucide-react';

export default function Home() {
    const { t } = useTranslation();

    const navigationCards = [
        {
            title: t('nav.writings') || 'Els meus escrits',
            description: t('home.sitges_desc') || 'Explora els meus escrits i històries sobre Sitges.',
            path: '/category/sitges',
            icon: <Palmtree size={48} />,
            color: 'var(--accent-primary)',
            bgImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
        },
        {
            title: t('nav.projects'),
            description: t('home.projects_desc') || 'Descobreix els projectes professionals i creatius en els quals he treballat.',
            path: '/projects',
            icon: <Briefcase size={48} />,
            color: '#10b981',
            bgImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80'
        }
    ];

    return (
        <div className="home-page">
            <section className="hero" style={{
                height: '50vh',
                background: 'linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.9)), url(https://images.unsplash.com/photo-1505567745926-ba89000d255a?w=1600&q=80) center/cover',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textAlign: 'center',
                marginBottom: '4rem',
                borderRadius: '0 0 2rem 2rem'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container"
                >
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>{t('hero.title')}</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                        {t('hero.subtitle')}
                    </p>
                </motion.div>
            </section>

            <div className="container" style={{ paddingBottom: '6rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '2.5rem',
                    marginTop: '-2rem'
                }}>
                    {navigationCards.map((card, index) => (
                        <motion.div
                            key={card.path}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            style={{ position: 'relative' }}
                        >
                            <Link to={card.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{
                                    height: '350px',
                                    borderRadius: '1.5rem',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    background: 'var(--bg-secondary)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    padding: '2rem',
                                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                    border: '1px solid rgba(255, 255, 255, 0.05)'
                                }}>
                                    {/* Background decorative image with overlay */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        backgroundImage: `url(${card.bgImage})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        opacity: 0.2, // Subtle background
                                        zIndex: 0
                                    }} />

                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to top, var(--bg-secondary) 40%, transparent 100%)',
                                        zIndex: 1
                                    }} />

                                    <div style={{ position: 'relative', zIndex: 2 }}>
                                        <div style={{
                                            color: card.color,
                                            marginBottom: '1.5rem',
                                            display: 'inline-flex',
                                            padding: '1rem',
                                            borderRadius: '1rem',
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            border: '1px solid rgba(255, 255, 255, 0.05)'
                                        }}>
                                            {card.icon}
                                        </div>
                                        <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem', fontWeight: '800' }}>
                                            {card.title}
                                        </h2>
                                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                                            {card.description}
                                        </p>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: 'white',
                                            fontWeight: '700',
                                            fontSize: '1.1rem'
                                        }}>
                                            Explora <ChevronRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
