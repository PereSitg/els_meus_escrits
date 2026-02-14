import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Megaphone, Users, LineChart } from 'lucide-react';
import RelatedProjects from '../components/RelatedProjects';

export default function FetsPerSitges() {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const tags = ['Política', 'Estratègia', 'Consultoria'];

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
                    {t('projects.fetspersitges.back_button')}
                </Link>

                <div className="project-header" style={{ marginBottom: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="project-title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                            {t('projects.fetspersitges.title')}
                        </h1>

                        <div className="project-tags" style={{ display: 'flex', gap: '0.8rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
                            {tags.map(tag => (
                                <span
                                    key={tag}
                                    style={{
                                        fontSize: '0.9rem',
                                        padding: '0.4rem 1rem',
                                        background: 'rgba(59, 130, 246, 0.1)',
                                        color: 'var(--accent-primary)',
                                        borderRadius: '2rem',
                                        fontWeight: '600',
                                        border: '1px solid rgba(59, 130, 246, 0.2)'
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="project-content-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem',
                    alignItems: 'start',
                    marginBottom: '4rem'
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
                            {t('projects.fetspersitges.detail_title')}
                        </h2>
                        <div style={{
                            fontSize: '1.15rem',
                            lineHeight: '1.8',
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        }}>
                            <p>{t('projects.fetspersitges.detail_desc')}</p>

                            <div style={{
                                padding: '2rem',
                                background: 'rgba(59, 130, 246, 0.05)',
                                borderRadius: '1.5rem',
                                borderLeft: '4px solid var(--accent-primary)',
                                marginTop: '1rem'
                            }}>
                                <p style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontStyle: 'italic',
                                    fontSize: '1.1rem',
                                    lineHeight: '1.7',
                                    color: 'var(--text-primary)',
                                    margin: 0
                                }}>
                                    "{t('projects.fetspersitges.author_note')}"
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {/* Video Embed with Lazy Loading */}
                        <div style={{
                            width: '100%',
                            aspectRatio: '16/9',
                            background: 'black',
                            borderRadius: '1.5rem',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            marginBottom: '2rem'
                        }}>
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                title="Fets per Sitges Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            * Exemple d'integració de vídeo per al projecte.
                        </p>
                    </motion.div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem',
                    marginBottom: '4rem'
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
                            {t('projects.fetspersitges.architecture_title')}
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <Megaphone size={24} style={{ color: 'var(--accent-primary)', marginTop: '0.2rem', flexShrink: 0 }} />
                                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', margin: 0 }}>
                                    {t('projects.fetspersitges.architecture_ai')}
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <LineChart size={24} style={{ color: 'var(--accent-primary)', marginTop: '0.2rem', flexShrink: 0 }} />
                                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', margin: 0 }}>
                                    {t('projects.fetspersitges.architecture_data')}
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <Users size={24} style={{ color: 'var(--accent-primary)', marginTop: '0.2rem', flexShrink: 0 }} />
                                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', margin: 0 }}>
                                    {t('projects.fetspersitges.architecture_dev')}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
                            {t('projects.fetspersitges.features_title')}
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
                                    {t(`projects.fetspersitges.feature_${i}`)}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                <RelatedProjects currentProjectId="fets-per-sitges" />
            </div>
        </div>
    );
}
