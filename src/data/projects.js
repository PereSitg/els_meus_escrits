export const projectsData = [
    {
        id: 'sommelier-digital',
        slug: 'sommelier',
        image: '/sommelier_digital.png',
        tags: ['IA', 'Python', 'Gemini API', 'LangChain'],
        translationKey: 'sommelier'
    },
    {
        id: 'sitges-art',
        slug: 'sitges-art',
        image: '/sitges_art.png',
        tags: ['Cultura', 'Història', 'IA', 'Python', 'Gemini API'],
        translationKey: 'sitgesart'
    },
    {
        id: 'sitges-walk',
        slug: 'sitges-walk',
        image: '/sitges_walk.png',
        tags: ['Cultura', 'Geolocalització', 'React', 'Mobile First'],
        translationKey: 'sitgeswalk'
    },
    // Es poden afegir més projectes aquí fàcilment
];

export const allTags = Array.from(
    new Set(projectsData.flatMap(project => project.tags))
).sort();
