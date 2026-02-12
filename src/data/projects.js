export const projectsData = [
    {
        id: 'sommelier-digital',
        slug: 'sommelier',
        image: '/sommelier_digital.png',
        tags: ['IA', 'Python', 'Gemini API', 'LangChain'],
        translationKey: 'sommelier'
    },
    // Es poden afegir més projectes aquí fàcilment
];

export const allTags = Array.from(
    new Set(projectsData.flatMap(project => project.tags))
).sort();
