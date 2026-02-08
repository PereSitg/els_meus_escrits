export default function Contact() {
    return (
        <div className="container" style={{ paddingTop: '4rem', maxWidth: '600px' }}>
            <h1>Contacte</h1>
            <p style={{ margin: '1rem 0 2rem', color: 'var(--text-secondary)' }}>
                Tens alguna proposta o suggeriment? Envia'm un missatge.
            </p>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Nom</label>
                    <input type="text" style={{
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--bg-secondary)',
                        background: 'var(--bg-secondary)',
                        color: 'white',
                        fontFamily: 'inherit'
                    }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
                    <input type="email" style={{
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--bg-secondary)',
                        background: 'var(--bg-secondary)',
                        color: 'white',
                        fontFamily: 'inherit'
                    }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Missatge</label>
                    <textarea rows="5" style={{
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--bg-secondary)',
                        background: 'var(--bg-secondary)',
                        color: 'white',
                        fontFamily: 'inherit',
                        resize: 'vertical'
                    }}></textarea>
                </div>

                <button type="button" style={{
                    padding: '1rem 2rem',
                    background: 'var(--accent-primary)',
                    color: 'white',
                    borderRadius: '0.5rem',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    maxWidth: '200px'
                }}>
                    Enviar
                </button>
            </form>
        </div>
    );
}
