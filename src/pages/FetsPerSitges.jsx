import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Megaphone, Users, LineChart, Zap, Target, FileText, Share2, Sparkles, Heart, Video, Flag, BarChart3 } from 'lucide-react';
import RelatedProjects from '../components/RelatedProjects';
import { projectsData } from '../data/projects';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function FetsPerSitges() {
    const { t } = useTranslation();
    const [isIndexedOverride, setIsIndexedOverride] = useState(null);
    const project = projectsData.find(p => p.id === 'fets-per-sitges');

    useEffect(() => {
        const fetchSEO = async () => {
            try {
                const docSnap = await getDoc(doc(db, 'site_seo', 'fets-per-sitges'));
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
        window.scrollTo(0, 0);

        if (project) {
            // SEO logic
            document.title = `${project.seoTitle || t('projects.fetspersitges.title')} | Pere Badia i Lorenz`;

            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.name = 'description';
                document.head.appendChild(metaDescription);
            }
            metaDescription.content = project.seoDescription || t('projects.fetspersitges.detail_desc');

            const isPageIndexed = isIndexedOverride !== null ? isIndexedOverride : (project.isIndexed !== false);

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
        }
    }, [project, t, isIndexedOverride]);

    const palette = {
        primary: '#4a0404', // Burgundy
        accent: '#9b1b1b',
        bg: '#0a0505',
        card: 'rgba(74, 4, 4, 0.15)'
    };

    const strategies = [
        { icon: <Zap size={24} />, title: "Viralitat", desc: "Contingut dissenyat per ser compartit de forma orgànica i ràpida.", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { icon: <Target size={24} />, title: "Impacte", desc: "Missatges directes que generen reacció i record en l'electorat.", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { icon: <FileText size={24} />, title: "Síntesi", desc: "Capacitat de resumir propostes complexes en idees clares i potents.", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { icon: <Sparkles size={24} />, title: "Rigor", desc: "Base de dades i anàlisi darrera de cada afirmació i estratègia.", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
    ];

    return (
        <div className="project-detail-page" style={{
            paddingTop: '2rem',
            paddingBottom: '6rem',
            background: `linear-gradient(180deg, ${palette.bg} 0%, #1a0202 100%)`,
            minHeight: '100vh',
            color: '#fff'
        }}>
            <div className="container">
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
                <div className="project-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="project-title" style={{
                            fontSize: 'clamp(3rem, 8vw, 5rem)',
                            marginBottom: '1rem',
                            letterSpacing: '-0.04em',
                            color: '#fff',
                            fontWeight: '900',
                            textTransform: 'uppercase'
                        }}>
                            {t('projects.fetspersitges.title')}
                        </h1>
                        <p style={{
                            fontSize: '1.5rem',
                            color: palette.accent,
                            fontWeight: '600',
                            letterSpacing: '0.1em',
                            marginBottom: '3rem'
                        }}>
                            ESTRATÈGIA DE GUERRILLA DIGITAL
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {['Política', 'Estratègia', 'Consultoria'].map(tag => (
                                <span key={tag} style={{
                                    fontSize: '0.8rem',
                                    padding: '0.5rem 1.5rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: '#fff',
                                    borderRadius: '0.2rem',
                                    fontWeight: '700',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    textTransform: 'uppercase'
                                }}>{tag}</span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Main Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '6rem', alignItems: 'center' }} className="mobile-stack">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#fff', borderLeft: `8px solid ${palette.primary}`, paddingLeft: '1.5rem' }}>
                            La força de la síntesi
                        </h2>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>
                            {t('projects.fetspersitges.detail_desc')}
                        </p>
                        <div style={{ padding: '2rem', background: palette.card, border: `1px solid ${palette.primary}`, borderRadius: '0.5rem' }}>
                            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', margin: 0 }}>"{t('projects.fetspersitges.author_note')}"</p>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div style={{ position: 'relative', borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 0 50px rgba(74, 4, 4, 0.4)' }}>
                            <img src="/portada.png" alt="Fets per Sitges" style={{ width: '100%', display: 'block' }} />
                        </div>
                    </motion.div>
                </div>

                {/* Strategy Blocks */}
                <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem' }}>Estratègies d'Impacte</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
                    {strategies.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            style={{
                                background: palette.card,
                                padding: '2rem',
                                borderTop: `4px solid ${palette.primary}`,
                                borderRadius: '0.3rem'
                            }}
                        >
                            <div style={{ color: palette.accent, marginBottom: '1rem' }}>{s.icon}</div>
                            <h3 style={{ marginBottom: '1rem' }}>{s.title}</h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>{s.desc}</p>
                            <div style={{ aspectRatio: '16/9', background: '#000', borderRadius: '0.3rem', overflow: 'hidden' }}>
                                <iframe width="100%" height="100%" src={s.video} frameBorder="0" allowFullScreen></iframe>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Guerrilla Strategy Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '8rem', alignItems: 'center' }} className="mobile-stack">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div style={{
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            color: palette.accent,
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            marginBottom: '1rem'
                        }}>
                            Impacte Total
                        </div>
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem', color: '#fff', lineHeight: '1.1' }}>
                            666 vots. <br />
                            <span style={{ color: palette.accent }}>0€ de pressupost.</span>
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <div style={{ color: palette.accent }}><Video size={32} /></div>
                                <div>
                                    <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Narrativa "APM"</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
                                        Ús intel·ligent de clips virals i humor per desmuntar l'status quo. Una guerrilla digital on el contingut és el projectil.
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <div style={{ color: palette.accent }}><Flag size={32} /></div>
                                <div>
                                    <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Impacte Físic: La Lona</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
                                        Quan el món digital prem per saltar al carrer. Estratègia mixta on la visibilitat física va retroalimentar l'abast online.
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <div style={{ color: palette.accent }}><BarChart3 size={32} /></div>
                                <div>
                                    <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Data Driven</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
                                        Cada publicació, cada hora de llançament i cada segmentació va ser fruit d'un anàlisi de dades previ rigorós.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        style={{ position: 'relative' }}
                    >
                        <div style={{
                            position: 'absolute',
                            inset: '-20px',
                            border: `2px solid ${palette.primary}`,
                            borderRadius: '1rem',
                            zIndex: 0
                        }}></div>
                        <img
                            src="/portada.png"
                            alt="Estratègia Guerrilla"
                            style={{
                                width: '100%',
                                borderRadius: '1rem',
                                position: 'relative',
                                zIndex: 1,
                                boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.5)'
                            }}
                        />
                    </motion.div>
                </div>

                {/* Humanidad Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        background: `linear-gradient(135deg, ${palette.primary} 0%, #2a0202 100%)`,
                        padding: '6rem 4rem',
                        borderRadius: '2rem',
                        textAlign: 'center',
                        marginBottom: '8rem',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <Heart size={64} style={{ marginBottom: '2rem', color: '#fff' }} />
                        <h2 style={{ fontSize: '3rem', marginBottom: '2rem', fontWeight: '800' }}>Inclusivitat Real</h2>
                        <p style={{ fontSize: '1.5rem', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8', opacity: 0.9 }}>
                            L'estratègia no va ser només algorítmica. Treballar braç a braç amb persones amb
                            <strong style={{ color: '#fff' }}> altres capacitats </strong> ens va permetre humanitzar el missatge
                            i connectar amb l'ànima de Sitges de forma genuïna.
                        </p>
                    </div>
                    {/* Background Texture */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0.1,
                        background: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")'
                    }}></div>
                </motion.div>

                <RelatedProjects currentProjectId="fets-per-sitges" />
            </div>
        </div>
    );
}
