import fs from "fs";
import {prikhodyMainDataPath} from "@/components/paths";
import WrapToMarkerClusterGroup from "@/components/featured/prikhody/WrapToMarkerClusterGroup";
import {createPageMetadata} from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
    title: 'Православные приходы',
    description: 'Православные приходы Беларуси. Генеалогия. Сохранность метрических книг и исповедных росписей.',
    path: '/orthodox',
    keywords: ['Карта', 'Беларусь', 'Церкви', 'генеалогия', 'Сохранность'],
});

export default function PrikhodyMapPage() {
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));

    const noinfo: Array<any> = [];
    allPrikhods.forEach((prikhodItem: any) => {
        const [id,title,np,type,lat,lng,count,atd] = prikhodItem;

        if (~title.toLowerCase().indexOf('церковь')) {
            noinfo.push(prikhodItem);
        }
    });


    return <>
        <WrapToMarkerClusterGroup items={noinfo} maxClusterRadius={130} enable={true} bounds={false} />
    </>
}
