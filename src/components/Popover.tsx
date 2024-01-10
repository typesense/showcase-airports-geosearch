import { ChevronDownIcon } from '@radix-ui/react-icons';
import { ReactNode, useState } from 'react';
import FieldLabel from './FieldLabel';
import { Content, Root, Trigger } from '@radix-ui/react-popover';

interface PopoverProps {
  children: ReactNode;
  label: ReactNode;
}

export default function Popover({ children, label }: PopoverProps) {
  const [open, setOpen] = useState(false);
  return (
    <Root open={open} onOpenChange={setOpen}>
      <Trigger asChild>
        <button className="px-6 pt-7 pb-3 w-full relative block text-left">
          <FieldLabel>{label}</FieldLabel>
          Large Airport
          <div
            className={`absolute right-6 top-1/2 -translate-y-1/2 transition-transform ${
              open ? 'rotate-180' : 'rotate-0'
            }`}
          >
            <ChevronDownIcon className="w-5 h-5" />
          </div>
        </button>
      </Trigger>
      <Content align="start" forceMount>
        <div
          className={`bg-white w-[var(--radix-popover-trigger-width)] px-6 pt-3 pb-5 flex flex-col gap-5 origin-top rounded-b-sm transition ${
            open ? 'scale-y-100 opacity-1' : 'scale-y-0 opacity-0'
          }`}
        >
          {children}
        </div>
      </Content>
    </Root>
  );
}
