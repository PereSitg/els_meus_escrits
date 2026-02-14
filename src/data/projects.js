export const projectsData = [
    {
        id: 'sommelier-digital',
        slug: 'sommelier',
        image: '/sommelier_digital.png',
        tags: ['IA', 'Python', 'Gemini API', 'LangChain'],
        category: 'dev_ia',
        translationKey: 'sommelier'
    },
    {
        id: 'sitges-art',
        slug: 'sitges-art',
        image: '/sitges_art.png',
        tags: ['Cultura', 'Història', 'IA', 'Python', 'Gemini API'],
        category: 'dev_ia',
        translationKey: 'sitgesart'
    },
    {
        id: 'sitges-walk',
        slug: 'sitges-walk',
        image: '/sitges_walk.png',
        tags: ['Cultura', 'Geolocalització', 'React', 'Mobile First'],
        category: 'dev_ia',
        translationKey: 'sitgeswalk'
    },
    {
        id: 'fets-per-sitges',
        slug: 'fets-per-sitges',
        image: '/portada.png',
        tags: ['Política', 'Estratègia', 'Consultoria'],
        category: 'strat_pol',
        translationKey: 'fetspersitges'
    },
    {
        id: 'ecosistema-social',
        slug: 'ecosistema-social',
        image: '/meus_projectes.png', // Or another appropriate image
        tags: ['Instagram', 'TikTok', 'Estratègia'],
        category: 'strat_pol',
        comingSoon: true,
        translationKey: 'ecosistema'
    }
];

export const allTags = Array.from(
    new Set(projectsData.flatMap(project => project.tags))
).sort();
