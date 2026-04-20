/**
 * Global Metadata Injector (Vercel Serverless Function)
 * Intercepts requests for ANY root-level path (/:id),
 * determines if it's a post or a page, and injects the appropriate OG meta tags.
 */

const PROJECT_ID = process.env.VITE_PROJECT_ID;
const API_KEY = process.env.VITE_API_KEY;

export default async function handler(req, res) {
    try {
        const { id } = req.query; // This captures the 'id' part of /:id
        const host = req.headers.host || 'els-meus-escrits.vercel.app';
        const protocol = host.includes('localhost') ? 'http' : 'https';
        const baseUrl = `${protocol}://${host}`;

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
        // A. Check if it's a post (by ID first, then by Slug)
        const postByIdUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/posts/${id}?key=${API_KEY}`;
        const postByIdRes = await fetch(postByIdUrl);
        const postByIdData = await postByIdRes.json();

        if (postByIdData && postByIdData.fields) {
            const fields = postByIdData.fields;
            metadata = {
                title: fields.seoTitle?.stringValue || fields.title?.stringValue,
                description: fields.seoDescription?.stringValue || fields.subtitle?.stringValue,
                image: fields.image?.stringValue,
                url: `${baseUrl}/${id}`
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
                            value: { stringValue: id }
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
                    image: fields.image?.stringValue,
                    url: `${baseUrl}/${id}`
                };
            }
        }

        // C. If not a post, check if it's a known Page in site_seo
        if (!metadata) {
            // Map common paths to SEO document IDs
            const pageMap = {
                'projects': 'projects_list',
                'stack': 'stack',
                'contact': 'contact',
                'avis-legal': 'avis_legal',
                'politica-cookies': 'politica_cookies',
                'politica-privacitat': 'politica_privacitat'
            };
            
            const seoId = pageMap[id];
            if (seoId) {
                const seoUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/site_seo/${seoId}?key=${API_KEY}`;
                const seoRes = await fetch(seoUrl);
                const seoData = await seoRes.json();

                if (seoData && seoData.fields) {
                    const fields = seoData.fields;
                    metadata = {
                        title: fields.title?.stringValue,
                        description: fields.description?.stringValue,
                        image: fields.image?.stringValue,
                        url: `${baseUrl}/${id}`
                    };
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
                const regex = new RegExp(`<meta\\s+${attr}="${nameOrProperty}"[^>]*>`, 'i');
                const replacement = `<meta ${attr}="${nameOrProperty}" content="${value}" />`;
                return htmlContent.replace(regex, replacement);
            };

            html = html.replace(/<title>.*?<\/title>/i, `<title>${fullTitle}</title>`);
            html = replaceMeta(html, 'og:title', fullTitle);
            html = replaceMeta(html, 'og:description', description);
            html = replaceMeta(html, 'og:image', image);
            html = replaceMeta(html, 'og:image:secure_url', image);
            html = replaceMeta(html, 'og:url', metadata.url);
            
            html = replaceMeta(html, 'twitter:title', fullTitle, true);
            html = replaceMeta(html, 'twitter:description', description, true);
            html = replaceMeta(html, 'twitter:image', image, true);
            html = replaceMeta(html, 'twitter:url', metadata.url, true);
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
