import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Edit2, Trash2, Plus, LogOut, ChevronRight, Globe, GlobeLock, Check, X, AlertCircle, Sparkles } from 'lucide-react';
import { updateDoc } from 'firebase/firestore';

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [pagesSeo, setPagesSeo] = useState({});
    const [loading, setLoading] = useState(true);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/admin/login');
            return;
        }

        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                // Fetch Posts
                const postsSnapshot = await getDocs(collection(db, 'posts'));
                const postsData = postsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                const sortedPosts = postsData.sort((a, b) => {
                    const dateA = a.createdAt?.toDate?.() || 0;
                    const dateB = b.createdAt?.toDate?.() || 0;
                    return dateB - dateA;
                });
                setPosts(sortedPosts);

                // Fetch Pages SEO
                const pagesSnapshot = await getDocs(collection(db, 'site_seo'));
                const seoData = {};
                pagesSnapshot.forEach(doc => {
                    seoData[doc.id] = doc.data();
                });
                setPagesSeo(seoData);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
            setLoading(false);
        };

        fetchDashboardData();
    }, [currentUser, navigate]);

    async function handleTogglePageIndex(pageKey, currentStatus) {
        try {
            await updateDoc(doc(db, 'site_seo', pageKey), {
                isIndexed: !currentStatus,
                updatedAt: serverTimestamp()
            });
            setPagesSeo(prev => ({
                ...prev,
                [pageKey]: { ...prev[pageKey], isIndexed: !currentStatus }
            }));
        } catch (error) {
            console.error("Error updating page indexing status:", error);
            // Si el document no existeix, el creem
            if (error.code === 'not-found') {
                const { setDoc, serverTimestamp } = await import('firebase/firestore');
                await setDoc(doc(db, 'site_seo', pageKey), {
                    isIndexed: !currentStatus,
                    updatedAt: serverTimestamp()
                });
                setPagesSeo(prev => ({
                    ...prev,
                    [pageKey]: { ...prev[pageKey], isIndexed: !currentStatus }
                }));
            } else {
                alert('Error al canviar l\'estat d\'indexació de la pàgina');
            }
        }
    }

    async function handleToggleIndex(id, currentStatus) {
        try {
            await updateDoc(doc(db, 'posts', id), {
                isIndexed: !currentStatus
            });
            setPosts(posts.map(post =>
                post.id === id ? { ...post, isIndexed: !currentStatus } : post
            ));
        } catch (error) {
            console.error("Error updating indexing status:", error);
            alert('Error al canviar l\'estat d\'indexació');
        }
    }

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
                                    <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Indexat</th>
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
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <button
                                                onClick={() => handleToggleIndex(post.id, post.isIndexed !== false)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.4rem',
                                                    padding: '0.25rem 0.6rem',
                                                    background: post.isIndexed !== false ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                    color: post.isIndexed !== false ? '#10b981' : '#ef4444',
                                                    border: 'none',
                                                    borderRadius: '0.5rem',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '600',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {post.isIndexed !== false ? <Globe size={14} /> : <GlobeLock size={14} />}
                                                {post.isIndexed !== false ? 'SÍ' : 'NO'}
                                            </button>
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
            {/* SECCIÓ CONTROL SEO */}
            <div style={{ marginTop: '4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <Sparkles size={24} style={{ color: 'var(--accent-primary)' }} />
                    <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Control SEO</h2>
                </div>

                <div style={{
                    background: 'var(--bg-secondary)',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.05)',
                    padding: '1.5rem'
                }}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1rem' }}>
                        Gestiona la visibilitat de totes les pàgines del lloc web. Els cercadors com Google seguiran aquestes instruccions.
                    </p>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Pàgina / Ruta</th>
                                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Tipus</th>
                                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500', textAlign: 'center' }}>Estat Indexació</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Pàgines Estàtiques */}
                            {[
                                { name: 'Inici (Home)', path: '/', type: 'Principal', key: 'home' },
                                { name: 'Catàleg de Projectes', path: '/projects', type: 'Principal', key: 'projects_list' },
                                { name: 'El meu Stack', path: '/stack', type: 'Principal', key: 'stack' },
                                { name: 'Contacte', path: '/contact', type: 'Principal', key: 'contact' }
                            ].map(page => {
                                const isPageIndexed = pagesSeo[page.key]?.isIndexed !== false;
                                return (
                                    <tr key={page.path} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ fontWeight: '500' }}>{page.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{page.path}</div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{page.type}</span>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <div
                                                    onClick={() => handleTogglePageIndex(page.key, isPageIndexed)}
                                                    style={{
                                                        width: '50px',
                                                        height: '24px',
                                                        background: isPageIndexed ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)',
                                                        borderRadius: '50px',
                                                        padding: '3px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: isPageIndexed ? 'flex-end' : 'flex-start',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    <div style={{ width: '18px', height: '18px', background: 'white', borderRadius: '50%' }} />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}

                            {/* Projectes Específics */}
                            {[
                                { name: 'Sommelier Digital', path: '/projects/sommelier', key: 'sommelier-digital' },
                                { name: 'Sitges Art', path: '/projects/sitges-art', key: 'sitges-art' },
                                { name: 'Sitges Walk', path: '/projects/sitges-walk', key: 'sitges-walk' },
                                { name: 'Fets per Sitges', path: '/projects/fets-per-sitges', key: 'fets-per-sitges' }
                            ].map(proj => {
                                const isProjIndexed = pagesSeo[proj.key]?.isIndexed !== false;
                                return (
                                    <tr key={proj.path} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ fontWeight: '500' }}>{proj.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{proj.path}</div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Projecte</span>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <div
                                                    onClick={() => handleTogglePageIndex(proj.key, isProjIndexed)}
                                                    style={{
                                                        width: '50px',
                                                        height: '24px',
                                                        background: isProjIndexed ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)',
                                                        borderRadius: '50px',
                                                        padding: '3px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: isProjIndexed ? 'flex-end' : 'flex-start',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    <div style={{ width: '18px', height: '18px', background: 'white', borderRadius: '50%' }} />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <AlertCircle size={16} style={{ color: 'var(--accent-primary)' }} />
                            Aquesta taula mostra l'estat global de les pàgines estàtiques. Per canviar l'indexació d'articles de blog, utilitza la taula superior.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
