import { useMemo } from "react";
import {latLngBounds} from 'leaflet'

// Define type for mapHits
interface MapHit {
    coords?: [number, number];
    length?: number;
    _geoloc?: {
        lat?: number;
        lng?: number;
    };
    [index: number]: any;
    [key: string]: any;
}

const useMarkersBounds = (mapHits: Array<MapHit>) => {
    const currentBounds = useMemo(() => {
        if (!mapHits?.length) {
            return undefined;
        }
        const bounds = latLngBounds([]);
        mapHits.forEach((item: MapHit) => {
            if (item?.coords?.length) {
                const [lat, lng] = item.coords;
                if (!lat || !lng) {
                    return;
                }
                bounds.extend([lat, lng]);
            }
            if (item?._geoloc?.lat && item?._geoloc?.lng) {
                const {lat, lng} = item._geoloc;
                if (!lat || !lng) {
                    return;
                }
                bounds.extend([lat, lng]);
            }
            if (Array.isArray(item) && item.length) {
                const lat = item[4];
                const lng = item[5];
                if (!lat || !lng) {
                    return;
                }
                bounds.extend([lat, lng]);
            }
        });
        return bounds;
    }, [mapHits]);

    return currentBounds;
};

export default useMarkersBounds;
