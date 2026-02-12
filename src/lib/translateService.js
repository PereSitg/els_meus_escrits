import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true
});

/**
 * Tradueix text del català a l'idioma especificat utilitzant Groq
 * @param {string} text - Text en català a traduir
 * @param {string} targetLang - Idioma de destinació ('es' o 'en')
 * @returns {Promise<string>} - Text traduït
 */
export async function translateText(text, targetLang) {
    try {
        const langNames = {
            'es': 'español',
            'en': 'English'
        };

        const targetLanguage = langNames[targetLang] || 'español';

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `Ets un traductor professional expert en català. La teva feina és traduir textos del català a ${targetLanguage} mantenint el to, l'estil i la ironia originals tant com sigui possible. Tradueix només el text, sense afegir comentaris ni explicacions.`
                },
                {
                    role: "user",
                    content: text
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
            max_tokens: 8000,
        });

        return chatCompletion.choices[0]?.message?.content || text;
    } catch (error) {
        console.error("Error translating text:", error);
        throw new Error("No s'ha pogut traduir el text. Si us plau, torna-ho a intentar.");
    }
}
