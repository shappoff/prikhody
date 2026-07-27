import fs from 'fs';
import type {MetadataRoute} from 'next';
import {prikhodyMainDataPath} from '@/components/paths';
import {getAtdSlugs, type PrikhodRecord} from '@/lib/seo/atdSlugs';

export const dynamic = 'force-static';

const STATIC_ROUTES = [
    '/',
    '/p',
    '/atd',
    '/orthodox',
    '/catholics',
    '/digited',
    '/noinfo',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8')) as PrikhodRecord[];
    const atdSlugs = getAtdSlugs(allPrikhods);

    const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
        url: path,
        changeFrequency: path === '/' ? 'weekly' : 'monthly',
        priority: path === '/' ? 1 : 0.8,
    }));

    const prikhodEntries: MetadataRoute.Sitemap = allPrikhods.map(([id]) => ({
        url: `/p/${id}`,
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    const atdEntries: MetadataRoute.Sitemap = atdSlugs.map((slug) => ({
        url: `/atd/${slug}`,
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    return [...staticEntries, ...prikhodEntries, ...atdEntries];
}
