import fs from "fs";
import {
    digitedFormattedDataPath,
    prikhodyArchivesDataPath,
    prikhodyMainDataPath,
    rejectedFormattedPath
} from "@/components/paths";
import { buildArchiveTableRows } from "@/components/featured/prikhody/buildArchiveTableRows";
import WrapToMarkerClusterGroup from "@/components/featured/prikhody/WrapToMarkerClusterGroup";
import InfoPage from "../../../components/featured/prikhody/InfoPage";
import JsonLd from "@/lib/seo/JsonLd";
import {createPageMetadata} from "@/lib/seo/metadata";
import {createPlaceOfWorshipJsonLd} from "@/lib/seo/structuredData";

type Params = {
    prikhod: string;
}

export async function generateStaticParams(): Promise<Params[]> {
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));
    if (!allPrikhods || allPrikhods.length === 0) {
        return [{ prikhod: 'not-found' }];
    }

    return allPrikhods.map(([id]: any) => ({prikhod: id}));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
    const {prikhod} = await params;
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));

    const currentItem = allPrikhods.find((prkhd: any) => prkhd[0] === prikhod);
    if (!currentItem) {
        return createPageMetadata({
            title: 'Приход не найден',
            description: 'Страница прихода не найдена на карте церквей и костёлов Беларуси.',
            path: `/p/${prikhod}`,
            noIndex: true,
        });
    }

    const [, title, pTitle, pType, , , , atd] = currentItem;
    const location = atd?.split('|').join(', ') ?? '';

    return createPageMetadata({
        title: `${pTitle}, ${title}`,
        description: `${pType}, ${pTitle}, ${title}, ${location}. Сохранность документов. Метрические книги, исповедные росписи, брачные обыски.`,
        path: `/p/${prikhod}`,
        keywords: [title, pTitle, pType, 'Беларусь', 'генеалогия', 'метрические книги', ...(atd?.split('|') ?? [])],
    });
}

const PrikhodPage = async ({params}: { params: Promise<Params> }) => {
    const {prikhod} = await params;
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));
    const digitedFormattedData = JSON.parse(fs.readFileSync(digitedFormattedDataPath, 'utf8'));
    const rejectedFormattedData = JSON.parse(fs.readFileSync(rejectedFormattedPath, 'utf8'));
    const prikhodyArchivesData = JSON.parse(fs.readFileSync(prikhodyArchivesDataPath, 'utf8'));
    const currentItem = allPrikhods.find((prkhd: any) => prkhd[0] === prikhod);
    const archives = buildArchiveTableRows(
        prikhodyArchivesData[prikhod] || [],
        digitedFormattedData,
        rejectedFormattedData,
    );

    return <>
        {currentItem ? <JsonLd data={createPlaceOfWorshipJsonLd(currentItem)} /> : null}
        <InfoPage archives={archives} prikhod={currentItem} />
        <WrapToMarkerClusterGroup enable={false} items={[currentItem]} bounds={false} />
    </>
};

export default PrikhodPage;
