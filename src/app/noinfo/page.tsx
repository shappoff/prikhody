import fs from "fs";
import {prikhodyMainDataPath} from "@/components/paths";
import WrapToMarkerClusterGroup from "@/components/featured/prikhody/WrapToMarkerClusterGroup";
import {createPageMetadata} from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
    title: 'Приходы без данных о сохранности',
    description: 'Церкви и костёлы Беларуси, по которым пока нет данных о сохранности архивных документов.',
    path: '/noinfo',
    keywords: ['Карта', 'Беларусь', 'Церкви', 'Костелы', 'генеалогия', 'Сохранность'],
});

export default function PrikhodyMapPage() {
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));

    const noinfo: Array<any> = [];
    allPrikhods.forEach((prikhodItem: any) => {
        let digitedCount = 0;
        const [id,title,np,type,lat,lng,count,atd] = prikhodItem;

        if (+count === 0) {
            noinfo.push([id,title,np,type,lat,lng,digitedCount,atd]);
        }
    });


    return <>
        <WrapToMarkerClusterGroup items={noinfo} maxClusterRadius={40} enable={true} bounds={false} markerLabel="Оцифровано дел:" />
    </>
}
