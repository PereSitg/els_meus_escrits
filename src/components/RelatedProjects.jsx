import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { projectsData } from '../data/projects';

export default function RelatedProjects({ currentProjectId }) {
    const { t } = useTranslation();

    // Filter out current project and pick random ones (up to 3)
    const related = projectsData
        .filter(p => p.id !== currentProjectId)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    if (related.length === 0) return null;

    return (
        <section style={{ marginTop: '8rem', paddingTop: '4rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center', fontWeight: '800' }}>
                {t('projects.related_title') || 'Altres Projectes'}
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2.5rem'
            }}>
                {related.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Link to={`/projects/${project.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{
                                background: 'var(--bg-secondary)',
                                borderRadius: '1.5rem',
                                overflow: 'hidden',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                                className="related-project-card"
                                onMouseOver={e => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={{ height: '200px', overflow: 'hidden' }}>
                                    <img
                                        src={project.image}
                                        alt={project.id}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontWeight: '700' }}>
                                        {t(`projects.${project.translationKey}.title`)}
                                    </h3>
                                    <p style={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.95rem',
                                        lineHeight: '1.5',
                                        marginBottom: '1.5rem',
                                        flexGrow: 1
                                    }}>
                                        {t(`projects.${project.translationKey}.desc`)}
                                    </p>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: 'var(--accent-primary)',
                                        fontWeight: '600'
                                    }}>
                                        {t('home.read_more')} <ChevronRight size={18} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
