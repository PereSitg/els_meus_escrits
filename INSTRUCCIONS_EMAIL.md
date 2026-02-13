# Com configurar el formulari de contacte (EmailJS)

Perquè el formulari de contacte funcioni i t'arribin els correus a `pbadialorenz@gmail.com`, necessites connectar la web amb un servei anomenat **EmailJS**.

Aquest servei fa de pont entre la teva web i el teu Gmail. És gratuït fins a 200 correus al més, que és suficient per començar.

## Pas 1: Crear compte a EmailJS
1. Ves a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Clica a "Sign Up Free" i crea un compte.

## Pas 2: Crear un "Service" (Servei de correu)
1. Dins del panell d'EmailJS, ves a la pestanya **"Email Services"**.
2. Clica a **"Add New Service"**.
3. Selecciona **"Gmail"**.
4. Et demanarà connectar amb el teu compte de Gmail (`pbadialorenz@gmail.com`). Accepta.
5. Un cop creat, veuràs un **Service ID** (ex: `service_x9s8d7`). Copia'l.

## Pas 3: Crear un "Email Template" (La plantilla del correu)
1. Ves a la pestanya **"Email Templates"**.
2. Clica a **"Create New Template"**.
3. Dissenya el correu que rebràs. Assegura't de fer servir aquestes variables (amb les claus dobles):
    - `{{from_name}}` (Nom de qui t'escriu)
    - `{{from_email}}` (El seu email)
    - `{{message}}` (El missatge)
4. Configura el camp "To Email" (A qui s'envia) amb el teu correu: `pbadialorenz@gmail.com`
5. Guarda la plantilla i copia el **Template ID** (ex: `template_a1b2c3`).

## Pas 4: Aconseguir la "Public Key"
1. Ves a la pestanya **"Account"** (a dalt a la dreta, el teu nom -> Account).
2. Busca la secció **"API Keys"**.
3. Copia la **"Public Key"** (ex: `W2k-s8d7f6g5h4`).

## Pas 5: Posar les claus al teu ordinador
1. Obre l'arxiu `.env` que tens a la carpeta del projecte (el pots obrir amb el Bloc de Notes o el VS Code).
2. Busca aquestes línies al final i canvia el que hi ha després del `=` per les teves claus reals:

```ini
VITE_EMAILJS_SERVICE_ID=Enganxa_aqui_el_teu_Service_ID
VITE_EMAILJS_TEMPLATE_ID=Enganxa_aqui_el_teu_Template_ID
VITE_EMAILJS_PUBLIC_KEY=Enganxa_aqui_la_teva_Public_Key
```

**Exemple de com ha de quedar (NO copiis aquests, són inventats):**
```ini
VITE_EMAILJS_SERVICE_ID=service_m7v8x9
VITE_EMAILJS_TEMPLATE_ID=template_j2k3l4
VITE_EMAILJS_PUBLIC_KEY=HYU214mRLzhFVqOJOZ123456
```

3. Guarda l'arxiu (`Ctrl + S`).
4. Atura la web (si està en marxa al terminal) amb `Ctrl + C` i torna-la a engegar amb `npm run dev` perquè agafi els canvis.

Ja està! Ara el formulari enviarà els correus de veritat.
