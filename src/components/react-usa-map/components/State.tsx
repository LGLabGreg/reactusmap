import { type ReactNode, useState } from 'react';
import states from '../config/states';

type StateIdType = (typeof states)[number]['id'];

type StateConfigProps = {
  disableTooltips?: boolean;
  abbreviationColor?: string;
  abbreviationHoverColor?: string;
  abbreviationSelectedColor?: string;
  abbreviationDisabledColor?: string;
  strokeWidth?: number;
  strokeColor?: string;
  strokeHoverColor?: string;
  strokeSelectedColor?: string;
  strokeDisabledColor?: string;
  stateColor?: string;
  stateHoverColor?: string;
  stateSelectedColor?: string;
  stateDisabledColor?: string;
};

type StateProps = {
  id: string;
  path?: string;
  name?: string;
  description?: string;
  tooltipContent?: ReactNode;
  over?: boolean;
  selected?: boolean;
  abbreviation?: string;
  abbreviationX?: number;
  abbreviationY?: number;
  disabled?: boolean;
  disableTooltip?: boolean;
  onEnter?: (state: StateProps) => void;
  onLeave?: (state: StateProps) => void;
  onClick?: (state: StateProps) => void;
} & StateConfigProps;

const State = (props: StateProps) => {
  const {
    path,
    abbreviation,
    abbreviationX,
    abbreviationY,
    abbreviationColor,
    abbreviationHoverColor,
    abbreviationSelectedColor,
    abbreviationDisabledColor,
    strokeWidth,
    strokeColor,
    strokeHoverColor,
    strokeSelectedColor,
    strokeDisabledColor,
    stateColor,
    stateHoverColor,
    stateSelectedColor,
    stateDisabledColor,
    selected = false,
    disabled = false,
    onClick,
    onEnter,
    onLeave,
  } = props;

  const [over, setOver] = useState(false);

  const handleEnter = () => {
    setOver(true);
    onEnter && onEnter(props);
  };

  const handleLeave = () => {
    setOver(false);
    onLeave && onLeave(props);
  };

  const fill = () => {
    if (disabled) {
      return stateDisabledColor;
    } else if (selected) {
      return stateSelectedColor;
    } else if (over) {
      return stateHoverColor;
    } else {
      return stateColor;
    }
  };

  const stroke = () => {
    if (disabled) {
      return strokeDisabledColor;
    } else if (selected) {
      return strokeSelectedColor;
    } else if (over) {
      return strokeHoverColor;
    } else {
      return strokeColor;
    }
  };

  const textFill = () => {
    if (disabled) {
      return abbreviationDisabledColor;
    } else if (selected) {
      return abbreviationSelectedColor;
    } else if (over) {
      return abbreviationHoverColor;
    } else {
      return abbreviationColor;
    }
  };

  return (
    <>
      <g
        onClick={() => !disabled && onClick && onClick(props)}
        onMouseEnter={() => handleEnter()}
        onMouseLeave={() => handleLeave()}
        data-disabled={disabled}
      >
        <path d={path} fill={fill()} stroke={stroke()} strokeWidth={strokeWidth}></path>
        <text x={abbreviationX} y={abbreviationY} fill={textFill()}>
          {abbreviation}
        </text>
      </g>
    </>
  );
};

export { State, type StateProps, type StateIdType, type StateConfigProps };
