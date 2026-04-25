'use client'

import PrikhodPlaceMarker from "@/components/featured/prikhody/PrikhodPlaceMarker";
import { useRouter } from 'next/navigation'

import Chip from '@mui/material/Chip';
import InfoIcon from '@mui/icons-material/Info';

const Markers = ({items, markerLabel}: any) => {
    const isDev = !!~location.search.indexOf('debug');
    const router = useRouter();

    return items.map((hit: any) => {
        const [objectID, title, pTitle, pType, lat, lng, src, atd] = hit;

        if (!lat || !lng) {
            return null;
        }

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

export default Markers;
