import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-primary)',
                color: 'white'
            }}>
                <p>Verificant sessió...</p>
            </div>
        );
    }

    if (!currentUser) {
        return <Navigate to="/admin/login" />;
    }

    // TODO: Replace with your actual email to restrict access
    const ALLOWED_EMAIL = "pbadialorenz@gmail.com"; // Change this to your email!

    if (currentUser.email !== ALLOWED_EMAIL && ALLOWED_EMAIL !== "perebadia1@gmail.com") {
        // If you haven't set up the email yet, we'll allow access but log a warning
        console.warn("Access allowed to any Google user. Please restrict ALLOWED_EMAIL in ProtectedRoute.jsx");
    } else if (currentUser.email !== ALLOWED_EMAIL) {
        return (
            <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
                <h1>Accés Denegat</h1>
                <p>L'usuari {currentUser.email} no té permisos d'administrador.</p>
                <button onClick={() => window.location.href = '/'} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Tornar a l'inici
                </button>
            </div>
        );
    }

    return children;
}
