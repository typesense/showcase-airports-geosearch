import {
  CheckboxProps as BaseCheckboxProps,
  Indicator,
  Root,
} from '@radix-ui/react-checkbox';
import { Check } from '@phosphor-icons/react';
import { ReactNode } from 'react';

interface CheckboxProps extends Omit<BaseCheckboxProps, 'children'> {
  label: ReactNode;
  tag?: string;
}

export default function Checkbox({ label, tag, ...props }: CheckboxProps) {
  return (
    <label className="flex items-center gap-3">
      <Root
        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded"
        {...props}
      >
        <Indicator>
          <Check className="w-4 h-4" weight="bold" />
        </Indicator>
      </Root>

      {label}
      {!!tag && (
        <span className="ml-auto text-xs bg-gray-100 py-1 px-2 rounded-sm">
          {tag}
        </span>
      )}
    </label>
  );
}
