import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useSEO(pageKey, defaultTitleKey) {
    const { t, i18n } = useTranslation();
    const [seoData, setSeoData] = useState({
        title: '', description: '',
        title_es: '', description_es: '',
        title_en: '', description_en: '',
        isIndexed: null
    });

    useEffect(() => {
        async function fetchSEO() {
            try {
                const docSnap = await getDoc(doc(db, 'site_seo', pageKey));
                if (docSnap.exists()) {
                    setSeoData(docSnap.data());
                }
            } catch (error) {
                console.error(`Error fetching SEO for ${pageKey}:`, error);
            }
        }
        fetchSEO();
    }, [pageKey]);

    useEffect(() => {
        const currentLang = i18n.language;
        let activeTitle = seoData.title;
        let activeDescription = seoData.description;

        if (currentLang === 'es') {
            activeTitle = seoData.title_es || activeTitle;
            activeDescription = seoData.description_es || activeDescription;
        } else if (currentLang === 'en') {
            activeTitle = seoData.title_en || activeTitle;
            activeDescription = seoData.description_en || activeDescription;
        }

        document.title = activeTitle || (defaultTitleKey ? t(defaultTitleKey) : 'Pere Badia i Lorenz');

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = activeDescription || (defaultTitleKey ? t(`${defaultTitleKey.split('.')[0]}.subtitle`) : '');

        const isPageIndexed = seoData.isIndexed !== null ? seoData.isIndexed : true;

        let metaRobots = document.querySelector('meta[name="robots"]');
        if (isPageIndexed === false) {
            if (!metaRobots) {
                metaRobots = document.createElement('meta');
                metaRobots.name = 'robots';
                document.head.appendChild(metaRobots);
            }
            metaRobots.content = "noindex, nofollow";
        } else if (metaRobots) {
            metaRobots.remove();
        }
    }, [seoData, i18n.language, t, defaultTitleKey]);

    return seoData;
}
