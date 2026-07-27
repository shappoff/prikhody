import fs from "fs";
import {prikhodyMainDataPath} from "@/components/paths";
import WrapToMarkerClusterGroup from "@/components/featured/prikhody/WrapToMarkerClusterGroup";
import JsonLd from "@/lib/seo/JsonLd";
import {createPageMetadata} from "@/lib/seo/metadata";
import {createWebsiteJsonLd} from "@/lib/seo/structuredData";

export const metadata = createPageMetadata({
    title: 'Карта приходов',
    description: 'Карта церквей и костёлов Беларуси. Генеалогия. Сохранность метрических книг, исповедных росписей и брачных обысков.',
    path: '/',
    absoluteTitle: true,
    keywords: ['Карта', 'Беларусь', 'Церкви', 'Костелы', 'генеалогия', 'Сохранность'],
});

export default function Home() {
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));

    return (
        <>
            <JsonLd data={createWebsiteJsonLd()} />
            <WrapToMarkerClusterGroup items={allPrikhods} bounds={false} />
        </>
    );
}
