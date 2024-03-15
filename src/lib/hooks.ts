import { useEffect, useRef, useState } from 'react';

import { navigation } from './config';

const useSectionObserver = (): string | null => {
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

  return activeSectionId;
};

const useScrollProps = () => {
  const [scrollProps, setScrollProps] = useState({ direction: 'up', position: 0 });

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollProps = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollProps({ direction: scrollY > lastScrollY ? 'down' : 'up', position: scrollY });
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProps);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollProps]);

  return scrollProps;
};

export { useSectionObserver, useScrollProps };
