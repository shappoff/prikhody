'use client';

import {LeafletContext, createLeafletContext} from '@react-leaflet/core';
import {
    Map as LeafletMap,
    type FitBoundsOptions,
    type LatLngBoundsExpression,
    type MapOptions,
} from 'leaflet';
import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
} from 'react';

export type SafeMapContainerProps = MapOptions & {
    bounds?: LatLngBoundsExpression;
    boundsOptions?: FitBoundsOptions;
    children?: ReactNode;
    className?: string;
    id?: string;
    placeholder?: ReactNode;
    style?: CSSProperties;
    whenReady?: () => void;
};

type LeafletNode = HTMLDivElement & { _leaflet_id?: number };

/**
 * Creates/destroys the Leaflet map in useEffect (with ref reset on cleanup).
 * Avoids React 19 Strict Mode failures from react-leaflet MapContainer's
 * ref-callback init ("Map container is being reused" / appendChild errors).
 */
const SafeMapContainer = ({
    bounds,
    boundsOptions,
    center,
    children,
    className,
    id,
    placeholder,
    style,
    whenReady,
    zoom,
    ...options
}: SafeMapContainerProps) => {
    const [context, setContext] = useState<ReturnType<typeof createLeafletContext> | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Match MapContainer: init props are frozen after first render
    const [init] = useState(() => ({
        bounds,
        boundsOptions,
        center,
        className,
        id,
        options,
        style,
        whenReady,
        zoom,
    }));

    useEffect(() => {
        const node = containerRef.current as LeafletNode | null;
        if (!node) {
            return;
        }

        delete node._leaflet_id;

        const map = new LeafletMap(node, init.options);

        if (init.center != null && init.zoom != null) {
            map.setView(init.center, init.zoom);
        } else if (init.bounds != null) {
            map.fitBounds(init.bounds, init.boundsOptions);
        }

        if (init.whenReady != null) {
            map.whenReady(init.whenReady);
        }

        setContext(createLeafletContext(map));

        return () => {
            map.remove();
            setContext(null);
        };
    }, [init]);

    return (
        <div
            ref={containerRef}
            id={init.id}
            className={init.className}
            style={init.style}
        >
            {context ? (
                <LeafletContext value={context}>{children}</LeafletContext>
            ) : (
                placeholder ?? null
            )}
        </div>
    );
};

export default SafeMapContainer;
