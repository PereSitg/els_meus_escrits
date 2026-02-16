import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';

export default function CookiePolicy() {
    const { t } = useTranslation();
    useSEO('politica_cookies', 'nav.cookies', false);

    useEffect(() => {
        window.scrollTo(0, 0);
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
                        {t('cookies.title')}
                    </h1>

                    <div style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        color: 'var(--text-secondary)'
                    }}>
                        <p style={{ marginBottom: '2rem' }}>
                            {t('cookies.intro')}
                        </p>

                        <h2 style={{ color: '#ffffff', fontSize: '1.5rem', marginTop: '3rem', marginBottom: '1rem' }}>
                            {t('cookies.what_title')}
                        </h2>
                        <p style={{ marginBottom: '2rem' }}>
                            {t('cookies.what_text')}
                        </p>

                        <h2 style={{ color: '#ffffff', fontSize: '1.5rem', marginTop: '3rem', marginBottom: '1rem' }}>
                            {t('cookies.types_title')}
                        </h2>
                        <p style={{ marginBottom: '1rem' }}>
                            <strong>{t('cookies.technical_label')}:</strong> {t('cookies.technical_text')}
                        </p>
                        <p style={{ marginBottom: '2rem' }}>
                            <strong>{t('cookies.analytics_label')}:</strong> {t('cookies.analytics_text')}
                        </p>

                        <p style={{ marginBottom: '2rem' }}>
                            {t('cookies.config_text')}
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
