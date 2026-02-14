import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { collection, getDocs, deleteDoc, doc, query, orderBy, updateDoc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Edit2, Trash2, Plus, LogOut, ChevronRight, Globe, GlobeLock, Check, X, AlertCircle, Sparkles, Languages, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [pagesSeo, setPagesSeo] = useState({});
    const [loading, setLoading] = useState(true);
    const [editingPage, setEditingPage] = useState(null); // Key of the page being edited
    const [editValues, setEditValues] = useState({
        title: '', description: '',
        title_es: '', description_es: '',
        title_en: '', description_en: ''
    });
    const [activeTab, setActiveTab] = useState('posts'); // 'posts' or 'seo'
    const [isTranslating, setIsTranslating] = useState(false);
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
            if (error.code === 'not-found') {
                try {
                    await setDoc(doc(db, 'site_seo', pageKey), {
                        isIndexed: !currentStatus,
                        updatedAt: serverTimestamp()
                    });
                    setPagesSeo(prev => ({
                        ...prev,
                        [pageKey]: { ...prev[pageKey], isIndexed: !currentStatus }
                    }));
                } catch (setErr) {
                    console.error("Error setting page SEO on fallback:", setErr);
                    alert(`Error al crear metadades SEO (${setErr.code || setErr.message})`);
                }
            } else {
                alert(`Error al canviar l'estat d'indexació (${error.code || error.message})`);
            }
        }
    }

    async function handleAutoTranslate() {
        if (!editValues.title && !editValues.description) {
            alert("Escriu primer el títol o descripció en català.");
            return;
        }

        if (!GEMINI_API_KEY) {
            alert("Clau de Gemini no configurada.");
            return;
        }

        setIsTranslating(true);
        try {
            const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `Ets un expert en SEO i traducció. Tradueix el següent contingut SEO del català al castellà i a l'anglès. 
            És molt important mantenir el significat i l'optimització SEO.
            Retorna NOMÉS un objecte JSON amb aquest format exactament, sense Markdown:
            {
                "title_es": "traducció al castellà",
                "description_es": "traducció al castellà",
                "title_en": "traducció a l'anglès",
                "description_en": "traducció a l'anglès"
            }

            Contingut a traduir:
            Títol: ${editValues.title}
            Descripció: ${editValues.description}`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text().replace(/```json|```/g, '').trim();
            const translations = JSON.parse(text);

            setEditValues(prev => ({
                ...prev,
                ...translations
            }));
            alert("IA: Traducció SEO completada!");
        } catch (error) {
            console.error("Error en la traducció automàtica:", error);
            alert("Error en la traducció automàtica. Intenta-ho de nou.");
        } finally {
            setIsTranslating(false);
        }
    }

    async function handleSaveSeo(pageKey) {
        try {
            await updateDoc(doc(db, 'site_seo', pageKey), {
                title: editValues.title,
                description: editValues.description,
                title_es: editValues.title_es || '',
                description_es: editValues.description_es || '',
                title_en: editValues.title_en || '',
                description_en: editValues.description_en || '',
                updatedAt: serverTimestamp()
            });
            setPagesSeo(prev => ({
                ...prev,
                [pageKey]: {
                    ...prev[pageKey],
                    title: editValues.title, description: editValues.description,
                    title_es: editValues.title_es, description_es: editValues.description_es,
                    title_en: editValues.title_en, description_en: editValues.description_en
                }
            }));
            setEditingPage(null);
        } catch (error) {
            console.error("Error saving SEO data:", error);
            if (error.code === 'not-found') {
                try {
                    await setDoc(doc(db, 'site_seo', pageKey), {
                        title: editValues.title,
                        description: editValues.description,
                        title_es: editValues.title_es || '',
                        description_es: editValues.description_es || '',
                        title_en: editValues.title_en || '',
                        description_en: editValues.description_en || '',
                        isIndexed: true,
                        updatedAt: serverTimestamp()
                    });
                    setPagesSeo(prev => ({
                        ...prev,
                        [pageKey]: {
                            ...prev[pageKey],
                            title: editValues.title, description: editValues.description,
                            title_es: editValues.title_es, description_es: editValues.description_es,
                            title_en: editValues.title_en, description_en: editValues.description_en,
                            isIndexed: true
                        }
                    }));
                    setEditingPage(null);
                } catch (setErr) {
                    console.error("Error setting SEO data on fallback:", setErr);
                    alert(`Error al crear metadades SEO (${setErr.code || setErr.message})`);
                }
            } else {
                alert(`Error al desar les metadades SEO (${error.code || error.message})`);
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

    function renderSeoRow(page) {
        const isPageIndexed = pagesSeo[page.key]?.isIndexed !== false;
        return (
            <tr key={page.key} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '500' }}>{page.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{page.path}</div>
                </td>
                <td style={{ padding: '1rem' }}>
                    {editingPage === page.key ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem' }}>
                            {/* CA */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <label style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 'bold' }}>CATALÀ</label>
                                <input
                                    type="text"
                                    value={editValues.title}
                                    onChange={(e) => setEditValues({ ...editValues, title: e.target.value })}
                                    placeholder="Títol SEO"
                                    style={{ background: 'var(--bg-primary)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.5rem', borderRadius: '0.4rem', fontSize: '0.85rem' }}
                                />
                                <textarea
                                    value={editValues.description}
                                    onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                                    placeholder="Descripció SEO"
                                    style={{ background: 'var(--bg-primary)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.5rem', borderRadius: '0.4rem', fontSize: '0.85rem', minHeight: '60px' }}
                                />
                            </div>

                            <button
                                onClick={handleAutoTranslate}
                                disabled={isTranslating}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    padding: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)',
                                    border: '1px solid var(--accent-primary)', borderRadius: '0.4rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold'
                                }}
                            >
                                {isTranslating ? <Loader2 size={16} className="animate-spin" /> : <Languages size={16} />}
                                {isTranslating ? 'Traduint...' : 'Auto-tradueix a ES i EN'}
                            </button>

                            {/* ES */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>CASTELLÀ</label>
                                <input
                                    type="text"
                                    value={editValues.title_es}
                                    onChange={(e) => setEditValues({ ...editValues, title_es: e.target.value })}
                                    placeholder="Títol SEO ES"
                                    style={{ background: 'var(--bg-primary)', border: '1px solid rgba(255,255,255,0.05)', color: '#ccc', padding: '0.5rem', borderRadius: '0.4rem', fontSize: '0.85rem' }}
                                />
                                <textarea
                                    value={editValues.description_es}
                                    onChange={(e) => setEditValues({ ...editValues, description_es: e.target.value })}
                                    placeholder="Descripció SEO ES"
                                    style={{ background: 'var(--bg-primary)', border: '1px solid rgba(255,255,255,0.05)', color: '#ccc', padding: '0.5rem', borderRadius: '0.4rem', fontSize: '0.85rem', minHeight: '40px' }}
                                />
                            </div>

                            {/* EN */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>ANGLÈS</label>
                                <input
                                    type="text"
                                    value={editValues.title_en}
                                    onChange={(e) => setEditValues({ ...editValues, title_en: e.target.value })}
                                    placeholder="Títol SEO EN"
                                    style={{ background: 'var(--bg-primary)', border: '1px solid rgba(255,255,255,0.05)', color: '#ccc', padding: '0.5rem', borderRadius: '0.4rem', fontSize: '0.85rem' }}
                                />
                                <textarea
                                    value={editValues.description_en}
                                    onChange={(e) => setEditValues({ ...editValues, description_en: e.target.value })}
                                    placeholder="Descripció SEO EN"
                                    style={{ background: 'var(--bg-primary)', border: '1px solid rgba(255,255,255,0.05)', color: '#ccc', padding: '0.5rem', borderRadius: '0.4rem', fontSize: '0.85rem', minHeight: '40px' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                <button onClick={() => handleSaveSeo(page.key)} className="btn btn-primary" style={{ flex: 1 }}>Desar</button>
                                <button onClick={() => setEditingPage(null)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.4rem', fontSize: '0.85rem', cursor: 'pointer' }}>Cancel·lar</button>
                            </div>
                        </div>
                    ) : (
                        <div style={{ cursor: 'pointer' }} onClick={() => {
                            setEditingPage(page.key);
                            setEditValues({
                                title: pagesSeo[page.key]?.title || '',
                                description: pagesSeo[page.key]?.description || '',
                                title_es: pagesSeo[page.key]?.title_es || '',
                                description_es: pagesSeo[page.key]?.description_es || '',
                                title_en: pagesSeo[page.key]?.title_en || '',
                                description_en: pagesSeo[page.key]?.description_en || ''
                            });
                        }}>
                            <div style={{ fontSize: '0.9rem', color: pagesSeo[page.key]?.title ? 'white' : 'rgba(255,255,255,0.3)', marginBottom: '0.25rem' }}>
                                {pagesSeo[page.key]?.title || 'Sense títol'}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {pagesSeo[page.key]?.description || 'Sense descripció'}
                            </div>
                            {(pagesSeo[page.key]?.title_es || pagesSeo[page.key]?.title_en) && (
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem' }}>
                                    {pagesSeo[page.key]?.title_es && <span style={{ fontSize: '0.65rem', border: '1px solid rgba(255,255,255,0.2)', padding: '0.1rem 0.3rem', borderRadius: '0.2rem', color: 'var(--text-secondary)' }}>ES</span>}
                                    {pagesSeo[page.key]?.title_en && <span style={{ fontSize: '0.65rem', border: '1px solid rgba(255,255,255,0.2)', padding: '0.1rem 0.3rem', borderRadius: '0.2rem', color: 'var(--text-secondary)' }}>EN</span>}
                                </div>
                            )}
                        </div>
                    )}
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
        );
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

            {/* Tabs Navigation */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                    onClick={() => setActiveTab('posts')}
                    style={{
                        padding: '1rem 0.5rem',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: activeTab === 'posts' ? '2px solid var(--accent-primary)' : '2px solid transparent',
                        color: activeTab === 'posts' ? 'white' : 'var(--text-secondary)',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                    }}
                >
                    Publicacions
                </button>
                <button
                    onClick={() => setActiveTab('seo')}
                    style={{
                        padding: '1rem 0.5rem',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: activeTab === 'seo' ? '2px solid var(--accent-primary)' : '2px solid transparent',
                        color: activeTab === 'seo' ? 'white' : 'var(--text-secondary)',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                    }}
                >
                    SEO & Pàgines
                </button>
            </div>

            {activeTab === 'posts' ? (
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
            ) : (
                /* SECCIÓ CONTROL SEO */
                <div style={{
                    background: 'var(--bg-secondary)',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.05)',
                    padding: '1.5rem'
                }}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1rem' }}>
                        Gestiona la visibilitat de totes les pàgines. Els cercadors com Google seguiran aquestes instruccions.
                    </p>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Pàgina / Secció</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Metadades SEO</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500', textAlign: 'center' }}>Indexació</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Pàgines Principals */}
                                <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                                    <td colSpan="3" style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>Pàgines Principals</td>
                                </tr>
                                {[
                                    { name: 'Inici (Home)', path: '/', key: 'home' },
                                    { name: 'Catàleg de Projectes', path: '/projects', key: 'projects_list' },
                                    { name: 'El meu Stack', path: '/stack', key: 'stack' },
                                    { name: 'Contacte', path: '/contact', key: 'contact' }
                                ].map(page => renderSeoRow(page))}

                                {/* Categories d'Escrits */}
                                <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                                    <td colSpan="3" style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>Seccions d'Escrits</td>
                                </tr>
                                {[
                                    { name: 'Sitges', path: '/category/sitges', key: 'category_sitges' },
                                    { name: 'Ecos de Sociedad', path: '/category/ecos', key: 'category_ecos' },
                                    { name: 'Altres històries', path: '/category/altres', key: 'category_altres' }
                                ].map(page => renderSeoRow(page))}

                                {/* Projectes Específics */}
                                <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                                    <td colSpan="3" style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>Detall de Projectes</td>
                                </tr>
                                {[
                                    { name: 'Sommelier Digital', path: '/projects/sommelier', key: 'sommelier-digital' },
                                    { name: 'Sitges Art', path: '/projects/sitges-art', key: 'sitges-art' },
                                    { name: 'Sitges Walk', path: '/projects/sitges-walk', key: 'sitges-walk' },
                                    { name: 'Fets per Sitges', path: '/projects/fets-per-sitges', key: 'fets-per-sitges' }
                                ].map(page => renderSeoRow(page))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <AlertCircle size={16} style={{ color: 'var(--accent-primary)' }} />
                            Aquesta taula mostra l'estat global de les pàgines. Per canviar l'indexació d'articles individuals, utilitza la pestanya "Publicacions".
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
