import fs from "fs";
import {prikhodyMainDataPath} from "@/components/paths";
import {createPageMetadata} from "@/lib/seo/metadata";

import './pPage.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CreatePortalWrapper from "@/components/shared/CreatePortalWrapper";

export const metadata = createPageMetadata({
    title: 'Список церквей и костёлов Беларуси',
    description: 'Полный список церквей и костёлов Беларуси с сохранностью архивных документов.',
    path: '/p',
    keywords: ['Беларусь', 'Церкви', 'Костелы', 'Районы', 'Уезды', 'Поветы'],
});

export default function PrikhodListPage() {
    const allPrikhods = JSON.parse(fs.readFileSync(prikhodyMainDataPath, 'utf8'));

    return <CreatePortalWrapper id="slide-panel-info">
        <List key="prikhody-list">
            {
                allPrikhods
                    .sort((a: any, b: any) => a[2].localeCompare(b[2]))
                    .map(([id, title, np, npType, lat, lng, , atdStr]: any, index: number) =>
                        <ListItem key={id}>
                            <span>{index + 1}. </span>
                            <a href={`/p/${id}`}
                               title={`${title}`}
                               aria-label={`${title}`}
                            >
                                <ListItemText primary={`${npType} ${np}, ${title}, ${atdStr?.split('|').join(', ')}`}/>
                            </a>
                        </ListItem>
                    )
            }
        </List>
    </CreatePortalWrapper>
}
