'use client';

import { ComponentPropsWithoutRef, useId } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

const dialogVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'left',
    },
  }
);

interface DialogOverlayProps extends ComponentPropsWithoutRef<'div'> {
  open: boolean;
}

const DialogOverlay = ({ open, className, ...props }: DialogOverlayProps) => (
  <div
    className={cn(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
    aria-hidden={true}
    data-state={open ? 'open' : 'closed'}
  />
);

interface DialogProps extends ComponentPropsWithoutRef<'div'>, VariantProps<typeof dialogVariants> {
  dialogId: string;
  open: boolean;
}

const Dialog = ({ dialogId, open, className, side, ...props }: DialogProps) => {
  return (
    <>
      <DialogOverlay open={open} />
      <div
        className={cn(dialogVariants({ side }), className)}
        {...props}
        id={dialogId}
        role="dialog"
        aria-describedby="radix-:r1i:"
        aria-labelledby="radix-:r1h:"
        data-state={open ? 'open' : 'closed'}
      />
    </>
  );
};

export { Dialog };
