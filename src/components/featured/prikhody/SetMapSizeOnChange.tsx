import {useMap} from "react-leaflet";
import { useEffect } from "react";

// Define type for SetMapSizeOnChange props
interface SetMapSizeOnChangeProps {
    top: string;
    height: string;
}

const SetMapSizeOnChange = ({ top, height }: SetMapSizeOnChangeProps) => {
    const map = useMap();
    useEffect(() => {
        if (!map) {
            return;
        }

        const mapContainer = map.getContainer();
        mapContainer.style.top = top;
        mapContainer.style.height = height;
        mapContainer.style.position = 'relative';
        map.invalidateSize();
    }, [map, top, height]);

    return <div/>;
}

export default SetMapSizeOnChange;