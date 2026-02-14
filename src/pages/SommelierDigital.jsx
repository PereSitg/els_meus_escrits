import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, CheckCircle2, Cpu, Code2, Database, Layout } from 'lucide-react';
import RelatedProjects from '../components/RelatedProjects';
import { projectsData } from '../data/projects';
import { useSEO } from '../hooks/useSEO';

export default function SommelierDigital() {
    const { t } = useTranslation();
    const project = projectsData.find(p => p.id === 'sommelier-digital');
    useSEO('sommelier-digital', 'projects.sommelier.title');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const tags = ['IA', 'Python', 'Gemini API', 'LangChain'];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '3rem', background: 'var(--bg-primary)' }}
        >
            <div className="container" style={{ maxWidth: '1200px' }}>
                {/* Navegació Superior */}
                <Link
                    to="/projects"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        marginBottom: '2rem',
                        transition: 'color 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                    <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} />
                    {t('projects.sommelier.back_button') || t('common.back_to_projects')}
                </Link>

                {/* Header del Projecte */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', marginBottom: '4rem' }} className="lg-grid-2">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '-0.02em', color: '#ffffff' }}>
                            Sommelier Digital
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.7' }}>
                            {t('projects.sommelier.detail_desc')}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    style={{
                                        padding: '0.4rem 1rem',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: 'rgba(255,255,255,0.8)',
                                        borderRadius: '2rem',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <a
                            href="https://cercavins.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '1rem 2rem',
                                background: 'var(--accent-primary)',
                                color: 'white',
                                borderRadius: '0.75rem',
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                transition: 'transform 0.2s, background 0.2s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            {t('projects.sommelier.try_button') || t('common.visit_site')}
                            <ExternalLink size={18} style={{ marginLeft: '0.6rem' }} />
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
                    >
                        <img
                            src="/sommelier_digital.png"
                            alt="Sommelier Digital Interface"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </motion.div>
                </div>

                {/* Detalls Tècnics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
                    <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <Cpu size={32} style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }} />
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#ffffff' }}>{t('projects.sommelier.architecture_title') || t('projects.detail.engine')}</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Google Gemini Flash 1.5 & LangChain</p>
                    </div>
                    <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <Code2 size={32} style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }} />
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#ffffff' }}>Frontend</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>React, Tailwind CSS, Framer Motion</p>
                    </div>
                    <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <Database size={32} style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }} />
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#ffffff' }}>Databases</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Cloudinary & Firebase (Firestore)</p>
                    </div>
                </div>

                {/* Història i Solució */}
                <div style={{ marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2.5rem', color: '#ffffff' }}>{t('projects.sommelier.detail_title')}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }} className="lg-grid-2">
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                                {t('projects.sommelier.challenge_text') || t('projects.sommelier.detail_desc')}
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {[1, 2, 3].map((i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                                        <CheckCircle2 size={24} style={{ color: '#10b981', flexShrink: 0 }} />
                                        <span style={{ fontSize: '1.1rem' }}>{t(`projects.sommelier.feature_${i}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '2.5rem', borderRadius: '2rem', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                            <h3 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                                <Layout size={24} style={{ marginRight: '0.75rem', color: 'var(--accent-primary)' }} />
                                {t('projects.sommelier.features_title')}
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '2rem' }}>
                                "{t('projects.sommelier.author_note')}"
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Precisió maridatge</span>
                                    <span style={{ fontWeight: 'bold', color: 'var(--accent-primary)' }}>98%</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Temps de resposta</span>
                                    <span style={{ fontWeight: 'bold', color: 'var(--accent-primary)' }}>&lt; 1.2s</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projectes Relacionats */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '4rem' }}>
                    <RelatedProjects currentProjectId="sommelier-digital" />
                </div>
            </div>
            <style>{`
            @media (min-width: 1024px) {
              .lg-grid-2 { grid-template-columns: 1fr 1fr !important; }
            }
          `}</style>
        </motion.div>
    );
}
