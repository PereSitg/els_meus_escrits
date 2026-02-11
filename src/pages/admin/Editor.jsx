import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import { Upload, FileText, Image as ImageIcon, Sparkles, Share2, AlertCircle, X, CheckCircle2, LogOut, ArrowLeft, Video, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Cloudinary Config (From .env)
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export default function PostEditor() {
    const { id } = useParams();
    const isEditing = !!id;
    const { logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        if (window.confirm('Vols tancar la sessió?')) {
            try {
                await logout();
                navigate('/admin/login');
            } catch (error) {
                console.error("Error logging out", error);
            }
        }
    }

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [category, setCategory] = useState('Sitges');
    const [image, setImage] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [video, setVideo] = useState('');
    const [content, setContent] = useState('');
    const [socialSummary, setSocialSummary] = useState('');
    const [customDate, setCustomDate] = useState(new Date().toISOString().split('T')[0]);
    const [isPublishedInEco, setIsPublishedInEco] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(null);
    const [isCorrecting, setIsCorrecting] = useState(false);
    const [isDraggingDoc, setIsDraggingDoc] = useState(false);

    // --- AI Correction (Gemini) ---
    const handleAICorrect = async () => {
        if (!content) return;
        if (!GEMINI_API_KEY) {
            alert("Falta configurar la clau de Gemini (VITE_GEMINI_API_KEY) al fitxer .env");
            return;
        }

        setIsCorrecting(true);
        try {
            const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
            // Provant 'gemini-1.5-flash' que és el més estàndard. Si falla, el missatge d'error ens ajudarà.
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `Ets un corrector lingüístic expert en català. La teva tasca és corregir ortogràficament i gramaticalment el següent text, mantenint el mateix estil i format (paràgrafs, etc.). NO afegeixis cap introducció ni conclusió, retorna NOMÉS el text corregit.

            Text a corregir:
            ${content}`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const correctedText = response.text();

            if (correctedText) {
                setContent(correctedText.trim());
                alert('IA: Text revisat i corregit correctament.');
            }
        } catch (error) {
            console.error("Error correcting text with Gemini:", error);
            const errorMsg = error.message || 'Error desconegut';
            // Afegim detalls extra per saber exactament què falla
            const modelUsed = "gemini-1.5-flash";
            const fullError = JSON.stringify(error, null, 2);
            alert(`Error al connectar amb la IA (${modelUsed}): ${errorMsg}\n\nSi et plau, passa'm aquest codi si l'error persisteix:\n${fullError?.substring(0, 100)}...`);
        } finally {
            setIsCorrecting(false);
        }
    };

    // Success Modal States
    const [showModal, setShowModal] = useState(false);
    const [publishProgress, setPublishProgress] = useState(0);
    const [publishFinished, setPublishFinished] = useState(false);

    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);

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
                        setImageAlt(data.imageAlt || '');
                        setVideo(data.video || '');
                        setContent(data.content || '');
                        setSocialSummary(data.socialSummary || '');
                        setIsPublishedInEco(data.publishedInEco || false);
                        if (data.createdAt?.toDate) {
                            setCustomDate(data.createdAt.toDate().toISOString().split('T')[0]);
                        }
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
        setImageAlt('');
        setVideo('');
        setContent('');
        setSocialSummary('');
        setCustomDate(new Date().toISOString().split('T')[0]);
        setIsPublishedInEco(false);
        setPublishProgress(0);
        setPublishFinished(false);
        setShowModal(false);
        // Després de publicar, anem sempre al tauler per veure el llistat
        navigate('/admin/dashboard');
    };

    // --- Document Parsing ---
    const processFile = async (file) => {
        if (!file) return;
        setLoading(true);
        try {
            const fileName = file.name.toLowerCase();
            if (fileName.endsWith('.docx')) {
                const arrayBuffer = await file.arrayBuffer();
                const result = await mammoth.extractRawText({ arrayBuffer });
                processExtractedText(result.value);
            } else if (fileName.endsWith('.pdf')) {
                const arrayBuffer = await file.arrayBuffer();
                const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
                const pdf = await loadingTask.promise;
                let fullText = '';

                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();

                    // Ordenem els elements per la seva posició vertical (y) de dalt a baix, 
                    // i després per la seva posició horitzontal (x).
                    // textContent.items[i].transform: [scaleX, skewY, skewX, scaleY, x, y]
                    const items = textContent.items.sort((a, b) => {
                        if (Math.abs(b.transform[5] - a.transform[5]) > 5) {
                            return b.transform[5] - a.transform[5];
                        }
                        return a.transform[4] - b.transform[4];
                    });

                    let lastY = -1;
                    let pageText = '';

                    for (const item of items) {
                        if (lastY !== -1) {
                            const gap = Math.abs(item.transform[5] - lastY);
                            const isLineEnd = /[.!:;?]$/.test(pageText.trim());
                            // Més equilibrat:
                            // Un salt de >60 sempre és paràgraf.
                            // Un salt de >25 ho és si la línia anterior sembla acabar.
                            // Forcem el primer salt del document per separar el títol.
                            const isFirstGap = (i === 1 && !pageText.includes('\n'));

                            if (isFirstGap || gap > 60 || (gap > 25 && isLineEnd)) {
                                pageText += '\n\n';
                            } else if (gap > 3) {
                                pageText += ' ';
                            }
                        }
                        pageText += item.str;
                        lastY = item.transform[5];
                    }
                    fullText += pageText + '\n\n';
                }
                processExtractedText(fullText.trim());
            } else {
                alert('Només s’accepten fitxers .docx o .pdf');
            }
        } catch (error) {
            console.error("Error parsing document:", error);
            alert(`Error al processar el document: ${error.message || 'Error desconegut'}. Revisa la consola per a més detalls.`);
        }
        setLoading(false);
    };

    const handleDocUpload = (e) => {
        const file = e.target.files[0];
        processFile(file);
    };

    // --- Drag & Drop Handlers (Global) ---
    useEffect(() => {
        const onDragOver = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.dataTransfer.types.includes('Files')) {
                setIsDraggingDoc(true);
            }
        };

        const onDragLeave = (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Només treure si sortim de la finestra o d'un element "pare"
            if (e.relatedTarget === null || e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
                setIsDraggingDoc(false);
            }
        };

        const onDrop = (e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDraggingDoc(false);

            const file = e.dataTransfer.files[0];
            if (file) {
                processFile(file);
            }
        };

        window.addEventListener('dragover', onDragOver);
        window.addEventListener('dragleave', onDragLeave);
        window.addEventListener('drop', onDrop);

        return () => {
            window.removeEventListener('dragover', onDragOver);
            window.removeEventListener('dragleave', onDragLeave);
            window.removeEventListener('drop', onDrop);
        };
    }, []);

    const processExtractedText = (text) => {
        // Separem per paràgrafs reals (\n\n) en lloc de per línies soltes
        const paragraphs = text.split('\n\n').map(p => p.trim()).filter(p => p.length > 0);

        if (paragraphs.length > 0) {
            // El primer paràgraf és el títol
            setTitle(paragraphs[0]);
            setSubtitle('');

            if (paragraphs.length > 1) {
                // Tota la resta es junta mantenint els salts de línia dobles (\n\n)
                // per tal que PostDetail.jsx els pugui renderitzar com a paràgrafs separats.
                setContent(paragraphs.slice(1).join('\n\n'));
            } else {
                setContent('');
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

        setUploadProgress('Pujant fitxer a Cloudinary...');
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

            // Determinar si és un vídeo o una imatge
            const isVideo = file.type.startsWith('video/');
            const resourceType = isVideo ? 'video' : 'image';

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Error en la pujada');
            }

            const data = await response.json();

            if (isVideo) {
                setVideo(data.secure_url);
                setUploadProgress('Vídeo pujat correctament!');
            } else {
                setImage(data.secure_url);
                setUploadProgress('Imatge pujada correctament!');
            }

            setTimeout(() => setUploadProgress(null), 3000);
        } catch (error) {
            console.error("Error uploading media:", error);
            alert(`Error al pujar el fitxer: ${error.message}`);
            setUploadProgress(null);
        }
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
                imageAlt: imageAlt || '',
                video: video || '',
                content,
                socialSummary: socialSummary || content.substring(0, 160),
                publishedInEco: isPublishedInEco,
                updatedAt: serverTimestamp()
            };

            if (isEditing) {
                // Si editem, mantenim o actualitzem la data
                postData.createdAt = Timestamp.fromDate(new Date(customDate));
                await updateDoc(doc(db, 'posts', id), postData);
            } else {
                // Si és nou, usem la data triada
                postData.createdAt = Timestamp.fromDate(new Date(customDate));
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
        <div
            className="container"
            style={{
                paddingTop: '2rem',
                maxWidth: '900px',
                paddingBottom: '4rem',
                position: 'relative'
            }}
        >
            <AnimatePresence>
                {isDraggingDoc && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(59, 130, 246, 0.1)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 3000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            pointerEvents: 'none', // Allow dropping through the overlay
                            border: '4px dashed var(--accent-primary)',
                            margin: '1rem',
                            borderRadius: '2rem'
                        }}
                    >
                        <div style={{ textAlign: 'center', color: 'white' }}>
                            <Upload size={64} style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }} />
                            <h2 style={{ fontSize: '2rem' }}>Amolla el fitxer aquí</h2>
                            <p style={{ opacity: 0.8 }}>Formats acceptats: .docx i .pdf</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link to="/admin/dashboard" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', hover: { color: 'white' } }}>
                        <ArrowLeft size={24} />
                    </Link>
                    <h1>{isEditing ? 'Editar Publicació' : 'Nova Publicació'}</h1>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button
                        type="button"
                        onClick={handleLogout}
                        style={{
                            background: 'transparent',
                            border: '1px solid #ef4444',
                            color: '#ef4444',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600'
                        }}
                    >
                        <LogOut size={16} /> Sortir
                    </button>
                    <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)', margin: '0 0.5rem' }}></div>
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
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Categoria</label>
                            <select
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-secondary)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '0.5rem' }}
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Data de l'Escrit</label>
                            <input
                                type="date"
                                value={customDate}
                                onChange={e => setCustomDate(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-secondary)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '0.5rem' }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '0.75rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <input
                        type="checkbox"
                        id="publishedInEco"
                        checked={isPublishedInEco}
                        onChange={e => setIsPublishedInEco(e.target.checked)}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                    <label htmlFor="publishedInEco" style={{ color: 'white', fontWeight: '600', cursor: 'pointer' }}>
                        Publicat a L'Eco de Sitges
                    </label>
                </div>

                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', border: '1px dashed rgba(255,255,255,0.1)' }}>
                    <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>Multimèdia de Portada (Foto o Vídeo)</label>
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
                                overflow: 'hidden',
                                position: 'relative'
                            }}
                        >
                            {video ? (
                                <video src={video} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted />
                            ) : image ? (
                                <img src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <>
                                    <ImageIcon size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                                    <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Tria foto o vídeo</span>
                                </>
                            )}
                            {(image || video) && (
                                <div style={{ position: 'absolute', top: '5px', right: '5px', zIndex: 10 }}>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setImage('');
                                            setVideo('');
                                        }}
                                        style={{ background: 'rgba(239, 68, 68, 0.9)', border: 'none', color: 'white', padding: '4px', borderRadius: '4px', cursor: 'pointer', display: 'flex' }}
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div style={{ flex: 1 }}>
                            <input
                                type="file"
                                ref={imageInputRef}
                                style={{ display: 'none' }}
                                accept="image/*,video/*"
                                onChange={handleImageUpload}
                            />
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Pots pujar una imatge (estàtica) o un vídeo (motiu en bucle) per a la capçalera de l'article.
                            </p>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Text Alternatiu (SEO / Accessibilitat)</label>
                                <input
                                    type="text"
                                    placeholder="Descripció per a Google..."
                                    value={imageAlt}
                                    onChange={e => setImageAlt(e.target.value)}
                                    style={{ width: '100%', padding: '0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '0.4rem', fontSize: '0.9rem' }}
                                />
                            </div>
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
