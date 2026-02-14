import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'ca',
        supportedLngs: ['ca', 'es', 'en'],
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            ca: {
                translation: {
                    nav: {
                        home: 'Inici',
                        projects: 'Projectes',
                        writings: 'Els meus escrits',
                        sitges: 'Sitges',
                        ecos: 'Ecos de Sociedad',
                        altres: 'Altres històries',
                        stack: 'El meu Stack',
                        contact: 'Contacte',
                        logout: 'Tancar sessió',
                        dev_ia: 'Desenvolupament i IA',
                        strat_pol: 'Estratègia i Consultoria',
                        consultancy: 'Consultoria Estratègica'
                    },
                    contact: {
                        title: 'Contacte',
                        subtitle: 'Tens alguna proposta o suggeriment? Envia\'m un missatge.',
                        bio_title: 'De la placa base a la Intel·ligència Artificial: Una visió 360°',
                        bio_p1: 'La meva relació amb la tecnologia no va començar davant d\'una pantalla, sinó amb un tornavís a la mà. Vaig iniciar la meva trajectòria com a tècnic de hardware, entenent com funcionen les màquines des de dins, per després saltar a l\'administració de sistemes. Aquesta base tècnica és la que avui em permet picar codi amb una comprensió profunda de la infraestructura que hi ha al darrere.',
                        bio_p2: 'Però la tecnologia sense comunicació és buida. La meva etapa com a comercial em va ensenyar a escoltar les necessitats reals del client, i l\'oportunitat d\'escriure a L\'Eco de Sitges va ser el catalitzador perfecte: vaig descobrir que explicar històries i transmetre idees és tan important com saber programar-les.',
                        bio_p3: 'Avui, fusiono tota aquesta experiència en el meu flux de treball:',
                        bio_f1_title: 'Programació & IA:',
                        bio_f1_desc: 'Desenvolupo solucions on el codi (React, Python) i la IA (Gemini, OpenIA) treballen al servei d\'una estratègia.',
                        bio_f2_title: 'Narrativa Digital:',
                        bio_f2_desc: 'Domino les Xarxes Socials i la creació de contingut visual amb DaVinci Resolve, entenent que cada projecte necessita una voç pròpia per arribar a la gent.',
                        bio_f3_title: 'Visió de Negoci:',
                        bio_f3_desc: 'Gràcies al meu passat comercial, no construeixo només eines; construeixo solucions que aporten valor real i són entenedores per a l\'usuari final.',
                        bio_footer: 'No sóc només un programador. Sóc un tècnic que comunica i un comunicador que entén la tecnologia.',
                        form: {
                            name: 'Nom',
                            email: 'Email',
                            message: 'Missatge',
                            submit: 'Enviar',
                            sending: 'Enviant...',
                            captcha_label: 'Control humà: Quant és {{num1}} + {{num2}}?',
                            captcha_error: 'La suma és incorrecta. Si us plau, torna-ho a intentar.',
                            name_required: 'El nom és obligatori',
                            email_required: 'L\'email és obligatori',
                            message_required: 'El missatge és obligatori',
                            fill_required: 'Si us plau, omple tots els camps obligatoris.',
                            send_error: 'Error en l\'enviament, prova-ho més tard.',
                            success: 'Gràcies ! He rebut el teu missatge correctament.'
                        },
                    },
                    hero: {
                        title: 'Pere Badia i Lorenz',
                        subtitle: 'Consultor estratègic en tecnologia i Intel·ligència Artificial. Especialitzat en la creació de solucions digitals que fusionen anàlisi de context, narrativa i execució tècnica avançada.'
                    },
                    home: {
                        latest_posts: 'Projectes i Reflexions Recents',
                        read_more: 'Explorar detall',
                        loading: 'Actualitzant continguts...',
                        sitges_desc: 'Anàlisi i crònica sobre la realitat social i cultural de Sitges.',
                        projects_desc: 'Solucions d\'alt impacte en Desenvolupament, IA i Estratègia Política.',
                        related_posts: 'Relats i anàlisis d\'interès'
                    },
                    projects: {
                        title: 'Projectes',
                        description: 'Aquesta és una selecció dels projectes més destacats en els quals he treballat. Des de desenvolupament web fins a iniciatives culturals i socials.',
                        categories: {
                            all: 'Tots',
                            dev_ia: 'Desenvolupament i IA',
                            strat_pol: 'Estratègia i Consultoria'
                        },
                        filter_all: 'Tots',
                        coming_soon: 'Proximament',
                        placeholder_title: 'Nou Projecte',
                        placeholder_desc: 'Estic preparant la documentació dels meus projectes recents per mostrar-los aquí.',
                        sommelier: {
                            title: 'Sommelier Digital',
                            desc: 'Aplicació intel·ligent de recomanació de vins basada en IA Generativa. La fusió perfecta entre tecnologia moderna i coneixement enològic.',
                            detail_title: 'Sobre el Projecte',
                            detail_desc: 'He desenvolupat un assistent intel·ligent que actua com un sommelier expert. Aquesta eina no només coneix milers de referències, sinó que entén el context de l\'usuari (pressupost, tipus de cuina, preferències personals) per oferir recomanacions precises.',
                            author_note: 'Aquest projecte representa un entorn de desenvolupament continu; optimitzo iterativament el prompt engineering i l\'arquitectura de dades en Firebase per maximitzar la precisió del model i l\'encert en les recomanacions.',
                            architecture_title: 'Arquitectura Tecnològica',
                            architecture_ai: 'Motor d\'Intel·ligència Artificial: Google Gemini API amb orquestració de system instructions per a un perfil expert.',
                            architecture_data: 'Arquitectura de Dades: Firebase Realtime Database per a la gestió d\'inventari i persistència operativa.',
                            architecture_dev: 'Pipeline de Desenvolupament: Python per a la lògica de processat semàntic i integració d\'APIs.',
                            features_title: 'Mètriques i Capacitats',
                            feature_1: 'Anàlisi predictiva de maridatge',
                            feature_2: 'Interfície comunicativa multicanal (Beu/Text)',
                            feature_3: 'Sincronització de dades d\'alt rendiment',
                            try_button: 'Executar Aplicació',
                            back_button: 'Tornar al catàleg'
                        },
                        sitgesart: {
                            title: 'Sitges Art',
                            desc: 'Un viatge per l\'art, la cultura i la memòria de Sitges. Una plataforma interactiva que connecta el passat amb el futur mitjançant la tecnologia.',
                            detail_title: 'Sobre el Projecte',
                            detail_desc: 'Sitges Art és un arxiu digital viu que celebra l\'herència cultural de Sitges. Hem creat una experiència on l\'art i la memòria històrica es fusionen amb una interfície moderna i accessible.',
                            architecture_title: 'Arquitectura Tecnològica',
                            architecture_ai: 'Motor d\'IA: Integració de models de llenguatge per a la contextualització d\'obres i indrets.',
                            architecture_data: 'Gestió de Dades: Indexació semàntica de continguts culturals i històrics.',
                            architecture_dev: 'Desenvolupament: Arquitectura basada en React amb un enfocament "mobile-first" per a la millor experiència en rutes urbanes.',
                            features_title: 'Característiques Clau',
                            feature_1: 'Cerca intel·ligent per art i història',
                            feature_2: 'Disseny responsiu adaptat a dispositius mòbils',
                            feature_3: 'Contingut multimèdia immersiu',
                            try_button: 'Veure la web',
                            back_button: 'Tornar a projectes'
                        },
                        sitgeswalk: {
                            title: 'Sitges Walk',
                            desc: 'Explora Sitges a peu amb aquesta guia interactiva. Descobreix rutes, punts d\'interès i la història de la vila d\'una manera dinàmica i mobile-first.',
                            detail_title: 'Sobre el Projecte',
                            detail_desc: 'Hem dissenyat Sitges Walk per ser el company perfecte per als teus passejos. Una aplicació que no només et guia geogràficament, sinó que t\'explica la història que s\'amaga darrere de cada cantonada de Sitges.',
                            architecture_title: 'Arquitectura Tecnològica',
                            architecture_ai: 'Geolocalització: Integració en temps real per a una navegació fluida.',
                            architecture_data: 'Gestió de Dades: Base de dades optimitzada per a rutes i punts d\'interès.',
                            architecture_dev: 'Desenvolupament: Enfocament de Progressive Web App (PWA) amb React per a una experiència nativa en el mòbil.',
                            features_title: 'Característiques Clau',
                            feature_1: 'Mapes interactius de rutes culturals',
                            feature_2: 'Informació històrica geolocalitzada',
                            feature_3: 'Interfície optimitzada per a l\'ús a l\'exterior',
                            try_button: 'Veure la web',
                            back_button: 'Tornar a projectes'
                        },
                        fetspersitges: {
                            title: 'Fets per Sitges',
                            desc: 'Estratègia i comunicació política per a un projecte transformador a Sitges. Una plataforma que connecta la visió política amb la realitat ciutadana.',
                            detail_title: 'Sobre el Projecte',
                            detail_desc: 'Fets per Sitges és un projecte d\'estratègia i consultoria política on he aplicat la meva experiència en comunicació narrativa i anàlisi de context. El projecte busca canalitzar les inquietuds de la vila d\'una manera clara, directa i amb una visió de futur integrada.',
                            author_note: 'A vegades el codi no és l\'única eina per transformar la realitat; l\'estratègia i la bona narrativa són el programari que mou les societats.',
                            architecture_title: 'Eixos Estratègics',
                            architecture_ai: 'Estratègia: Definició del relat i anàlisi d\'escenaris polítics.',
                            architecture_data: 'Comunicació: Gestió de xarxes socials i producció de contingut visual amb DaVinci Resolve.',
                            architecture_dev: 'Participació: Implementació de canals d\'escolta ciutadana activa.',
                            features_title: 'Objectius Clau',
                            feature_1: 'Definició d\'un relat de ciutat propi',
                            feature_2: 'Gestió de la campanya digital 360',
                            feature_3: 'Anàlisi de dades i tendències d\'opinió',
                            try_button: 'Veure el projecte',
                            back_button: 'Tornar a projectes',
                            subtitle: '666 vots amb un pressupost de guerrilla.',
                            apm_title: 'Eficiència Extrema i l\'Efecte APM.',
                            apm_desc: 'Amb un pressupost mínim comparat amb els partits tradicionals, vam prioritzar la viralitat. El vídeo de les nadales (estil APM) ens va donar l\'entrada gratuïta als mitjans nacionals (TV3), posant el projecte al mapa de Sitges en temps rècord.',
                            video_caption: 'L\'acció que va saltar de les xarxes socials a TV3, generant una notorietat orgànica sense precedents a Sitges.',
                            strategy_heading: 'Estratègies d\'Impacte',
                            strategies: {
                                creativity: { title: 'Creativitat vs Pressupost', desc: 'En un entorn saturat de propaganda clàssica, utilitzem el Pixel Art per explicar propostes complexes com la regeneració de les platges. Una solució estètica de baix cost però d\'alt impacte que connecta amb un públic més jove i digital.' },
                                impact: { title: 'Autoritat i Presència Urbana', desc: 'El domini de l\'espai físic com a declaració d\'intencions. Despleguem una lona gegant en un punt estratègic per trencar el soroll electoral, demostrant que la guerrilla també sap jugar fort al carrer.' },
                                synthesis: { title: 'Enginyeria de Missatge', desc: 'Traducció de conceptes complexos en missatges clars i directes. Utilitzem el format vídeo per explicar la gestió política des de la claredat, eliminant el soroll i centrant-nos en solucions reals per a la ciutadania.' },
                                commitment: { title: 'Compromís i Valor Humà', desc: 'La política són persones. Integrem la diversitat com un actiu fonamental del projecte, demostrant que una llista inclusiva no només és més justa, sinó que és més forta i representativa de la societat real.' },
                                honesty: { title: 'Honestedat i Cultura de l\'Esforç', desc: 'La política entesa com un servei de proximitat. Posem cara i ulls a un compromís basat en el treball constant i la transparència, demostrant que l\'honestedat és l\'eina més potent per connectar amb l\'electorat.' },
                                territory: { title: 'Cohesió i Territori', desc: 'Vam portar el missatge a cada barri de Sitges, des de les Botigues fins a Garraf. Una estratègia de capil·laritat total per assegurar que cada veí i veïna se sentís identificat amb un projecte de ciutat compartit.' },
                                rigor: { title: 'Rigor', desc: 'Base de dades i anàlisi darrera de cada afirmació i estratègia.' }
                            },
                            roi_label: 'Impacte Total',
                            roi_title: 'ROI Polític: Un dels costos per vot més baixos de la història electoral de Sitges.',
                            features: {
                                narrative: { title: 'Narrativa "APM"', desc: 'Ús intel·ligent de clips virals i humor per desmuntar l\'status quo. Una guerrilla digital on el contingut és el projectil.' },
                                lona: { title: 'Impacte Físic: La Lona', desc: 'Quan el món digital prem per saltar al carrer. Estratègia mixta on la visibilitat física va retroalimentar l\'abast online.' },
                                data: { title: 'Data Driven', desc: 'Cada publicació, cada hora de llançament i cada segmentació va ser fruit d\'un anàlisi de dades previ rigorós.' }
                            },
                            human_title: 'Inclusivitat Real',
                            human_desc: 'L\'estratègia no va ser només algorítmica. Treballar braç a braç amb persones amb altres capacitats ens va permetre humanitzar el missatge i connectar amb l\'ànima de Sitges de forma genuïna.'
                        },
                        ecosistema: {
                            title: 'Ecosistema Social',
                            desc: 'Estratègia de continguts i creuament de plataformes per a Instagram i TikTok. Construint audiència i impacte digital.'
                        },
                        related_title: 'Altres Projectes'
                    },
                    footer: {
                        made_with: 'Fet amb ❤️ des de Sitges.'
                    },
                    translation: {
                        warning_es: 'Aquest text està escrit en català. Si es tradueix al castellà pot perdre part del sentit i de la ironia.',
                        warning_en: 'Aquest text està escrit en català. Si es tradueix a l\'anglès pot perdre part del sentit i de la ironia.',
                        translate_button: 'Traduir amb IA',
                        translating: 'Traduint...',
                        show_original: 'Mostrar original',
                        translation_error: 'Error en traduir. Torna-ho a intentar.'
                    },
                    stack: {
                        title: 'El meu Stack:',
                        subtitle: 'On l\'Estratègia troba l\'Execució.',
                        intro_p1: 'Aquest stack tecnològic és el meu camp de joc. Mitjançant l\'ús expert de la IA Generativa, transformo conceptes complexos en productes reals, demostrant que la visió estratègica i el bon ús de la tecnologia són més potents que el coneixement tècnic aïllat.',
                        quote: '"No sóc un programador convencional; sóc un AI-Powered Builder. El meu valor no resideix en la memorització de sintaxi, sinó en la capacitat de dialogar amb la Intel·ligència Artificial per extreure\'n el màxim potencial tècnic. Això em permet ser extremadament àgil: el que abans requeria un equip sencer, ara ho executo amb precisió i criteri propi."',
                        learning_title: '"Always Learning"',
                        learning_desc: 'Aquest stack no és estàtic. Cada setmana testo noves eines de l\'ecosistema IA per mantenir-me a l\'avantguarda de l\'eficiència digital.',
                        sections: {
                            ia: "IA i Core Tech",
                            web: "Arquitectura Web",
                            creative: "Disseny i Flux Creatiu"
                        },
                        items: {
                            gemini: "El motor de raonament principal. La seva gran finestra de context em permet processar volums massius de dades amb una precisió quirúrgica.",
                            openai: "Estàndard de la indústria per a la generació de text i orquestració de lògica complexa en els meus fluxos de treball. És la meva OpenIA.",
                            python: "El llenguatge fonamental que em permet connectar la IA amb l'execució de codi i l'automatització.",
                            cloudinary: "La meva solució per a la gestió intel·ligent de mitjans. L'utilitzo per optimitzar, emmagatzemar i servir imatges i vídeos de forma ultra-ràpida, assegurant que la web sigui lleugera sense perdre qualitat visual.",
                            firebase: "La infraestructura per a dades en temps real, emmagatzematge i autenticació segura d'usuaris.",
                            react: "La llibreria per construir interfícies d'usuari dinàmiques i escalables mitjançant components.",
                            tailwind: "Motor d'estil per dissenyar interfícies netes i minimalistes directament des del codi.",
                            vercel: "Plataforma de deployment que garanteix la màxima velocitat de càrrega i un rendiment òptim de la web.",
                            github: "Centre de control de versions on col·laboro amb la IA per mantenir un codi segur i organitzat.",
                            davinci: "Eina definitiva per a la postproducció de vídeo, utilitzada pel seu control cinematogràfic del color i potència en el muntatge professional.",
                            ae: "Creació de motion graphics per explicar conceptes abstractes d'IA de manera visual i senzilla.",
                            ps: "Pilar del disseny gràfic per a la creació de portades i elements visuals de marca personal.",
                            antigravity: "L'esquelet de disseny que dóna coherència visual i una experiència d'usuari futurista.",
                            vscode: "El meu centre d'operacions configurat per al desenvolupament assistit per IA, on el prompt engineering i el codi convergeixen."
                        },
                        diagram: {
                            title: "Arquitectura de Solucions (Exemple: Sommelier Digital)",
                            frontend: "Frontend",
                            logic: "IA & Python Orchestration",
                            data: "Dades"
                        }
                    },
                    footer: {
                        made_with: "Fet amb ❤️ i IA",
                        legal: "Avís Legal",
                        cookies: "Política de Cookies",
                        privacy: "Política de Privacitat"
                    },
                    legal: {
                        title: "Avís Legal",
                        intro: "En compliment de la Llei 34/2002, d'11 de juliol, de serveis de la societat de la informació i de comerç electrònic (LSSI-CE), s'informa que el titular d'aquest lloc web és:",
                        owner_title: "Titular",
                        owner_label: "Titular",
                        contact_label: "Contacte",
                        activity_label: "Activitat",
                        activity_text: "Consultoria i desenvolupament de solucions basades en Intel·ligència Artificial i Desenvolupament Web.",
                        copyright_title: "Propietat Intel·lectual",
                        copyright_text: "El contingut d'aquesta web (textos, codi, disseny i arquitectura) és propietat intel·lectual del titular, tret que s'indiqui el contrari. Queda prohibida la reproducció total o parcial sense autorització."
                    },
                    cookies: {
                        title: "Política de Cookies",
                        intro: "Aquest lloc web utilitza cookies pròpies i de tercers per millorar l'experiència de l'usuari i analitzar la navegació.",
                        what_title: "Què són les cookies?",
                        what_text: "Són petits fitxers que s'emmagatzemen al teu navegador per recordar preferències o analitzar el trànsit de la web (per exemple, a través de Google Analytics o Vercel Insights).",
                        types_title: "Cookies utilitzades en aquesta web",
                        technical_label: "Tècniques",
                        technical_text: "Necessàries per al funcionament de la web (Framework Antigravity/React).",
                        analytics_label: "Analítiques",
                        analytics_text: "Ens permeten saber quantes visites tenim i com interactuen els usuaris amb el contingut.",
                        config_text: "Pots configurar o desactivar les cookies a través de la configuració del teu navegador."
                    },
                    privacy: {
                        title: "Política de Privacitat",
                        intro: "En compliment del Reglament General de Protecció de Dades (RGPD), t'informo sobre com es tracten les dades personals que facilitis a través del formulari de contacte d'aquesta web.",
                        responsible_title: "Responsable del tractament",
                        responsible_text: "El responsable de les dades recollides és Pere Badia i Lorenz, amb domicili a Sitges i correu electrònic de contacte pbadialorenz@gmail.com.",
                        purpose_title: "Finalitat del tractament",
                        purpose_text: "La finalitat de la recollida de dades (nom i correu electrònic) és exclusivament per respondre a les teves consultes, pressupostos o missatges enviats a través del formulari. No s'utilitzaran per a l'enviament de publicitat no sol·licitada (spam).",
                        legitimacy_title: "Legitimació",
                        legitimacy_text: "El tractament de les dades es basa en el teu consentiment explícit en marcar la casella d'acceptació abans d'enviar el formulari.",
                        recipients_title: "Destinataris de les dades",
                        recipients_text: "Les dades s'emmagatzemen de forma segura a través de Firebase (Google Cloud) o el servei de correu utilitzat per la web, complint amb els estàndards de seguretat de la UE. No se cediran dades a tercers, excepte obligació legal.",
                        rights_title: "Els teus drets",
                        rights_text: "Tens dret a accedir, rectificar o suprimir les teves dades personals en qualsevol moment. Per fer-ho, només cal que m'enviïs un correu electrònic."
                    }
                }
            },
            es: {
                translation: {
                    nav: {
                        home: 'Inicio',
                        projects: 'Proyectos',
                        writings: 'Mis escritos',
                        sitges: 'Sitges',
                        ecos: 'Ecos de Sociedad',
                        altres: 'Otros',
                        stack: 'Mi Stack',
                        contact: 'Contacto',
                        logout: 'Cerrar sesión',
                        dev_ia: 'Desarrollo e IA',
                        strat_pol: 'Estrategia y Consultoría',
                        consultancy: 'Consultoría Estratégica'
                    },
                    contact: {
                        title: 'Contacto',
                        subtitle: '¿Tienes alguna propuesta o sugerencia? Envíame un mensaje.',
                        bio_title: 'De la placa base a la Inteligencia Artificial: Una visión 360°',
                        bio_p1: 'Mi relación con la tecnología no empezó frente a una pantalla, sino con un destornillador en la mano. Inicié mi trayectoria como técnico de hardware, entendiendo cómo funcionan las máquinas desde dentro, para después saltar a la administración de sistemas. Esta base técnica es la que hoy me permite picar código con una comprensión profunda de la infraestructura que hay detrás.',
                        bio_p2: 'Pero la tecnología sin comunicación está vacía. Mi etapa como comercial me enseñó a escuchar las necesidades reales del cliente, y la oportunidad de escribir en L\'Eco de Sitges fue el catalizador perfecto: descubrí que explicar historias y transmitir ideas es tan importante como saber programarlas.',
                        bio_p3: 'Hoy, fusiono toda esta experiencia en mi flujo de trabajo:',
                        bio_f1_title: 'Programación & IA:',
                        bio_f1_desc: 'Desarrollo soluciones donde el código (React, Python) y la IA (Gemini, OpenIA) trabajan al servicio de una estrategia.',
                        bio_f2_title: 'Narrativa Digital:',
                        bio_f2_desc: 'Domino las Redes Sociales y la creación de contenido visual con DaVinci Resolve, entendiendo que cada proyecto necesita una voz propia para llegar a la gente.',
                        bio_f3_title: 'Visión de Negocio:',
                        bio_f3_desc: 'Gracias a mi pasado comercial, no construyo solo herramientas; construyo soluciones que aportan valor real y son comprensibles para el usuario final.',
                        bio_footer: 'No soy solo un programador. Soy un técnico que comunica y un comunicador que entiende la tecnología.',
                        form: {
                            name: 'Nombre',
                            email: 'Email',
                            message: 'Mensaje',
                            submit: 'Enviar',
                            captcha_label: 'Control humano: ¿Cuánto es {{num1}} + {{num2}}?',
                            captcha_error: 'La suma es incorrecta. Por favor, inténtalo de nuevo.',
                            name_required: 'El nombre es obligatorio',
                            email_required: 'El email es obligatorio',
                            message_required: 'El mensaje es obligatorio',
                            fill_required: 'Por favor, rellena todos los campos obligatorios.',
                            send_error: 'Error en el envío, inténtalo más tarde.',
                            success: '¡Mensaje enviado correctamente!'
                        }
                    },
                    hero: {
                        title: 'Pere Badia i Lorenz',
                        subtitle: 'Consultor estratégico en tecnología e Inteligencia Artificial. Especializado en la creación de soluciones digitales que fusionan análisis de contexto, narrativa y ejecución técnica avanzada.'
                    },
                    home: {
                        latest_posts: 'Proyectos y Reflexiones Recientes',
                        read_more: 'Explorar detalle',
                        loading: 'Actualizando contenidos...',
                        sitges_desc: 'Análisis y crónica sobre la realidad social y cultural de Sitges.',
                        projects_desc: 'Soluciones de alto impacto en Desarrollo, IA y Estrategia Política.',
                        related_posts: 'Relatos y análisis de interés'
                    },
                    projects: {
                        title: 'Proyectos',
                        description: 'Esta es una selección de los proyectos más destacados en los que he trabajado. Desde desarrollo web hasta iniciativas culturales y sociales.',
                        categories: {
                            all: 'Todos',
                            dev_ia: 'Desarrollo e IA',
                            strat_pol: 'Estrategia y Consultoría'
                        },
                        filter_all: 'Todos',
                        coming_soon: 'Próximamente',
                        placeholder_title: 'Nuevo Proyecto',
                        placeholder_desc: 'Estoy preparando la documentación de mis proyectos recientes para mostrarlos aquí.',
                        sommelier: {
                            title: 'Sommelier Digital',
                            desc: 'Aplicación inteligente de recomendación de vinos basada en IA Generativa. La fusión perfecta entre tecnología moderna y conocimiento enológico.',
                            detail_title: 'Sobre el Proyecto',
                            detail_desc: 'He desarrollado un asistente inteligente que actúa como un sommelier experto. Esta herramienta no solo conoce miles de referencias, sino que entiende el contexto del usuario (presupuesto, tipo de cocina, preferencias personales) para ofrecer recomendaciones precisas.',
                            author_note: 'Este proyecto representa un entorno de desarrollo continuo; optimizo iterativamente el prompt engineering y la arquitectura de datos en Firebase para maximizar la precisión del modelo y el acierto en las recomendaciones.',
                            architecture_title: 'Arquitectura Tecnológica',
                            architecture_ai: 'Motor de Inteligencia Artificial: Google Gemini API con orquestación de system instructions para un perfil experto.',
                            architecture_data: 'Arquitectura de Datos: Firebase Realtime Database para la gestión de inventario y persistencia operativa.',
                            architecture_dev: 'Pipeline de Desarrollo: Python para la lógica de procesado semántico e integración de APIs.',
                            features_title: 'Métricas y Capacidades',
                            feature_1: 'Análisis predictivo de maridaje',
                            feature_2: 'Interfaz comunicativa multicanal (Voz/Texto)',
                            feature_3: 'Sincronización de datos de alto rendimiento',
                            try_button: 'Ejecutar Aplicación',
                            back_button: 'Volver al catálogo'
                        },
                        sitgesart: {
                            title: 'Sitges Art',
                            desc: 'Un viaje por el arte, la cultura y la memoria de Sitges. Una plataforma interactiva que conecta el pasado con el futuro mediante la tecnología.',
                            detail_title: 'Sobre el Proyecto',
                            detail_desc: 'Sitges Art es un archivo digital vivo que celebra la herencia cultural de Sitges. Hemos creado una experiencia donde el arte y la memoria histórica se fusionan con una interfaz moderna y accesible.',
                            architecture_title: 'Arquitectura Tecnológica',
                            architecture_ai: 'Motor de IA: Integración de modelos de lenguaje para la contextualización de obras y lugares.',
                            architecture_data: 'Gestión de Datos: Indexación semántica de contenidos culturales e históricos.',
                            architecture_dev: 'Desarrollo: Arquitectura basada en React con un enfoque "mobile-first" para la mejor experiencia en rutas urbanas.',
                            features_title: 'Caracteristicas Clave',
                            feature_1: 'Búsqueda inteligente por arte e historia',
                            feature_2: 'Diseño responsivo adaptado a dispositivos móviles',
                            feature_3: 'Contenido multimedia inmersivo',
                            try_button: 'Ver la web',
                            back_button: 'Volver a proyectos'
                        },
                        sitgeswalk: {
                            title: 'Sitges Walk',
                            desc: 'Explora Sitges a pie con esta guía interactiva. Descubre rutas, puntos de interés e historia de la villa de una manera dinámica y mobile-first.',
                            detail_title: 'Sobre el Proyecto',
                            detail_desc: 'Hemos diseñado Sitges Walk para ser el compañero perfecto para tus paseos. Una aplicación que no solo te guía geográficamente, sino que te explica la historia que se esconde detrás de cada rincón de Sitges.',
                            architecture_title: 'Arquitectura Tecnológica',
                            architecture_ai: 'Geolocalización: Integración en tiempo real para una navegación fluida.',
                            architecture_data: 'Gestión de Datos: Base de datos optimizada para rutas y puntos de interés.',
                            architecture_dev: 'Desarrollo: Enfoque de Progressive Web App (PWA) con React para una experiencia nativa en el móvil.',
                            features_title: 'Características Clau',
                            feature_1: 'Mapes interactivos de rutas culturales',
                            feature_2: 'Información histórica geolocalizada',
                            feature_3: 'Interfaz optimizada para el uso al exterior',
                            try_button: 'Ver la web',
                            back_button: 'Volver a proyectos'
                        },
                        fetspersitges: {
                            title: 'Fets per Sitges',
                            desc: 'Estrategia y comunicación política para un proyecto transformador en Sitges. Una plataforma que conecta la visión política con la realidad ciudadana.',
                            detail_title: 'Sobre el Proyecto',
                            detail_desc: 'Fets per Sitges es un proyecto de estrategia y consultoría política donde he aplicado mi experiencia en comunicación narrativa y análisis de contexto. El proyecto busca canalizar las inquietudes de la villa de una manera clara, directa y con una visión de futuro integrada.',
                            author_note: 'A veces el código no es la única herramienta para transformar la realidad; la estrategia y la buena narrativa son el software que mueve las sociedades.',
                            architecture_title: 'Ejes Estratégicos',
                            architecture_ai: 'Estrategia: Definición del relato y análisis de escenarios políticos.',
                            architecture_data: 'Comunicación: Gestión de redes sociales y producción de contenido visual con DaVinci Resolve.',
                            architecture_dev: 'Participación: Implementación de canales de escucha ciudadana activa.',
                            features_title: 'Objetivos Clave',
                            feature_1: 'Definición de un relato de ciudad propio',
                            feature_2: 'Gestión de la campaña digital 360',
                            feature_3: 'Análisis de datos y tendencias de opinión',
                            try_button: 'Ver el proyecto',
                            back_button: 'Volver a proyectos',
                            subtitle: '666 votos con un presupuesto de guerrilla.',
                            apm_title: 'Eficiencia Extrema y el Efecto APM.',
                            apm_desc: 'Con un presupuesto mínimo comparado con los partidos tradicionales, priorizamos la viralidad. El vídeo de los villancicos (estilo APM) nos dio entrada gratuita a los medios nacionales (TV3), poniendo el proyecto en el mapa de Sitges en tiempo récord.',
                            video_caption: 'La acción que saltó de las redes sociales a TV3, generando una notoriedad orgánica sin precedentes en Sitges.',
                            strategy_heading: 'Estrategias de Impacto',
                            strategies: {
                                creativity: { title: 'Creatividad vs Presupuesto', desc: 'En un entorno saturado de propaganda clásica, utilizamos el Pixel Art para explicar propuestas complejas como la regeneración de las playas. Una solución estética de bajo coste pero de alto impacto que conecta con un público más joven y digital.' },
                                impact: { title: 'Autoridad y Presencia Urbana', desc: 'El dominio del espacio físico como declaración de intenciones. Desplegamos una lona gigante en un punto estratégico para romper el ruido electoral, demostrando que la guerrilla también sabe jugar fuerte en la calle.' },
                                synthesis: { title: 'Ingeniería de Mensaje', desc: 'Traducción de conceptos complejos en mensajes claros y directos. Utilizamos el formato vídeo para explicar la gestión política desde la claridad, eliminando el ruido y centrándonos en soluciones reales para la ciudadanía.' },
                                commitment: { title: 'Compromiso y Valor Humano', desc: 'La política son personas. Integramos la diversidad como un activo fundamental del proyecto, demostrando que una lista inclusiva no solo es más justa, sino que es más fuerte y representativa de la sociedad real.' },
                                honesty: { title: 'Honestidad y Cultura del Esfuerzo', desc: 'La política entendida como un servicio de proximidad. Ponemos cara y ojos a un compromiso basado en el trabajo constante y la transparencia, demostrando que la honestidad es la herramienta más potente para conectar con el electorado.' },
                                territory: { title: 'Cohesión y Territorio', desc: 'Llevamos el mensaje a cada barrio de Sitges, desde las Botigues hasta Garraf. Una estrategia de capilaridad total para asegurar que cada vecino y vecina se sintiera identificado con un proyecto de ciudad compartido.' },
                                rigor: { title: 'Rigor', desc: 'Base de datos y análisis detrás de cada afirmación y estrategia.' }
                            },
                            roi_label: 'Impacto Total',
                            roi_title: 'ROI Político: Uno de los costes por voto más bajos de la historia electoral de Sitges.',
                            features: {
                                narrative: { title: 'Narrativa "APM"', desc: 'Uso inteligente de clips virales y humor para desmontar el status quo. Una guerrilla digital donde el contenido es el proyectil.' },
                                lona: { title: 'Impacto Físico: La Lona', desc: 'Cuando el mundo digital presiona para saltar a la calle. Estrategia mixta donde la visibilidad física retroalimentó el alcance online.' },
                                data: { title: 'Data Driven', desc: 'Cada publicación, cada hora de lanzamiento y cada segmentación fue fruto de un análisis de datos previo riguroso.' }
                            },
                            human_title: 'Inclusividad Real',
                            human_desc: 'La estrategia no fue solo algorítmica. Trabajar codo con codo con personas con otras capacidades nos permitió humanizar el mensaje y conectar con el alma de Sitges de forma genuina.'
                        },
                        ecosistema: {
                            title: 'Ecosistema Social',
                            desc: 'Estrategia de contenidos y cruce de plataformas para Instagram y TikTok. Construyendo audiencia e impacto digital.'
                        },
                        related_title: 'Otros Proyectos'
                    },
                    footer: {
                        made_with: 'Hecho con ❤️ i IA',
                        legal: "Aviso Legal",
                        cookies: "Política de Cookies",
                        privacy: "Política de Privacidad"
                    },
                    translation: {
                        warning_es: 'Estos textos están escritos en catalán. La traducción puede perder parte del sentido y de la ironía.',
                        warning_en: 'Estos textos están escritos en catalán. La traducción puede perder parte del sentido y de la ironía.',
                        translate_button: 'Traducir con IA',
                        translating: 'Traduciendo...',
                        show_original: 'Mostrar original',
                        translation_error: 'Error al traducir. Inténtalo de nuevo.'
                    },
                    stack: {
                        title: 'Mi Stack:',
                        subtitle: 'Donde la Estrategia encuentra la Ejecución.',
                        intro_p1: 'Este stack tecnológico es mi campo de juego. Mediante el uso experto de la IA Generativa, transformo concepto complejos en productos reales, demostrando que la visión estratégica y el buen uso de la tecnología son más potentes que el conocimiento técnico aislado.',
                        quote: '"No soy un programador convencional; soy un AI-Powered Builder. Mi valor no reside en la memorización de sintaxis, sino en la capacidad de dialogar con la Inteligencia Artificial para extraer su máximo potencial técnico. Esto me permite ser extremadamente ágil: lo que antes requería un equipo entero, ahora lo ejecuto con precisión y criterio propio."',
                        learning_title: '"Always Learning"',
                        learning_desc: 'Este stack no es estático. Cada semana testo nuevas herramientas del ecosistema IA para mantenerme a la vanguardia de la eficiencia digital.',
                        sections: {
                            ia: "IA y Core Tech",
                            web: "Arquitectura Web",
                            creative: "Diseño y Flujo Creativo"
                        },
                        items: {
                            gemini: "El motor de razonamiento principal. Su gran ventana de contexto me permite procesar volúmenes masivos de datos con una precisión quirúrgica.",
                            openai: "Estándar de la industria para la generación de texto y orquestración de lógica compleja en mis flujos de trabajo. Es mi OpenIA.",
                            python: "El lenguaje fundamental que me permite conectar la IA con la ejecución de código y la automatización.",
                            cloudinary: "Mi solución para la gestión inteligente de medios. Lo utilizo para optimizar, almacenar y servir imágenes y vídeos de forma ultra-rápida, asegurando que la web sea ligera sin perder calidad visual.",
                            firebase: "La infraestructura para datos en tiempo real, almacenamiento y autenticación segura de usuarios.",
                            react: "La librería para construir interfaces de usuario dinámicas y escalables mediante componentes.",
                            tailwind: "Motor de estilo para diseñar interfaces limpias y minimalistas directamente desde el código.",
                            vercel: "Plataforma de deployment que garantiza la máxima velocidad de carga y un rendimiento óptimo de la web.",
                            github: "Centro de control de versiones donde colaboro con la IA para mantener un código seguro y organizado.",
                            davinci: "Herramienta definitiva para la postproducción de vídeo, utilizada por su control cinematográfico del color y potencia en el montaje profesional.",
                            ae: "Creación de motion graphics para explicar conceptos abstractos de IA de manera visual y sencilla.",
                            ps: "Pilar del diseño gráfico para la creación de portadas y elementos visuals de marca personal.",
                            antigravity: "El esqueleto de diseño que da coherencia visual y una experiencia de usuario futurista.",
                            vscode: "Mi centro de operaciones configurado para el desarrollo asistido por IA, donde el prompt engineering y el código convergen."
                        },
                        diagram: {
                            title: "Arquitectura de Soluciones (Ejemplo: Sommelier Digital)",
                            frontend: "Frontend",
                            logic: "IA & Python Orchestration",
                            data: "Datos"
                        }
                    },
                    legal: {
                        title: "Aviso Legal",
                        intro: "En cumplimiento de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), se informa que el titular de este sitio web es:",
                        owner_title: "Titular",
                        owner_label: "Titular",
                        contact_label: "Contacto",
                        activity_label: "Actividad",
                        activity_text: "Consultoría y desarrollo de soluciones basadas en Inteligencia Artificial y Desarrollo Web.",
                        copyright_title: "Propiedad Intelectual",
                        copyright_text: "El contenido de esta web (textos, código, diseño y arquitectura) es propiedad intelectual del titular, salvo que se indique lo contrario. Queda prohibida la reproducción total o parcial sin autorización."
                    },
                    cookies: {
                        title: "Política de Cookies",
                        intro: "Este sitio web utiliza cookies propias y de terceros para mejorar la experiencia del usuario y analizar la navegación.",
                        what_title: "¿Qué son las cookies?",
                        what_text: "Son pequeños archivos que se almacenan en tu navegador para recordar preferencias o analizar el tráfico de la web (por ejemplo, a través de Google Analytics o Vercel Insights).",
                        types_title: "Cookies utilizadas en esta web",
                        technical_label: "Técnicas",
                        technical_text: "Necesarias para el funcionamiento de la web (Framework Antigravity/React).",
                        analytics_label: "Analíticas",
                        analytics_text: "Nos permeten saber cuántas visitas tenemos y cómo interactúan los usuarios con el contenido.",
                        config_text: "Puedes configurar o desactivar las cookies a través de la configuración de tu navegador."
                    },
                    privacy: {
                        title: "Política de Privacidad",
                        intro: "En cumplimiento del Reglamento General de Protección de Datos (RGPD), te informo sobre cómo se tratan los datos personales que facilites a través del formulario de contacto de esta web.",
                        responsible_title: "Responsable del tratamiento",
                        responsible_text: "El responsable de los datos recogidos es Pere Badia i Lorenz, con domicilio en Sitges y correo electrónico de contacto pbadialorenz@gmail.com.",
                        purpose_title: "Finalidad del tratamiento",
                        purpose_text: "La finalidad de la recogida de datos (nombre y correo electrónico) es exclusivamente para responder a tus consultas, presupuestos o mensajes enviados a través del formulario. No se utilizarán para el envío de publicidad no solicitada (spam).",
                        legitimacy_title: "Legitimación",
                        legitimacy_text: "El tratamiento de los datos se basa en tu consentimiento explícito al marcar la casilla de aceptación antes de enviar el formulario.",
                        recipients_title: "Destinatarios de los datos",
                        recipients_text: "Los datos se almacenan de forma segura a través de Firebase (Google Cloud) o el servicio de correo utilizado por la web, cumpliendo con los estándares de seguridad de la UE. No se cederán datos a terceros, excepto obligación legal.",
                        rights_title: "Tus derechos",
                        rights_text: "Tienes derecho a acceder, rectificar o suprimir tus datos personales en cualquier momento. Para hacerlo, solo tienes que enviarme un correo electrónico."
                    }
                }
            },
            en: {
                translation: {
                    nav: {
                        home: 'Home',
                        projects: 'Projects',
                        writings: 'My Writings',
                        sitges: 'Sitges',
                        ecos: 'Society News',
                        altres: 'Others',
                        stack: 'My Stack',
                        contact: 'Contact',
                        logout: 'Log out',
                        dev_ia: 'Development & AI',
                        strat_pol: 'Strategy & Consulting',
                        consultancy: 'Strategic Consultancy'
                    },
                    contact: {
                        title: 'Contact',
                        subtitle: 'Do you have any proposal or suggestion? Send me a message.',
                        bio_title: 'From Motherboards to Artificial Intelligence: A 360° Vision',
                        bio_p1: 'My relationship with technology didn\'t start in front of a screen, but with a screwdriver in my hand. I began my career as a hardware technician, understanding how machines work from the inside, later moving into systems administration. This technical foundation is what allows me today to write code with a deep understanding of the underlying infrastructure.',
                        bio_p2: 'But technology without communication is empty. My time in sales taught me to listen to real customer needs, and the opportunity to write for L\'Eco de Sitges was the perfect catalyst: I discovered that telling stories and transmitting ideas is as important as knowing how to program them.',
                        bio_p3: 'Today, I merge all this experience into my workflow:',
                        bio_f1_title: 'Programming & AI:',
                        bio_f1_desc: 'I develop solutions where code (React, Python) and AI (Gemini, OpenIA) work at the service of a strategy.',
                        bio_f2_title: 'Digital Narrative:',
                        bio_f2_desc: 'I master Social Media and visual content creation with DaVinci Resolve, understanding that every project needs its own voice to reach people.',
                        bio_f3_title: 'Business Vision:',
                        bio_f3_desc: 'Thanks to my sales background, I don\'t just build tools; I build solutions that provide real value and are understandable for the end user.',
                        bio_footer: 'I am not just a programmer. I am a technician who communicates and a communicator who understands technology.',
                        form: {
                            name: 'Name',
                            email: 'Email',
                            message: 'Message',
                            submit: 'Send',
                            captcha_label: 'Human control: How much is {{num1}} + {{num2}}?',
                            captcha_error: 'The sum is incorrect. Please try again.',
                            name_required: 'Name is required',
                            email_required: 'Email is required',
                            message_required: 'Message is required',
                            fill_required: 'Please fill in all required fields.',
                            send_error: 'Error sending message. Please try again later.',
                            success: 'Message sent successfully!'
                        }
                    },
                    hero: {
                        title: 'Pere Badia i Lorenz',
                        subtitle: 'Strategic Technology and AI Consultant. Specialized in creating digital solutions that merge context analysis, narrative, and advanced technical execution.'
                    },
                    home: {
                        latest_posts: 'Recent Projects & Insights',
                        read_more: 'Explore details',
                        loading: 'Updating content...',
                        sitges_desc: 'Analysis and chronicle of the social and cultural reality of Sitges.',
                        projects_desc: 'High-impact solutions in Development, AI, and Political Strategy.',
                        related_posts: 'Curated stories and analysis'
                    },
                    projects: {
                        title: 'Projects',
                        description: 'This is a selection of the most relevant projects I have worked on. From web development to cultural and social initiatives.',
                        categories: {
                            all: 'All',
                            dev_ia: 'Development & AI',
                            strat_pol: 'Strategy & Consulting'
                        },
                        filter_all: 'All',
                        coming_soon: 'Coming Soon',
                        placeholder_title: 'New Project',
                        placeholder_desc: 'I am preparing the documentation for my recent projects to showcase them here.',
                        sommelier: {
                            title: 'Digital Sommelier',
                            desc: 'Intelligent wine recommendation application based on Generative AI. The perfect fusion between modern technology and enological knowledge.',
                            detail_title: 'About the Project',
                            detail_desc: 'I have developed an intelligent assistant that acts as an expert sommelier. This tool not only knows thousands of references but also understands the user context (budget, type of cuisine, personal preferences) to offer precise recommendations.',
                            author_note: 'This project represents a continuous development environment; I iteratively optimize the prompt engineering and data architecture in Firebase to maximize model precision and recommendation accuracy.',
                            architecture_title: 'Technical Architecture',
                            architecture_ai: 'Artificial Intelligence Engine: Google Gemini API with system instructions orchestration for an expert profile.',
                            architecture_data: 'Data Architecture: Firebase Realtime Database for inventory management and operational persistence.',
                            architecture_dev: 'Development Pipeline: Python for semantic processing logic and API integration.',
                            features_title: 'Metrics & Capabilities',
                            feature_1: 'Predictive pairing analysis',
                            feature_2: 'Multichannel communicative interface (Voice/Text)',
                            feature_3: 'High-performance data synchronization',
                            try_button: 'Execute Application',
                            back_button: 'Back to catalog'
                        },
                        sitgesart: {
                            title: 'Sitges Art',
                            desc: 'A journey through the art, culture, and memory of Sitges. An interactive platform that connects the past with the future through technology.',
                            detail_title: 'About the Project',
                            detail_desc: 'Sitges Art is a living digital archive that celebrates Sitges\' cultural heritage. We have created an experience where art and historical memory merge with a modern and accessible interface.',
                            architecture_title: 'Technological Architecture',
                            architecture_ai: 'AI Engine: Language model integration for contextualizing artworks and locations.',
                            architecture_data: 'Data Management: Semantic indexing of cultural and historical content.',
                            architecture_dev: 'Development: React-based architecture with a "mobile-first" approach for the best experience on urban routes.',
                            features_title: 'Key Features',
                            feature_1: 'Intelligent search by art and history',
                            feature_2: 'Responsive design adapted for mobile devices',
                            feature_3: 'Immersive multimedia content',
                            try_button: 'View the website',
                            back_button: 'Back to projects'
                        },
                        sitgeswalk: {
                            title: 'Sitges Walk',
                            desc: 'Explore Sitges on foot with this interactive guide. Discover routes, points of interest, and the town\'s history in a dynamic and mobile-first way.',
                            detail_title: 'About the Project',
                            detail_desc: 'We designed Sitges Walk to be the perfect companion for your walks. An application that not only guides you geographically but also explains the history hidden behind every corner of Sitges.',
                            architecture_title: 'Technological Architecture',
                            architecture_ai: 'Geolocation: Real-time integration for smooth navigation.',
                            architecture_data: 'Data Management: Database optimized for routes and points of interest.',
                            architecture_dev: 'Development: Progressive Web App (PWA) approach with React for a native mobile experience.',
                            features_title: 'Key Features',
                            feature_1: 'Interactive cultural route maps',
                            feature_2: 'Geolocated historical information',
                            feature_3: 'Interface optimized for outdoor use',
                            try_button: 'View the website',
                            back_button: 'Back to projects'
                        },
                        fetspersitges: {
                            title: 'Fets per Sitges',
                            desc: 'Strategy and political communication for a transformative project in Sitges. A platform that connects political vision with citizen reality.',
                            detail_title: 'About the Project',
                            detail_desc: 'Fets per Sitges is a strategy and political consulting project where I have applied my experience in narrative communication and context analysis. The project seeks to channel the town\'s concerns in a clear, direct way and with an integrated vision of the future.',
                            author_note: 'Sometimes code is not the only tool to transform reality; strategy and good narrative are the software that moves societies.',
                            architecture_title: 'Strategic Pillars',
                            architecture_ai: 'Strategy: Relational definition and political scenarios analysis.',
                            architecture_data: 'Communication: Social media management and visual content production with DaVinci Resolve.',
                            architecture_dev: 'Participation: Implementation of active citizen listening channels.',
                            features_title: 'Key Objectives',
                            feature_1: 'Definition of an own city narrative',
                            feature_2: '360 digital campaign management',
                            feature_3: 'Data analysis and opinion trends',
                            try_button: 'View the project',
                            back_button: 'Back to projects',
                            subtitle: '666 votes with a guerrilla budget.',
                            apm_title: 'Extreme Efficiency and the APM Effect.',
                            apm_desc: 'With a minimal budget compared to traditional parties, we prioritized virality. The Christmas carols video (APM style) gave us free entry to national media (TV3), putting the project on the Sitges map in record time.',
                            video_caption: 'The action that jumped from social media to TV3, generating unprecedented organic notoriety in Sitges.',
                            strategy_heading: 'Impact Strategies',
                            strategies: {
                                creativity: { title: 'Creativity vs Budget', desc: 'In an environment saturated with classic propaganda, we use Pixel Art to explain complex proposals like beach regeneration. A low-cost but high-impact aesthetic solution that connects with a younger and more digital audience.' },
                                impact: { title: 'Authority and Urban Presence', desc: 'The dominance of physical space as a statement of intent. We deploy a giant billboard at a strategic point to break electoral noise, proving that guerrilla tactics also know how to play big in the streets.' },
                                synthesis: { title: 'Message Engineering', desc: 'Translation of complex concepts into clear and direct messages. We use the video format to explain political management with clarity, eliminating noise and focusing on real solutions for citizens.' },
                                commitment: { title: 'Commitment and Human Value', desc: 'Politics is about people. We integrate diversity as a fundamental asset of the project, proving that an inclusive list is not only fairer, but also stronger and more representative of real society.' },
                                honesty: { title: 'Honesty and Culture of Effort', desc: 'Politics understood as a proximity service. We put a face and eyes on a commitment based on constant work and transparency, proving that honesty is the most powerful tool to connect with the electorate.' },
                                territory: { title: 'Cohesion and Territory', desc: 'We took the message to every neighborhood in Sitges, from Les Botigues to Garraf. A strategy of total capillarity to ensure that every neighbor felt identified with a shared city project.' },
                                rigor: { title: 'Rigor', desc: 'Database and analysis behind every claim and strategy.' }
                            },
                            roi_label: 'Total Impact',
                            roi_title: 'Political ROI: One of the lowest costs per vote in Sitges\' electoral history.',
                            features: {
                                narrative: { title: ' "APM" Narrative', desc: 'Intelligent use of viral clips and humor to dismantle the status quo. A digital guerrilla where content is the projectile.' },
                                lona: { title: 'Physical Impact: The Billboard', desc: 'When the digital world pushes to jump to the streets. A mixed strategy where physical visibility fed back into online reach.' },
                                data: { title: 'Data Driven', desc: 'Every post, every launch time, and every segmentation was the result of rigorous prior data analysis.' }
                            },
                            human_title: 'Real Inclusivity',
                            human_desc: 'The strategy was not just algorithmic. Working side by side with people with other capabilities allowed us to humanize the message and connect with the soul of Sitges in a genuine way.'
                        },
                        ecosistema: {
                            title: 'Social Ecosystem',
                            desc: 'Content strategy and platform crossing for Instagram and TikTok. Building audience and digital impact.'
                        },
                        related_title: 'Other Projects'
                    },
                    footer: {
                        made_with: 'Made with ❤️ and AI',
                        legal: "Legal Notice",
                        cookies: "Cookie Policy",
                        privacy: "Privacy Policy"
                    },
                    translation: {
                        warning_es: 'These texts are written in Catalan. Translation may lose some of the meaning and irony.',
                        warning_en: 'These texts are written in Catalan. Translation may lose some of the meaning and irony.',
                        translate_button: 'Translate with AI',
                        translating: 'Translating...',
                        show_original: 'Show original',
                        translation_error: 'Translation error. Please try again.'
                    },
                    stack: {
                        title: 'My Stack:',
                        subtitle: 'Where Strategy meets Execution.',
                        intro_p1: 'This tech stack is my playground. Through the expert use of Generative AI, I transform complex concepts into real products, demonstrating that strategic vision and the effective use of technology are more powerful than isolated technical knowledge.',
                        quote: '"I am not a conventional programmer; I am an AI-Powered Builder. My value does not lie in memorizing syntax, but in the ability to dialogue with Artificial Intelligence to extract its full technical potential. This allows me to be extremely agile: what used to require a whole team, I now execute with precision and my own judgment."',
                        learning_title: '"Always Learning"',
                        learning_desc: 'This stack is not static. Every week I test new tools from the AI ecosystem to stay at the forefront of digital efficiency.',
                        sections: {
                            ia: "IA & Core Tech",
                            web: "Web Architecture",
                            creative: "Creative & Workflow"
                        },
                        items: {
                            gemini: "The primary reasoning engine. Its large context window allows me to process massive volumes of data with surgical precision.",
                            openai: "Industry standard for text generation and complex logic orchestration in my workflows. It's my OpenIA.",
                            python: "The fundamental language that allows me to connect AI with code execution and automation.",
                            cloudinary: "My solution for intelligent media management. I use it to optimize, store, and serve images and videos ultra-fast, ensuring the web is lightweight without losing visual quality.",
                            firebase: "The infrastructure for real-time data, storage, and secure user authentication.",
                            react: "The library for building dynamic and scalable user interfaces using components.",
                            tailwind: "Style engine to design clean and minimalist interfaces directly from the code.",
                            vercel: "Deployment platform that guarantees maximum loading speed and optimal web performance.",
                            github: "Version control center where I collaborate with AI to maintain secure and organized code.",
                            davinci: "Definitive tool for video post-production, used for its cinematic color control and power in professional editing.",
                            ae: "Motion graphics creation to explain abstract AI concepts in a visual and simple way.",
                            ps: "Design pillar for creating covers and personal brand visual elements.",
                            antigravity: "The design skeleton that provides visual coherence and a futuristic user experience.",
                            vscode: "My operation center configured for AI-assisted development, where prompt engineering and code converge."
                        },
                        diagram: {
                            title: "Solution Architecture (Example: Digital Sommelier)",
                            frontend: "Frontend",
                            logic: "AI & Python Orchestration",
                            data: "Data"
                        }
                    },
                    legal: {
                        title: "Legal Notice",
                        intro: "In compliance with Law 34/2002, of July 11, on information society services and electronic commerce (LSSI-CE), it is reported that the owner of this website is:",
                        owner_title: "Owner",
                        owner_label: "Owner",
                        contact_label: "Contact",
                        activity_label: "Activity",
                        activity_text: "Consulting and development of solutions based on Artificial Intelligence and Web Development.",
                        copyright_title: "Intellectual Property",
                        copyright_text: "The content of this website (texts, code, design and architecture) is the intellectual property of the owner, unless otherwise indicated. Total or partial reproduction without authorization is prohibited."
                    },
                    cookies: {
                        title: "Cookie Policy",
                        intro: "This website uses its own and third-party cookies to improve the user experience and analyze navigation.",
                        what_title: "What are cookies?",
                        what_text: "They are small files that are stored in your browser to remember preferences or analyze web traffic (for example, through Google Analytics or Vercel Insights).",
                        types_title: "Cookies used on this website",
                        technical_label: "Technical",
                        technical_text: "Necessary for the operation of the website (Antigravity/React Framework).",
                        analytics_label: "Analytics",
                        analytics_text: "They allow us to know how many visits we have and how users interact with the content.",
                        config_text: "You can configure or disable cookies through your browser settings."
                    },
                    privacy: {
                        title: "Privacy Policy",
                        intro: "In compliance with the General Data Protection Regulation (GDPR), I inform you about how the personal data you provide through the contact form on this website is processed.",
                        responsible_title: "Data Controller",
                        responsible_text: "The data controller is Pere Badia i Lorenz, domiciled in Sitges and contact email pbadialorenz@gmail.com.",
                        purpose_title: "Purpose of processing",
                        purpose_text: "The purpose of data collection (name and email) is exclusively to respond to your inquiries, quotes or messages sent through the form. They will not be used to send unsolicited advertising (spam).",
                        legitimacy_title: "Legitimacy",
                        legitimacy_text: "The processing of data is based on your explicit consent by checking the acceptance box before submitting the form.",
                        recipients_title: "Data recipients",
                        recipients_text: "Data is stored securely through Firebase (Google Cloud) or the email service used by the website, complying with EU security standards. Data will not be transferred to third parties, except by legal obligation.",
                        rights_title: "Your rights",
                        rights_text: "You have the right to access, rectify or delete your personal data at any time. To do so, just send me an email."
                    }
                }
            }
        }
    });

export default i18n;

