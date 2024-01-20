import { Airplane, CaretDown } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

interface AirportMarkerProps {
  name: string;
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
export default function AirportMarker({
  name,
  isOpen,
  onToggle,
}: AirportMarkerProps) {
  return (
    /**
     * This component is a Popover but does not use @radix-ui/react-popover because it
     * has some flickering issue when used as a map overlay
     */
    <div className="relative text-base">
      <button onClick={onToggle}>
        <Airplane
          className="w-6 h-6 [&_path:first-child]:fill-white [&_path:first-child]:opacity-100"
          weight="duotone"
        />
      </button>
      {isOpen && (
        <motion.div
          className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 w-fit-content bg-white p-6 rounded-md drop-shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {name}
          {/* TODO: Render all airport info here */}
          <Arrow />
        </motion.div>
      )}
    </div>
  );
}
