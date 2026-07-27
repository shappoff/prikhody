import fs from "fs";
import {prikhodyMainDataPath} from "@/components/paths";
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import WrapToMarkerClusterGroup from "@/components/featured/prikhody/WrapToMarkerClusterGroup";
import {createPageMetadata} from "@/lib/seo/metadata";
import {buildAtdSlugMap} from "@/lib/seo/atdSlugs";

const cyrillicToTranslit: any = new (CyrillicToTranslit as any);

type Params = {
    atd: string;
}

export async function generateStaticParams(): Promise<Params[]> {
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));
    if (!allPrikhods || allPrikhods.length === 0) {
        return [{ atd: 'not-found' }];
    }

    return Object.keys(buildAtdSlugMap(allPrikhods)).map((atd) => ({atd}));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
    const {atd} = await params;
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));
    const atdObj = buildAtdSlugMap(allPrikhods);
    const title = atdObj[atd];

    if (!title) {
        return createPageMetadata({
            title: 'АТД не найден',
            description: 'Страница административно-территориальной единицы не найдена.',
            path: `/atd/${atd}`,
            noIndex: true,
        });
    }

    return createPageMetadata({
        title,
        description: `${title}, церкви и костелы. Сохранность документов. Метрические книги, исповедные росписи, брачные обыски.`,
        path: `/atd/${atd}`,
        keywords: [title, 'Беларусь', 'церкви', 'костелы', 'генеалогия', 'метрические книги'],
    });
}

const FondPage = async ({params}: { params: Promise<Params> }) => {
    const {atd} = await params;
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));
    const items = allPrikhods.filter(([,,,,,,,atdStr]: any) => atdStr && ~cyrillicToTranslit.transform(atdStr.trim(), '_').toLowerCase()?.indexOf(atd));

    return <>
        <WrapToMarkerClusterGroup enable={false} items={items} bounds={true} />
    </>
};

export default FondPage;
