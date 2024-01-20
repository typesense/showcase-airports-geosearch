import { ReactNode } from 'react';

interface FieldLabelProps {
  children: ReactNode;
}

export default function FieldLabel({ children }: FieldLabelProps) {
  return (
    <span className="absolute uppercase text-[10px] tracking-wider font-medium top-2.5 left-4 sm:left-6 text-gray-600">
      {children}
    </span>
  );
}
