import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function ReaderEngagement() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Comprovar si l'usuari ja l'ha tancat o s'ha subscrit previament
    const hasDismissed = localStorage.getItem('newsletter_dismissed');
    const hasSubscribed = localStorage.getItem('newsletter_subscribed');

    if (!hasDismissed && !hasSubscribed) {
      // Mostrar després de 4 segons perquè no sigui intrusiu
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('newsletter_dismissed', 'true');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setErrorMessage('Si us plau, introdueix un correu vàlid.');
      return;
    }

    setStatus('loading');
    try {
      await addDoc(collection(db, 'subscribers'), {
        email,
        subscribedAt: serverTimestamp(),
        source: window.location.pathname
      });
      setStatus('success');
      localStorage.setItem('newsletter_subscribed', 'true');
      
      // Amagar automàticament després de 3 segons d'èxit
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch (error) {
      console.error('Error afegint subscriptor:', error);
      setStatus('error');
      setErrorMessage('Hi ha hagut un error. Torna-ho a provar més tard.');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 9999,
            width: 'calc(100% - 4rem)',
            maxWidth: '380px',
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '1.25rem',
            padding: '1.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
          className="reader-engagement-box"
        >
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '0.75rem',
              right: '0.75rem',
              background: 'transparent',
              border: 'none',
              color: 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
              e.currentTarget.style.background = 'transparent';
            }}
            aria-label="Tancar"
          >
            <X size={18} />
          </button>

          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
              >
                <CheckCircle2 size={48} style={{ color: '#10b981', margin: '0 auto 1rem' }} />
              </motion.div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'white' }}>Gràcies!</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                T'has subscrit correctament. Rebràs els meus propers escrits per correu.
              </p>
            </div>
          ) : (
            <>
              <h3 style={{ 
                fontSize: '1.15rem', 
                fontWeight: '700', 
                marginBottom: '0.5rem', 
                color: 'white',
                paddingRight: '1.5rem'
              }}>
                T'agraden els meus escrits?
              </h3>
              <p style={{ 
                color: 'rgba(255,255,255,0.7)', 
                fontSize: '0.9rem', 
                marginBottom: '1.25rem',
                lineHeight: '1.4'
              }}>
                Deixa el teu correu i t'avisaré quan publiqui coses noves. Sense spam.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    placeholder="El teu correu electrònic"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    disabled={status === 'loading'}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: `1px solid ${status === 'error' ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: '0.75rem',
                      color: 'white',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                    onBlur={(e) => e.target.style.borderColor = status === 'error' ? '#ef4444' : 'rgba(255,255,255,0.1)'}
                  />
                </div>
                
                {status === 'error' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#ef4444', fontSize: '0.8rem' }}>
                    <AlertCircle size={14} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--accent-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.75rem',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    cursor: status === 'loading' ? 'wait' : 'pointer',
                    opacity: status === 'loading' ? 0.7 : 1,
                    transition: 'opacity 0.2s, transform 0.1s'
                  }}
                  onMouseDown={(e) => !status && (e.currentTarget.style.transform = 'scale(0.98)')}
                  onMouseUp={(e) => !status && (e.currentTarget.style.transform = 'scale(1)')}
                  onMouseLeave={(e) => !status && (e.currentTarget.style.transform = 'scale(1)')}
                >
                  {status === 'loading' ? (
                    <div style={{
                      width: '18px',
                      height: '18px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: 'white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                  ) : (
                    <>
                      Subscriure'm <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {/* Media query pel mòbil injectada directament */}
          <style>{`
            @media (max-width: 640px) {
              .reader-engagement-box {
                bottom: 1rem !important;
                right: 1rem !important;
                width: calc(100% - 2rem) !important;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
