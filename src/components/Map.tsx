import {
  GoogleMap,
  OverlayView,
  OverlayViewF,
  useGoogleMap,
  useLoadScript,
} from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import {
  useGeoSearch,
  useInstantSearch,
  useSearchBox,
} from 'react-instantsearch';
import { AnimatePresence, motion } from 'framer-motion';

import { AirportMarker } from '@/components';
import mapStyle from '@/lib/map-style';

function MapResults() {
  const map = useGoogleMap();
  const { results } = useInstantSearch();
  const [markerOpen, setMarkerOpen] = useState<string>();
  const { query } = useSearchBox();

  const panMapToHit = (hit: any) => {
    if (!map) return;
    map.panTo({ lat: hit.location[0], lng: hit.location[1] });
    map.panBy(0, -150);
  };

  /**
   * When user has performed a search using search-box and some results were found,
   * pan the map to the first result and open the result.
   */
  useEffect(() => {
    if (!results.hits.length || !query || !map) return;
    const [hit] = results.hits;

    panMapToHit(hit);
    map.setZoom(10);
    setMarkerOpen(hit.ident);
  }, [results, query]);

  // When search-box query is cleared, close whatever result was open
  useEffect(() => {
    if (!query) {
      setMarkerOpen('');
    }
  }, [query]);

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
            onClick={() => panMapToHit(hit)}
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
  const { refine, clearMapRefinement } = useGeoSearch();
  const { query } = useSearchBox();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  });

  const performMapRefinement = () => {
    if (!map || query) return;
    const bounds = map.getBounds();
    const center = map.getCenter();
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
  };

  // When search-box query is cleared, perform map refinement
  useEffect(() => {
    if (!query) {
      performMapRefinement();
    }
  }, [query]);

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
            onIdle={performMapRefinement}
          >
            <MapResults />
          </GoogleMap>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
