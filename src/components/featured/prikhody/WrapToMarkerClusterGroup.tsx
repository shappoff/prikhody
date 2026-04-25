'use client'

import { memo, useMemo } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";

import BoundsToMapItems from "@/components/featured/prikhody/BoundsToMapItems";
import Markers from "@/components/featured/prikhody/MarkersList";
import useMarkersBounds from "@/components/featured/prikhody/useMarkersBounds";

type MarkerItem =
    | {
    coords?: [number, number];
    _geoloc?: {
        lat?: number;
        lng?: number;
    };
}
    | [unknown, unknown, unknown, unknown, number?, number?];

interface WrapToMarkerClusterGroupProps {
    items: MarkerItem[];
    maxClusterRadius?: number;
    enable?: boolean;
    bounds?: boolean;
    markerLabel?: string;
}

const EMPTY_ITEMS: MarkerItem[] = [];
const noop = () => {};

function WrapToMarkerClusterGroup({
    items,
    maxClusterRadius = 150,
    enable = true,
    bounds = false,
    markerLabel
}: WrapToMarkerClusterGroupProps) {
    const safeItems = useMemo(() => (Array.isArray(items) ? items : EMPTY_ITEMS), [items]);
    const boundsItems = useMemo(() => (bounds ? safeItems : EMPTY_ITEMS), [bounds, safeItems]);
    const markersBounds = useMarkersBounds(boundsItems);

    return (
        <>
            {bounds && <BoundsToMapItems bounds={markersBounds} callback={noop} />}
            {enable ? (
                <MarkerClusterGroup
                    maxClusterRadius={maxClusterRadius}
                    removeOutsideVisibleBounds
                    chunkedLoading
                    showCoverageOnHover={false}
                >
                    <Markers items={safeItems} markerLabel={markerLabel} />
                </MarkerClusterGroup>
            ) : (
                <Markers items={safeItems} markerLabel={markerLabel} />
            )}
        </>
    );
}

export default memo(WrapToMarkerClusterGroup);
