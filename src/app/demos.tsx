'use client';

import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import Tabs from '@/components/ui/tabs';

import Simple from '@/examples/simple';
import Advanced from '@/examples/advanced';
import { useState } from 'react';

type TabsType = {
  label: string;
  index: number;
  Component: React.FC<{}>;
}[];

const tabs: TabsType = [
  {
    label: 'Simple',
    index: 1,
    Component: Simple,
  },
  {
    label: 'Advanced',
    index: 2,
    Component: Advanced,
  },
];

const Demos = () => {
  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);

  return (
    <section id="demos" className="pt-8 pb-4 px-4">
      <Container className="relative flex flex-col justify-center items-center">
        <Heading level="h2" className="text-center mb-8">
          Demos
        </Heading>
        <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} className="w-full" />
      </Container>
    </section>
  );
};

export default Demos;
