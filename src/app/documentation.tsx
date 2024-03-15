'use client';

import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import Tabs from '@/components/ui/tabs';

import GettingStarted from '@/app/_documentation/getting-started';
import Usage from '@/app/_documentation/usage';
import { useState } from 'react';
import Props from './_documentation/props';

type TabsType = {
  label: string;
  index: number;
  Component: React.FC<{}>;
}[];

const tabs: TabsType = [
  {
    label: 'Getting started',
    index: 1,
    Component: GettingStarted,
  },
  {
    label: 'Usage',
    index: 2,
    Component: Usage,
  },
  {
    label: 'Props',
    index: 3,
    Component: Props,
  },
];

const Documentation = () => {
  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);

  return (
    <section id="documentation" className="pt-8 pb-4 px-4">
      <Container className="relative flex flex-col justify-center items-center">
        <Heading level="h2" className="text-center mb-8">
          Documentation
        </Heading>
        <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} className="w-full" />
      </Container>
    </section>
  );
};

export default Documentation;
