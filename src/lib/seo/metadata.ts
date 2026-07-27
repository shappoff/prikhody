import type {Metadata} from 'next';
import {DEFAULT_KEYWORDS, DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL} from './site';

type PageMetadataOptions = {
    title: string;
    description: string;
    path?: string;
    keywords?: string[];
    ogImage?: string;
    absoluteTitle?: boolean;
    noIndex?: boolean;
};

export function createAbsoluteUrl(path = '/'): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${SITE_URL}${normalizedPath}`;
}

export function createPageMetadata({
    title,
    description,
    path = '/',
    keywords = DEFAULT_KEYWORDS,
    ogImage = DEFAULT_OG_IMAGE,
    absoluteTitle = false,
    noIndex = false,
}: PageMetadataOptions): Metadata {
    const url = createAbsoluteUrl(path);

    return {
        title: absoluteTitle ? {absolute: title} : title,
        description,
        keywords,
        robots: noIndex
            ? {index: false, follow: false}
            : {index: true, follow: true},
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: SITE_NAME,
            locale: 'ru_RU',
            type: 'website',
            images: [
                {
                    url: ogImage,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
    };
}

export const rootMetadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_NAME,
        template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
    applicationName: SITE_NAME,
    authors: [{name: 'shappoff', url: 'https://github.com/shappoff'}],
    creator: 'shappoff',
    robots: {index: true, follow: true},
    verification: {
        google: 'WcZLxrvNHupEwOXBZ_xza8RMaDFrJ_7Nc_Ax_vyo0zw',
        yandex: 'cd605c554612fb41',
    },
    icons: {
        icon: [{url: '/map-icon.svg', type: 'image/svg+xml'}],
    },
    openGraph: {
        type: 'website',
        locale: 'ru_RU',
        siteName: SITE_NAME,
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        images: [{url: DEFAULT_OG_IMAGE, alt: SITE_NAME}],
    },
    twitter: {
        card: 'summary_large_image',
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
        images: [DEFAULT_OG_IMAGE],
    },
};
