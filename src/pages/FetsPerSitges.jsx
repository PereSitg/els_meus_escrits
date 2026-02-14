import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Megaphone, Users, LineChart, Zap, Target, FileText, Share2, Sparkles, Heart, Video, Flag, BarChart3 } from 'lucide-react';
import RelatedProjects from '../components/RelatedProjects';
import { projectsData } from '../data/projects';
import { useSEO } from '../hooks/useSEO';

function Counter({ value, duration = 2, delay = 0 }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let timer;
        const startCounter = () => {
            let start = 0;
            const end = parseInt(value);
            if (start === end) return;

            let totalMiliseconds = duration * 1000;
            let increment = end / (totalMiliseconds / 16); // 60fps approx

            timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
        };

        const timeout = setTimeout(startCounter, delay * 1000);

        return () => {
            clearTimeout(timeout);
            if (timer) clearInterval(timer);
        };
    }, [value, duration, delay]);

    return <span>{count.toLocaleString()}</span>;
}

export default function FetsPerSitges() {
    const { t } = useTranslation();
    const project = projectsData.find(p => p.id === 'fets-per-sitges');
    useSEO('fets-per-sitges', 'projects.fetspersitges.title');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const palette = {
        primary: '#4a0404', // Burgundy
        accent: '#9b1b1b',
        bg: '#0a0505',
        card: 'rgba(74, 4, 4, 0.15)'
    };

    const strategies = [
        {
            icon: <Zap size={24} />,
            title: t('projects.fetspersitges.strategies.creativity.title'),
            desc: t('projects.fetspersitges.strategies.creativity.desc'),
            video: "https://www.youtube.com/embed/rHs7s1ii80c"
        },
        {
            icon: <Target size={24} />,
            title: t('projects.fetspersitges.strategies.impact.title'),
            desc: t('projects.fetspersitges.strategies.impact.desc'),
            video: "https://www.youtube.com/embed/CMan_RnV9T8"
        },
        {
            icon: <FileText size={24} />,
            title: t('projects.fetspersitges.strategies.synthesis.title'),
            desc: t('projects.fetspersitges.strategies.synthesis.desc'),
            video: "https://www.youtube.com/embed/9y1H5EAkEgo"
        },
        {
            icon: <Heart size={24} />,
            title: t('projects.fetspersitges.strategies.commitment.title'),
            desc: t('projects.fetspersitges.strategies.commitment.desc'),
            video: "https://www.youtube.com/embed/riKl5denoyU"
        },
        {
            icon: <Users size={24} />,
            title: t('projects.fetspersitges.strategies.honesty.title'),
            desc: t('projects.fetspersitges.strategies.honesty.desc'),
            video: "https://www.youtube.com/embed/JTYcu4o0DmM"
        },
        {
            icon: <Flag size={24} />,
            title: t('projects.fetspersitges.strategies.territory.title'),
            desc: t('projects.fetspersitges.strategies.territory.desc'),
            video: "https://www.youtube.com/embed/VHkBiCUa20k"
        }
    ];

    return (
        <div className="project-detail-page" style={{
            paddingTop: '2rem',
            paddingBottom: '6rem',
            background: `linear-gradient(180deg, ${palette.bg} 0%, #1a0202 100%)`,
            minHeight: '100vh',
            color: '#fff'
        }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                <Link to="/projects" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    marginBottom: '3rem',
                    fontSize: '1rem',
                    transition: 'color 0.2s'
                }} className="back-link">
                    <ArrowLeft size={20} />
                    {t('projects.fetspersitges.back_button')}
                </Link>

                {/* Hero Section */}
                <div className="project-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="project-title" style={{
                            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                            marginBottom: '0.5rem',
                            letterSpacing: '-0.02em',
                            color: '#fff',
                            fontWeight: '700',
                            textTransform: 'uppercase'
                        }}>
                            {t('projects.fetspersitges.title')}
                        </h1>
                        <p style={{
                            fontSize: 'clamp(1rem, 3.5vw, 1.25rem)',
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontWeight: '300',
                            letterSpacing: '0.05em',
                            marginBottom: '2.5rem',
                            maxWidth: '700px',
                            marginInline: 'auto'
                        }}>
                            {t('projects.fetspersitges.subtitle')}
                        </p>

                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {['Política', 'Estratègia', 'Consultoria'].map(tag => (
                                <span key={tag} style={{
                                    fontSize: '0.7rem',
                                    padding: '0.35rem 1rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    color: 'rgba(255,255,255,0.6)',
                                    borderRadius: '0.2rem',
                                    fontWeight: '500',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    textTransform: 'uppercase'
                                }}>{tag}</span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Main Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 5vw, 4rem)', marginBottom: '8rem', alignItems: 'center' }} className="mobile-stack">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                            {t('projects.fetspersitges.apm_title')}
                        </h2>
                        <p style={{ fontSize: 'clamp(1.05rem, 3vw, 1.15rem)', lineHeight: '1.7', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem' }}>
                            {t('projects.fetspersitges.apm_desc')}
                        </p>
                        <div style={{ padding: '2rem', background: palette.card, borderLeft: `8px solid ${palette.primary}`, borderRadius: '0.25rem' }}>
                            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', margin: 0, opacity: 0.9 }}>"{t('projects.fetspersitges.author_note')}"</p>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div style={{ position: 'relative', borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 0 50px rgba(74, 4, 4, 0.4)', background: '#000', aspectRatio: '16/9' }}>
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/b45yd7vJuU8"
                                title="Fets per Sitges - Clip Nadales"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <p style={{
                            fontSize: '0.85rem',
                            color: 'rgba(255,255,255,0.5)',
                            marginTop: '1.25rem',
                            fontStyle: 'italic',
                            lineHeight: '1.5',
                            textAlign: 'center',
                            padding: '0 1rem'
                        }}>
                            {t('projects.fetspersitges.video_caption')}
                        </p>
                    </motion.div>
                </div>

                {/* Strategy Blocks Grid */}
                <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', marginBottom: '4rem' }}>{t('projects.fetspersitges.strategy_heading')}</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    gap: '2rem',
                    marginBottom: '8rem'
                }} className="md:grid-cols-3">
                    <style>{`
                        @media (min-width: 768px) {
                            .md\\:grid-cols-3 {
                                grid-template-columns: repeat(3, 1fr) !important;
                            }
                        }
                    `}</style>
                    {strategies.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            style={{
                                background: s.isPlaceholder ? 'rgba(255,255,255,0.02)' : palette.card,
                                padding: '2.5rem 2rem',
                                borderTop: `4px solid ${s.isPlaceholder ? 'rgba(255,255,255,0.05)' : palette.primary}`,
                                borderRadius: '0.3rem',
                                display: 'flex',
                                flexDirection: 'column',
                                opacity: s.isPlaceholder ? 0.6 : 1,
                                border: s.isPlaceholder ? '1px dashed rgba(255,255,255,0.1)' : 'none'
                            }}
                        >
                            <div style={{ color: s.isPlaceholder ? 'rgba(255,255,255,0.3)' : palette.accent, marginBottom: '1.25rem' }}>{s.icon}</div>
                            <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', color: s.isPlaceholder ? 'rgba(255,255,255,0.5)' : '#fff' }}>{s.title}</h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem', flex: 1 }}>{s.desc}</p>

                            {s.video ? (
                                <div style={{ aspectRatio: '16/9', background: '#000', borderRadius: '0.3rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <iframe width="100%" height="100%" src={s.video} frameBorder="0" allowFullScreen></iframe>
                                </div>
                            ) : (
                                <div style={{
                                    aspectRatio: '16/9',
                                    background: 'rgba(255,255,255,0.02)',
                                    borderRadius: '0.3rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px dashed rgba(255,255,255,0.05)'
                                }}>
                                    <Sparkles size={20} style={{ opacity: 0.1 }} />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Guerrilla Strategy Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 5vw, 5rem)', marginBottom: '8rem', alignItems: 'center' }} className="mobile-stack">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div style={{
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            color: palette.accent,
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            marginBottom: '1.25rem'
                        }}>
                            {t('projects.fetspersitges.roi_label')}
                        </div>
                        <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3.2rem)', marginBottom: '2.5rem', color: '#fff', lineHeight: '1.1' }}>
                            {t('projects.fetspersitges.roi_title')}
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            {[
                                { icon: <Video size={32} />, key: 'narrative' },
                                { icon: <Flag size={32} />, key: 'lona' },
                                { icon: <BarChart3 size={32} />, key: 'data' }
                            ].map(item => (
                                <div key={item.key} style={{ display: 'flex', gap: '1.5rem' }}>
                                    <div style={{ color: palette.accent, flexShrink: 0 }}>{item.icon}</div>
                                    <div>
                                        <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{t(`projects.fetspersitges.features.${item.key}.title`)}</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '1.05rem' }}>
                                            {t(`projects.fetspersitges.features.${item.key}.desc`)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        style={{
                            position: 'relative',
                            background: 'rgba(255,255,255,0.02)',
                            padding: 'clamp(1.5rem, 4vw, 3rem)',
                            borderRadius: '1rem',
                            border: '1px solid rgba(255,255,255,0.05)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        <h3 style={{
                            fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                            marginBottom: '2.5rem',
                            fontWeight: '600',
                            textAlign: 'center',
                            color: 'rgba(255,255,255,0.9)'
                        }}>
                            {t('projects.fetspersitges.chart_title')}
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                            {[
                                { name: 'Junts', votes: 1928, percentage: 17.17, color: 'rgba(255,255,255,0.15)', delay: 0.1, duration: 1.2 },
                                { name: 'ERC', votes: 1710, percentage: 15.23, color: 'rgba(255,255,255,0.15)', delay: 0.2, duration: 1.2 },
                                { name: 'PSC', votes: 1503, percentage: 13.38, color: 'rgba(255,255,255,0.15)', delay: 0.3, duration: 1.2 },
                                { name: 'FETS PER SITGES', votes: 666, percentage: 5.93, color: '#800020', highlight: true, delay: 0.5, duration: 1.5 },
                                { name: 'Altres', votes: 5493, percentage: 48.29, color: 'rgba(255,255,255,0.08)', delay: 0.4, duration: 1.2 }
                            ].map((result, idx) => (
                                <div key={idx} style={{ position: 'relative' }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '0.6rem',
                                        fontSize: '0.85rem',
                                        color: result.highlight ? '#fff' : 'rgba(255,255,255,0.5)',
                                        fontWeight: result.highlight ? '700' : '400'
                                    }}>
                                        <span>{result.name}</span>
                                        <span>
                                            {result.highlight ? (
                                                <motion.span
                                                    initial={{ opacity: 0 }}
                                                    whileInView={{ opacity: 1 }}
                                                    viewport={{ once: true, amount: 0.5 }}
                                                >
                                                    <Counter value={666} delay={result.delay} duration={result.duration} />
                                                </motion.span>
                                            ) : result.votes.toLocaleString()} {t('projects.fetspersitges.votes_label')} ({result.percentage}%)
                                        </span>
                                    </div>
                                    <div style={{
                                        height: '10px',
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        border: '1px solid rgba(255,255,255,0.02)'
                                    }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${(result.percentage / 48.29) * 100}%` }}
                                            transition={{ duration: result.duration, ease: [0.34, 1.56, 0.64, 1], delay: result.delay }}
                                            viewport={{ once: true, amount: 0.5 }}
                                            style={{
                                                height: '100%',
                                                background: result.color,
                                                borderRadius: '20px',
                                                boxShadow: result.highlight ? '0 0 20px rgba(128, 0, 32, 0.4)' : 'none',
                                                zIndex: result.highlight ? 10 : 1
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{
                            marginTop: '2.5rem',
                            paddingTop: '1.5rem',
                            borderTop: '1px solid rgba(255,255,255,0.05)',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '3rem'
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#800020', lineHeight: '1' }}>1</div>
                                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.5, marginTop: '0.5rem', letterSpacing: '0.1em' }}>
                                    {t('projects.fetspersitges.councillors_label')}
                                </div>
                            </div>
                            <div style={{ alignSelf: 'center', maxWidth: '150px' }}>
                                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', margin: 0, fontStyle: 'italic', lineHeight: '1.4' }}>
                                    {t('projects.fetspersitges.roi_title')}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Inclusivity Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        background: `linear-gradient(135deg, ${palette.primary} 0%, #2a0202 100%)`,
                        padding: 'clamp(3rem, 10vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
                        borderRadius: '1.5rem',
                        textAlign: 'center',
                        marginBottom: '8rem',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <Heart size={50} style={{ marginBottom: '2rem', color: '#fff' }} />
                        <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '2rem', fontWeight: '800' }}>
                            {t('projects.fetspersitges.human_title')}
                        </h2>
                        <p style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', maxWidth: '850px', margin: '0 auto', lineHeight: '1.8', opacity: 0.9 }}>
                            {t('projects.fetspersitges.human_desc')}
                        </p>
                    </div>
                </motion.div>

                <RelatedProjects currentProjectId="fets-per-sitges" />
            </div>
        </div>
    );
}
