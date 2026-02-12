import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Projects() {
    const { t } = useTranslation();

    return (
        <div className="container" style={{ paddingTop: '4rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>{t('projects.title')}</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px', marginBottom: '4rem' }}>
                    {t('projects.description')}
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '2.5rem'
                }}>
                    <motion.div
                        whileHover={{ y: -10 }}
                        style={{
                            background: 'var(--bg-secondary)',
                            borderRadius: '1.5rem',
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.05)',
                            cursor: 'pointer'
                        }}
                    >
                        <div style={{
                            width: '100%',
                            aspectRatio: '16/9',
                            overflow: 'hidden'
                        }}>
                            <img
                                src="/sommelier_digital.png"
                                alt="Sommelier Digital"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                {['IA', 'Python', 'Gemini API', 'LangChain'].map(tag => (
                                    <span key={tag} style={{
                                        fontSize: '0.75rem',
                                        padding: '0.2rem 0.6rem',
                                        background: 'rgba(59, 130, 246, 0.1)',
                                        color: 'var(--accent-primary)',
                                        borderRadius: '2rem',
                                        fontWeight: '600'
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t('projects.sommelier.title')}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                {t('projects.sommelier.desc')}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
