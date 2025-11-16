import * as React from 'react';
import DataGrid from '@/components/shared/DataGrid';
import Paper from '@/components/shared/Paper';
import CopyToClipboardData from "@/components/shared/CopyToClipboardData";
import Tooltip from '@/components/shared/Tooltip';
import Link from "next/link";
import {getNestedArrayValue} from "@/components/utils";
import { DocumentScannerOutlinedIcon, DoNotTouchOutlinedIcon, LinkIcon } from '@/components/shared/icons';
import Image from 'next/image';

interface GridColDef {
    field: string;
    headerName?: string;
    width?: number;
    sortable?: boolean;
    type?: string;
    description?: string;
    renderCell?: (params: { row: any; value: any; field: string }) => React.ReactNode;
}

const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable({data, digited, rejected}: any) {
    const columns: GridColDef[] = [
        { field: 'copy', headerName: 'скопировать', width: 120,
            sortable: false,
            renderCell: ({ row }) => {
                const {year, type, short, fod, link, full, fond, opis, delo, id} = row;
                return <CopyToClipboardData data={`${short} ${fod}, ${type}, ${year}`} />;
            }
        },
        { field: 'short', headerName: 'архив', width: 130,
            renderCell: ({ row }) => {
                const {year, type, short, fod, link, full, fond, opis, delo, id} = row;
                return <Tooltip arrow title={full || ''}><u>{short}</u></Tooltip>;
            }

        },
        { field: 'year', headerName: 'год', width: 130 },
        {
            field: 'type',
            headerName: 'тип',
            description: 'РБУ - Рождения, Браки, Умершие; ИВ - Исповедные Ведомости; БО - Брачные Обыски',
            sortable: false,
            type: 'string',
            width: 200,
        },
        {
            field: 'fod',
            headerName: 'Ф-О-Д',
            description: 'Фонд-Опись-Дело',
            width: 160,
            renderCell: ({ row }) => {
                const {year, type, short, fod, link, full, fond, opis, delo, id} = row;
                return <React.Fragment>
                    {
                        short === 'НИАБ' ? <Link target="_blank" href={`${location.origin}/niab/${fond}`}><u>{fond}</u></Link> : fond
                    }
                    {opis ? `-${opis}` : ''}{delo ? `-${delo}` : ''}
                </React.Fragment>;
            }
        },
        {
            field: 'info',
            headerName: 'информация',
            sortable: false,
            width: 160,
            renderCell: ({ row }) => {
                const {year, type, short, fod, link, full, fond, opis, delo, id} = row;
                return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '100%'}}>
                    {
                        link ? <>
                            <Tooltip arrow title="Ссылка на снимки">
                                <Link target="_blank" href={link}>
                                    {
                                        ~link.indexOf('familysearch.org') ?
                                            <Image src="/fs_logo_favicon_sq.png"
                                            width={20}
                                            height={20}
                                            alt="Familysearch.org" /> : <LinkIcon/>
                                    }
                                </Link>
                            </Tooltip>
                        </> : <></>}
                    {
                        getNestedArrayValue(digited, fond, opis, delo) && short === 'НИАБ' ? <>
                            <Tooltip arrow title="Оцифрованно в НИАБ согласно перечню цифровых копий, имеющихся в фонде пользования">
                                <Link target="_blank" href="https://docs.google.com/spreadsheets/d/1eKuTaDS5g8xCZX35N14Kyy9a01saGEya/">
                                    <DocumentScannerOutlinedIcon style={{ fontSize: 20, cursor: 'pointer' }} />
                                </Link>
                            </Tooltip>
                        </> : ''
                    }
                    {
                        getNestedArrayValue(rejected, fond, opis, delo) && short === 'НИАБ' ? <>
                            <Tooltip arrow title="Отказано в выдаче. Подробнее в таблице.">
                                <Link target="_blank" href="https://docs.google.com/spreadsheets/d/1ohjiRoVObt41N7oRhQb9b2Sq9UiBsUKTGbDQ7DQp9Zc/">
                                    <DoNotTouchOutlinedIcon style={{ fontSize: 20, cursor: 'pointer' }} />
                                </Link>
                            </Tooltip>
                        </> : ''
                    }
                </div>;
            }
        },
        { field: 'pages', headerName: 'листы', description: 'Листы в деле', width: 130, sortable: false },
        { field: 'note', headerName: 'заметки', width: 130 },
    ];

    return (
        <Paper sx={{width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 50, 100]}
                sx={{ border: 0 }}
            />
        </Paper>
    );
}
