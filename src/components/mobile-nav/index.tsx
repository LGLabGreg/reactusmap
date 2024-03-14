'use client';

import React, { useId, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Nav from './nav';
import { MenuToggle } from './menu-toggle';

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="lg:hidden mr-2">
      <MenuToggle onToggle={() => setOpen(!open)} open={open} />
      <AnimatePresence>{open && <Nav id={id} setOpen={setOpen} />}</AnimatePresence>
    </div>
  );
};

export default MobileNav;
