import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'framer-motion';
import { Calendar, Tag, ChevronLeft, ChevronRight, Share2, Clock, BookOpen, Languages, AlertCircle, CheckCircle2 } from 'lucide-react';
import { collection, query, limit, getDocs } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { translateText } from '../lib/translateService';

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [translatedContent, setTranslatedContent] = useState(null);
    const [isTranslating, setIsTranslating] = useState(false);
    const [showTranslation, setShowTranslation] = useState(false);
    const [translationError, setTranslationError] = useState(null);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        // Reiniciar estats per al nou article
        setLoading(true);
        setPost(null);
        setTranslatedContent(null);
        setShowTranslation(false);
        window.scrollTo(0, 0);

        async function fetchPost() {
            try {
                const docSnap = await getDoc(doc(db, "posts", id));
                if (docSnap.exists()) {
                    const data = docSnap.id ? { id: docSnap.id, ...docSnap.data() } : docSnap.data();
                    setPost(data);

                    // SEO: Update Title and Meta Description
                    document.title = `${data.title} | Pere Badia i Lorenz`;

                    const description = data.subtitle || data.content?.substring(0, 160).replace(/\n/g, ' ') || '';
                    let metaDescription = document.querySelector('meta[name="description"]');
                    if (!metaDescription) {
                        metaDescription = document.createElement('meta');
                        metaDescription.name = 'description';
                        document.head.appendChild(metaDescription);
                    }
                    metaDescription.content = description;
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        }

        async function fetchRelated() {
            try {
                const q = query(collection(db, "posts"), limit(10)); // Fetch a few to randomize
                const querySnapshot = await getDocs(q);
                const allPosts = querySnapshot.docs
                    .map(doc => ({ id: doc.id, ...doc.data() }))
                    .filter(p => p.id !== id);

                // Shuffle and pick 3
                const shuffled = allPosts.sort(() => 0.5 - Math.random()).slice(0, 3);
                setRelatedPosts(shuffled);
            } catch (error) {
                console.error("Error fetching related posts:", error);
            }
        }

        fetchPost();
        fetchRelated();

        // Cleanup: Reset title when leaving page
        return () => {
            document.title = 'Pere Badia i Lorenz';
        };
    }, [id]);

    // Reset translation when language changes
    useEffect(() => {
        setShowTranslation(false);
        setTranslatedContent(null);
    }, [i18n.language]);

    // Calcular temps de lectura estimat
    const readingTime = useMemo(() => {
        if (!post?.content) return 0;
        const wordsPerMinute = 200;
        const noOfWords = post.content.split(/\s+/g).length;
        const minutes = noOfWords / wordsPerMinute;
        return Math.ceil(minutes);
    }, [post?.content]);

    // Funció per gestionar la traducció
    const handleTranslate = async () => {
        if (showTranslation) {
            // Si ja estem mostrant la traducció, tornem a l'original
            setShowTranslation(false);
            return;
        }

        if (translatedContent) {
            // Si ja tenim la traducció, només la mostrem
            setShowTranslation(true);
            return;
        }

        // Traduïm el contingut
        setIsTranslating(true);
        setTranslationError(null);
        try {
            const targetLang = i18n.language === 'en' ? 'en' : 'es';
            const translated = await translateText(post.content, targetLang);
            setTranslatedContent(translated);
            setShowTranslation(true);
        } catch (error) {
            console.error('Translation error:', error);
            setTranslationError(t('translation.translation_error'));
        } finally {
            setIsTranslating(false);
        }
    };

    // Determinar si hem de mostrar l'avís de traducció
    const shouldShowTranslationWarning = post &&
        post.category !== 'Ecos de Sociedad' &&
        i18n.language !== 'ca';

    // Processar el contingut en paràgrafs
    const paragraphs = useMemo(() => {
        const content = showTranslation ? translatedContent : post?.content;
        if (!content) return [];
        // Detectem paràgrafs tant si hi ha un com dos salts de línia per donar aire
        return content
            .split(/\n+/)
            .map(p => p.trim())
            .filter(p => p.length > 0);
    }, [post?.content, showTranslation, translatedContent]);

    if (loading) {
        return (
            <div className="container" style={{
                height: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem'
            }}>
                <div className="loader" style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid rgba(255,255,255,0.1)',
                    borderTopColor: 'var(--accent-primary)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <p style={{ color: 'var(--text-secondary)' }}>Preparant la teva lectura...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="container" style={{ paddingTop: '10rem', textAlign: 'center' }}>
                <h2>Article no trobat</h2>
                <Link to="/" className="btn" style={{ marginTop: '1rem', display: 'inline-block' }}>Tornar a l'inici</Link>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="post-detail"
        >
            {/* Hero Image / Header Section */}
            <div
                style={{
                    height: '75vh',
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    background: '#0f172a' // Dark background while loading
                }}
            >
                {post.video ? (
                    <video
                        src={post.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster={post.image}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            zIndex: 1
                        }}
                    />
                ) : (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: `url(${post.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600'}) center/cover`,
                            zIndex: 1
                        }}
                    />
                )}

                {/* Overlay gradient */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.95))',
                    zIndex: 2
                }} />

                {/* Hidden img for SEO crawlers */}
                {post.image && (
                    <img
                        src={post.image}
                        alt={post.imageAlt || post.title}
                        style={{ display: 'none' }}
                    />
                )}
                <div className="container" style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '5rem' }}>
                    <Link to="/" style={{
                        color: 'white',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '3rem',
                        opacity: 0.7,
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        transition: 'opacity 0.2s'
                    }}
                        onMouseOver={e => e.currentTarget.style.opacity = '1'}
                        onMouseOut={e => e.currentTarget.style.opacity = '0.7'}
                    >
                        <ChevronLeft size={20} /> Tornar a l'inici
                    </Link>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span style={{
                            background: 'rgba(59, 130, 246, 0.2)',
                            backdropFilter: 'blur(10px)',
                            color: 'var(--accent-primary)',
                            padding: '0.5rem 1.25rem',
                            borderRadius: '2rem',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            width: 'fit-content',
                            marginBottom: '1.5rem',
                            display: 'inline-block',
                            border: '1px solid rgba(59, 130, 246, 0.3)'
                        }}>
                            {post.category}
                        </span>

                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                            fontWeight: '800',
                            marginBottom: '1rem',
                            lineHeight: '1.1',
                            letterSpacing: '-0.02em'
                        }}>{post.title}</h1>

                        {post.subtitle && (
                            <p style={{
                                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                                opacity: 0.9,
                                maxWidth: '900px',
                                fontWeight: '300',
                                lineHeight: '1.4',
                                color: 'rgba(255,255,255,0.8)'
                            }}>{post.subtitle}</p>
                        )}

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', marginTop: '3rem', opacity: 0.8, fontSize: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <Calendar size={20} className="text-accent" />
                                {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString('ca-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Data no disponible'}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <Clock size={20} className="text-accent" />
                                {readingTime} {readingTime === 1 ? 'minut' : 'minuts'} de lectura
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <Tag size={20} className="text-accent" />
                                Pere Badia
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Reading Content Section */}
            <section className="container" style={{
                paddingTop: '6rem',
                paddingBottom: '10rem',
                position: 'relative'
            }}>
                <div style={{ maxWidth: '750px', margin: '0 auto' }}>
                    {/* Translation Warning */}
                    {shouldShowTranslationWarning && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                background: 'rgba(59, 130, 246, 0.1)',
                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                borderRadius: '0.75rem',
                                padding: '1.5rem',
                                marginBottom: '3rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                <AlertCircle size={24} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '0.125rem' }} />
                                <p style={{
                                    color: 'rgba(255,255,255,0.9)',
                                    fontSize: '1rem',
                                    lineHeight: '1.6',
                                    margin: 0
                                }}>
                                    {i18n.language === 'en' ? t('translation.warning_en') : t('translation.warning_es')}
                                </p>
                            </div>

                            <button
                                onClick={handleTranslate}
                                disabled={isTranslating}
                                className="btn"
                                style={{
                                    background: showTranslation ? 'rgba(255,255,255,0.1)' : 'var(--accent-primary)',
                                    border: showTranslation ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--accent-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    alignSelf: 'flex-start',
                                    padding: '0.75rem 1.5rem',
                                    opacity: isTranslating ? 0.6 : 1,
                                    cursor: isTranslating ? 'wait' : 'pointer'
                                }}
                            >
                                <Languages size={18} />
                                {isTranslating
                                    ? t('translation.translating')
                                    : showTranslation
                                        ? t('translation.show_original')
                                        : t('translation.translate_button')
                                }
                            </button>

                            {translationError && (
                                <p style={{
                                    color: '#ef4444',
                                    fontSize: '0.9rem',
                                    margin: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <AlertCircle size={16} />
                                    {translationError}
                                </p>
                            )}
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="article-body"
                        style={{
                            fontSize: '1.45rem',
                            lineHeight: '2.2',
                            color: 'rgba(255,255,255,0.95)',
                            fontFamily: '"Outfit", sans-serif',
                            fontWeight: '400',
                            letterSpacing: '0.02em'
                        }}
                    >
                        {paragraphs.map((para, i) => (
                            <p key={i} style={{
                                marginBottom: '1.2rem',
                                display: 'block'
                            }}>
                                {para}
                            </p>
                        ))}

                        {post.publishedInEco && (
                            <p style={{
                                marginTop: '4rem',
                                fontStyle: 'italic',
                                opacity: 0.8,
                                borderLeft: '2px solid var(--accent-primary)',
                                paddingLeft: '1rem',
                                fontSize: '1.2rem'
                            }}>
                                Publicat a L'Eco de Sitges
                            </p>
                        )}
                    </motion.div>

                    {/* Footer of article */}
                    <div style={{
                        marginTop: '6rem',
                        paddingTop: '3.5rem',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '2rem'
                    }}>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <button
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({
                                            title: post.title,
                                            text: post.subtitle,
                                            url: window.location.href,
                                        }).catch(console.error);
                                    } else {
                                        navigator.clipboard.writeText(window.location.href);
                                        alert('Enllaç copiat al porta-retalls');
                                    }
                                }}
                                className="btn"
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: 'white',
                                    padding: '0.6rem 1.2rem'
                                }}
                            >
                                <Share2 size={18} /> Compartir article
                            </button>
                        </div>

                    </div>

                    {/* Related Posts Section */}
                    {relatedPosts.length > 0 && (
                        <div style={{ marginTop: '8rem' }}>
                            <h2 style={{
                                fontSize: '2rem',
                                marginBottom: '3rem',
                                textAlign: 'center',
                                fontWeight: '800',
                                letterSpacing: '-0.01em'
                            }}>
                                {t('home.related_posts')}
                            </h2>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '2rem',
                                '@media (max-width: 768px)': {
                                    gridTemplateColumns: '1fr'
                                }
                            }} className="related-grid-container">
                                {relatedPosts.map((rPost, idx) => (
                                    <motion.div
                                        key={rPost.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Link to={`/post/${rPost.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div style={{
                                                background: 'rgba(255, 255, 255, 0.03)',
                                                borderRadius: '1.25rem',
                                                overflow: 'hidden',
                                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                                height: '100%',
                                                transition: 'transform 0.3s ease'
                                            }}
                                                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-8px)'}
                                                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                                            >
                                                <div style={{ height: '180px', overflow: 'hidden' }}>
                                                    <img
                                                        src={rPost.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800'}
                                                        alt={rPost.title}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                </div>
                                                <div style={{ padding: '1.5rem' }}>
                                                    <span style={{
                                                        fontSize: '0.8rem',
                                                        color: 'var(--accent-primary)',
                                                        fontWeight: '600',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em'
                                                    }}>
                                                        {rPost.category}
                                                    </span>
                                                    <h3 style={{
                                                        fontSize: '1.3rem',
                                                        marginTop: '0.5rem',
                                                        marginBottom: '0.75rem',
                                                        fontWeight: '700',
                                                        lineHeight: '1.3'
                                                    }}>
                                                        {rPost.title}
                                                    </h3>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                                        {t('home.read_more')} <ChevronRight size={16} />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Animation for loader */}
            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </motion.div>
    );
}
