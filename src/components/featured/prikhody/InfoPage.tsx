'use client'

import Drawer from '@/components/shared/Drawer';
import IconButton from '@/components/shared/IconButton';
import { CloseIcon } from '@/components/shared/icons';
import {useRouter} from 'next/navigation'
import Button from "@/components/shared/Button";
import React from "react";
import styled from 'styled-components';
import CreatePortalWrapper from "@/components/shared/CreatePortalWrapper";
import Box from '@/components/shared/Box';
import './InfoPage.css';
import Tab from '@/components/shared/Tab';
import { TabContextProvider } from '@/components/shared/TabContext';
import TabList from '@/components/shared/TabList';
import TabPanel from '@/components/shared/TabPanel';
import useFirebaseAuth from "@/components/featured/prikhody/useFirebaseAuth";
import {getDatabase, ref} from "firebase/database";
import {useList} from "react-firebase-hooks/database";
import NPPlaceMarker from "@/components/featured/prikhody/NPPlaceMarker";
import SendArchivesData from "@/components/featured/prikhody/SendArchivesData";
import useMarkersBounds from "@/components/featured/prikhody/useMarkersBounds";
import BoundsToMapItems from "@/components/featured/prikhody/BoundsToMapItems";
import DataTable from "@/components/featured/prikhody/DataTable";

const StyledBoxWithTypography = styled.div`
    width: 100%;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

const InfoPage = ({archives, prikhod, digited, rejected}: any) => {
    const [objectID, title, pTitle, pType, lat, lng, src, atd] = prikhod;
    const router = useRouter();
    const app = useFirebaseAuth();
    const [snapshots, loading, error] = useList(ref(getDatabase(app), `prikhods/${objectID}`));
    const [show, setShow] = React.useState<boolean>(true);
    const [value, setValue] = React.useState<number>(1);
    const [currentDescriptionItem, setCurrentDescriptionItem] = React.useState<any>();
    const [currentPrikhodNPs, setCurrentPrikhodNPs] = React.useState<any>([]);
    const [currentNotFoundPrikhodNPs, setCurrentNotFoundPrikhodNPs] = React.useState<any>([]);

    React.useEffect(() => {
        const found: Array<any> = [];
        const notFound: Array<any> = [];
        currentDescriptionItem?.nps?.map((value: any) => {
            if (value.coords?.length) {
                found.push(value);
            } else {
                notFound.push(value);
            }
            return value;
        });
        setCurrentNotFoundPrikhodNPs(notFound);
        setCurrentPrikhodNPs(found);

    }, [currentDescriptionItem]);

    React.useEffect(() => {
        const vvv = snapshots?.reduce((previousValue: any, currentValue: any) => {
            previousValue[currentValue.key] = currentValue.val();
            return previousValue;
        }, {});
        setCurrentDescriptionItem(vvv);
    }, [snapshots]);

    const markersBounds = useMarkersBounds(currentPrikhodNPs);

    const handleChange = (event: React.SyntheticEvent, newValue: string | number) => {
        setValue(newValue as number);
    };
    const goBack = () => {
        if (history.length > 2) {
            router.back();
        } else {
            router.push('/prikhody')
        }
    };

    return <>
        <CreatePortalWrapper id="slide-panel-info">
            <Box >
                <Button
                    sx={{zIndex: 400, backgroundColor: '#fff'}}
                    variant="outlined"
                    onClick={() => setShow(true)}
                >Информация о приходе</Button>
                <IconButton ariaLabel="delete" onClick={goBack} sx={{zIndex: 400, backgroundColor: '#fff'}}>
                    <CloseIcon/>
                </IconButton>
            </Box>
            {
                show ? <>
                    <Drawer open={true} anchor="bottom" sx={{height: '100vh'}}>
                        <StyledBoxWithTypography>
                            <TabContextProvider value={value} onChange={handleChange}>
                                <Box sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)', backgroundColor: '#fff' }}>
                                    <IconButton className="close-button-card" ariaLabel="delete" onClick={() => setShow(false)}>
                                        <CloseIcon/>
                                    </IconButton>
                                    <TabList
                                        onChange={handleChange}
                                        variant="scrollable"
                                        scrollButtons={true}
                                        visibleScrollbar={false}
                                        aria-label="lab API tabs example"
                                    >
                                        <Tab label="Сохранность документов" value={1} />
                                        <Tab label="Список населенных пунктов" value={2} />
                                    </TabList>
                                </Box>
                                <TabPanel value={1}>
                                    <SendArchivesData objectID={objectID} />
                                    <DataTable digited={digited} rejected={rejected} data={archives.map((aRow: Array<any>, index: number) => {
                                        const [year, type, short, fod, link, full, pages, note] = aRow;
                                        const [fond, opis, delo] = fod.split('-');
                                        return ({year, type, short, fod, link, full, fond, opis, delo, pages, note, id: index});
                                    })} />
                                </TabPanel>
                                <TabPanel value={2}>
                                    <ol>
                                        {[...currentNotFoundPrikhodNPs, ...currentPrikhodNPs].map((hit: any, index: number) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <li dangerouslySetInnerHTML={{__html: hit.title}} />
                                                </React.Fragment>
                                            )
                                        })}
                                    </ol>
                                    <div>
                                        {JSON.stringify(error)}
                                    </div>
                                    <div>
                                        {loading}
                                    </div>
                                </TabPanel>
                            </TabContextProvider>
                        </StyledBoxWithTypography>
                    </Drawer>
                </> : <></>
            }

        </CreatePortalWrapper>
        <BoundsToMapItems
            key="BoundsToMapItems"
            bounds={markersBounds}
            callback={() => {}}
        />
        {
            currentPrikhodNPs?.map((np: any) => {
                if (~np.title.toLowerCase().indexOf(pTitle.toLowerCase())) {
                    return <></>
                }
                return <NPPlaceMarker key={np.objectID}
                                      hit={np}
                                      color={+src ? !!~title.toLowerCase().indexOf('церковь') ? 'red' : 'blue' : 'black'} />
            })
        }
    </>
};
export default InfoPage;
