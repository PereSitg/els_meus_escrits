import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, CheckCircle2, Cpu, Database, Code2 } from 'lucide-react';

export default function SommelierDigital() {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

                <div className="project-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
                    gap: '4rem',
                    alignItems: 'start'
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="project-info"
                    >
                        <h1 className="project-title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                            {t('projects.sommelier.title')}
                        </h1>

                        <div className="project-tags" style={{ display: 'flex', gap: '0.8rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
                            {tags.map(tag => (
                                <Link
                                    key={tag}
                                    to={`/projects?tag=${encodeURIComponent(tag)}`}
                                    style={{
                                        fontSize: '0.9rem',
                                        padding: '0.4rem 1rem',
                                        background: 'rgba(59, 130, 246, 0.1)',
                                        color: 'var(--accent-primary)',
                                        borderRadius: '2rem',
                                        fontWeight: '600',
                                        border: '1px solid rgba(59, 130, 246, 0.2)',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseOver={e => {
                                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseOut={e => {
                                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Preview Card - Only visible on small screens via CSS/MediaQuery logic, but placed here for flow */}
                        <div className="mobile-preview" style={{ marginBottom: '3rem', display: 'none' }}>
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
                                <div style={{ padding: '2rem', textAlign: 'center' }}>
                                    <a
                                        href="https://cercavins.vercel.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary"
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.8rem',
                                            padding: '0.8rem 1.5rem',
                                            borderRadius: '3rem',
                                            fontSize: '1.1rem',
                                            fontWeight: 'bold',
                                            textDecoration: 'none',
                                            width: '100%',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {t('projects.sommelier.try_button')}
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                            </div>
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

                        <div style={{ marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
                                {t('projects.sommelier.architecture_title')}
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <Cpu size={24} style={{ color: 'var(--accent-primary)', marginTop: '0.2rem', flexShrink: 0 }} />
                                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', margin: 0 }}>
                                        {t('projects.sommelier.architecture_ai')}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <Database size={24} style={{ color: 'var(--accent-primary)', marginTop: '0.2rem', flexShrink: 0 }} />
                                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', margin: 0 }}>
                                        {t('projects.sommelier.architecture_data')}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <Code2 size={24} style={{ color: 'var(--accent-primary)', marginTop: '0.2rem', flexShrink: 0 }} />
                                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', margin: 0 }}>
                                        {t('projects.sommelier.architecture_dev')}
                                    </p>
                                </div>
                            </div>
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
                        className="desktop-preview"
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
                                    href="https://cercavins.vercel.app/"
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
