import { ComponentPropsWithoutRef, ElementType } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const navbarVariants = cva('flex justify-between items-center', {
  variants: {
    variant: {
      default: '',
    },
    size: {
      default: 'h-mainnav px-[20px] lg:px-[30px]',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface NavbarProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof navbarVariants> {
  el?: ElementType;
}

const Navbar = ({ className, el = 'div', variant, size, ...props }: NavbarProps) => {
  const Comp = el;
  return <Comp className={cn(navbarVariants({ variant, size, className }))} {...props} />;
};
Navbar.displayName = 'Navbar';

const NavbarLeft = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => {
  return <div className={cn('flex flex-1 items-center', className)} {...props} />;
};
NavbarLeft.displayName = 'NavbarLeft';

const NavbarCenter = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => {
  return <div className={cn('flex flex-1 items-center justify-center', className)} {...props} />;
};
NavbarCenter.displayName = 'NavbarCenter';

const NavbarRight = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => {
  return <div className={cn('flex flex-1 items-center justify-end', className)} {...props} />;
};
NavbarRight.displayName = 'NavbarRight';

export { Navbar, NavbarLeft, NavbarCenter, NavbarRight, navbarVariants };
