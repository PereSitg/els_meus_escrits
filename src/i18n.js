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
                        placeholder_desc: 'Estic preparant la documentació dels meus projectes recents per mostrar-los aquí.'
                    },
                    footer: {
                        made_with: 'Fet amb ❤️ des de Sitges.'
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
                        placeholder_desc: 'Estoy preparando la documentación de mis proyectos recientes para mostrarlos aquí.'
                    },
                    footer: {
                        made_with: 'Hecho con ❤️ desde Sitges.'
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
                        placeholder_desc: 'I am preparing the documentation for my recent projects to showcase them here.'
                    },
                    footer: {
                        made_with: 'Made with ❤️ from Sitges.'
                    }
                }
            }
        }
    });

export default i18n;
