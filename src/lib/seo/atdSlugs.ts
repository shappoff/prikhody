import CyrillicToTranslit from 'cyrillic-to-translit-js';

const cyrillicToTranslit: any = new (CyrillicToTranslit as any);

export type PrikhodRecord = [string, string, string, string, string, string, string, string?];

export function buildAtdSlugMap(prikhods: PrikhodRecord[]): Record<string, string> {
    const atdMap: Record<string, string> = {};

    prikhods.forEach(([, , , , , , , atdStr]) => {
        if (!atdStr) {
            return;
        }

        atdStr.split('|').forEach((atd) => {
            const slug = cyrillicToTranslit.transform(atd.trim(), '_').toLowerCase();
            if (!atdMap[slug]) {
                atdMap[slug] = atd.trim();
            }
        });
    });

    return atdMap;
}

export function getAtdSlugs(prikhods: PrikhodRecord[]): string[] {
    return Object.keys(buildAtdSlugMap(prikhods));
}
