import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const stackSections = [
    {
        title: "IA & Desenvolupament (El cervell)",
        items: [
            {
                name: "Google Gemini API",
                description: "El motor de raonament darrere dels meus projectes. La seva gran finestra de context em permet processar volums massius de dades (com cartes de vins o arxius històrics) amb una precisió quirúrgica.",
                viewBox: "0 0 24 24",
                icon: <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" />
            },
            {
                name: "Python",
                description: "El meu llenguatge de referència per al tractament de dades i la creació de scripts que connecten la IA amb el món real.",
                viewBox: "0 0 24 24",
                icon: <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
            },
            {
                name: "VS Code",
                description: "El meu centre de comandament, on orquestro el codi amb l'ajuda de copilots d'IA.",
                viewBox: "0 0 24 24",
                icon: <path d="M23.15 2.58L17.24 0l-5.32 5.05L7.05 1.41 0 3.79v16.42l7.05 2.38 4.87-3.64 5.32 5.05 5.91-2.58V2.58zm-14.7 14.1l-3.35-2.5 3.35-2.5V16.68zm5.2 2.22l-2.65-2 2.65-2v4z" />
            }
        ]
    },
    {
        title: "Infraestructura & Web (L'esquelet)",
        items: [
            {
                name: "React & Tailwind CSS",
                description: "L'elecció per crear interfícies modernes, ràpides i visuals. M'enfoco en la 'Clean UI' (interfícies netes) que facilitin la interacció de l'usuari.",
                viewBox: "0 0 24 24",
                icon: <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
            },
            {
                name: "Firebase",
                description: "La infraestructura que fa que tot funcioni. Gestiono bases de dades i autenticació sense perdre temps en configuracions de servidor complexes.",
                viewBox: "0 0 24 24",
                icon: <path d="M19.455 8.369c-.538-.748-1.778-2.285-3.681-4.569-.826-.991-1.535-1.832-1.884-2.245a146 146 0 0 0-.488-.576l-.207-.245-.113-.133-.022-.032-.01-.005L12.57 0l-.609.488c-1.555 1.246-2.828 2.851-3.681 4.64-.523 1.064-.864 2.105-1.043 3.176-.047.241-.088.489-.121.738-.209-.017-.421-.028-.632-.033-.018-.001-.035-.002-.059-.003a7.46 7.46 0 0 0-2.28.274l-.317.089-.163.286c-.765 1.342-1.198 2.869-1.252 4.416-.07 2.01.477 3.954 1.583 5.625 1.082 1.633 2.61 2.882 4.42 3.611l.236.095.071.025.003-.001a9.59 9.59 0 0 0 2.941.568q.171.006.342.006c1.273 0 2.513-.249 3.69-.742l.008.004.313-.145a9.63 9.63 0 0 0 3.927-3.335c1.01-1.49 1.577-3.234 1.641-5.042.075-2.161-.643-4.304-2.133-6.371m-7.083 6.695c.328 1.244.264 2.44-.191 3.558-1.135-1.12-1.967-2.352-2.475-3.665-.543-1.404-.87-2.74-.974-3.975.48.157.922.366 1.315.622 1.132.737 1.914 1.902 2.325 3.461zm.207 6.022c.482.368.99.712 1.513 1.028-.771.21-1.565.302-2.369.273a8 8 0 0 1-.373-.022c.458-.394.869-.823 1.228-1.279zm1.347-6.431c-.516-1.957-1.527-3.437-3.002-4.398-.647-.421-1.385-.741-2.194-.95.011-.134.026-.268.043-.4.014-.113.03-.216.046-.313.133-.689.332-1.37.589-2.025.099-.25.206-.499.321-.74l.004-.008c.177-.358.376-.719.61-1.105l.092-.152-.003-.001c.544-.851 1.197-1.627 1.942-2.311l.288.341c.672.796 1.304 1.548 1.878 2.237 1.291 1.549 2.966 3.583 3.612 4.48 1.277 1.771 1.893 3.579 1.83 5.375-.049 1.395-.461 2.755-1.195 3.933-.694 1.116-1.661 2.05-2.8 2.708-.636-.318-1.559-.839-2.539-1.599.79-1.575.952-3.28.479-5.072zm-2.575 5.397c-.725.939-1.587 1.55-2.09 1.856-.081-.029-.163-.06-.243-.093l-.065-.026c-1.49-.616-2.747-1.656-3.635-3.01-.907-1.384-1.356-2.993-1.298-4.653.041-1.19.338-2.327.882-3.379.316-.07.638-.114.96-.131l.084-.002c.162-.003.324-.003.478 0 .227.011.454.035.677.07.073 1.513.445 3.145 1.105 4.852.637 1.644 1.694 3.162 3.144 4.515z" />
            },
            {
                name: "Vercel",
                description: "Per a un desplegament continu. La velocitat de passar de la idea a la web publicada és crítica en el meu flux de treball.",
                viewBox: "0 0 24 24",
                icon: <path d="m12 1.608 12 20.784H0Z" />
            }
        ]
    },
    {
        title: "Disseny & Narrativa (L'ànima)",
        items: [
            {
                name: "Adobe Photoshop",
                description: "La tecnologia sense narrativa és freda. Utilitzo Photoshop per vestir els projectes i comunicar-los de manera visualment impactant.",
                viewBox: "0 0 24 24",
                icon: <path d="M0 0v24h24V0H0zm6.54 16.03V8.3h3.58c1.9 0 2.87.97 2.87 2.62 0 1.83-1.01 2.65-2.87 2.65H8.35v2.46H6.54zm5.88-2.67h1.49c1 0 1.34-.4 1.34-1.04 0-.71-.38-1.05-1.34-1.05h-1.49v2.09zM14.28 16.14c-.69 0-1.28-.15-1.74-.41l.36-1.31c.42.22.88.35 1.32.35.63 0 .97-.24.97-.66 0-.39-.33-.58-1.03-.84-.96-.35-1.59-.83-1.59-1.8 0-1 .85-1.71 2.21-1.71.65 0 1.23.15 1.63.36l-.37 1.3c-.35-.16-.8-.28-1.21-.28-.59 0-.84.22-.84.53 0 .39.36.56 1.09.84.97.37 1.54.91 1.54 1.78.01 1.15-.84 1.85-2.34 1.85z" />
            },
            {
                name: "Antigravity",
                description: "El framework de disseny que dóna coherència visual i futurista a la meva presència digital.",
                viewBox: "0 0 24 24",
                icon: <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2zm0 13.54l-4.24 1.88L12 5.46l4.24 11.96L12 15.54z" />
            }
        ]
    }
];

