'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { useAnimate, usePresence } from 'framer-motion';

import Link from 'next/link';

import { navigation } from '@/lib/config';

type NavProps = {
  id: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const Nav = ({ id, setOpen }: NavProps) => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await animate(scope.current, { opacity: 1 });
      };
      enterAnimation();
    } else {
      const exitAnimation = async () => {
        await animate(scope.current, { opacity: 0 });
        safeToRemove();
      };

      exitAnimation();
    }
  }, [isPresent, safeToRemove, scope, animate]);

  return (
    <nav
      className="fixed top-mainnav left-0 right-0 bottom-0 bg-white opacity-0"
      id={id}
      ref={scope}
    >
      <ul className="flex flex-1 flex-col overflow-y-auto">
        {navigation.map((item) => {
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-[20px] py-[20px] border-b font-medium text-lg"
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
