import { CaretDown } from '@phosphor-icons/react';
import { Content, Portal, Root, Trigger } from '@radix-ui/react-popover';
import { AnimatePresence, motion } from 'framer-motion';
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
          className="px-4 md:px-6 pt-7 pb-3 w-full relative block text-left disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isDisabled}
        >
          <FieldLabel>{label}</FieldLabel>
          {btnText}
          <div
            className={`absolute right-6 top-1/2 -translate-y-1/2 transition-transform ${
              open ? 'rotate-180' : 'rotate-0'
            }`}
          >
            <CaretDown className="w-5 h-5" weight="bold" />
          </div>
        </button>
      </Trigger>
      <Portal forceMount>
        <div className="relative z-10">
          <Content align="start">
            <AnimatePresence>
              {open && (
                <motion.div
                  className="bg-white w-[var(--radix-popover-trigger-width)] px-4 md:px-6 pt-3 pb-5 flex flex-col gap-5 origin-top rounded-b-sm shadow"
                  initial={{
                    scaleY: 0,
                    opacity: 0,
                  }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{ scaleY: 0, opacity: 0 }}
                >
                  {children}
                </motion.div>
              )}
            </AnimatePresence>
          </Content>
        </div>
      </Portal>
    </Root>
  );
}
