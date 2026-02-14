export const projectsData = [
    {
        id: 'sommelier-digital',
        slug: 'sommelier',
        image: '/sommelier_digital.png',
        tags: ['IA', 'Python', 'Gemini API', 'LangChain'],
        category: 'dev_ia',
        translationKey: 'sommelier',
        seoTitle: 'Sommelier Digital IA | Recomanador de Vins Personalitzat',
        seoDescription: 'Descobreix el Sommelier Digital basat en IA: recomanacions de vins precises segons el teu pressupost i gustos.',
        isIndexed: true
    },
    {
        id: 'sitges-art',
        slug: 'sitges-art',
        image: '/sitges_art.png',
        tags: ['Cultura', 'Història', 'IA', 'Python', 'Gemini API'],
        category: 'dev_ia',
        translationKey: 'sitgesart',
        seoTitle: 'Sitges Art | Patrimoni Artístic en Realitat Augmentada',
        seoDescription: 'Plataforma per descobrir l\'art urbà de Sitges mitjançant geolocalització i IA.',
        isIndexed: true
    },
    {
        id: 'sitges-walk',
        slug: 'sitges-walk',
        image: '/sitges_walk.png',
        tags: ['Cultura', 'Geolocalització', 'React', 'Mobile First'],
        category: 'dev_ia',
        translationKey: 'sitgeswalk',
        seoTitle: 'Sitges Walk | Rutes Històriques Digitals',
        seoDescription: 'Explora Sitges amb guies digitals immersives per a rutes culturals i històriques.',
        isIndexed: true
    },
    {
        id: 'fets-per-sitges',
        slug: 'fets-per-sitges',
        image: '/portada.png',
        tags: ['Política', 'Estratègia', 'Consultoria'],
        category: 'strat_pol',
        translationKey: 'fetspersitges',
        seoTitle: 'Fets per Sitges | Estratègia Digital de Guerrilla',
        seoDescription: 'L\'èxit de Fets per Sitges: 666 vots amb pressupost zero gràcies a una estratègia digital puntera.',
        isIndexed: true
    },
    {
        id: 'ecosistema-social',
        slug: 'ecosistema-social',
        image: '/meus_projectes.png',
        tags: ['Instagram', 'TikTok', 'Estratègia'],
        category: 'strat_pol',
        comingSoon: true,
        translationKey: 'ecosistema',
        seoTitle: 'Ecosistema Social | Estratègia de Continguts 360°',
        seoDescription: 'Properament: Com construir una audiència real i amb impacte a Instagram i TikTok.',
        isIndexed: false
    }
];

export const allTags = Array.from(
    new Set(projectsData.flatMap(project => project.tags))
).sort();
