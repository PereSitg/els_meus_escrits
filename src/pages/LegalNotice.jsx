import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function LegalNotice() {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
        const meta = document.createElement('meta');
        meta.name = "robots";
        meta.content = "noindex, nofollow";
        document.head.appendChild(meta);
        return () => document.head.removeChild(meta);
    }, []);

    return (
        <div className="legal-page" style={{ paddingTop: '5rem', paddingBottom: '8rem' }}>
            <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                        lineHeight: '1.1',
                        marginBottom: '3rem',
                        fontWeight: '800',
                        letterSpacing: '-0.04em',
                        color: '#ffffff'
                    }}>
                        {t('legal.title')}
                    </h1>

                    <div style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        color: 'var(--text-secondary)'
                    }}>
                        <p style={{ marginBottom: '2rem' }}>
                            {t('legal.intro')}
                        </p>

                        <h2 style={{ color: '#ffffff', fontSize: '1.5rem', marginTop: '3rem', marginBottom: '1rem' }}>
                            {t('legal.owner_title')}
                        </h2>
                        <p style={{ marginBottom: '1rem' }}><strong>{t('legal.owner_label')}:</strong> Pere Badia i Lorenz</p>
                        <p style={{ marginBottom: '1rem' }}><strong>{t('legal.contact_label')}:</strong> pbadialorenz@gmail.com</p>
                        <p style={{ marginBottom: '2rem' }}><strong>{t('legal.activity_label')}:</strong> {t('legal.activity_text')}</p>

                        <h2 style={{ color: '#ffffff', fontSize: '1.5rem', marginTop: '3rem', marginBottom: '1rem' }}>
                            {t('legal.copyright_title')}
                        </h2>
                        <p style={{ marginBottom: '2rem' }}>
                            {t('legal.copyright_text')}
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
