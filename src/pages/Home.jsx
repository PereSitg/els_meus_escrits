import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useTranslation } from 'react-i18next';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        async function fetchPosts() {
            try {
                const q = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(10));
                const querySnapshot = await getDocs(q);
                const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPosts(postsData);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    return (
        <div className="home-page">
            <section className="hero" style={{
                height: '60vh',
                background: 'linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.9)), url(https://images.unsplash.com/photo-1505567745926-ba89000d255a?w=1600&q=80) center/cover',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textAlign: 'center',
                marginBottom: '4rem',
                borderRadius: '0 0 2rem 2rem'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container"
                >
                    <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>{t('hero.title')}</h1>
                    <p style={{ fontSize: '1.4rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
                        {t('hero.subtitle')}
                    </p>
                </motion.div>
            </section>

            <div className="container" style={{ paddingBottom: '4rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', borderLeft: '4px solid var(--accent-primary)', paddingLeft: '1rem' }}>
                    {t('home.latest_posts')}
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {loading ? (
                        <div style={{ colSpan: '3', textAlign: 'center', color: 'var(--text-secondary)' }}>{t('home.loading')}</div>
                    ) : posts.length === 0 ? (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '1rem' }}>
                            <p>{t('home.no_posts')}</p>
                        </div>
                    ) : (
                        posts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                style={{ background: 'var(--bg-secondary)', borderRadius: '1rem', overflow: 'hidden' }}
                            >
                                <div style={{ height: '200px', overflow: 'hidden' }}>
                                    <img
                                        src={post.image || 'https://via.placeholder.com/400x200'}
                                        alt={post.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <span style={{
                                        background: 'rgba(59, 130, 246, 0.1)',
                                        color: 'var(--accent-primary)',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '1rem',
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        display: 'inline-block',
                                        marginBottom: '1rem'
                                    }}>
                                        {post.category}
                                    </span>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{post.title}</h3>
                                    <Link to={`/post/${post.id}`} style={{
                                        color: 'white',
                                        fontWeight: '600',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        {t('home.read_more')} &rarr;
                                    </Link>
                                </div>
                            </motion.article>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
