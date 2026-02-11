import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Edit2, Trash2, Plus, LogOut, ChevronRight } from 'lucide-react';

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/admin/login');
            return;
        }

        const fetchPosts = async () => {
            setLoading(true);
            try {
                // Simplifiquem la consulta per assegurar que veiem dades
                const querySnapshot = await getDocs(collection(db, 'posts'));
                const postsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Ordenem manualment per seguretat (si falla l'index de Firebase)
                const sortedPosts = postsData.sort((a, b) => {
                    const dateA = a.createdAt?.toDate?.() || 0;
                    const dateB = b.createdAt?.toDate?.() || 0;
                    return dateB - dateA;
                });

                setPosts(sortedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
            setLoading(false);
        };

        fetchPosts();
    }, [currentUser, navigate]);

    async function handleLogout() {
        try {
            await logout();
            navigate('/admin/login');
        } catch {
            console.error("Failed to log out");
        }
    }

    async function handleDelete(id) {
        if (window.confirm('Estàs segur que vols eliminar aquesta publicació?')) {
            try {
                await deleteDoc(doc(db, 'posts', id));
                setPosts(posts.filter(post => post.id !== id));
            } catch (error) {
                console.error("Error deleting post:", error);
                alert('Error al eliminar la publicació');
            }
        }
    }

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1>Tauler d'Administració</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Benvingut, {currentUser?.email || 'Usuari'}</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/admin/new" className="btn btn-primary">
                        <Plus size={18} /> Nova Publicació
                    </Link>
                    <button onClick={handleLogout} className="btn" style={{ border: '1px solid #ef4444', color: '#ef4444', background: 'transparent' }}>
                        <LogOut size={18} /> Sortir
                    </button>
                </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                {loading ? (
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '4rem' }}>Carregant publicacions...</p>
                ) : posts.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '4rem' }}>
                        Encara no hi ha publicacions.
                    </p>
                ) : (
                    <div style={{ width: '100%', overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Títol</th>
                                    <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Categoria</th>
                                    <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Data</th>
                                    <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500', textAlign: 'right' }}>Accions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map(post => (
                                    <tr key={post.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
                                        <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>{post.title || 'Sense títol'}</td>
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                background: 'rgba(59, 130, 246, 0.1)',
                                                color: 'var(--accent-primary)',
                                                borderRadius: '1rem',
                                                fontSize: '0.8rem'
                                            }}>
                                                {post.category || 'Altres'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                            {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString('ca-ES') : 'Sense data'}
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                <button
                                                    onClick={() => navigate(`/admin/edit/${post.id}`)}
                                                    style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', borderRadius: '0.5rem', cursor: 'pointer' }}
                                                    title="Editar"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    style={{ padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', borderRadius: '0.5rem', cursor: 'pointer' }}
                                                    title="Eliminar"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
