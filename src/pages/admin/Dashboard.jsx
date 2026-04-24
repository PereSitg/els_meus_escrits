import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { collection, getDocs, deleteDoc, doc, query, orderBy, updateDoc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Edit2, Trash2, Plus, LogOut, ChevronRight, Globe, GlobeLock, Check, X, AlertCircle, Sparkles, Languages, Loader2, Image as ImageIcon, Upload } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [pagesSeo, setPagesSeo] = useState({});
    const [loading, setLoading] = useState(true);
    const [editingPage, setEditingPage] = useState(null); // Key of the page being edited
    const [editValues, setEditValues] = useState({
        title: '', description: '', image: '',
        title_es: '', description_es: '',
        title_en: '', description_en: ''
    });
    const [activeTab, setActiveTab] = useState('posts'); // 'posts', 'seo', or 'media'
    const [isTranslating, setIsTranslating] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const imageInputRef = useRef(null);

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

    async function handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
            alert("Error: Cloudinary not configured.");
            return;
        }

        setUploadingImage(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                { method: 'POST', body: formData }
            );

            if (!response.ok) throw new Error('Upload failed');
            const data = await response.json();
            setEditValues(prev => ({ ...prev, image: data.secure_url }));
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error al pujar la imatge.");
        } finally {
            setUploadingImage(false);
        }
    }

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
            alert("⚠️ Clau de Gemini (VITE_GEMINI_API_KEY) no trobada a l'entorn.");
            return;
        }

        setIsTranslating(true);
        try {
            const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            const prompt = `Ets un expert en SEO i traducció. Tradueix el següent contingut SEO del català al castellà i a l'anglès. 
            És molt important mantenir el significat i l'optimització SEO.
            Retorna NOMÉS un objecte JSON amb aquest format exactament:
            {
                "title_es": "...",
                "description_es": "...",
                "title_en": "...",
                "description_en": "..."
            }

            Contingut a traduir:
            Títol: ${editValues.title}
            Descripció: ${editValues.description}`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            let text = response.text().trim();

            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error("La resposta de la IA no té un format vàlid.");
            const translations = JSON.parse(jsonMatch[0]);

            setEditValues(prev => ({ ...prev, ...translations }));
            alert("IA: Traducció SEO completada!");
        } catch (error) {
            console.error("Error en la traducció automàtica:", error);
            alert("Error en la traducció automàtica.");
        } finally {
            setIsTranslating(false);
        }
    }

    async function handleBulkSeoUpdate() {
        if (!window.confirm("Això actualitzarà automàticament el SEO de tots els articles que no en tinguin. Vols continuar?")) return;
        setLoading(true);
        try {
            const postsSnapshot = await getDocs(collection(db, 'posts'));
            const updatePromises = postsSnapshot.docs.map(async (docSnapshot) => {
                const data = docSnapshot.data();
                if (!data.seoTitle || !data.seoDescription) {
                    const newSeoTitle = data.seoTitle || data.title || '';
                    let plainText = (data.content || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
                    const newSeoDescription = data.seoDescription || plainText.substring(0, 155) + (plainText.length > 155 ? '...' : '');
                    await updateDoc(doc(db, 'posts', docSnapshot.id), {
                        seoTitle: newSeoTitle, seoDescription: newSeoDescription, updatedAt: serverTimestamp()
                    });
                }
            });
            await Promise.all(updatePromises);
            const refreshedSnapshot = await getDocs(collection(db, 'posts'));
            setPosts(refreshedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((a, b) => (b.createdAt?.toDate?.() || 0) - (a.createdAt?.toDate?.() || 0)));
            alert("Procés finalitzat!");
        } catch (error) {
            console.error("Error updating bulk SEO:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSaveSeo(pageKey) {
        try {
            await updateDoc(doc(db, 'site_seo', pageKey), {
                title: editValues.title, description: editValues.description, image: editValues.image || '',
                title_es: editValues.title_es || '', description_es: editValues.description_es || '',
                title_en: editValues.title_en || '', description_en: editValues.description_en || '',
                updatedAt: serverTimestamp()
            });
            setPagesSeo(prev => ({
                ...prev,
                [pageKey]: { ...prev[pageKey], ...editValues }
            }));
            setEditingPage(null);
        } catch (error) {
            console.error("Error saving SEO data:", error);
        }
    }

    async function handleLogout() {
        try { await logout(); navigate('/admin/login'); } catch { console.error("Failed to log out"); }
    }

    async function handleDelete(id) {
        if (window.confirm('Vols eliminar aquesta publicació?')) {
            try { await deleteDoc(doc(db, 'posts', id)); setPosts(posts.filter(p => p.id !== id)); } catch (error) { console.error("Error deleting post:", error); }
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
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <label style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 'bold' }}>CATALÀ</label>
                                <input type="text" value={editValues.title} onChange={(e) => setEditValues({ ...editValues, title: e.target.value })} placeholder="Títol SEO" style={{ background: 'var(--bg-primary)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.5rem', borderRadius: '0.4rem', fontSize: '0.85rem' }} />
                                <textarea value={editValues.description} onChange={(e) => setEditValues({ ...editValues, description: e.target.value })} placeholder="Descripció SEO" style={{ background: 'var(--bg-primary)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.5rem', borderRadius: '0.4rem', fontSize: '0.85rem', minHeight: '60px' }} />
                                
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem' }}>
                                    <div style={{ width: '80px', height: '45px', background: 'var(--bg-primary)', borderRadius: '0.3rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        {editValues.image ? <img src={editValues.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.2 }}><ImageIcon size={20}/></div>}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <input type="file" ref={imageInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleImageUpload} />
                                        <button onClick={() => imageInputRef.current.click()} disabled={uploadingImage} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem', background: 'var(--bg-primary)', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', borderRadius: '0.4rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                                            {uploadingImage ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                                            {uploadingImage ? 'Pujant...' : 'Pujar imatge de previsualització'}
                                        </button>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                                            Aquesta foto és la que sortirà a LinkedIn, Facebook, WhatsApp i la resta de xarxes socials.
                                        </div>
                                    </div>
                                    {editValues.image && <button onClick={() => setEditValues({ ...editValues, image: '' })} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><X size={16}/></button>}
                                </div>
                            </div>

                            <button onClick={handleAutoTranslate} disabled={isTranslating} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary)', borderRadius: '0.4rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                {isTranslating ? <Loader2 size={16} className="animate-spin" /> : <Languages size={16} />}
                                {isTranslating ? 'Traduint...' : 'Auto-tradueix a ES i EN'}
                            </button>

                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                <button onClick={() => handleSaveSeo(page.key)} className="btn btn-primary" style={{ flex: 1 }}>Desar</button>
                                <button onClick={() => setEditingPage(null)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.4rem', fontSize: '0.85rem', cursor: 'pointer' }}>Cancel·lar</button>
                            </div>
                        </div>
                    ) : (
                        <div style={{ cursor: 'pointer' }} onClick={() => {
                            setEditingPage(page.key);
                            setEditValues({
                                title: pagesSeo[page.key]?.title || '', description: pagesSeo[page.key]?.description || '', image: pagesSeo[page.key]?.image || '',
                                title_es: pagesSeo[page.key]?.title_es || '', description_es: pagesSeo[page.key]?.description_es || '',
                                title_en: pagesSeo[page.key]?.title_en || '', description_en: pagesSeo[page.key]?.description_en || ''
                            });
                        }}>
                            <div style={{ fontSize: '0.9rem', color: pagesSeo[page.key]?.title ? 'white' : 'rgba(255,255,255,0.3)', marginBottom: '0.25rem' }}>{pagesSeo[page.key]?.title || 'Sense títol'}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{pagesSeo[page.key]?.description || 'Sense descripció'}</div>
                            {pagesSeo[page.key]?.image && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    <div style={{ width: '40px', height: '25px', borderRadius: '0.2rem', overflow: 'hidden' }}>
                                        <img src={pagesSeo[page.key].image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <span style={{ fontSize: '0.65rem', color: 'var(--accent-primary)' }}>Imatge activa</span>
                                </div>
                            )}
                        </div>
                    )}
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div onClick={() => handleTogglePageIndex(page.key, isPageIndexed)} style={{ width: '50px', height: '24px', background: isPageIndexed ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)', borderRadius: '50px', padding: '3px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: isPageIndexed ? 'flex-end' : 'flex-start', transition: 'all 0.3s ease' }}>
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
                <div><h1>Tauler d'Administració</h1><p style={{ color: 'var(--text-secondary)' }}>Benvingut, {currentUser?.email || 'Usuari'}</p></div>
                <div style={{ display: 'flex', gap: '1rem' }}><Link to="/admin/new" className="btn btn-primary"><Plus size={18} /> Nova Publicació</Link><button onClick={handleLogout} className="btn" style={{ border: '1px solid #ef4444', color: '#ef4444', background: 'transparent' }}><LogOut size={18} /> Sortir</button></div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <button onClick={() => setActiveTab('posts')} style={{ padding: '1rem 0.5rem', background: 'transparent', border: 'none', borderBottom: activeTab === 'posts' ? '2px solid var(--accent-primary)' : '2px solid transparent', color: activeTab === 'posts' ? 'white' : 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s' }}>Publicacions</button>
                <button onClick={() => setActiveTab('seo')} style={{ padding: '1rem 0.5rem', background: 'transparent', border: 'none', borderBottom: activeTab === 'seo' ? '2px solid var(--accent-primary)' : '2px solid transparent', color: activeTab === 'seo' ? 'white' : 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s' }}>SEO & Pàgines</button>
                <button onClick={() => navigate('/admin/media')} style={{ padding: '1rem 0.5rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer' }}>Mitjans (SEO)</button>
            </div>

            {activeTab === 'posts' ? (
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ width: '100%', overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}><th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Títol</th><th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Indexat</th><th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500', textAlign: 'right' }}>Accions</th></tr></thead>
                            <tbody>{posts.map(post => (
                                <tr key={post.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td style={{ padding: '1rem 1.5rem' }}>{post.title}</td><td><button onClick={() => handleToggleIndex(post.id, post.isIndexed !== false)} style={{ background: 'transparent', border: 'none', color: post.isIndexed !== false ? '#10b981' : '#ef4444', cursor: 'pointer' }}>{post.isIndexed !== false ? 'SÍ' : 'NO'}</button></td><td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}><button onClick={() => navigate(`/admin/edit/${post.id}`)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', marginRight: '1rem' }}><Edit2 size={18}/></button><button onClick={() => handleDelete(post.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={18}/></button></td></tr>
                            ))}</tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}><th style={{ padding: '1rem' }}>Pàgina / Secció</th><th style={{ padding: '1rem' }}>Metadades SEO</th><th style={{ padding: '1rem', textAlign: 'center' }}>Indexació</th></tr></thead>
                        <tbody>
                            <tr style={{ background: 'rgba(255,255,255,0.02)' }}><td colSpan="3" style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>PÀGINES PRINCIPALS</td></tr>
                            {[{ name: 'Inici (Home)', path: '/', key: 'home' }, { name: 'Catàleg de Projectes', path: '/projects', key: 'projects_list' }, { name: 'El meu Stack', path: '/stack', key: 'stack' }, { name: 'Contacte', path: '/contact', key: 'contact' }].map(p => renderSeoRow(p))}
                            
                            <tr style={{ background: 'rgba(255,255,255,0.02)' }}><td colSpan="3" style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>CATEGORIES (DINÀMIQUES)</td></tr>
                            {[...new Set(posts.map(p => p.category || 'Altres'))].sort().map(cat => {
                                const slug = cat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
                                return renderSeoRow({ name: cat, path: `/category/${slug}`, key: `category_${slug}` });
                            })}

                            <tr style={{ background: 'rgba(255,255,255,0.02)' }}><td colSpan="3" style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>DETALL DE PROJECTES</td></tr>
                            {[{ name: 'Sommelier Digital', path: '/projects/sommelier', key: 'sommelier-digital' }, { name: 'Sitges Art', path: '/projects/sitges-art', key: 'sitges-art' }, { name: 'Sitges Walk', path: '/projects/sitges-walk', key: 'sitges-walk' }, { name: 'Fets per Sitges', path: '/projects/fets-per-sitges', key: 'fets-per-sitges' }].map(p => renderSeoRow(p))}

                            <tr style={{ background: 'rgba(255,255,255,0.02)' }}><td colSpan="3" style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>PÀGINES LEGALS</td></tr>
                            {[{ name: 'Avís Legal', path: '/avis-legal', key: 'avis_legal' }, { name: 'Política de Cookies', path: '/politica-cookies', key: 'politica_cookies' }, { name: 'Política de Privacitat', path: '/politica-privacitat', key: 'politica_privacitat' }].map(p => renderSeoRow(p))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
