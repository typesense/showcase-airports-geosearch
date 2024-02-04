import { useEffect, useState } from 'react';
import {
  useGeoSearch,
  useRange,
  useRefinementList,
  useSearchBox,
  useToggleRefinement,
} from 'react-instantsearch';

import {
  Checkbox,
  FieldLabel,
  Popover,
  RangeSlider,
  RangeSliderThumb,
  Switch,
} from '@/components';

export function SearchControl() {
  const { clearMapRefinement } = useGeoSearch();
  const { query, refine } = useSearchBox();

  return (
    <label className="w-full relative block">
      <FieldLabel>Search</FieldLabel>
      <input
        type="search"
        className="px-4 sm:px-6 pt-7 pb-3 w-full focus:outline-none"
        placeholder="Search by airport name, IATA code, GPS code..."
        title="Search by airport name, IATA code, GPS code..."
        defaultValue={query}
        onChange={(e) => {
          const value = e.target.value;
          // Disable map refinement when user has performed a search
          clearMapRefinement();
          refine(value);
        }}
      />
    </label>
  );
}

export function AirportTypeControl() {
  const { items: types, refine } = useRefinementList({
    attribute: 'type',
    sortBy: ['count'],
  });

  const selectedTypes = types
    .filter((type) => type.isRefined)
    .map((type) => type.value.replace(/_/g, ' '));
  const btnText = selectedTypes.length ? selectedTypes.join(', ') : 'All';

  return (
    <div className="w-full overflow-hidden">
      <Popover
        label="Airport type"
        btnText={
          <span className="inline-block capitalize max-w-[90%] text-ellipsis whitespace-nowrap overflow-x-hidden">
            {btnText}
          </span>
        }
        isDisabled={types.length === 1}
      >
        {types.map((type) => (
          <Checkbox
            key={type.value}
            label={
              <span className="capitalize">
                {type.label.replace(/_/g, ' ')}
              </span>
            }
            tag={type.count.toLocaleString()}
            checked={type.isRefined}
            onCheckedChange={() => refine(type.value)}
          />
        ))}
      </Popover>
    </div>
  );
}

export function RunwaysControl() {
  const { items: types, refine } = useRefinementList({
    attribute: 'num_runways',
    sortBy: ['count'],
  });

  const selectedTypes = types
    .filter((type) => type.isRefined)
    .map((type) => type.value);
  const btnText = selectedTypes.length ? selectedTypes.join(', ') : 'All';

  return (
    <div className="w-full overflow-hidden">
      <Popover
        label="Runways"
        btnText={
          <span className="inline-block max-w-[90%] text-ellipsis whitespace-nowrap overflow-x-hidden">
            {btnText}
          </span>
        }
        isDisabled={types.length === 1}
      >
        {types.map((type) => (
          <Checkbox
            key={type.value}
            label={type.label}
            tag={type.count.toLocaleString()}
            checked={type.isRefined}
            onCheckedChange={() => refine(type.value)}
          />
        ))}
      </Popover>
    </div>
  );
}

export function ElevationControl() {
  const { range, start, refine } = useRange({
    attribute: 'elevation',
  });
  const { min, max } = range;
  const [value, setValue] = useState({ min, max });
  const isDisabled = min === max;

  useEffect(() => {
    setValue({
      min: start[0] === -Infinity ? min : start[0],
      max: start[1] === Infinity ? max : start[1],
    });
  }, [min, max, start, setValue]);

  return (
    <div
      className={`relative block px-4 sm:px-6 pt-7 pb-3 w-full ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <FieldLabel>Elevation</FieldLabel>

      <div className="mt-1 flex items-center gap-4">
        <span className="uppercase text-xs tracking-wider font-medium">
          {value.min?.toLocaleString()}ft
        </span>
        <RangeSlider
          value={[value.min ?? 0, value.max ?? 0]}
          min={range.min ?? 0}
          max={range.max ?? 0}
          step={1}
          disabled={isDisabled}
          onValueChange={(range) => setValue({ min: range[0], max: range[1] })}
          onValueCommit={(range) => refine(range as [number, number])}
        >
          <RangeSliderThumb aria-label="Elevation from" />
          <RangeSliderThumb aria-label="Elevation to" />
        </RangeSlider>
        <span className="uppercase text-xs tracking-wider font-medium">
          {value.max?.toLocaleString()}ft
        </span>
      </div>
    </div>
  );
}

export function ScheduledServiceControl() {
  const { refine, value } = useToggleRefinement({
    attribute: 'scheduled_service',
    on: true,
  });

  return (
    <label className="relative block px-4 sm:px-6 pt-7 pb-3 flex-shrink-0 w-36 sm:w-40">
      <FieldLabel>Scheduled service</FieldLabel>

      <Switch
        checked={value.isRefined}
        onCheckedChange={(checked) => refine({ isRefined: !checked })}
      />
    </label>
  );
}
