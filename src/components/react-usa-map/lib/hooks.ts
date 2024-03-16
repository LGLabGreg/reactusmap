import { useState, type RefObject, useEffect } from 'react';

const originalDimensions = {
  width: 930,
  height: 590,
};

interface MousePosition {
  x: number;
  y: number;
}

const useMousePosition = (divRef: RefObject<HTMLDivElement>): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const parentRect = divRef.current?.getBoundingClientRect();
      if (!parentRect) return;

      const ratio = originalDimensions.width / parentRect.width;

      const x = e.clientX - parentRect.left;
      const y = e.clientY - parentRect.top;
      setMousePosition({ x: Math.round(x * ratio), y: Math.round(y * ratio) });
    };

    const parentElement = divRef.current;
    if (parentElement) {
      parentElement.addEventListener('mousemove', updateMousePosition);
    }

    return () => {
      if (parentElement) {
        parentElement.removeEventListener('mousemove', updateMousePosition);
      }
    };
  }, [divRef]);

  return mousePosition;
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    setIsMobile(mobileRegex.test(userAgent));
  }, []);

  return isMobile;
};

export { useMousePosition, useIsMobile };
