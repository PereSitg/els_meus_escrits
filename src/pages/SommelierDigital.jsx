import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function SommelierDigital() {
    const { t } = useTranslation();

    const tags = ['IA', 'Python', 'Gemini API', 'LangChain'];

    return (
        <div className="project-detail-page" style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
            <div className="container">
                <Link to="/projects" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    marginBottom: '3rem',
                    fontSize: '1rem',
                    transition: 'color 0.2s'
                }} className="back-link">
                    <ArrowLeft size={20} />
                    {t('projects.sommelier.back_button')}
                </Link>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
                    gap: '4rem',
                    alignItems: 'start'
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                            {t('projects.sommelier.title')}
                        </h1>

                        <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
                            {tags.map(tag => (
                                <span key={tag} style={{
                                    fontSize: '0.9rem',
                                    padding: '0.4rem 1rem',
                                    background: 'rgba(59, 130, 246, 0.1)',
                                    color: 'var(--accent-primary)',
                                    borderRadius: '2rem',
                                    fontWeight: '600',
                                    border: '1px solid rgba(59, 130, 246, 0.2)'
                                }}>
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div style={{ marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
                                {t('projects.sommelier.detail_title')}
                            </h2>
                            <p style={{
                                fontSize: '1.2rem',
                                lineHeight: '1.8',
                                color: 'var(--text-secondary)',
                                marginBottom: '2rem'
                            }}>
                                {t('projects.sommelier.detail_desc')}
                            </p>
                        </div>

                        <div>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
                                {t('projects.sommelier.features_title')}
                            </h2>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {[1, 2, 3].map(i => (
                                    <li key={i} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        marginBottom: '1rem',
                                        fontSize: '1.1rem',
                                        color: 'var(--text-secondary)'
                                    }}>
                                        <CheckCircle2 size={24} style={{ color: '#10b981' }} />
                                        {t(`projects.sommelier.feature_${i}`)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{ position: 'sticky', top: '2rem' }}
                    >
                        <div style={{
                            background: 'var(--bg-secondary)',
                            borderRadius: '2rem',
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.05)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}>
                            <img
                                src="/sommelier_digital.png"
                                alt="Sommelier Digital"
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                            <div style={{ padding: '2.5rem', textAlign: 'center' }}>
                                <a
                                    href="https://sommelier-digital.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.8rem',
                                        background: 'var(--accent-primary)',
                                        color: 'white',
                                        padding: '1rem 2rem',
                                        borderRadius: '3rem',
                                        fontSize: '1.2rem',
                                        fontWeight: 'bold',
                                        textDecoration: 'none',
                                        transition: 'transform 0.2s, background 0.2s'
                                    }}
                                    className="btn-primary"
                                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    {t('projects.sommelier.try_button')}
                                    <ExternalLink size={20} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
