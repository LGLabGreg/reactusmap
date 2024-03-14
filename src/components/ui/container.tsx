import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef } from 'react';

export interface ContainerProps extends ComponentPropsWithRef<'div'> {
  asChild?: boolean;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return <Comp className={cn('container', className)} ref={ref} {...props} />;
  }
);

Container.displayName = 'Container';

export { Container };
