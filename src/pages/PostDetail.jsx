import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'framer-motion';
import { Calendar, Tag, ChevronLeft, Share2, Clock, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
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
        fetchPost();

        // Cleanup: Reset title when leaving page
        return () => {
            document.title = 'Pere Badia i Lorenz';
        };
    }, [id]);

    // Calcular temps de lectura estimat
    const readingTime = useMemo(() => {
        if (!post?.content) return 0;
        const wordsPerMinute = 200;
        const noOfWords = post.content.split(/\s+/g).length;
        const minutes = noOfWords / wordsPerMinute;
        return Math.ceil(minutes);
    }, [post?.content]);

    // Processar el contingut en paràgrafs
    const paragraphs = useMemo(() => {
        if (!post?.content) return [];
        // Detectem paràgrafs tant si hi ha un com dos salts de línia per donar aire
        return post.content
            .split(/\n+/)
            .map(p => p.trim())
            .filter(p => p.length > 0);
    }, [post?.content]);

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
                                Publicat a L'Eco de Sitges,
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
                            <button className="btn" style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'white',
                                padding: '0.6rem 1.2rem'
                            }}>
                                <Share2 size={18} /> Compartir article
                            </button>
                        </div>

                        <Link to="/" style={{
                            color: 'var(--accent-primary)',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '1.1rem'
                        }}>
                            <BookOpen size={20} /> Més històries de Pere Badia
                        </Link>
                    </div>
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
