import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'framer-motion';

export default function Category() {
    const { slug } = useParams();
    // Map URL slug to stored Category name (exact match required)
    const categoryMap = {
        'politica': 'Política',
        'ecos': 'Ecos de Sociedad',
        'sitges': 'Sitges'
    };

    const categoryName = categoryMap[slug] || slug;
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategoryPosts() {
            setLoading(true);
            try {
                // Query posts by category
                const q = query(
                    collection(db, "posts"),
                    where("category", "==", categoryName),
                    orderBy("createdAt", "desc")
                );
                const querySnapshot = await getDocs(q);
                const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPosts(postsData);
            } catch (error) {
                console.error("Error fetching category posts:", error);
                // Fallback for when index is missing or error occurs
                setPosts([]);
            } finally {
                setLoading(false);
            }
        }

        fetchCategoryPosts();
    }, [categoryName]);

    return (
        <div className="container" style={{ paddingTop: '4rem' }}>
            <h1 className="animate-fade-in" style={{ marginBottom: '2rem' }}>Categoria: {categoryName}</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {loading ? (
                    <p>Carregant...</p>
                ) : posts.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)' }}>
                        No hi ha articles en aquesta categoria.
                    </p>
                ) : (
                    posts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={{ background: 'var(--bg-secondary)', borderRadius: '1rem', overflow: 'hidden' }}
                        >
                            <div style={{ height: '200px', overflow: 'hidden' }}>
                                <img
                                    src={post.image || 'https://via.placeholder.com/400x200'}
                                    alt={post.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{post.title}</h3>
                                <Link to={`/post/${post.id}`} style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                                    Llegir més
                                </Link>
                            </div>
                        </motion.article>
                    ))
                )}
            </div>
        </div>
    );
}
