import { getNestedArrayValue } from "@/components/utils";

type NestedLookup = Record<string, Record<string, Record<string, unknown>>> | undefined;

export type ArchiveTableRow = {
    year: unknown;
    type: unknown;
    short: string;
    fod: string;
    link: unknown;
    full: unknown;
    fond: string;
    opis: string;
    delo: string;
    pages: unknown;
    note: unknown;
    id: number;
    isDigited: boolean;
    isRejected: boolean;
};

/**
 * Resolves digited/rejected flags on the server so full lookup maps
 * are never serialized into each static /p/[prikhod] page payload.
 */
export function buildArchiveTableRows(
    archives: Array<Array<any>> = [],
    digited?: NestedLookup,
    rejected?: NestedLookup,
): ArchiveTableRow[] {
    return archives.map((aRow, index) => {
        const [year, type, short, fod, link, full, pages, note] = aRow;
        const [fond, opis, delo] = String(fod ?? "").split("-");
        const isNiab = short === "НИАБ";

        return {
            year,
            type,
            short,
            fod,
            link,
            full,
            fond,
            opis,
            delo,
            pages,
            note,
            id: index,
            isDigited: Boolean(isNiab && getNestedArrayValue(digited, fond, opis, delo)),
            isRejected: Boolean(isNiab && getNestedArrayValue(rejected, fond, opis, delo)),
        };
    });
}
