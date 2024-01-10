import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import mapStyle from '@/lib/map-style';

function Map() {
  return (
    <GoogleMap
      mapContainerClassName="w-full h-full"
      zoom={14}
      center={{
        lat: -3.745,
        lng: -38.523,
      }}
      options={{
        styles: mapStyle,
        streetViewControl: false,
        zoomControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        draggableCursor: 'grab',
        draggingCursor: 'grabbing',
      }}
    ></GoogleMap>
  );
}

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="w-screen h-screen">
      <Map />
    </div>
  );
}
