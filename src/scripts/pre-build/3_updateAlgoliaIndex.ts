import fs from 'fs';
import {algoliasearch} from 'algoliasearch';
import {prikhodyMainDataPath} from '@/components/paths';
import {toPrikhodyIndexRecords} from '@/scripts/algolia/toPrikhodyIndexRecords';

const PRIKHODY_INDEX_NAME = 'prikhodyIndex';

export default async function updateAlgoliaIndex() {
    const appId = process.env.NEXT_PUBLIC_PPFF_ALGOLIA_APPLICATION_ID;
    const adminKey = process.env.PPFF_ALGOLIA_ADMIN_API_KEY;

    if (!appId || !adminKey) {
        console.warn(
            'Skip Algolia index update: missing NEXT_PUBLIC_PPFF_ALGOLIA_APPLICATION_ID or PPFF_ALGOLIA_ADMIN_API_KEY'
        );
        return;
    }

    if (!fs.existsSync(prikhodyMainDataPath)) {
        throw new Error(`Cannot update Algolia index: missing ${prikhodyMainDataPath}`);
    }

    const raw = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));
    const objects = toPrikhodyIndexRecords(raw);

    if (!objects.length) {
        throw new Error('Cannot update Algolia index: no records after transform');
    }

    const client = algoliasearch(appId, adminKey);

    console.log(`Updating Algolia index "${PRIKHODY_INDEX_NAME}" with ${objects.length} records…`);

    await client.replaceAllObjects({
        indexName: PRIKHODY_INDEX_NAME,
        objects,
        scopes: ['settings', 'rules', 'synonyms'],
    });

    console.log(`Algolia index "${PRIKHODY_INDEX_NAME}" updated (${objects.length} records)`);
}
