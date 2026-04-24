/**
 * Global Metadata Injector (Vercel Serverless Function)
 * Intercepts requests for ANY root-level path (/:id),
 * determines if it's a post or a page, and injects the appropriate OG meta tags.
 */

const PROJECT_ID = process.env.VITE_PROJECT_ID;
const API_KEY = process.env.VITE_API_KEY;

export default async function handler(req, res) {
    try {
        const { id, path } = req.query; 
        // Normalize path: remove trailing slashes
        const fullPath = (path || id || '').replace(/\/+$/, '');
        const host = req.headers.host || 'els-meus-escrits.vercel.app';
        const protocol = host.includes('localhost') ? 'http' : 'https';
        const baseUrl = `${protocol}://${host}`;
        const currentUrl = `${baseUrl}/${fullPath}`.replace(/\/+$/, '') || baseUrl;

        // Helper to ensure absolute URLs for images
        const ensureAbsolute = (url) => {
            if (!url) return null;
            if (url.startsWith('http')) return url;
            return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
        };

        // 1. Fetch the base index.html
        const response = await fetch(`${baseUrl}/`);
        let html = await response.text();

        if (!PROJECT_ID || !API_KEY) {
            console.warn('Missing Firebase credentials in API.');
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return res.status(200).send(html);
        }

        let metadata = null;

        // 2. Determine what we are looking at
        // Extract the last segment if it's a potential post ID/Slug
        const segments = fullPath.split('/').filter(Boolean);
        const lastSegment = segments[segments.length - 1];

        if (lastSegment) {
            // A. Check if it's a post (by ID first, then by Slug)
            const postByIdUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/posts/${lastSegment}?key=${API_KEY}`;
            const postByIdRes = await fetch(postByIdUrl);
            const postByIdData = await postByIdRes.json();

            if (postByIdData && postByIdData.fields) {
                const fields = postByIdData.fields;
                metadata = {
                    title: fields.seoTitle?.stringValue || fields.title?.stringValue,
                    description: fields.seoDescription?.stringValue || fields.subtitle?.stringValue,
                    image: ensureAbsolute(fields.image?.stringValue),
                    url: currentUrl
                };
            } else {
                // B. Try searching by Slug
                const slugQueryUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:runQuery?key=${API_KEY}`;
                const slugQueryBody = {
                    structuredQuery: {
                        from: [{ collectionId: 'posts' }],
                        where: {
                            fieldFilter: {
                                field: { fieldPath: 'slug' },
                                op: 'EQUAL',
                                value: { stringValue: lastSegment }
                            }
                        },
                        limit: 1
                    }
                };
                const slugRes = await fetch(slugQueryUrl, {
                    method: 'POST',
                    body: JSON.stringify(slugQueryBody)
                });
                const slugData = await slugRes.json();

                if (slugData && slugData[0] && slugData[0].document) {
                    const fields = slugData[0].document.fields;
                    metadata = {
                        title: fields.seoTitle?.stringValue || fields.title?.stringValue,
                        description: fields.seoDescription?.stringValue || fields.subtitle?.stringValue,
                        image: ensureAbsolute(fields.image?.stringValue),
                        url: currentUrl
                    };
                }
            }
        }

        // C. If not a post, check if it's a known Page or Project
        if (!metadata) {
            // Hardcoded fallbacks for projects and static pages
            const projectFallbacks = {
                'projects/sommelier': {
                    title: 'Sommelier Digital IA | Recomanador de Vins Personalitzat',
                    description: 'Descobreix el Sommelier Digital basat en IA: recomanacions de vins precises segons el teu pressupost i gustos.',
                    image: '/sommelier_digital.png'
                },
                'projects/sitges-art': {
                    title: 'Sitges Art | Patrimoni Artístic en Realitat Augmentada',
                    description: 'Plataforma per descobrir l\'art urbà de Sitges mitjançant geolocalització i IA.',
                    image: '/sitges_art.png'
                },
                'projects/sitges-walk': {
                    title: 'Sitges Walk | Rutes Històriques Digitals',
                    description: 'Explora Sitges amb guies digitals immersives per a rutes culturals i històriques.',
                    image: '/sitges_walk.png'
                },
                'projects/fets-per-sitges': {
                    title: 'Fets per Sitges | Estratègia Digital de Guerrilla',
                    description: 'L\'èxit de Fets per Sitges: 666 vots amb pressupost zero gràcies a una estratègia digital puntera.',
                    image: '/fets_per_sitges_card.png'
                },
                'projects/tal-com-erem': {
                    title: 'Tal Com Érem | Arxiu Històric Digital',
                    description: 'Projecte de recuperació de memòria històrica mitjançant la digitalització d\'arxius fotogràfics.',
                    image: '/talcomerem.jpg'
                },
                'projects/mes-enlla-d-orio': {
                    title: 'Més enllà d\'Orió | Blog de Tecnologia i IA',
                    description: 'Blog personal sobre tecnologia, intel·ligència artificial i futurisme.',
                    image: '/mes_enlla_card.jpg'
                }
            };

            const fallback = projectFallbacks[fullPath];
            if (fallback) {
                metadata = {
                    title: fallback.title,
                    description: fallback.description,
                    image: ensureAbsolute(fallback.image),
                    url: currentUrl
                };
            } else {
                // Try Firestore site_seo collection
                const pageMap = {
                    'home': 'home',
                    'projects': 'projects_list',
                    'stack': 'stack',
                    'contact': 'contact',
                    'avis-legal': 'avis_legal',
                    'politica-cookies': 'politica_cookies',
                    'politica-privacitat': 'politica_privacitat'
                };
                
                const seoId = pageMap[fullPath] || (fullPath === '' ? 'home' : null);
                if (seoId) {
                    const seoUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/site_seo/${seoId}?key=${API_KEY}`;
                    const seoRes = await fetch(seoUrl);
                    const seoData = await seoRes.json();

                    if (seoData && seoData.fields) {
                        const fields = seoData.fields;
                        metadata = {
                            title: fields.title?.stringValue,
                            description: fields.description?.stringValue,
                            image: ensureAbsolute(fields.image?.stringValue),
                            url: currentUrl
                        };
                    }
                }
            }
        }

        // 3. Inject metadata if found
        if (metadata) {
            const title = metadata.title || 'Pere Badia i Lorenz';
            const description = metadata.description || 'Portafoli personal de Pere Badia i Lorenz - Reflexions, històries i projectes professionals.';
            const image = metadata.image || `${baseUrl}/social-preview.png?v=2`;
            const fullTitle = title.includes('Pere Badia') ? title : `${title} | Pere Badia i Lorenz`;

            const replaceMeta = (htmlContent, nameOrProperty, value, isName = false) => {
                const attr = isName ? 'name' : 'property';
                // Use a more robust regex that can handle existing tags or add them if missing
                const regex = new RegExp(`<meta\\s+${attr}="${nameOrProperty}"[^>]*>`, 'i');
                if (regex.test(htmlContent)) {
                    const replacement = `<meta ${attr}="${nameOrProperty}" content="${value}" />`;
                    return htmlContent.replace(regex, replacement);
                } else {
                    // If not found, inject it before </head>
                    const replacement = `<meta ${attr}="${nameOrProperty}" content="${value}" />\n  `;
                    return htmlContent.replace('</head>', `${replacement}</head>`);
                }
            };

            const replaceCanonical = (htmlContent, value) => {
                const regex = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i;
                const replacement = `<link rel="canonical" href="${value}" />`;
                return htmlContent.replace(regex, replacement);
            };

            html = html.replace(/<title>.*?<\/title>/i, `<title>${fullTitle}</title>`);
            html = replaceMeta(html, 'og:title', fullTitle);
            html = replaceMeta(html, 'og:description', description);
            html = replaceMeta(html, 'og:image', image);
            html = replaceMeta(html, 'og:image:secure_url', image);
            html = replaceMeta(html, 'og:url', metadata.url);
            html = replaceCanonical(html, metadata.url);
            
            // Twitter specific tags
            html = replaceMeta(html, 'twitter:card', 'summary_large_image', true);
            html = replaceMeta(html, 'twitter:title', fullTitle, true);
            html = replaceMeta(html, 'twitter:description', description, true);
            html = replaceMeta(html, 'twitter:image', image, true);
            html = replaceMeta(html, 'twitter:url', metadata.url, true);

            // Ensure dimensions for large previews
            html = replaceMeta(html, 'og:image:width', '1200');
            html = replaceMeta(html, 'og:image:height', '630');
        } else {
            // Fallback for unknown pages
            const replaceCanonical = (htmlContent, value) => {
                const regex = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i;
                const replacement = `<link rel="canonical" href="${value}" />`;
                return htmlContent.replace(regex, replacement);
            };
            html = replaceCanonical(html, currentUrl);
        }

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
        return res.status(200).send(html);
    } catch (error) {
        console.error('Global Metadata Injector error:', error);
        
        // Fallback: Just serve the index.html from root
        try {
            const host = req.headers.host || 'els-meus-escrits.vercel.app';
            const protocol = host.includes('localhost') ? 'http' : 'https';
            const response = await fetch(`${protocol}://${host}/`);
            const html = await response.text();
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return res.status(200).send(html);
        } catch (fallbackError) {
            return res.status(500).send('Internal Server Error');
        }
    }
}
