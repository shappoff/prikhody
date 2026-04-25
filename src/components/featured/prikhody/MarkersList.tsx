'use client'

import { memo, useMemo } from "react";
import PrikhodPlaceMarker from "@/components/featured/prikhody/PrikhodPlaceMarker";
import { useRouter } from 'next/navigation'

import Chip from '@mui/material/Chip';
import InfoIcon from '@mui/icons-material/Info';

const EMPTY_MARKERS: any[] = [];

const Markers = ({items, markerLabel}: any) => {
    const isDev = useMemo(() => !!~location.search.indexOf('debug'), []);
    const router = useRouter();
    const safeItems = Array.isArray(items) ? items : EMPTY_MARKERS;
    const markers = useMemo(() => safeItems.filter((hit: any) => {
        const [, , , , lat, lng] = hit;
        return !!lat && !!lng;
    }), [safeItems]);

    return markers.map((hit: any) => {
        const [objectID, title, pTitle, pType, lat, lng, src, atd] = hit;

        return <PrikhodPlaceMarker
            key={objectID}
            hit={hit}
            isMobile={true}
            isDev={isDev}
            markerLabel={markerLabel}
        >
            <Chip icon={<InfoIcon />}
                  label={<small>Подробнее</small>}
                  onClick={() => router.push(`/p/${objectID}`)}
                  size="small"
            />
        </PrikhodPlaceMarker>;
    });
};

export default memo(Markers);
