import { Root, SwitchProps, Thumb } from '@radix-ui/react-switch';

export default function Switch(props: Omit<SwitchProps, 'children'>) {
  return (
    <Root
      className="w-12 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-gray-800 outline-none cursor-default transition-colors"
      style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
      {...props}
    >
      <Thumb className="block w-5 h-5 bg-white rounded-full shadow transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[26px]" />
    </Root>
  );
}
