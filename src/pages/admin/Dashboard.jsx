import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/admin/login');
            return;
        }

        // Fetch posts (placeholder logic until we have real data)
        // const fetchPosts = async () => { ... }
        // setPosts([...]); 
    }, [currentUser, navigate]);

    async function handleLogout() {
        try {
            await logout();
            navigate('/admin/login');
        } catch {
            console.error("Failed to log out");
        }
    }

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Dashboard</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/admin/new" className="btn btn-primary">Nova Publicació</Link>
                    <button onClick={handleLogout} className="btn" style={{ border: '1px solid var(--danger)', color: 'var(--danger)' }}>
                        Sortir
                    </button>
                </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '1rem', padding: '1rem' }}>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
                    Encara no hi ha publicacions.
                </p>
                {/* List of posts will go here */}
            </div>
        </div>
    );
}
