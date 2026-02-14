import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { collection, getDocs, updateDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Image as ImageIcon, Save, ArrowLeft, Loader2, Search, ExternalLink, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MediaLibrary() {
    const [mediaItems, setMediaItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [savedFeedback, setSavedFeedback] = useState(null);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/admin/login');
            return;
        }

        const fetchMedia = async () => {
            setLoading(true);
            try {
                const mediaRef = collection(db, 'media_library');
                const q = query(mediaRef, orderBy('updatedAt', 'desc'));
                const snapshot = await getDocs(q);
                const items = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMediaItems(items);
            } catch (error) {
                console.error("Error fetching media:", error);
            }
            setLoading(false);
        };

        fetchMedia();
    }, [currentUser, navigate]);

    const handleUpdateAlt = async (id, newAlt) => {
        setMediaItems(prev => prev.map(item =>
            item.id === id ? { ...item, alt_text: newAlt } : item
        ));
    };

    const handleSave = async (item) => {
        setSavingId(item.id);
        try {
            const itemRef = doc(db, 'media_library', item.id);
            await updateDoc(itemRef, {
                alt_text: item.alt_text || '',
                updatedAt: serverTimestamp()
            });
            setSavedFeedback(item.id);
            setTimeout(() => setSavedFeedback(null), 3000);
        } catch (error) {
            console.error("Error updating alt text:", error);
            alert("Error al guardar l'atribut ALT.");
        }
        setSavingId(null);
    };

    const filteredItems = mediaItems.filter(item =>
        (item.nom_arxiu?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.projecte_associat?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link to="/admin/dashboard" style={{ color: 'var(--text-secondary)' }}>
                        <ArrowLeft size={24} />
                    </Link>
                    <h1>Biblioteca de Mitjans</h1>
                </div>
                <div style={{ position: 'relative', width: '300px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                    <input
                        type="text"
                        placeholder="Cerca per nom o projecte..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.6rem 1rem 0.6rem 2.5rem',
                            background: 'var(--bg-secondary)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'white',
                            borderRadius: '0.5rem'
                        }}
                    />
                </div>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                    <Loader2 className="animate-spin" size={40} style={{ color: 'var(--accent-primary)' }} />
                </div>
            ) : filteredItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-secondary)', borderRadius: '1rem' }}>
                    <ImageIcon size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                    <p style={{ color: 'var(--text-secondary)' }}>No s'han trobat imatges a la biblioteca.</p>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {filteredItems.map(item => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                background: 'var(--bg-secondary)',
                                borderRadius: '1rem',
                                overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.05)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <div style={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden', background: '#000' }}>
                                <img
                                    src={item.url_imatge}
                                    alt={item.alt_text}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain'
                                    }}
                                />
                                <a
                                    href={item.url_imatge}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        background: 'rgba(0,0,0,0.5)',
                                        color: 'white',
                                        padding: '5px',
                                        borderRadius: '5px'
                                    }}
                                >
                                    <ExternalLink size={14} />
                                </a>
                            </div>

                            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '0.95rem', marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {item.nom_arxiu}
                                    </h3>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                        {item.projecte_associat || 'Sense projecte'}
                                    </span>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 'bold' }}>
                                        ATRIBUT ALT (SEO)
                                    </label>
                                    <textarea
                                        value={item.alt_text || ''}
                                        onChange={(e) => handleUpdateAlt(item.id, e.target.value)}
                                        placeholder="Descriu la imatge per a Google..."
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            background: 'var(--bg-primary)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            color: 'white',
                                            borderRadius: '0.4rem',
                                            fontSize: '0.85rem',
                                            minHeight: '60px',
                                            resize: 'vertical'
                                        }}
                                    />
                                </div>

                                <button
                                    onClick={() => handleSave(item)}
                                    disabled={savingId === item.id}
                                    style={{
                                        width: '100%',
                                        padding: '0.6rem',
                                        background: savedFeedback === item.id ? '#10b981' : 'var(--accent-primary)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        fontWeight: 'bold',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {savingId === item.id ? (
                                        <Loader2 size={18} className="animate-spin" />
                                    ) : savedFeedback === item.id ? (
                                        <>
                                            <CheckCircle2 size={18} /> Guardat!
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} /> Guardar
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