export default function Stack() {
    const { t } = useTranslation();

    return (
        <div className="stack-page" style={{ paddingTop: '5rem', paddingBottom: '8rem' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="stack-header"
                    style={{ maxWidth: '800px', marginBottom: '5rem' }}
                >
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                        lineHeight: '1.1',
                        marginBottom: '2rem',
                        fontWeight: '800',
                        letterSpacing: '-0.03em',
                        color: '#ffffff'
                    }}>
                        El meu Stack: <span style={{ color: 'var(--accent-primary)' }}>On l'Estratègia troba l'Execució.</span>
                    </h1>

                    <div style={{ fontSize: '1.25rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Aquest stack tecnològic és el meu camp de joc. Mitjançant l'ús expert de la IA Generativa, transformo conceptes complexos en productes reals, demostrant que la visió estratègica i el bon ús de la tecnologia són més potents que el coneixement tècnic aïllat.
                        </p>
                        <p style={{
                            padding: '1.5rem',
                            background: 'rgba(59, 130, 246, 0.05)',
                            borderLeft: '4px solid var(--accent-primary)',
                            borderRadius: '0 1rem 1rem 0',
                            fontStyle: 'italic',
                            color: '#ffffff'
                        }}>
                            "No sóc un programador convencional; sóc un AI-Powered Builder. El meu valor no resideix en la memorització de sintaxi, sinó en la capacitat de dialogar amb la Intel·ligència Artificial per extreure'n el màxim potencial tècnic. Això em permet ser extremadament àgil: el que abans requeria un equip sencer, ara ho executo amb precisió i criteri propi."
                        </p>
                    </div>
                </motion.div>

                <div className="stack-grid" style={{ display: 'grid', gap: '4rem' }}>
                    {stackSections.map((section, sIndex) => (
                        <motion.section
                            key={section.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: sIndex * 0.1 }}
                        >
                            <h2 style={{
                                fontSize: '1.8rem',
                                marginBottom: '2rem',
                                color: 'var(--accent-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <span style={{ width: '40px', height: '2px', background: 'currentColor' }}></span>
                                {section.title}
                            </h2>

                            <div className="stack-items-grid" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '2rem'
                            }}>
                                {section.items.map((item, iIndex) => (
                                    <div
                                        key={item.name}
                                        className="stack-card glass"
                                        style={{
                                            padding: '2rem',
                                            borderRadius: '1.5rem',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            height: '100%',
                                            transition: 'transform 0.3s ease'
                                        }}
                                    >
                                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                            <div style={{
                                                width: '48px',
                                                height: '48px',
                                                flexShrink: 0,
                                                color: '#ffffff'
                                            }}>
                                                <svg viewBox={item.viewBox || "0 0 24 24"} fill="currentColor">
                                                    {item.icon}
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 style={{
                                                    fontSize: '1.3rem',
                                                    marginBottom: '0.75rem',
                                                    color: '#ffffff',
                                                    fontWeight: '700'
                                                }}>
                                                    {item.name}
                                                </h3>
                                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    ))}
                </div>

                {/* Secció Always Learning */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        marginTop: '6rem',
                        padding: '4rem',
                        borderRadius: '2rem',
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.02) 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.03)',
                        textAlign: 'center'
                    }}
                >
                    <h2 style={{ fontSize: '2.5rem', color: '#ffffff', marginBottom: '1.5rem', fontWeight: '800' }}>
                        "Always Learning"
                    </h2>
                    <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
                        Aquest stack no és estàtic. Cada setmana testo noves eines de l'ecosistema IA per mantenir-me a l'avantguarda de l'eficiència digital.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
