import fs from 'fs';
import path from 'path';

// Note: Run this with node --env-file=.env scripts/generate-sitemap.js
const PROJECT_ID = process.env.VITE_PROJECT_ID;
const API_KEY = process.env.VITE_API_KEY;
const BASE_URL = 'https://els-meus-escrits.vercel.app';

if (!PROJECT_ID || !API_KEY) {
    console.error('❌ Error: VITE_PROJECT_ID or VITE_API_KEY not found in environment.');
    process.exit(1);
}

async function fetchPosts() {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/posts?key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.documents) return [];

        return data.documents.map(doc => {
            const fields = doc.fields;
            const id = doc.name.split('/').pop();
            return {
                id,
                title: fields.title?.stringValue,
                category: fields.category?.stringValue,
                isIndexed: fields.isIndexed?.booleanValue !== false,
                updatedAt: doc.updateTime
            };
        });
    } catch (error) {
        console.error('❌ Error fetching posts from Firestore:', error);
        return [];
    }
}

async function generate() {
    console.log('🚀 Generating dynamic sitemap...');

    const posts = await fetchPosts();
    const indexedPosts = posts.filter(p => p.isIndexed);

    const categories = [...new Set(indexedPosts.map(p => p.category).filter(Boolean))];

    const staticPages = [
        { url: '/', priority: '1.0', changefreq: 'daily' },
        { url: '/projects', priority: '0.9', changefreq: 'weekly' },
        { url: '/stack', priority: '0.7', changefreq: 'monthly' },
        { url: '/contact', priority: '0.7', changefreq: 'monthly' },
        { url: '/projects/sommelier', priority: '0.8', changefreq: 'monthly' },
        { url: '/projects/sitges-art', priority: '0.8', changefreq: 'monthly' },
        { url: '/projects/sitges-walk', priority: '0.8', changefreq: 'monthly' },
        { url: '/projects/fets-per-sitges', priority: '0.8', changefreq: 'monthly' },
        { url: '/projects/tal-com-erem', priority: '0.8', changefreq: 'monthly' },
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static pages
    staticPages.forEach(page => {
        xml += `
  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });

    // Categories
    categories.forEach(cat => {
        xml += `
  <url>
    <loc>${BASE_URL}/category/${encodeURIComponent(cat)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // Posts
    indexedPosts.forEach(post => {
        const lastmod = post.updatedAt ? post.updatedAt.split('T')[0] : new Date().toISOString().split('T')[0];
        xml += `
  <url>
    <loc>${BASE_URL}/post/${post.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    xml += `
</urlset>`;

    const outputPath = path.resolve('public', 'sitemap.xml');
    fs.writeFileSync(outputPath, xml);
    console.log(`✅ Sitemap generated at ${outputPath}`);
    console.log(`📝 Total URLs: ${staticPages.length + categories.length + indexedPosts.length}`);
}

generate().catch(console.error);
