'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

import { Navbar, NavbarCenter, NavbarLeft, NavbarRight } from '@/components/ui/navbar';
import { Button } from '@/components/ui/button';
import MobileNav from './mobile-nav';

import { navigation } from '@/lib/config';
import { useSectionObserver } from '@/lib/hooks';

import logo from '@/assets/logo.png';
import { Container } from './ui/container';

const MainHeader = () => {
  const [activeSectionId] = useSectionObserver();

  return (
    <Navbar className="fixed inset-0 w-full z-50" el={'header'}>
      <Container className="flex">
        <NavbarLeft>
          <MobileNav />
          <Link href="/">
            <Image src={logo} height={30} alt="logo" />
          </Link>
        </NavbarLeft>
        <NavbarCenter className="hidden lg:flex">
          <ul className="flex gap-[20px]">
            {navigation.map((item) => {
              return (
                <li key={item.label}>
                  <Button variant={activeSectionId === item.href ? 'active' : 'ghost'} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                </li>
              );
            })}
          </ul>
        </NavbarCenter>
        <NavbarRight>
          <Button className="mr-1" variant={'link'}>
            Login
          </Button>
          <Button className="mr-[10px]">Register</Button>
          <Button size={'icon'} variant={'outline'}>
            <ShoppingCart />
          </Button>
        </NavbarRight>
      </Container>
    </Navbar>
  );
};

export default MainHeader;
