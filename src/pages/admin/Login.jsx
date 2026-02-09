import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleGoogleLogin() {
        try {
            setError('');
            await login();
            navigate('/admin/dashboard');
        } catch (err) {
            console.error(err);
            setError('Failed to log in with Google.');
        }
    }

    return (
        <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ maxWidth: '400px', width: '100%', background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--accent-glow)', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Accés Administrador</h2>

                {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}

                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Inicia sessió amb el teu compte de Google per gestionar el blog.
                </p>

                <button
                    onClick={handleGoogleLogin}
                    className="btn"
                    style={{
                        background: 'white',
                        color: '#333',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        width: '100%',
                        fontSize: '1rem'
                    }}
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '20px' }} />
                    Entrar amb Google
                </button>

                <div style={{ marginTop: '2rem', textAlign: 'left', fontSize: '0.7rem', background: '#333', padding: '0.5rem', borderRadius: '0.5rem', color: '#ccc' }}>
                    <p><strong>Configuració detectada:</strong></p>
                    <pre style={{ overflowX: 'auto' }}>
                        {JSON.stringify(
                            Object.fromEntries(
                                Object.entries(import.meta.env).filter(([key]) => key.startsWith('VITE_'))
                            ),
                            null,
                            2
                        )}
                    </pre>
                </div>

            </div>
        </div>
    );
}
