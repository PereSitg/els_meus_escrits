import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import { projectsData, allTags } from '../data/projects';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Projects() {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const [activeFilter, setActiveFilter] = useState('All');
    const [isIndexedOverride, setIsIndexedOverride] = useState(null);

    useEffect(() => {
        const fetchSEO = async () => {
            try {
                const docSnap = await getDoc(doc(db, 'site_seo', 'projects_list'));
                if (docSnap.exists()) {
                    setIsIndexedOverride(docSnap.data().isIndexed);
                }
            } catch (error) {
                console.error("Error fetching SEO status:", error);
            }
        };
        fetchSEO();
    }, []);

    useEffect(() => {
        // SEO logic
        document.title = `${t('projects.title')} | Pere Badia i Lorenz`;

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = t('projects.description');

        const isPageIndexed = isIndexedOverride !== null ? isIndexedOverride : true;

        let metaRobots = document.querySelector('meta[name="robots"]');
        if (isPageIndexed === false) {
            if (!metaRobots) {
                metaRobots = document.createElement('meta');
                metaRobots.name = 'robots';
                document.head.appendChild(metaRobots);
            }
            metaRobots.content = "noindex, nofollow";
        } else if (metaRobots) {
            metaRobots.remove();
        }
    }, [t, isIndexedOverride]);

    useEffect(() => {
        const tag = searchParams.get('tag');
        if (tag && allTags.includes(tag)) {
            setActiveFilter(tag);
        } else {
            setActiveFilter('All');
        }
    }, [searchParams]);

    const filteredProjects = activeFilter === 'All'
        ? projectsData
        : projectsData.filter(project => {
            if (activeFilter === 'IA') return project.category === 'dev_ia';
            if (activeFilter === 'Politica') return project.category === 'strat_pol';
            if (activeFilter === 'Consultoria') return project.id === 'fets-per-sitges';
            return true;
        });

    return (
        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>{t('projects.title')}</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px', marginBottom: '3rem' }}>
                    {t('projects.description')}
                </p>

                {/* Category Filter Bar */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '4rem',
                    flexWrap: 'wrap',
                    padding: '0.5rem',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '3rem',
                    border: '1px solid rgba(255,255,255,0.05)',
                    width: 'fit-content'
                }}>
                    <button
                        onClick={() => setActiveFilter('All')}
                        style={{
                            padding: '0.6rem 1.5rem',
                            borderRadius: '2rem',
                            border: 'none',
                            background: activeFilter === 'All' ? 'var(--accent-primary)' : 'transparent',
                            color: activeFilter === 'All' ? 'white' : 'var(--text-secondary)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {t('projects.filter_all', 'Tots')}
                    </button>
                    <button
                        onClick={() => setActiveFilter('IA')}
                        style={{
                            padding: '0.6rem 1.5rem',
                            borderRadius: '2rem',
                            border: 'none',
                            background: activeFilter === 'IA' ? 'var(--accent-primary)' : 'transparent',
                            color: activeFilter === 'IA' ? 'white' : 'var(--text-secondary)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {t('nav.dev_ia')}
                    </button>
                    <button
                        onClick={() => setActiveFilter('Politica')}
                        style={{
                            padding: '0.6rem 1.5rem',
                            borderRadius: '2rem',
                            border: 'none',
                            background: activeFilter === 'Politica' ? 'var(--accent-primary)' : 'transparent',
                            color: activeFilter === 'Politica' ? 'white' : 'var(--text-secondary)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {t('nav.strat_pol')}
                    </button>
                    <button
                        onClick={() => setActiveFilter('Consultoria')}
                        style={{
                            padding: '0.6rem 1.5rem',
                            borderRadius: '2rem',
                            border: 'none',
                            background: activeFilter === 'Consultoria' ? 'var(--accent-primary)' : 'transparent',
                            color: activeFilter === 'Consultoria' ? 'white' : 'var(--text-secondary)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {t('nav.consultancy')}
                    </button>
                </div>

                <div className="projects-grid">
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map(project => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                            >
                                {project.comingSoon ? (
                                    <div style={{
                                        background: 'var(--bg-secondary)',
                                        borderRadius: '1.5rem',
                                        overflow: 'hidden',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        height: '100%',
                                        position: 'relative'
                                    }}>
                                        <div style={{
                                            width: '100%',
                                            aspectRatio: '16/9',
                                            overflow: 'hidden',
                                            filter: 'grayscale(100%) blur(2px)',
                                            opacity: 0.5
                                        }}>
                                            <img
                                                src={project.image}
                                                alt={t(`projects.${project.translationKey}.title`)}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div style={{
                                            position: 'absolute',
                                            top: '2rem',
                                            right: '2rem',
                                            background: 'var(--accent-primary)',
                                            color: 'white',
                                            padding: '0.4rem 1rem',
                                            borderRadius: '2rem',
                                            fontSize: '0.8rem',
                                            fontWeight: 'bold',
                                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
                                        }}>
                                            Coming Soon
                                        </div>
                                        <div style={{ padding: '2rem' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                                {project.tags.map(tag => (
                                                    <span
                                                        key={tag}
                                                        style={{
                                                            fontSize: '0.75rem',
                                                            padding: '0.2rem 0.6rem',
                                                            background: 'rgba(255, 255, 255, 0.05)',
                                                            color: 'var(--text-secondary)',
                                                            borderRadius: '2rem',
                                                            fontWeight: '600'
                                                        }}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', opacity: 0.8 }}>
                                                {t(`projects.${project.translationKey}.title`)}
                                            </h3>
                                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem', opacity: 0.8 }}>
                                                {t(`projects.${project.translationKey}.desc`)}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <Link to={`/projects/${project.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <motion.div
                                            whileHover={{ y: -10 }}
                                            style={{
                                                background: 'var(--bg-secondary)',
                                                borderRadius: '1.5rem',
                                                overflow: 'hidden',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                cursor: 'pointer',
                                                height: '100%'
                                            }}
                                        >
                                            <div style={{
                                                width: '100%',
                                                aspectRatio: '16/9',
                                                overflow: 'hidden'
                                            }}>
                                                <img
                                                    src={project.image}
                                                    alt={t(`projects.${project.translationKey}.title`)}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <div style={{ padding: '2rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                        {project.tags.map(tag => (
                                                            <span
                                                                key={tag}
                                                                style={{
                                                                    fontSize: '0.75rem',
                                                                    padding: '0.2rem 0.6rem',
                                                                    background: 'rgba(59, 130, 246, 0.1)',
                                                                    color: 'var(--accent-primary)',
                                                                    borderRadius: '2rem',
                                                                    fontWeight: '600'
                                                                }}
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <span style={{
                                                        fontSize: '0.7rem',
                                                        color: 'var(--text-secondary)',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em',
                                                        fontWeight: '700'
                                                    }}>
                                                        {t(`projects.categories.${project.category}`)}
                                                    </span>
                                                </div>
                                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                                                    {t(`projects.${project.translationKey}.title`)}
                                                </h3>
                                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                                    {t(`projects.${project.translationKey}.desc`)}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </Link>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
