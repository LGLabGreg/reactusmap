import { type ReactNode, type TouchEvent } from 'react';

type MarkerProps = {
  id: string;
  name?: string;
  description?: string;
  content: ReactNode;
  tooltipContent?: ReactNode;
  disabled?: boolean;
  disableTooltip?: boolean;
  onClick?: (marker: MarkerProps) => void;
  onEnter?: (marker: MarkerProps) => void;
  onLeave?: (marker: MarkerProps) => void;
  onTouchStart?: (event: TouchEvent, state: MarkerProps) => void;
};

const Marker = (props: MarkerProps) => {
  const { content, disabled = false, onClick, onEnter, onLeave, onTouchStart } = props;
  return (
    <g
      onClick={() => onClick && onClick(props)}
      onMouseEnter={() => onEnter && onEnter(props)}
      onMouseLeave={() => onLeave && onLeave(props)}
      onTouchStart={(event: TouchEvent) => onTouchStart && onTouchStart(event, props)}
      data-disabled={disabled}
    >
      {content}
    </g>
  );
};

export { Marker, type MarkerProps };
