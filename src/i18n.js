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
                        sitges_desc: 'Explora els meus escrits, reflexions i històries sobre la Blanca Subur.',
                        projects_desc: 'Descobreix els projectes professionals i creatius en els quals he participat.'
                    },
                    projects: {
                        title: 'Projectes',
                        description: 'Aquesta és una selecció dels projectes més destacats en els quals he treballat. Des de desenvolupament web fins a iniciatives culturals i socials.',
                        coming_soon: 'Proximament',
                        placeholder_title: 'Nou Projecte',
                        placeholder_desc: 'Estic preparant la documentació dels meus projectes recents per mostrar-los aquí.',
                        sommelier: {
                            title: 'Sommelier Digital',
                            desc: 'Aplicació intel·ligent de recomanació de vins basada en IA Generativa. La fusió perfecta entre tecnologia moderna i coneixement enològic.',
                            detail_title: 'Sobre el Projecte',
                            detail_desc: 'El Sommelier Digital és un assistent expert que utilitza intel·ligència artificial d\'última generació per ajudar-te a triar el vi perfecte per a cada ocasió. Mitjançant la Gemini API de Google i frameworks avançats com LangChain, l\'aplicació analitza el tipus de menjar, les teves preferències i el pressupost per oferir una experiència enològica personalitzada.',
                            features_title: 'Característiques Clau',
                            feature_1: 'Anàlisi de maridatge intel·ligent',
                            feature_2: 'Interfície de veu i text intuitiva',
                            feature_3: 'Base de dades dinàmica actualitzada amb IA',
                            try_button: 'Provar l\'aplicació',
                            back_button: 'Tornar a projectes'
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
                        sitges_desc: 'Explora mis escritos, reflexiones e historias sobre la Blanca Subur.',
                        projects_desc: 'Descubre los proyectos profesionales y creativos en los que he participado.'
                    },
                    projects: {
                        title: 'Proyectos',
                        description: 'Esta es una selección de los proyectos más destacados en los que he trabajado. Desde desarrollo web hasta iniciativas culturales y sociales.',
                        coming_soon: 'Próximamente',
                        placeholder_title: 'Nuevo Proyecto',
                        placeholder_desc: 'Estoy preparando la documentación de mis proyectos recientes para mostrarlos aquí.',
                        sommelier: {
                            title: 'Sommelier Digital',
                            desc: 'Aplicación inteligente de recomendación de vinos basada en IA Generativa. La fusión perfecta entre tecnología moderna y conocimiento enológico.',
                            detail_title: 'Sobre el Proyecto',
                            detail_desc: 'El Sommelier Digital es un asistente experto que utiliza inteligencia artificial de última generación para ayudarte a elegir el vino perfecto para cada ocasión. Mediante la Gemini API de Google i frameworks avanzados como LangChain, la aplicación analiza el tipo de comida, tus preferencias y el presupuesto para ofrecer una experiencia enológica personalizada.',
                            features_title: 'Características Clave',
                            feature_1: 'Análisis de maridaje inteligente',
                            feature_2: 'Interfaz de voz y texto intuitiva',
                            feature_3: 'Base de datos dinámica actualizada con IA',
                            try_button: 'Probar la aplicación',
                            back_button: 'Volver a proyectos'
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
                        sitges_desc: 'Explore my writings, reflections and stories about the Blanca Subur.',
                        projects_desc: 'Discover the professional and creative projects I have been involved in.'
                    },
                    projects: {
                        title: 'Projects',
                        description: 'This is a selection of the most relevant projects I have worked on. From web development to cultural and social initiatives.',
                        coming_soon: 'Coming Soon',
                        placeholder_title: 'New Project',
                        placeholder_desc: 'I am preparing the documentation for my recent projects to showcase them here.',
                        sommelier: {
                            title: 'Digital Sommelier',
                            desc: 'Intelligent wine recommendation application based on Generative AI. The perfect fusion between modern technology and enological knowledge.',
                            detail_title: 'About the Project',
                            detail_desc: 'The Digital Sommelier is an expert assistant that uses state-of-the-art artificial intelligence to help you choose the perfect wine for every occasion. Using Google\'s Gemini API and advanced frameworks like LangChain, the application analyzes the type of food, your preferences, and budget to provide a personalized enological experience.',
                            features_title: 'Key Features',
                            feature_1: 'Intelligent pairing analysis',
                            feature_2: 'Intuitive voice and text interface',
                            feature_3: 'Dynamic AI-updated database',
                            try_button: 'Try the app',
                            back_button: 'Back to projects'
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
