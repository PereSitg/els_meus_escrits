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
                    {/* Placeholder for projects */}
                    <div style={{
                        background: 'var(--bg-secondary)',
                        padding: '2rem',
                        borderRadius: '1.5rem',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <div style={{
                            width: '100%',
                            aspectRatio: '16/9',
                            background: 'rgba(59, 130, 246, 0.1)',
                            borderRadius: '1rem',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{t('projects.coming_soon')}</span>
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t('projects.placeholder_title')}</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            {t('projects.placeholder_desc')}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
