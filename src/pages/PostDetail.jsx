import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'framer-motion';
import { Calendar, Tag, ChevronLeft, Share2 } from 'lucide-react';
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
                    setPost({ id: docSnap.id, ...docSnap.data() });
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="container" style={{ paddingTop: '10rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)' }}>Carregant article...</p>
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
            {/* Hero Image */}
            <div style={{
                height: '70vh',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                background: `linear-gradient(to bottom, rgba(15, 23, 42, 0.3), rgba(15, 23, 42, 0.9)), url(${post.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600'}) center/cover`
            }}>
                <div className="container" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '4rem' }}>
                    <Link to="/" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', opacity: 0.8 }}>
                        <ChevronLeft size={20} /> Tornar
                    </Link>

                    <span style={{
                        background: 'var(--accent-primary)',
                        color: 'white',
                        padding: '0.4rem 1rem',
                        borderRadius: '2rem',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        width: 'fit-content',
                        marginBottom: '1.5rem'
                    }}>
                        {post.category}
                    </span>

                    <h1 style={{ fontSize: '4rem', marginBottom: '1rem', lineHeight: '1.1' }}>{post.title}</h1>
                    {post.subtitle && (
                        <p style={{ fontSize: '1.5rem', opacity: 0.9, maxWidth: '800px', fontWeight: '300' }}>{post.subtitle}</p>
                    )}

                    <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem', opacity: 0.7, fontSize: '0.95rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={18} />
                            {post.createdAt?.toDate().toLocaleDateString('ca-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Tag size={18} />
                            Pere Badia
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <section className="container" style={{ paddingTop: '5rem', paddingBottom: '8rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div
                        className="post-content"
                        style={{
                            fontSize: '1.25rem',
                            lineHeight: '1.8',
                            color: 'rgba(255,255,255,0.85)',
                            whiteSpace: 'pre-wrap'
                        }}
                    >
                        {post.content}
                    </div>

                    <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn" style={{ background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Share2 size={18} /> Compartir
                            </button>
                        </div>
                        <Link to="/" style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>Tornar a l'inici</Link>
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
