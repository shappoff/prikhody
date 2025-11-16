'use client'

import dynamic from "next/dynamic";
import React from "react";
import CircularProgress from '@/components/shared/CircularProgress';
import Box from '@/components/shared/Box';

const Prikhody = ({children, items}: any) => {
    const MapApp = React.useMemo(() => dynamic(
        () => import('./PrikhodyMapApp'),
        {
            loading: () => <Box sx={{ position: 'absolute', top: '50%', right: '50%' }}>
                <CircularProgress />
            </Box>,
            ssr: false
        }
    ), [])
    return <MapApp key="map-page" items={items}>{children}</MapApp>;
};

export default Prikhody;
