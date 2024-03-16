import { type ReactNode, useEffect, type TouchEvent, useState } from 'react';

const defaultTooltipState = { visible: false };

type TooltipProps = {
  visible?: boolean;
  content?: ReactNode;
  touchEvent?: TouchEvent;
};

type TooltipPosProps = {
  clientX: number;
  clientY: number;
};

const Tooltip = (props: TooltipProps) => {
  const { visible, content } = props;

  const [tooltip, setTooltip] = useState<HTMLDivElement | null>(null);

  const onMouseMove = ({ clientX, clientY }: MouseEvent) => {
    setTooltipPos({ clientX, clientY });
  };

  const setTooltipPos = ({ clientX, clientY }: TooltipPosProps) => {
    let top: number = 0,
      left: number = 0;
    if (tooltip) {
      if (props.touchEvent) {
        const y = props.touchEvent.touches[0].clientY;
        top = y - tooltip.clientHeight - 50;
        left = window.innerWidth / 2 - tooltip.clientWidth / 2;

        if (top < 0) {
          top = y + 50;
        } else if (top + tooltip.clientHeight > window.innerHeight) {
          top = window.innerHeight - tooltip.clientHeight;
        }
      } else if (clientX && clientY) {
        top = clientY - tooltip.clientHeight - 10;
        left = clientX - tooltip.clientWidth / 2;

        if (top < 0) {
          top = clientY + 30;
        } else if (top + tooltip.clientHeight > window.innerHeight) {
          top = window.innerHeight - tooltip.clientHeight;
        }

        if (left < 0) {
          left = tooltip.clientWidth / 2;
        } else if (left + tooltip.clientWidth > window.innerWidth) {
          left = window.innerWidth - tooltip.clientWidth - tooltip.clientWidth / 2;
        }
      }

      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
      tooltip.style.opacity = '1';
    }
  };

  useEffect(() => {
    if (tooltip) {
      if (props.touchEvent) {
        setTooltipPos({
          clientX: props.touchEvent.touches[0].clientX,
          clientY: props.touchEvent.touches[0].clientY,
        });
      } else {
        document.addEventListener('mousemove', onMouseMove);
      }
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [tooltip, props.touchEvent]);

  if (!visible) {
    return null;
  }

  return (
    <div className="react-usa-map-tooltip" ref={setTooltip}>
      {content}
    </div>
  );
};

export { Tooltip, type TooltipProps, defaultTooltipState };
