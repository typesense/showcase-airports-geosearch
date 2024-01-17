import { Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Content, Root, Trigger } from '@radix-ui/react-popover';
import { ReactNode, useState } from 'react';
import FieldLabel from './FieldLabel';

interface PopoverProps {
  children: ReactNode;
  label: ReactNode;
  isDisabled?: boolean;
  btnText: ReactNode;
}

export default function Popover({
  children,
  btnText,
  label,
  isDisabled,
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  return (
    <Root open={open} onOpenChange={setOpen}>
      <Trigger asChild>
        <button
          className="px-6 pt-7 pb-3 w-full relative block text-left disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isDisabled}
        >
          <FieldLabel>{label}</FieldLabel>
          {btnText}
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
        <Transition
          show={open}
          className="origin-top transition"
          enterFrom="scale-y-0 opacity-0"
          enterTo="scale-y-100 opacity-1"
          leaveFrom="scale-y-100 opacity-1"
          leaveTo="scale-y-0 opacity-0"
        >
          <div className="bg-white w-[var(--radix-popover-trigger-width)] px-6 pt-3 pb-5 flex flex-col gap-5 origin-top rounded-b-sm">
            {children}
          </div>
        </Transition>
      </Content>
    </Root>
  );
}
