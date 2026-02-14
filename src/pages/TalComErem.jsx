import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, ArrowLeft } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';

// Custom TikTok icon since Lucide doesn't have one by default or it might be missing in some versions
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

    // Burgundy color from requirements
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
            {/* UNDER CONSTRUCTION BANNER */}
            <div style={{
                background: brandColor,
                color: 'white',
                textAlign: 'center',
                padding: '0.75rem',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                fontWeight: 'bold',
                letterSpacing: '0.05em',
                fontSize: '0.9rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                🚧 PROJECTE EN CONSTRUCCIÓ - DISPONIBLE MOLT AVIAT 🚧
            </div>

            <div className="container" style={{ maxWidth: '600px', margin: '0 auto', padding: '0 1.5rem' }}>

                {/* BACK BUTTON */}
                <Link to="/projects" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: brandColor,
                    textDecoration: 'none',
                    fontWeight: '600',
                    marginBottom: '3rem',
                    opacity: 0.8,
                    transition: 'opacity 0.2s'
                }}>
                    <ArrowLeft size={20} />
                    Tornar a projectes
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* TITLE SECTION */}
                    <header style={{ marginBottom: '3rem', textAlign: 'left' }}>
                        <span style={{
                            display: 'block',
                            color: brandColor,
                            fontSize: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            fontWeight: '600',
                            marginBottom: '0.5rem'
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
                    <p style={{
                        fontSize: '1.25rem',
                        lineHeight: 1.6,
                        color: '#4a4a4a',
                        marginBottom: '4rem'
                    }}>
                        Un projecte dedicat al rescat del patrimoni visual de Sitges, on la <strong>història</strong> i la <strong>Intel·ligència Artificial</strong> es donen la mà per restaurar, acolorir i tornar a la vida moments oblidats de la nostra vila. No és només nostàlgia; és memòria viva.
                    </p>

                    {/* MULTIMEDIA PLACEHOLDERS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '4rem' }}>

                        {/* VIDEO CONTAINER */}
                        <div style={{
                            background: '#f5f5f5',
                            aspectRatio: '16/9',
                            borderRadius: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px dashed #ddd',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <span style={{ color: '#aaa', fontWeight: '500' }}>Vídeo del procés (DaVinci/After Effects)</span>
                        </div>

                        {/* IMAGE COMPARISON CONTAINER */}
                        <div style={{
                            background: '#f5f5f5',
                            aspectRatio: '4/5', // Portrait for mobile first
                            borderRadius: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px dashed #ddd'
                        }}>
                            <span style={{ color: '#aaa', fontWeight: '500' }}>Comparador d'Imatges (Abans/Després)</span>
                        </div>
                    </div>

                    {/* CTA SECTION */}
                    <div style={{
                        background: '#fff0f3', // Very light burgundy tint
                        padding: '2.5rem',
                        borderRadius: '1.5rem',
                        border: `1px solid ${brandColor}20`,
                        textAlign: 'center'
                    }}>
                        <p style={{
                            fontSize: '1.1rem',
                            color: brandColor,
                            fontWeight: '500',
                            marginBottom: '2rem',
                            lineHeight: 1.5
                        }}>
                            "Mentre esperem que surti el sol per completar les fotografies, segueix-nos a xarxes per veure els primers tastets de la recuperació històrica."
                        </p>

                        {/* SOCIAL LINKS */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <a
                                href="#" // Placeholder
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: brandColor,
                                    color: 'white',
                                    transition: 'transform 0.2s',
                                    boxShadow: '0 4px 15px rgba(128, 0, 32, 0.3)'
                                }}
                            >
                                <Instagram size={24} />
                            </a>
                            <a
                                href="#" // Placeholder
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: brandColor,
                                    color: 'white',
                                    transition: 'transform 0.2s',
                                    boxShadow: '0 4px 15px rgba(128, 0, 32, 0.3)'
                                }}
                            >
                                <TikTokIcon size={24} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
