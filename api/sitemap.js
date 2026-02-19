/**
 * Dynamic Sitemap Generator (Vercel Serverless Function)
 * Fetches all posts and page SEO data from Firestore and returns a sitemap.xml
 */

const PROJECT_ID = process.env.VITE_PROJECT_ID;
const API_KEY = process.env.VITE_API_KEY;

function escapeXml(unsafe) {
    if (!unsafe) return '';
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}

async function fetchCollection(collectionId) {
    let allDocuments = [];
    let nextPageToken = null;

    do {
        let url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collectionId}?key=${API_KEY}`;
        if (nextPageToken) {
            url += `&pageToken=${nextPageToken}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.documents) {
                allDocuments = allDocuments.concat(data.documents);
            }
            nextPageToken = data.nextPageToken;
        } catch (error) {
            console.error(`Error fetching collection ${collectionId}:`, error);
            nextPageToken = null;
        }
    } while (nextPageToken);

    return allDocuments;
}

export default async function handler(req, res) {
    try {
        const host = req.headers.host || '';
        // Use hardcoded canonical URL for production to match Search Console property
        const BASE_URL = host.includes('localhost')
            ? `http://${host}`
            : 'https://els-meus-escrits.vercel.app';

        console.log(`Sitemap request received for host: ${host}. Serving URLs for: ${BASE_URL}`);

        // 1. Fetch posts and SEO data (with fallback to empty arrays)
        let postsDocs = [];
        let seoDocs = [];

        if (PROJECT_ID && API_KEY) {
            try {
                [postsDocs, seoDocs] = await Promise.all([
                    fetchCollection('posts'),
                    fetchCollection('site_seo')
                ]);
            } catch (fetchError) {
                console.error('Error fetching data from Firestore:', fetchError);
            }
        } else {
            console.warn('Missing PROJECT_ID or API_KEY env vars. Falling back to static pages only.');
        }

        // 2. Process Page SEO map
        const seoMap = {};
        seoDocs.forEach(doc => {
            const id = doc.name.split('/').pop();
            const fields = doc.fields || {};
            seoMap[id] = {
                isIndexed: fields.isIndexed?.booleanValue !== false,
                updatedAt: doc.updateTime
            };
        });

        // 3. Define Static Pages
        const staticPages = [
            { url: '/', key: 'home', priority: '1.0', changefreq: 'daily' },
            { url: '/projects', key: 'projects_list', priority: '0.9', changefreq: 'weekly' },
            { url: '/stack', key: 'stack', priority: '0.7', changefreq: 'monthly' },
            { url: '/contact', key: 'contact', priority: '0.7', changefreq: 'monthly' },
            { url: '/projects/sommelier', key: 'sommelier-digital', priority: '0.8', changefreq: 'monthly' },
            { url: '/projects/sitges-art', key: 'sitges-art', priority: '0.8', changefreq: 'monthly' },
            { url: '/projects/sitges-walk', key: 'sitges-walk', priority: '0.8', changefreq: 'monthly' },
            { url: '/projects/fets-per-sitges', key: 'fets-per-sitges', priority: '0.8', changefreq: 'monthly' },
            { url: '/projects/tal-com-erem', key: 'tal-com-erem', priority: '0.8', changefreq: 'monthly' },
            { url: '/avis-legal', key: 'avis_legal', priority: '0.3', changefreq: 'yearly' },
            { url: '/politica-cookies', key: 'politica_cookies', priority: '0.3', changefreq: 'yearly' },
            { url: '/politica-privacitat', key: 'politica_privacitat', priority: '0.3', changefreq: 'yearly' },
        ];

        // 4. Process Posts
        const indexedPosts = postsDocs.map(doc => {
            const fields = doc.fields || {};
            const id = doc.name.split('/').pop();
            return {
                id,
                image: fields.image?.stringValue,
                imageAlt: fields.imageAlt?.stringValue,
                isIndexed: fields.isIndexed?.booleanValue !== false,
                updatedAt: doc.updateTime
            };
        }).filter(p => p.isIndexed);

        // Build the XML
        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

        // Static Pages (Respecting indexing)
        staticPages.forEach(page => {
            const seoInfo = seoMap[page.key];
            const isIndexed = seoInfo ? seoInfo.isIndexed : true;

            if (isIndexed) {
                const lastmod = seoInfo?.updatedAt ? seoInfo.updatedAt.split('T')[0] : new Date().toISOString().split('T')[0];
                xml += `
  <url>
    <loc>${BASE_URL}${escapeXml(page.url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
            }
        });

        // Posts with Image SEO
        indexedPosts.forEach(post => {
            const lastmod = post.updatedAt ? post.updatedAt.split('T')[0] : new Date().toISOString().split('T')[0];
            xml += `
  <url>
    <loc>${BASE_URL}/post/${escapeXml(post.id)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>`;

            if (post.image) {
                xml += `
    <image:image>
      <image:loc>${escapeXml(post.image)}</image:loc>
      <image:caption>${escapeXml(post.imageAlt || '')}</image:caption>
    </image:image>`;
            }

            xml += `
  </url>`;
        });

        xml += `
</urlset>`;

        res.setHeader('Content-Type', 'text/xml; charset=utf-8');
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=1800');
        console.log('Sitemap generated successfully');
        return res.status(200).send(xml);
    } catch (error) {
        console.error('Critical sitemap generator error:', error);
        const host = req.headers.host || 'els-meus-escrits.vercel.app';
        const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://${host}/</loc></url>
</urlset>`;
        res.setHeader('Content-Type', 'text/xml; charset=utf-8');
        return res.status(200).send(fallbackXml);
    }
}
