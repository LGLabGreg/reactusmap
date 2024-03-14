import { useEffect, useRef, useState } from 'react';

import { navigation } from './config';

const useSectionObserver = (): [string | null] => {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries.length && entries[0].isIntersecting) {
          setActiveSectionId(`#${entries[0].target.id}`);
        }
      },
      { threshold: 1, rootMargin: '90px' }
    );

    navigation.forEach(({ href }) => {
      const section = document.querySelector(href);
      if (section) {
        observer.current!.observe(section);
      }
    });
    return () => {
      observer.current!.disconnect();
    };
  }, []);

  return [activeSectionId];
};

export { useSectionObserver };
