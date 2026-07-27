import fs from "fs";
import {prikhodyMainDataPath} from "@/components/paths";
import {createPageMetadata} from "@/lib/seo/metadata";
import {buildAtdSlugMap} from "@/lib/seo/atdSlugs";
import './atd.css';

export const metadata = createPageMetadata({
    title: 'Список АТД Беларуси',
    description: 'Список районов, уездов и поветов Беларуси с церквями и костёлами.',
    path: '/atd',
    keywords: ['Беларусь', 'Церкви', 'Костелы', 'Районы', 'Уезды', 'Поветы'],
});

export default function ATDPage() {
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));
    const atdObj = buildAtdSlugMap(allPrikhods);

    return <ol key="prikhody-map">
        {
            Object.keys(atdObj).sort((a: any, b: any) => a.localeCompare(b)).map((atdItem: string, index: number) =>{
                const title = `Беларусь, ${atdObj[atdItem]}, церкви и костелы, сохранность метрическийх книг, исповедных ведомостей и брачных обысков`;
                return <li key={atdItem}>
                        <a href={`/prikhody/atd/${atdItem}`}
                           title={title}
                           aria-label={title}
                        >
                            {atdObj[atdItem]}
                        </a>
                    </li>
                }
            )
        }
    </ol>
}
