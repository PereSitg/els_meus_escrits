import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function PostEditor() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Politica');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const categories = ['Política', 'Ecos de Sociedad', 'Sitges'];

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            await addDoc(collection(db, 'posts'), {
                title,
                category,
                image,
                content,
                createdAt: serverTimestamp()
            });
            navigate('/admin/dashboard');
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Error al guardar el post');
        }

        setLoading(false);
    }

    return (
        <div className="container" style={{ paddingTop: '2rem', maxWidth: '800px' }}>
            <h1>Nova Publicació</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>

                {/* Title */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Títol</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-secondary)', border: 'none', color: 'white', borderRadius: '0.5rem' }}
                    />
                </div>

                {/* Category */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Categoria</label>
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-secondary)', border: 'none', color: 'white', borderRadius: '0.5rem' }}
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>

                {/* Image URL (Simple for MVP) */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Imatge (URL)</label>
                    <input
                        type="text"
                        value={image}
                        onChange={e => setImage(e.target.value)}
                        placeholder="https://..."
                        style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-secondary)', border: 'none', color: 'white', borderRadius: '0.5rem' }}
                    />
                </div>

                {/* Content */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Contingut</label>
                    <textarea
                        rows="10"
                        required
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-secondary)', border: 'none', color: 'white', borderRadius: '0.5rem' }}
                    ></textarea>
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary">
                    {loading ? 'Guardant...' : 'Publicar'}
                </button>
            </form>
        </div>
    );
}
