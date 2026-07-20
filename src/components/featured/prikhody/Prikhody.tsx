'use client'

import dynamic from "next/dynamic";
import {useMemo, type ReactNode} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type PrikhodyProps = {
    children: ReactNode;
};

const Prikhody = ({children}: PrikhodyProps) => {
    const MapApp = useMemo(() => dynamic(
        () => import('./PrikhodyMapApp'),
        {
            loading: () => <Box sx={{ position: 'absolute', top: '50%', right: '50%' }}>
                <CircularProgress />
            </Box>,
            ssr: false
        }
    ), [])
    return <MapApp key="map-page">{children}</MapApp>;
};

export default Prikhody;
