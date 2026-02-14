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
        image: '/fets_per_sitges_card.png',
        tags: ['Política', 'Estratègia', 'Consultoria'],
        category: 'strat_pol',
        translationKey: 'fetspersitges',
        seoTitle: 'Fets per Sitges | Estratègia Digital de Guerrilla',
        seoDescription: 'L\'èxit de Fets per Sitges: 666 vots amb pressupost zero gràcies a una estratègia digital puntera.',
        isIndexed: true
    },
    {
        id: 'tal-com-erem',
        slug: 'tal-com-erem',
        image: '/meus_projectes.png',
        tags: ['XXSS', 'Instagram', 'TikTok', 'Estratègia'],
        category: 'social_media',
        comingSoon: false,
        translationKey: 'tal_com_erem_project',
        seoTitle: 'Tal com érem | Recuperació del Patrimoni Visual',
        seoDescription: 'Projecte de rescat del patrimoni visual de Sitges mitjançant Intel·ligència Artificial.',
        isIndexed: true
    }
];

export const allTags = Array.from(
    new Set(projectsData.flatMap(project => project.tags))
).sort();
