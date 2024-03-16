import { type ReactNode, useEffect, type TouchEvent, useState } from 'react';

const defaultTooltipState = { visible: false };

type TooltipProps = {
  visible?: boolean;
  content?: ReactNode;
  touchEvent?: TouchEvent;
};

const Tooltip = (props: TooltipProps) => {
  const { visible, content } = props;

  //let tooltip: HTMLDivElement | null = null;
  let top, left, windowHeight, windowWidth;

  const [tooltip, setTooltip] = useState<HTMLDivElement | null>(null);

  // const ref = useRef<HTMLDivElement | null>(null);

  const onMouseMove = ({ clientX, clientY }: MouseEvent) => {
    if (tooltip) {
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
    console.log('useEffect tooltip', tooltip);
    if (tooltip) {
      console.log('useEffect touchEvent', props.touchEvent);
      if (props.touchEvent) {
        setTouchTooltip();
      } else {
        document.addEventListener('mousemove', onMouseMove);
      }
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [tooltip]);

  const setTouchTooltip = () => {
    if (tooltip && props.touchEvent) {
      const x = props.touchEvent.touches[0].clientX;
      const y = props.touchEvent.touches[0].clientY;
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
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="react-usa-map-tooltip" ref={setTooltip}>
      <div>touchEvent {props?.touchEvent?.touches[0].clientX}</div>

      {content}
    </div>
  );
};

export { Tooltip, type TooltipProps, defaultTooltipState };
