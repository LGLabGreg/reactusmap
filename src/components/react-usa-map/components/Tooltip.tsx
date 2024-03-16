import { type ReactNode, useEffect, useRef } from "react";

const defaultTooltipState = { visible: false };

type TooltipProps = {
  visible?: boolean;
  content?: ReactNode;
};

const Tooltip = (props: TooltipProps) => {
  const { visible, content } = props;
  let top, left, windowHeight, windowWidth;

  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseMove = ({ clientX, clientY }: MouseEvent) => {
    const tooltip = ref?.current;
    if (tooltip) {
      top = clientY - tooltip.clientHeight - 10;
      left = clientX - tooltip.clientWidth / 2;
      windowHeight = window.innerHeight;
      windowWidth = window.innerWidth;

      if (top < 0) {
        top = tooltip.clientHeight + 30;
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
      tooltip.style.opacity = "1";
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="react-usa-map-tooltip" ref={ref}>
      {content}
    </div>
  );
};

export { Tooltip, type TooltipProps, defaultTooltipState };
