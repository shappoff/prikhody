import {SITE_NAME, SITE_URL} from './site';
import {createAbsoluteUrl} from './metadata';

import type {PrikhodRecord} from '@/lib/seo/atdSlugs';

export function createWebsiteJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: 'ru-RU',
        description:
            'Карта церквей и костёлов Беларуси с данными о сохранности архивных документов.',
    };
}

export function createPlaceOfWorshipJsonLd(prikhod: PrikhodRecord) {
    const [id, title, placeName, placeType, lat, lng, , atdStr] = prikhod;
    const locationParts = atdStr?.split('|').filter(Boolean) ?? [];

    return {
        '@context': 'https://schema.org',
        '@type': 'PlaceOfWorship',
        name: title,
        url: createAbsoluteUrl(`/p/${id}`),
        geo: {
            '@type': 'GeoCoordinates',
            latitude: Number(lat),
            longitude: Number(lng),
        },
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'BY',
            addressLocality: placeName,
            addressRegion: locationParts[locationParts.length - 1] ?? undefined,
        },
        description: [placeType, placeName, ...locationParts].filter(Boolean).join(', '),
    };
}
