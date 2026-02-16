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

                {/* Capacitats de l'Assistent */}
                <div style={{ marginBottom: '5rem' }}>
                    <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2.5rem', color: '#ffffff' }}>
                        Capacitats de l'Assistent
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }} className="md-grid-2">
                        {[
                            { title: "Maridatge Intel·ligent", desc: "Recomanacions basades en el tipus de plat i ingredients." },
                            { title: "Gestió de Pressupost", desc: "Filtra les millors opcions segons el rang de preu indicat." },
                            { title: "Perfil Sensorial", desc: "Entén preferències sobre cos, acidesa i varietats de raïm." },
                            { title: "Aprenentatge Continu", desc: "L'assistent millora les respostes amb cada interacció." }
                        ].map((item, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                                <CheckCircle2 size={24} style={{ color: '#10b981', flexShrink: 0, marginTop: '0.2rem' }} />
                                <div>
                                    <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '0.5rem', fontFamily: 'var(--font-body)' }}>{item.title}</h4>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1.05rem' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p style={{ marginTop: '4rem', fontSize: '1.15rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', fontStyle: 'italic', borderLeft: '4px solid var(--accent-primary)', paddingLeft: '2rem', maxWidth: '800px' }}>
                        "Aquest projecte neix de la unió entre la meva formació com a sommelier i la passió per la intel·ligència artificial, buscant democratitzar l'accés al coneixement enològic."
                    </p>
                </div>


                {/* Projectes Relacionats */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '4rem' }}>
                    <RelatedProjects currentProjectId="sommelier-digital" />
                </div>
            </div>
            <style>{`
            @media (min-width: 768px) {
              .md-grid-2 { grid-template-columns: 1fr 1fr !important; }
            }
            @media (min-width: 1024px) {
              .lg-grid-2 { grid-template-columns: 1fr 1fr !important; }
            }
          `}</style>
        </motion.div>
    );
}
