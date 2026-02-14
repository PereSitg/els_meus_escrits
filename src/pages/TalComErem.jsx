import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, ArrowLeft } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';

// Custom TikTok icon
const TikTokIcon = ({ size = 24, color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

export default function TalComErem() {
    useSEO('Tal com érem', 'Tal com érem - Recuperant el passat de Sitges');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Brand color: Burgundy
    const brandColor = '#800020';

    return (
        <div style={{
            minHeight: '100vh',
            background: '#ffffff', // Clean background
            color: '#333333',
            fontFamily: '"Outfit", sans-serif',
            paddingTop: '6rem',
            paddingBottom: '4rem'
        }}>
            {/* UNDER CONSTRUCTION BANNER - Prominent */}
            <div style={{
                background: brandColor,
                color: 'white',
                textAlign: 'center',
                padding: '1rem',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                fontWeight: 'bold',
                letterSpacing: '0.1em',
                fontSize: '1rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                borderBottom: '2px solid rgba(255,255,255,0.2)'
            }}>
                🏗️ PROJECTE EN CONSTRUCCIÓ - DISPONIBLE MOLT AVIAT 🏗️
            </div>

            <div className="container" style={{ maxWidth: '700px', margin: '0 auto', padding: '0 1.5rem' }}>

                {/* BACK BUTTON */}
                <Link to="/projects?tag=IA" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: brandColor,
                    textDecoration: 'none',
                    fontWeight: '600',
                    marginBottom: '3rem',
                    transition: 'opacity 0.2s'
                }}
                    onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                    <ArrowLeft size={20} />
                    Tornar a projectes
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
                >
                    {/* TITLE SECTION */}
                    <header style={{ textAlign: 'left' }}>
                        <span style={{
                            display: 'block',
                            color: brandColor,
                            fontSize: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.3em',
                            fontWeight: '700',
                            marginBottom: '0.75rem'
                        }}>
                            RECUPERANT
                        </span>
                        <h1 style={{
                            fontSize: '3.5rem',
                            fontWeight: '800',
                            color: '#1a1a1a',
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            Tal com érem
                        </h1>
                    </header>

                    {/* DESCRIPTION */}
                    <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#444' }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Un projecte dedicat al rescat del patrimoni visual de Sitges, on la <strong>història</strong> i la <strong>Intel·ligència Artificial</strong> s'uneixen per restaurar, acolorir i tornar a la vida moments oblidats de la nostra vila.
                        </p>
                        <p>
                            A través de tècniques avançades de restauració digital i IA generativa, estem recuperant col·leccions fotogràfiques antigues per mostrar Sitges d'una manera mai vista, conservant l'essència original però amb la claredat d'avui.
                        </p>
                    </div>

                    {/* MULTIMEDIA PLACEHOLDERS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

                        {/* COMPARISON PLACEHOLDER */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: brandColor }}>Comparador d'imatges (Abans / Ara)</h3>
                            <div style={{
                                background: '#f8f8f8',
                                aspectRatio: '1/1',
                                borderRadius: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px dashed #e0e0e0',
                                position: 'relative'
                            }}>
                                <span style={{ color: '#999', textAlign: 'center', padding: '2rem' }}>Espai reservat pel comparador interactiu de fotografies històriques</span>
                            </div>
                        </div>

                        {/* VIDEO PLACEHOLDER */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: brandColor }}>Making Of: Rescat Digital</h3>
                            <div style={{
                                background: '#f8f8f8',
                                aspectRatio: '9/16', // Vertical video format
                                maxWidth: '350px',
                                margin: '0 auto',
                                width: '100%',
                                borderRadius: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px dashed #e0e0e0'
                            }}>
                                <span style={{ color: '#999', textAlign: 'center', padding: '2rem' }}>Vídeo vertical del procés de tractament (DaVinci / AI)</span>
                            </div>
                        </div>
                    </div>

                    {/* CTA SECTION */}
                    <div style={{
                        background: brandColor,
                        padding: '3rem 2rem',
                        borderRadius: '2rem',
                        textAlign: 'center',
                        color: 'white',
                        boxShadow: '0 10px 30px rgba(128, 0, 32, 0.2)'
                    }}>
                        <p style={{
                            fontSize: '1.2rem',
                            fontWeight: '500',
                            marginBottom: '2.5rem',
                            lineHeight: '1.6',
                            maxWidth: '500px',
                            margin: '0 auto 2.5rem'
                        }}>
                            "Mentre esperem que surti el sol per completar les fotografies, segueix-nos a xarxes per veure els primers tastets de la recuperació històrica."
                        </p>

                        {/* SOCIAL LINKS - White icons, active hover */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    color: 'white',
                                    transition: 'all 0.3s ease',
                                    background: 'transparent'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.transform = 'scale(1.1)';
                                    e.currentTarget.style.opacity = '0.8';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.opacity = '1';
                                }}
                            >
                                <Instagram size={28} />
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    color: 'white',
                                    transition: 'all 0.3s ease',
                                    background: 'transparent'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.transform = 'scale(1.1)';
                                    e.currentTarget.style.opacity = '0.8';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.opacity = '1';
                                }}
                            >
                                <TikTokIcon size={28} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
            <style>{`
                @media (max-width: 768px) {
                    h1 { font-size: 2.5rem !important; }
                    .container { padding: 0 1.25rem !important; }
                }
            `}</style>
        </div>
    );
}
