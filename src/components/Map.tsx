import {
  GoogleMap,
  OverlayView,
  OverlayViewF,
  useGoogleMap,
  useLoadScript,
} from '@react-google-maps/api';
import { useState } from 'react';
import { useGeoSearch, useInstantSearch } from 'react-instantsearch';
import { AnimatePresence, motion } from 'framer-motion';

import { AirportMarker } from '@/components';
import mapStyle from '@/lib/map-style';

function MapResults() {
  const map = useGoogleMap();
  const { results } = useInstantSearch();
  const [markerOpen, setMarkerOpen] = useState<string>();

  return (
    <AnimatePresence>
      {results.hits.map((hit) => (
        <OverlayViewF
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          position={{
            lat: hit.location[0],
            lng: hit.location[1],
          }}
          key={hit.ident}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!map) return;
              map.panTo({ lat: hit.location[0], lng: hit.location[1] });
              map.panBy(0, -100);
            }}
          >
            <AirportMarker
              isOpen={markerOpen === hit.ident}
              onToggle={() =>
                setMarkerOpen(markerOpen === hit.ident ? undefined : hit.ident)
              }
              {...hit}
            />
          </motion.div>
        </OverlayViewF>
      ))}
    </AnimatePresence>
  );
}

export default function Map() {
  const [map, setMap] = useState<google.maps.Map>();
  const { refine } = useGeoSearch();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  });

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {!isLoaded ? (
        <motion.div
          key="loading-map"
          className="flex items-center justify-center w-full h-full"
          exit={{ opacity: 0 }}
        >
          Loading map...
        </motion.div>
      ) : (
        <motion.div
          key="map"
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <GoogleMap
            mapContainerClassName="w-full h-full"
            options={{
              styles: mapStyle,
              streetViewControl: false,
              zoomControl: false,
              fullscreenControl: false,
              mapTypeControl: false,
              draggableCursor: 'grab',
              draggingCursor: 'grabbing',
            }}
            onLoad={(map) => {
              map.setZoom(10);
              map.setCenter({
                lat: -3.745,
                lng: -38.523,
              });
              setMap(map);
            }}
            onIdle={() => {
              const bounds = map?.getBounds();
              const center = map?.getCenter();
              if (!bounds || !center) return;

              refine({
                northEast: {
                  lat: bounds.getNorthEast().lat(),
                  lng: bounds.getNorthEast().lng(),
                },
                southWest: {
                  lat: bounds.getSouthWest().lat(),
                  lng: bounds.getSouthWest().lng(),
                },
              });
            }}
          >
            <MapResults />
          </GoogleMap>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
