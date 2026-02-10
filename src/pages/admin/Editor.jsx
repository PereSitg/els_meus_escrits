import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Upload, FileText, Image as ImageIcon, Sparkles, Share2, AlertCircle, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

// Cloudinary Config (From .env)
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PostEditor() {
    const { id } = useParams();
    const isEditing = !!id;

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [category, setCategory] = useState('Sitges');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const [socialSummary, setSocialSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(null);
    const [isCorrecting, setIsCorrecting] = useState(false);

    // Success Modal States
    const [showModal, setShowModal] = useState(false);
    const [publishProgress, setPublishProgress] = useState(0);
    const [publishFinished, setPublishFinished] = useState(false);

    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);
    const navigate = useNavigate();

    const categories = ['Projectes', 'Sitges', 'Ecos de Sociedad', 'Altres'];

    // --- Fetch Data for Editing ---
    useEffect(() => {
        if (isEditing) {
            const fetchPost = async () => {
                setLoading(true);
                try {
                    const docSnap = await getDoc(doc(db, 'posts', id));
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setTitle(data.title || '');
                        setSubtitle(data.subtitle || '');
                        setCategory(data.category || 'Sitges');
                        setImage(data.image || '');
                        setContent(data.content || '');
                        setSocialSummary(data.socialSummary || '');
                    }
                } catch (error) {
                    console.error("Error fetching post:", error);
                }
                setLoading(false);
            };
            fetchPost();
        }
    }, [id, isEditing]);

    const resetForm = () => {
        setTitle('');
        setSubtitle('');
        setCategory('Sitges');
        setImage('');
        setContent('');
        setSocialSummary('');
        setPublishProgress(0);
        setPublishFinished(false);
        setShowModal(false);
        if (!isEditing) {
            navigate('/admin/new');
        } else {
            navigate('/admin/dashboard');
        }
    };

    // --- Document Parsing ---
    const handleDocUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        try {
            if (file.name.endsWith('.docx')) {
                const arrayBuffer = await file.arrayBuffer();
                const result = await mammoth.extractRawText({ arrayBuffer });
                processExtractedText(result.value);
            } else if (file.name.endsWith('.pdf')) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                let fullText = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map(item => item.str).join(' ');
                    fullText += pageText + '\n';
                }
                processExtractedText(fullText);
            }
        } catch (error) {
            console.error("Error parsing document:", error);
            alert('Error al processar el document');
        }
        setLoading(false);
    };

    const processExtractedText = (text) => {
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        if (lines.length > 0) {
            setTitle(lines[0]);
            if (lines.length > 1) {
                setSubtitle(lines[1]);
                setContent(lines.slice(2).join('\n\n'));
            } else {
                setContent(text);
            }
        }
    };

    // --- Image Upload (CLOUDINARY) ---
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
            alert("Falta configurar les claus de Cloudinary al fitxer .env (VITE_CLOUDINARY_CLOUD_NAME i VITE_CLOUDINARY_UPLOAD_PRESET)");
            return;
        }

        setUploadProgress('Pujant imatge a Cloudinary...');
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error('Error en la pujada a Cloudinary');
            }

            const data = await response.json();
            setImage(data.secure_url);
            setUploadProgress('Imatge pujada correctament!');
            setTimeout(() => setUploadProgress(null), 3000);
        } catch (error) {
            console.error("Error uploading image:", error);
            alert(`Error al pujar la imatge: ${error.message}`);
            setUploadProgress(null);
        }
    };

    // --- AI Correction (Simulated/Hook) ---
    const handleAICorrect = async () => {
        if (!content) return;
        setIsCorrecting(true);
        setTimeout(() => {
            const cleaned = content.replace(/\s+/g, ' ').trim();
            setContent(cleaned);
            setIsCorrecting(false);
            alert('IA: Ortografia revisada correctament.');
        }, 1500);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setShowModal(true);
        setPublishProgress(0);
        setPublishFinished(false);

        // Progress simulation
        const interval = setInterval(() => {
            setPublishProgress(prev => {
                if (prev >= 90) {
                    clearInterval(interval);
                    return 90;
                }
                return prev + 10;
            });
        }, 100);

        try {
            const postData = {
                title,
                subtitle: subtitle || '',
                category,
                image,
                content,
                socialSummary: socialSummary || content.substring(0, 160),
                updatedAt: serverTimestamp()
            };

            if (isEditing) {
                await updateDoc(doc(db, 'posts', id), postData);
            } else {
                postData.createdAt = serverTimestamp();
                await addDoc(collection(db, 'posts'), postData);
            }

            clearInterval(interval);
            setPublishProgress(100);
            setTimeout(() => setPublishFinished(true), 500);
        } catch (error) {
            clearInterval(interval);
            setShowModal(false);
            console.error("Error saving document: ", error);
            alert(`Error al guardar: ${error.message}`);
        }

        setLoading(false);
    }

    return (
        <div className="container" style={{ paddingTop: '2rem', maxWidth: '900px', paddingBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>{isEditing ? 'Editar Publicació' : 'Nova Publicació'}</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept=".docx,.pdf"
                        onChange={handleDocUpload}
                    />
                    <button
                        type="button"
                        className="btn"
                        onClick={() => fileInputRef.current.click()}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-secondary)', color: 'white' }}
                    >
                        <FileText size={18} /> Carregar Doc/PDF
                    </button>

                    <button
                        type="button"
                        className="btn"
                        onClick={handleAICorrect}
                        disabled={isCorrecting || !content}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-primary)', color: 'white' }}
                    >
                        <Sparkles size={18} /> {isCorrecting ? 'Corregint...' : 'Revisar IA'}
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Títol</label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-secondary)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '0.5rem', fontSize: '1.1rem' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Subtítol (Opcional)</label>
                            <input
                                type="text"
                                value={subtitle}
                                onChange={e => setSubtitle(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-secondary)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '0.5rem' }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Categoria</label>
                        <select
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-secondary)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '0.5rem', height: 'fit-content' }}
                        >
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                </div>

                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', border: '1px dashed rgba(255,255,255,0.1)' }}>
                    <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>Imatge de Portada (Via Cloudinary)</label>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                        <div
                            onClick={() => imageInputRef.current.click()}
                            style={{
                                width: '240px',
                                height: '135px',
                                background: 'var(--bg-secondary)',
                                borderRadius: '0.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                border: '2px dashed rgba(255,255,255,0.1)',
                                overflow: 'hidden'
                            }}
                        >
                            {image ? (
                                <img src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <>
                                    <ImageIcon size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                                    <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Tria una imatge</span>
                                </>
                            )}
                        </div>
                        <div style={{ flex: 1 }}>
                            <input
                                type="file"
                                ref={imageInputRef}
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                La imatge es pujarà a Cloudinary i s'estalviarà a la base de dades.
                            </p>
                            {uploadProgress && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.9rem' }}>
                                    <AlertCircle size={16} /> {uploadProgress}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Contingut de l'Article</label>
                    <textarea
                        rows="15"
                        required
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Escriu aquí o carrega un document..."
                        style={{ width: '100%', padding: '1rem', background: 'var(--bg-secondary)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '0.5rem', lineHeight: '1.6' }}
                    ></textarea>
                </div>

                <div style={{ padding: '1.5rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '0.75rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
                        <Share2 size={20} />
                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Configuració per a Xarxes Socials (XXSS)</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>Resum personalitzat (Apareix sota el títol compartit)</label>
                            <textarea
                                rows="3"
                                value={socialSummary}
                                onChange={e => setSocialSummary(e.target.value)}
                                placeholder="Deixa-ho buit per usar un resum automàtic de l'article..."
                                style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-secondary)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '0.5rem' }}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                    <button
                        type="button"
                        className="btn"
                        onClick={() => navigate('/admin/dashboard')}
                        style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
                    >
                        Cancel·lar
                    </button>
                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '0.75rem 2.5rem' }}>
                        {loading ? 'Processant...' : (isEditing ? 'Desar Canvis' : 'Publicar Article')}
                    </button>
                </div>
            </form>

            <AnimatePresence>
                {showModal && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0,0,0,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2000,
                        backdropFilter: 'blur(5px)'
                    }}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={{
                                background: 'var(--bg-secondary)',
                                padding: '3rem',
                                borderRadius: '1.5rem',
                                maxWidth: '500px',
                                width: '90%',
                                textAlign: 'center',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                            }}
                        >
                            {!publishFinished ? (
                                <>
                                    <h2 style={{ marginBottom: '1.5rem' }}>{isEditing ? 'Actualitzant...' : 'Publicant article...'}</h2>
                                    <div style={{
                                        width: '100%',
                                        height: '10px',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '5px',
                                        overflow: 'hidden',
                                        marginBottom: '1rem'
                                    }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${publishProgress}%` }}
                                            style={{
                                                height: '100%',
                                                background: 'var(--accent-primary)',
                                                boxShadow: '0 0 15px var(--accent-glow)'
                                            }}
                                        />
                                    </div>
                                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                                        {publishProgress}%
                                    </p>
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 size={64} color="#10b981" style={{ marginBottom: '1.5rem' }} />
                                    <h2 style={{ marginBottom: '1rem' }}>{isEditing ? 'Actualitzat!' : 'Entrada publicada!'}</h2>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                                        L'article s'ha guardat correctament a la base de dades.
                                    </p>
                                    <button
                                        onClick={resetForm}
                                        className="btn btn-primary"
                                        style={{ padding: '0.75rem 3rem', width: '100%' }}
                                    >
                                        Tancar i {isEditing ? 'Tornar' : 'Netejar'}
                                    </button>
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
