import React, { FC } from 'react';

import { Button } from './button';

type TabsProps = {
  tabs: {
    label: string;
    index: number;
    Component: FC<{ index: number }>;
  }[];
  selectedTab: number;
  onClick: (index: number) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
};

const Tabs: FC<TabsProps> = ({
  className = 'tabs-component',
  tabs = [],
  selectedTab = 0,
  onClick,
  orientation = 'horizontal',
}) => {
  const Panel = tabs && tabs.find((tab) => tab.index === selectedTab);

  return (
    <div className={orientation === 'vertical' ? className + ' vertical' : className}>
      <div
        role="tablist"
        aria-orientation={orientation}
        className="flex justify-center items-center"
      >
        {tabs.map((tab) => (
          <Button
            variant={selectedTab === tab.index ? 'tabactive' : 'tab'}
            onClick={() => onClick(tab.index)}
            key={tab.index}
            role="tab"
            aria-selected={selectedTab === tab.index}
            aria-controls={`tabpanel-${tab.index}`}
            tabIndex={selectedTab === tab.index ? 0 : -1}
            id={`btn-${tab.index}`}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div role="tabpanel" aria-labelledby={`btn-${selectedTab}`} id={`tabpanel-${selectedTab}`}>
        {Panel && <Panel.Component index={selectedTab} />}
      </div>
    </div>
  );
};
export default Tabs;
