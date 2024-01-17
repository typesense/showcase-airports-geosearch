import * as Popover from '@radix-ui/react-popover';

interface AirportMarkerProps {
  name: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function AirportMarker({
  name,
  isOpen,
  onToggle,
}: AirportMarkerProps) {
  return (
    <Popover.Root open={isOpen}>
      <Popover.Trigger onClick={onToggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 -rotate-90 fill-white"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
        </svg>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={4}
          side="top"
          className="bg-white p-6 rounded-md"
          updatePositionStrategy="always"
        >
          <Popover.Arrow className="fill-white" />
          {name}
          {/* TODO: Render all airport info here */}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
