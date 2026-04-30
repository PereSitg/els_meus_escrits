/**
 * MailerLite Subscription Proxy (Vercel Serverless Function)
 * Securely sends subscriber data to MailerLite without exposing the API key.
 */

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    try {
        const { email, source } = req.body;

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ error: 'S\'ha de proporcionar un correu vàlid.' });
        }

        const API_KEY = process.env.MAILERLITE_API_KEY;

        if (!API_KEY) {
            console.error('MAILERLITE_API_KEY is not defined in environment variables');
            return res.status(500).json({ error: 'Error de configuració del servidor.' });
        }

        // Petició a MailerLite Connect API
        const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                email: email.toLowerCase().trim(),
                status: 'active', // 'active' per subscripció directa, 'unconfirmed' per doble opt-in
                fields: {
                    source: source || 'Website'
                }
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('MailerLite API error:', data);
            return res.status(response.status).json({ 
                error: data.message || 'Error en processar la subscripció a MailerLite.' 
            });
        }

        return res.status(200).json({ success: true, message: 'Subscripció completada amb èxit.' });

    } catch (error) {
        console.error('Subscription error:', error);
        return res.status(500).json({ error: 'Error intern del servidor.' });
    }
}
