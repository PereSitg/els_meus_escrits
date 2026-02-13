import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', email: '', message: '', captcha: '' });
    const [captchaNums, setCaptchaNums] = useState({ n1: 0, n2: 0 });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        setCaptchaNums({
            n1: Math.floor(Math.random() * 10) + 1,
            n2: Math.floor(Math.random() * 10) + 1
        });
        setFormData(prev => ({ ...prev, captcha: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (parseInt(formData.captcha) !== captchaNums.n1 + captchaNums.n2) {
            setError(t('contact.form.captcha_error'));
            generateCaptcha();
            return;
        }

        // Aquí aniria la lògica d'enviament (Firebase, EmailJS, etc.)
        console.log('Form submited:', formData);
        setSuccess(true);
        setFormData({ name: '', email: '', message: '', captcha: '' });
        setTimeout(() => setSuccess(false), 5000);
    };

    return (
        <div className="contact-page" style={{ paddingTop: '6rem', paddingBottom: '8rem' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
                    {/* BIOGRAFIA / INTRO */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
                            {t('contact.bio_title')}
                        </h1>

                        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.05rem' }}>
                            <p style={{ marginBottom: '1.5rem' }}>{t('contact.bio_p1')}</p>
                            <p style={{ marginBottom: '1.5rem' }}>{t('contact.bio_p2')}</p>
                            <p style={{ marginBottom: '1.5rem' }}>{t('contact.bio_p3')}</p>

                            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                                {[1, 2, 3].map(i => (
                                    <li key={i} style={{ marginBottom: '1.25rem' }}>
                                        <strong style={{ color: 'var(--accent-primary)', display: 'block', marginBottom: '0.25rem' }}>
                                            {t(`contact.bio_f${i}_title`)}
                                        </strong>
                                        {t(`contact.bio_f${i}_desc`)}
                                    </li>
                                ))}
                            </ul>

                            <p style={{
                                fontStyle: 'italic',
                                borderTop: '1px solid rgba(255,255,255,0.1)',
                                paddingTop: '1.5rem',
                                color: '#ffffff'
                            }}>
                                {t('contact.bio_footer')}
                            </p>
                        </div>
                    </motion.div>

                    {/* FORMULARI */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass"
                        style={{
                            padding: '2.5rem',
                            borderRadius: '2rem',
                            border: '1px solid rgba(255,255,255,0.05)',
                            maxWidth: '600px',
                            margin: '0 auto',
                            width: '100%'
                        }}
                    >
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#ffffff' }}>{t('contact.title')}</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '0.9rem' }}>{t('contact.subtitle')}</p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    {t('contact.form.name')}
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    style={{
                                        width: '100%', padding: '1rem', borderRadius: '0.75rem',
                                        border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)',
                                        color: 'white', fontFamily: 'inherit'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    {t('contact.form.email')}
                                </label>
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    style={{
                                        width: '100%', padding: '1rem', borderRadius: '0.75rem',
                                        border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)',
                                        color: 'white', fontFamily: 'inherit'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    {t('contact.form.message')}
                                </label>
                                <textarea
                                    required
                                    rows="4"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    style={{
                                        width: '100%', padding: '1rem', borderRadius: '0.75rem',
                                        border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)',
                                        color: 'white', fontFamily: 'inherit', resize: 'none'
                                    }}
                                ></textarea>
                            </div>

                            <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '1rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#ffffff', fontWeight: '600' }}>
                                    {t('contact.form.captcha_label', { num1: captchaNums.n1, num2: captchaNums.n2 })}
                                </label>
                                <input
                                    required
                                    type="number"
                                    value={formData.captcha}
                                    onChange={(e) => setFormData({ ...formData, captcha: e.target.value })}
                                    style={{
                                        width: '100%', padding: '0.75rem', borderRadius: '0.5rem',
                                        border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)',
                                        color: 'white', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold'
                                    }}
                                />
                            </div>

                            <AnimatePresence>
                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        style={{ color: '#ef4444', fontSize: '0.85rem', textAlign: 'center' }}
                                    >
                                        {error}
                                    </motion.p>
                                )}
                                {success && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        style={{ color: '#10b981', fontSize: '0.85rem', textAlign: 'center', fontWeight: '600' }}
                                    >
                                        {t('contact.form.success')}
                                    </motion.p>
                                )}
                            </AnimatePresence>

                            <button type="submit" style={{
                                padding: '1rem', background: 'var(--accent-primary)', color: 'white',
                                borderRadius: '1rem', fontWeight: 'bold', fontSize: '1rem', border: 'none',
                                cursor: 'pointer', transition: 'transform 0.2s', width: '100%'
                            }}
                                onMouseEnter={e => e.target.style.transform = 'scale(1.02)'}
                                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                            >
                                {t('contact.form.submit')}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
