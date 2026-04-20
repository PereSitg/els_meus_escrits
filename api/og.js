/**
 * Dynamic Open Graph Metadata Injector (Vercel Serverless Function)
 * Intercepts requests to /post/:id, fetches the post, and injects OG meta tags into the HTML.
 */

const PROJECT_ID = process.env.VITE_PROJECT_ID;
const API_KEY = process.env.VITE_API_KEY;

export default async function handler(req, res) {
    try {
        const { id } = req.query;
        const host = req.headers.host || 'els-meus-escrits.vercel.app';
        const protocol = host.includes('localhost') ? 'http' : 'https';
        const baseUrl = `${protocol}://${host}`;

        // 1. Fetch the base index.html
        // We fetch from the root which should serve the static index.html due to the catch-all rewrite
        const response = await fetch(`${baseUrl}/`);
        let html = await response.text();

        if (!PROJECT_ID || !API_KEY) {
            console.warn('Missing Firebase credentials in API for OG Metadata.');
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return res.status(200).send(html);
        }

        // 2. Fetch the post from Firestore
        const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/posts/${id}?key=${API_KEY}`;
        const postRes = await fetch(url);
        const postData = await postRes.json();

        // 3. Inject metadata if post exists
        if (postData && postData.fields) {
            const fields = postData.fields;
            const title = fields.seoTitle?.stringValue || fields.title?.stringValue || 'Pere Badia i Lorenz';
            const description = fields.seoDescription?.stringValue || fields.subtitle?.stringValue || 'Portafoli personal de Pere Badia i Lorenz - Reflexions, històries i projectes professionals.';
            const image = fields.image?.stringValue || `${baseUrl}/social-preview.png?v=2`;
            const fullTitle = `${title} | Pere Badia i Lorenz`;

            // Function to replace meta tags robustly
            const replaceMeta = (htmlContent, nameOrProperty, value, isName = false) => {
                const attr = isName ? 'name' : 'property';
                // Regex to match the entire meta tag including potential newlines, without crossing tag boundaries
                const regex = new RegExp(`<meta\\s+${attr}="${nameOrProperty}"[^>]*>`, 'i');
                const replacement = `<meta ${attr}="${nameOrProperty}" content="${value}" />`;
                return htmlContent.replace(regex, replacement);
            };

            // Replace Title
            html = html.replace(/<title>.*?<\/title>/i, `<title>${fullTitle}</title>`);

            // Open Graph
            html = replaceMeta(html, 'og:title', fullTitle);
            html = replaceMeta(html, 'og:description', description);
            html = replaceMeta(html, 'og:image', image);
            html = replaceMeta(html, 'og:image:secure_url', image);
            html = replaceMeta(html, 'og:url', `${baseUrl}/post/${id}`);
            
            // Twitter
            html = replaceMeta(html, 'twitter:title', fullTitle, true);
            html = replaceMeta(html, 'twitter:description', description, true);
            html = replaceMeta(html, 'twitter:image', image, true);
            html = replaceMeta(html, 'twitter:url', `${baseUrl}/post/${id}`, true);
        }

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
        return res.status(200).send(html);
    } catch (error) {
        console.error('OG generation error:', error);
        
        // Fallback: Just serve the index.html from root
        try {
            const host = req.headers.host || 'els-meus-escrits.vercel.app';
            const protocol = host.includes('localhost') ? 'http' : 'https';
            const response = await fetch(`${protocol}://${host}/`);
            const html = await response.text();
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return res.status(200).send(html);
        } catch (fallbackError) {
            console.error('OG Fallback error:', fallbackError);
            return res.status(500).send('Internal Server Error');
        }
    }
}
