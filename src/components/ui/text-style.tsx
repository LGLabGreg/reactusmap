import { type ComponentPropsWithoutRef, forwardRef, Children } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const textStyleVariants = cva('relative whitespace-nowrap', {
  variants: {
    variant: {
      default:
        'before:absolute before:bg-purple-400 before:z-0 before:w-full before:h-full before:rotate-1',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface TextStyleProps
  extends ComponentPropsWithoutRef<'span'>,
    VariantProps<typeof textStyleVariants> {}

const TextStyle = forwardRef<HTMLButtonElement, TextStyleProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <span className={cn(textStyleVariants({ variant, className }))} ref={ref} {...props}>
        <span className="relative z-[1]">{children}</span>
      </span>
    );
  }
);
TextStyle.displayName = 'TextStyle';

export { TextStyle, textStyleVariants };
