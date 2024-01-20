import {
  Root,
  Range,
  SliderProps,
  SliderThumbProps,
  Thumb,
  Track,
} from '@radix-ui/react-slider';

export function RangeSlider({ children, ...props }: SliderProps) {
  return (
    <Root
      className="relative flex items-center select-none touch-none w-full h-5"
      {...props}
    >
      <Track className="bg-gray-200 relative grow rounded-full h-[3px]">
        <Range className="absolute bg-gray-800 rounded-full h-full" />
      </Track>
      {children}
    </Root>
  );
}

export function RangeSliderThumb(props: SliderThumbProps) {
  return (
    <Thumb
      className="block w-5 h-5 bg-white border-2 border-gray-800 rounded-full"
      {...props}
    />
  );
}
