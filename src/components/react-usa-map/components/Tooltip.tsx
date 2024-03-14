import { type ReactNode, useEffect, useRef } from "react";

const defaultTooltipState = { visible: false };

type TooltipProps = {
  visible?: boolean;
  content?: ReactNode;
};

const Tooltip = (props: TooltipProps) => {
  const { visible, content } = props;

  if (!visible) {
    return null;
  }

  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseMove = ({ clientX, clientY }: MouseEvent) => {
    const tooltip = ref?.current;
    if (tooltip) {
      tooltip.style.top = `${clientY - tooltip.clientHeight - 30}px`;
      tooltip.style.left = `${clientX - tooltip.clientWidth / 2}px`;
      tooltip.style.opacity = "1";
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="react-usa-map-tooltip" ref={ref}>
      {content}
    </div>
  );
};

export { Tooltip, type TooltipProps, defaultTooltipState };
