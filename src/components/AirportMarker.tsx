import {
  Airplane,
  ArrowSquareOut,
  Balloon,
  CaretDown,
  X,
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

import { useWikipediaThumbnailUrl } from '@/lib/hooks';
import { AirplaneOff, Helicopter, SeaBase } from './icons';

interface AirportMarkerProps {
  name: string;
  elevation: number;
  gps_code: string;
  iata_code: string;
  type: string;
  wikipedia_link: string;
  home_link: string;
  num_runways: number;
  scheduled_service: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

function Arrow() {
  return (
    <span className="absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2">
      <CaretDown weight="fill" className="w-6 h-6 fill-white" />
    </span>
  );
}

function AirportThumbnail({
  name,
  wikipedia_link,
}: Pick<AirportMarkerProps, 'name' | 'wikipedia_link'>) {
  const thumbnailUrl = useWikipediaThumbnailUrl(wikipedia_link);
  return (
    thumbnailUrl && (
      <img
        src={thumbnailUrl}
        alt={name}
        className="w-full max-h-32 object-cover rounded-t-md [mask-image:linear-gradient(to_bottom,white_50%,transparent)]"
      />
    )
  );
}

function Property({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt>{label}</dt>
      <dd className="px-2 py-0.5 bg-gray-100 rounded-sm font-medium">
        {value}
      </dd>
    </div>
  );
}

export default function AirportMarker({
  name,
  elevation,
  gps_code,
  iata_code,
  type,
  wikipedia_link,
  home_link,
  num_runways,
  scheduled_service,
  isOpen,
  onToggle,
}: AirportMarkerProps) {
  return (
    /**
     * This component is a Popover but does not use @radix-ui/react-popover because it
     * has some flickering issue when used as a map overlay
     */
    <div className="relative text-base font-sans">
      <button onClick={onToggle}>
        {type === 'balloonport' ? (
          <Balloon
            className="w-6 h-6 [&_path:first-child]:fill-white [&_path:first-child]:opacity-100"
            weight="duotone"
          />
        ) : type === 'heliport' ? (
          <Helicopter
            className="w-7 h-7 stroke-black fill-white"
            strokeWidth="1.2"
          />
        ) : type === 'closed' ? (
          <AirplaneOff className="w-6 h-6" />
        ) : type === 'seaplane_base' ? (
          <SeaBase className="w-6 h-6" />
        ) : (
          <Airplane
            className="w-6 h-6 [&_path:first-child]:fill-white [&_path:first-child]:opacity-100"
            weight="duotone"
          />
        )}
      </button>
      {isOpen && (
        <motion.div
          className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 w-64 bg-white rounded-md drop-shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            className="p-1.5 flex items-center justify-center absolute top-1 right-1.5 z-10 bg-white/40 rounded-sm backdrop-blur-md"
            onClick={onToggle}
          >
            <X weight="bold" className="w-3 h-3" />
          </button>

          <AirportThumbnail name={name} wikipedia_link={wikipedia_link} />

          <div className="px-5 py-3">
            <h3 className="text-lg font-serif leading-snug mr-4">{name}</h3>

            <dl className="mt-4 flex flex-col gap-2 text-sm">
              <Property
                label="Elevation"
                value={`${elevation.toLocaleString()}ft`}
              />
              {gps_code && <Property label="GPS code" value={gps_code} />}
              {iata_code && <Property label="IATA code" value={iata_code} />}
              <Property
                label="Airport type"
                value={
                  <span className="capitalize">{type.replace(/_/g, ' ')}</span>
                }
              />
              {!!num_runways && (
                <Property label="Runways" value={num_runways} />
              )}
              <Property
                label="Scheduled service"
                value={scheduled_service ? 'Yes' : 'No'}
              />
            </dl>
          </div>

          {(!!home_link || !!wikipedia_link) && (
            <div className="flex gap-1 p-3">
              {home_link && (
                <a
                  href={home_link}
                  target="_blank"
                  className="btn-primary w-full py-2 text-sm"
                >
                  Home <ArrowSquareOut weight="bold" className="-mt-0.5" />
                </a>
              )}

              {wikipedia_link && (
                <a
                  href={wikipedia_link}
                  target="_blank"
                  className="btn-secondary w-full py-2 text-sm"
                >
                  Wikipedia <ArrowSquareOut weight="bold" className="-mt-0.5" />
                </a>
              )}
            </div>
          )}

          <Arrow />
        </motion.div>
      )}
    </div>
  );
}
