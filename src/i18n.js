import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'ca',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            ca: {
                translation: {
                    nav: {
                        projects: 'Projectes',
                        writings: 'Els meus escrits',
                        sitges: 'Sitges',
                        ecos: 'Ecos de Sociedad',
                        altres: 'Altres',
                        contact: 'Contacte',
                        logout: 'Tancar sessió'
                    },
                    hero: {
                        title: 'Pere Badia i Lorenz',
                        subtitle: 'Benvinguts al meu portafoli personal. Aquí trobareu els meus projectes, el meu currículum i un recull de reflexions i històries. Una finestra a la meva tasca professional i creativa.'
                    },
                    home: {
                        latest_posts: 'Darreres publicacions',
                        read_more: 'Llegir més',
                        loading: 'Carregant publicacions...',
                        sitges_desc: 'Explora els meus escrits i històries sobre Sitges.',
                        projects_desc: 'Descobreix els projectes professionals i creatius en els quals he treballat.',
                        related_posts: 'Altres històries que et podrien agradar'
                    },
                    projects: {
                        title: 'Projectes',
                        description: 'Aquesta és una selecció dels projectes més destacats en els quals he treballat. Des de desenvolupament web fins a iniciatives culturals i socials.',
                        filter_all: 'Tots',
                        coming_soon: 'Proximament',
                        placeholder_title: 'Nou Projecte',
                        placeholder_desc: 'Estic preparant la documentació dels meus projectes recents per mostrar-los aquí.',
                        sommelier: {
                            title: 'Sommelier Digital',
                            desc: 'Aplicació intel·ligent de recomanació de vins basada en IA Generativa. La fusió perfecta entre tecnologia moderna i coneixement enològic.',
                            detail_title: 'Sobre el Projecte',
                            detail_desc: 'He desenvolupat un assistent intel·ligent que actua com un sommelier expert. Aquesta eina no només coneix milers de referències, sinó que entén el context de l\'usuari (pressupost, tipus de cuina, preferències personals) per oferir recomanacions precises.',
                            author_note: 'Aquest projecte és un laboratori viu. Estic treballant constantment en el prompt tuning i en el filtratge de dades de Firebase per reduir el marge d\'error i fer que les recomanacions siguin cada cop més precises.',
                            architecture_title: 'Arquitectura Tecnològica',
                            architecture_ai: 'Motor d\'IA: Google Gemini API amb configuració de system instructions per a un to expert.',
                            architecture_data: 'Gestió de Dades: Firebase Realtime Database per emmagatzemar la bodega i l\'historial.',
                            architecture_dev: 'Desenvolupament: Python per al processament de llenguatge natural i integració de l\'API.',
                            features_title: 'Característiques Clau',
                            feature_1: 'Anàlisi de maridatge intel·ligent',
                            feature_2: 'Interfície de veu i text intuitiva',
                            feature_3: 'Base de dades dinàmica actualitzada amb IA',
                            try_button: 'Provar l\'aplicació',
                            back_button: 'Tornar a projectes'
                        },
                        sitgesart: {
                            title: 'Sitges Art',
                            desc: 'Un viatge per l\'art, la cultura i la memòria de Sitges. Una plataforma interactiva que connecta el passat amb el futur mitjançant la tecnologia.',
                            detail_title: 'Sobre el Projecte',
                            detail_desc: 'Sitges Art és un arxiu digital viu que celebra l\'herència cultural de Sitges. Hem creat una experiència on l\'art i la memòria històrica es fusionen amb una interfície moderna i accessible.',
                            architecture_title: 'Arquitectura Tecnològica',
                            architecture_ai: 'Motor d\'IA: Integració de models de llenguatge per a la contextualització d\'obres i indrets.',
                            architecture_data: 'Gestió de Dades: Indexació semàntica de continguts culturals i històrics.',
                            architecture_dev: 'Desenvolupament: Arquitectura basada en React amb un enfocament "mobile-first" per a la millor experiència en rutes urbanes.',
                            features_title: 'Característiques Clau',
                            feature_1: 'Cerca intel·ligent per art i història',
                            feature_2: 'Disseny responsiu adaptat a dispositius mòbils',
                            feature_3: 'Contingut multimèdia immersiu',
                            try_button: 'Veure la web',
                            back_button: 'Tornar a projectes'
                        },
                        sitgeswalk: {
                            title: 'Sitges Walk',
                            desc: 'Explora Sitges a peu amb aquesta guia interactiva. Descobreix rutes, punts d\'interès i la història de la vila d\'una manera dinàmica i mobile-first.',
                            detail_title: 'Sobre el Projecte',
                            detail_desc: 'Hem dissenyat Sitges Walk per ser el company perfecte per als teus passejos. Una aplicació que no només et guia geogràficament, sinó que t\'explica la història que s\'amaga darrere de cada cantonada de Sitges.',
                            architecture_title: 'Arquitectura Tecnològica',
                            architecture_ai: 'Geolocalització: Integració en temps real per a una navegació fluida.',
                            architecture_data: 'Gestió de Dades: Base de dades optimitzada per a rutes i punts d\'interès.',
                            architecture_dev: 'Desenvolupament: Enfocament de Progressive Web App (PWA) amb React per a una experiència nativa en el mòbil.',
                            features_title: 'Característiques Clau',
                            feature_1: 'Mapes interactius de rutes culturals',
                            feature_2: 'Informació històrica geolocalitzada',
                            feature_3: 'Interfície optimitzada per a l\'ús a l\'exterior',
                            try_button: 'Veure la web',
                            back_button: 'Tornar a projectes',
                            related_title: 'Altres Projectes'
                        }
                    },
                    footer: {
                        made_with: 'Fet amb ❤️ des de Sitges.'
                    },
                    translation: {
                        warning_es: 'Aquest text està escrit en català. Si es tradueix al castellà pot perdre part del sentit i de la ironia.',
                        warning_en: 'Aquest text està escrit en català. Si es tradueix a l\'anglès pot perdre part del sentit i de la ironia.',
                        translate_button: 'Traduir amb IA',
                        translating: 'Traduint...',
                        show_original: 'Mostrar original',
                        translation_error: 'Error en traduir. Torna-ho a intentar.'
                    }
                }
            },
            es: {
                translation: {
                    nav: {
                        projects: 'Proyectos',
                        writings: 'Mis escritos',
                        sitges: 'Sitges',
                        ecos: 'Ecos de Sociedad',
                        altres: 'Otros',
                        contact: 'Contacto',
                        logout: 'Cerrar sesión'
                    },
                    hero: {
                        title: 'Pere Badia i Lorenz',
                        subtitle: 'Bienvenidos a mi portafolio personal. Aquí encontraréis mis proyectos, mi currículum y una colección de reflexiones e historias. Una ventana a mi labor profesional y creativa.'
                    },
                    home: {
                        latest_posts: 'Últimas publicaciones',
                        read_more: 'Leer más',
                        loading: 'Cargando publicaciones...',
                        sitges_desc: 'Explora mis escritos e historias sobre Sitges.',
                        projects_desc: 'Descubre los proyectos profesionales y creativos en los que he trabajado.',
                        related_posts: 'Otras historias que te podrían gustar'
                    },
                    projects: {
                        title: 'Proyectos',
                        description: 'Esta es una selección de los proyectos más destacados en los que he trabajado. Desde desarrollo web hasta iniciativas culturales y sociales.',
                        filter_all: 'Todos',
                        coming_soon: 'Próximamente',
                        placeholder_title: 'Nuevo Proyecto',
                        placeholder_desc: 'Estoy preparando la documentación de mis proyectos recientes para mostrarlos aquí.',
                        sommelier: {
                            title: 'Sommelier Digital',
                            desc: 'Aplicación inteligente de recomendación de vinos basada en IA Generativa. La fusión perfecta entre tecnología moderna y conocimiento enológico.',
                            detail_title: 'Sobre el Proyecto',
                            detail_desc: 'He desarrollado un asistente inteligente que actúa como un sommelier experto. Esta herramienta no solo conoce miles de referencias, sino que entiende el contexto del usuario (presupuesto, tipo de cocina, preferencias personales) para ofrecer recomendaciones precisas.',
                            author_note: 'Este proyecto es un laboratorio vivo. Estoy trabajando constantemente en el prompt tuning y en el filtrado de datos de Firebase para reducir el margen de error y hacer que las recomendaciones sean cada vez más precisas.',
                            architecture_title: 'Arquitectura Tecnológica',
                            architecture_ai: 'Motor de IA: Google Gemini API con configuración de system instructions para un tono experto.',
                            architecture_data: 'Gestión de Datos: Firebase Realtime Database para almacenar la bodega y el historial.',
                            architecture_dev: 'Desarrollo: Python para el procesamiento de lenguaje natural e integración de la API.',
                            features_title: 'Características Clave',
                            feature_1: 'Análisis de maridaje inteligente',
                            feature_2: 'Interfaz de voz y texto intuitiva',
                            feature_3: 'Base de datos dinámica actualizada con IA',
                            try_button: 'Probar la aplicación',
                            back_button: 'Volver a proyectos'
                        },
                        sitgesart: {
                            title: 'Sitges Art',
                            desc: 'Un viaje por el arte, la cultura y la memoria de Sitges. Una plataforma interactiva que conecta el pasado con el futuro mediante la tecnología.',
                            detail_title: 'Sobre el Proyecto',
                            detail_desc: 'Sitges Art es un archivo digital vivo que celebra la herencia cultural de Sitges. Hemos creado una experiencia donde el arte y la memoria histórica se fusionan con una interfaz moderna y accesible.',
                            architecture_title: 'Arquitectura Tecnológica',
                            architecture_ai: 'Motor de IA: Integración de modelos de lenguaje para la contextualización de obras y lugares.',
                            architecture_data: 'Gestión de Datos: Indexación semántica de contenidos culturales e históricos.',
                            architecture_dev: 'Desarrollo: Arquitectura basada en React con un enfoque "mobile-first" para la mejor experiencia en rutas urbanas.',
                            features_title: 'Caracteristicas Clave',
                            feature_1: 'Búsqueda inteligente por arte e historia',
                            feature_2: 'Diseño responsivo adaptado a dispositivos móviles',
                            feature_3: 'Contenido multimedia inmersivo',
                            try_button: 'Ver la web',
                            back_button: 'Volver a proyectos'
                        },
                        sitgeswalk: {
                            title: 'Sitges Walk',
                            desc: 'Explora Sitges a pie con esta guía interactiva. Descubre rutas, puntos de interés e historia de la villa de una manera dinámica y mobile-first.',
                            detail_title: 'Sobre el Proyecto',
                            detail_desc: 'Hemos diseñado Sitges Walk para ser el compañero perfecto para tus paseos. Una aplicación que no solo te guía geográficamente, sino que te explica la historia que se esconde detrás de cada rincón de Sitges.',
                            architecture_title: 'Arquitectura Tecnológica',
                            architecture_ai: 'Geolocalización: Integración en tiempo real para una navegación fluida.',
                            architecture_data: 'Gestión de Datos: Base de datos optimizada para rutas y puntos de interés.',
                            architecture_dev: 'Desarrollo: Enfoque de Progressive Web App (PWA) con React para una experiencia nativa en el móvil.',
                            features_title: 'Características Clave',
                            feature_1: 'Mapas interactivos de rutas culturales',
                            feature_2: 'Información histórica geolocalizada',
                            feature_3: 'Interfaz optimizada para el uso al exterior',
                            try_button: 'Ver la web',
                            back_button: 'Volver a proyectos',
                            related_title: 'Otros Proyectos'
                        }
                    },
                    footer: {
                        made_with: 'Hecho con ❤️ desde Sitges.'
                    },
                    translation: {
                        warning_es: 'Estos textos están escritos en catalán. La traducción puede perder parte del sentido y de la ironía.',
                        warning_en: 'Estos textos están escritos en catalán. La traducción puede perder parte del sentido y de la ironía.',
                        translate_button: 'Traducir con IA',
                        translating: 'Traduciendo...',
                        show_original: 'Mostrar original',
                        translation_error: 'Error al traducir. Inténtalo de nuevo.'
                    }
                }
            },
            en: {
                translation: {
                    nav: {
                        projects: 'Projects',
                        writings: 'My Writings',
                        sitges: 'Sitges',
                        ecos: 'Society News',
                        altres: 'Others',
                        contact: 'Contact',
                        logout: 'Log out'
                    },
                    hero: {
                        title: 'Pere Badia i Lorenz',
                        subtitle: 'Welcome to my personal portfolio. Here you will find my projects, my CV, and a collection of reflections and stories. A window into my professional and creative work.'
                    },
                    home: {
                        latest_posts: 'Latest Posts',
                        read_more: 'Read more',
                        loading: 'Loading posts...',
                        sitges_desc: 'Explore my writings and stories about Sitges.',
                        projects_desc: 'Discover the professional and creative projects I have worked on.',
                        related_posts: 'Other stories you might like'
                    },
                    projects: {
                        title: 'Projects',
                        description: 'This is a selection of the most relevant projects I have worked on. From web development to cultural and social initiatives.',
                        filter_all: 'All',
                        coming_soon: 'Coming Soon',
                        placeholder_title: 'New Project',
                        placeholder_desc: 'I am preparing the documentation for my recent projects to showcase them here.',
                        sommelier: {
                            title: 'Digital Sommelier',
                            desc: 'Intelligent wine recommendation application based on Generative AI. The perfect fusion between modern technology and enological knowledge.',
                            detail_title: 'About the Project',
                            detail_desc: 'I have developed an intelligent assistant that acts as an expert sommelier. This tool not only knows thousands of references but also understands the user context (budget, type of cuisine, personal preferences) to offer precise recommendations.',
                            author_note: 'This project is a living laboratory. I am constantly working on prompt tuning and Firebase data filtering to reduce the error margin and make the recommendations increasingly precise.',
                            architecture_title: 'Technological Architecture',
                            architecture_ai: 'AI Engine: Google Gemini API with system instructions configured for an expert tone.',
                            architecture_data: 'Data Management: Firebase Realtime Database to store cellar and history.',
                            architecture_dev: 'Development: Python for natural language processing and API integration.',
                            features_title: 'Key Features',
                            feature_1: 'Intelligent pairing analysis',
                            feature_2: 'Intuitive voice and text interface',
                            feature_3: 'Dynamic AI-updated database',
                            try_button: 'Try the app',
                            back_button: 'Back to projects'
                        },
                        sitgesart: {
                            title: 'Sitges Art',
                            desc: 'A journey through the art, culture, and memory of Sitges. An interactive platform that connects the past with the future through technology.',
                            detail_title: 'About the Project',
                            detail_desc: 'Sitges Art is a living digital archive that celebrates Sitges\' cultural heritage. We have created an experience where art and historical memory merge with a modern and accessible interface.',
                            architecture_title: 'Technological Architecture',
                            architecture_ai: 'AI Engine: Language model integration for contextualizing artworks and locations.',
                            architecture_data: 'Data Management: Semantic indexing of cultural and historical content.',
                            architecture_dev: 'Development: React-based architecture with a "mobile-first" approach for the best experience on urban routes.',
                            features_title: 'Key Features',
                            feature_1: 'Intelligent search by art and history',
                            feature_2: 'Responsive design adapted for mobile devices',
                            feature_3: 'Immersive multimedia content',
                            try_button: 'View the website',
                            back_button: 'Back to projects'
                        },
                        sitgeswalk: {
                            title: 'Sitges Walk',
                            desc: 'Explore Sitges on foot with this interactive guide. Discover routes, points of interest, and the town\'s history in a dynamic and mobile-first way.',
                            detail_title: 'About the Project',
                            detail_desc: 'We designed Sitges Walk to be the perfect companion for your walks. An application that not only guides you geographically but also explains the history hidden behind every corner of Sitges.',
                            architecture_title: 'Technological Architecture',
                            architecture_ai: 'Geolocation: Real-time integration for smooth navigation.',
                            architecture_data: 'Data Management: Database optimized for routes and points of interest.',
                            architecture_dev: 'Development: Progressive Web App (PWA) approach with React for a native mobile experience.',
                            features_title: 'Key Features',
                            feature_1: 'Interactive cultural route maps',
                            feature_2: 'Geolocated historical information',
                            feature_3: 'Interface optimized for outdoor use',
                            try_button: 'View the website',
                            back_button: 'Back to projects',
                            related_title: 'Other Projects'
                        }
                    },
                    footer: {
                        made_with: 'Made with ❤️ from Sitges.'
                    },
                    translation: {
                        warning_es: 'These texts are written in Catalan. Translation may lose some of the meaning and irony.',
                        warning_en: 'These texts are written in Catalan. Translation may lose some of the meaning and irony.',
                        translate_button: 'Translate with AI',
                        translating: 'Translating...',
                        show_original: 'Show original',
                        translation_error: 'Translation error. Please try again.'
                    }
                }
            }
        }
    });

export default i18n;
