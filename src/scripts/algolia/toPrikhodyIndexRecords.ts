export type PrikhodyMainRow = [
    string, // objectID
    string, // title
    string, // pTitle
    string, // pType
    string, // lat
    string, // lng
    string, // src
    string?, // atdJoined (|)
];

export type PrikhodyAlgoliaRecord = {
    objectID: string;
    title: string;
    pTitle: string;
    pType: string;
    src: string;
    atd: string[];
    _geoloc?: { lat: number; lng: number };
};

function parseCoord(value: unknown): number | null {
    if (value === null || value === undefined || value === '') {
        return null;
    }
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
}

function toRecord(row: unknown[]): PrikhodyAlgoliaRecord | null {
    const objectID = row[0];
    if (typeof objectID !== 'string' || !objectID) {
        return null;
    }

    const title = typeof row[1] === 'string' ? row[1] : '';
    const pTitle = typeof row[2] === 'string' ? row[2] : '';
    const pType = typeof row[3] === 'string' ? row[3] : '';
    const src = typeof row[6] === 'string' && row[6] !== '' ? row[6] : '0';
    const atdJoined = typeof row[7] === 'string' ? row[7] : '';
    const atd = atdJoined ? atdJoined.split('|').filter(Boolean) : [];

    const record: PrikhodyAlgoliaRecord = {
        objectID,
        title,
        pTitle,
        pType,
        src,
        atd,
    };

    const lat = parseCoord(row[4]);
    const lng = parseCoord(row[5]);
    if (lat !== null && lng !== null) {
        record._geoloc = { lat, lng };
    }

    return record;
}

/** Maps prikhodyMainData.json tuples to Algolia prikhodyIndex records. */
export function toPrikhodyIndexRecords(rows: unknown[]): PrikhodyAlgoliaRecord[] {
    if (!Array.isArray(rows)) {
        return [];
    }

    const records: PrikhodyAlgoliaRecord[] = [];
    for (const row of rows) {
        if (!Array.isArray(row)) {
            continue;
        }
        const record = toRecord(row);
        if (record) {
            records.push(record);
        }
    }
    return records;
}
