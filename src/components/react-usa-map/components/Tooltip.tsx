import { type ReactNode, useEffect, useRef, type TouchEvent } from 'react';
import { useIsMobile } from '../lib/hooks';

const defaultTooltipState = { visible: false };

type TooltipProps = {
  visible?: boolean;
  content?: ReactNode;
  event?: TouchEvent;
};

const Tooltip = (props: TooltipProps) => {
  const { visible, content } = props;
  let top, left, windowHeight, windowWidth;

  const ref = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  console.log('isMobile', isMobile);

  const onMouseMove = ({ clientX, clientY }: MouseEvent) => {
    const tooltip = ref?.current;
    if (tooltip && !isMobile) {
      top = clientY - tooltip.clientHeight - 10;
      left = clientX - tooltip.clientWidth / 2;
      windowHeight = window.innerHeight;
      windowWidth = window.innerWidth;

      if (top < 0) {
        top = clientY + 30;
      } else if (top + tooltip.clientHeight > windowHeight) {
        top = windowHeight - tooltip.clientHeight;
      }

      if (left < 0) {
        left = tooltip.clientWidth / 2;
      } else if (left + tooltip.clientWidth > windowWidth) {
        left = windowWidth - tooltip.clientWidth - tooltip.clientWidth / 2;
      }

      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
      tooltip.style.opacity = '1';
    }
  };

  useEffect(() => {
    if (!isMobile) {
      document.addEventListener('mousemove', onMouseMove);
    }
    return () => {
      if (!isMobile) {
        document.removeEventListener('mousemove', onMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    const tooltip = ref?.current;
    if (isMobile && tooltip && props.event) {
      const x = props.event.touches[0].clientX;
      const y = props.event.touches[0].clientY;
      top = y - tooltip.clientHeight - 10;
      left = window.innerWidth / 2 - tooltip.clientWidth / 2;

      if (top < 0) {
        top = y + 30;
      } else if (top + tooltip.clientHeight > window.innerHeight) {
        top = window.innerHeight - tooltip.clientHeight;
      }

      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
      tooltip.style.opacity = '1';
    }
  }, [isMobile, ref]);

  if (!visible) {
    return null;
  }

  return (
    <div className="react-usa-map-tooltip" ref={ref}>
      <div>isMobile {isMobile.toString()}</div>
      <div>window width {window.innerWidth}</div>
      <div>tooltip width width {ref?.current?.clientWidth}</div>
      {content}
    </div>
  );
};

export { Tooltip, type TooltipProps, defaultTooltipState };
