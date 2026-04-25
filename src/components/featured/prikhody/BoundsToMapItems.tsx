import {useMap} from "react-leaflet";
import { useCallback, useEffect } from "react";
import {LayersControlEvent, LeafletEventHandlerFn} from "leaflet";

const BoundsToMapItems = ({bounds, callback}: any) => {
    const map = useMap();

    useEffect(() => {
        const ms = setTimeout(() => {
            bounds && map.fitBounds(bounds);
        }, 100);
        return ()  => {
            ms && clearTimeout(ms);
        };
    }, [bounds, map]);

    const baselayerchangeHandler: LeafletEventHandlerFn = useCallback((e: LayersControlEvent | any) => {
        callback && callback(e, map);
    }, [callback, map]);

    useEffect(() => {
        map.on("zoomend", baselayerchangeHandler);

        return () => {
            map.off("zoomend", baselayerchangeHandler);
        }
    }, [map, baselayerchangeHandler]);

    return <></>
};

export default BoundsToMapItems;
