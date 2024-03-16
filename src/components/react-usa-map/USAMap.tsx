import { useState, useCallback, forwardRef, useImperativeHandle, type TouchEvent } from 'react';
import {
  State,
  type StateProps,
  type StateIdType,
  type StateConfigProps,
} from './components/State';
import { Marker, type MarkerProps } from './components/Marker';
import { Tooltip, TooltipProps } from './components/Tooltip';
import MapCoordinates from './components/MapCoordinates';

import { nullFunc } from './lib/utils';

import usaStates from './config/states';
import usaConfig from './config/config';

type USAMapProps = {
  onStateClick?: (state: StateProps) => void;
  onStateEnter?: (state: StateProps) => void;
  onStateLeave?: (state: StateProps) => void;
  onMarkerClick?: (marker: MarkerProps) => void;
  onMarkerEnter?: (marker: MarkerProps) => void;
  onMarkerLeave?: (marker: MarkerProps) => void;
  markers?: MarkerProps[];
  states?: StateProps[];
  disabledStates?: StateIdType[];
  config?: StateConfigProps;
  enableMapCoordinates?: boolean;
};

export type USAMapApi = {
  selectState: (state: StateProps) => void;
};

const USAMap = forwardRef<USAMapApi, USAMapProps>((props, ref) => {
  const {
    onStateClick = nullFunc,
    onStateEnter = nullFunc,
    onStateLeave = nullFunc,
    onMarkerClick = nullFunc,
    onMarkerEnter = nullFunc,
    onMarkerLeave = nullFunc,
    config = {},
    markers,
    enableMapCoordinates = false,
  } = props;

  const mapConfig = {
    ...usaConfig,
    ...config,
  };

  useImperativeHandle(ref, () => {
    return {
      selectState(state: StateProps) {
        handleStateClick(state);
      },
    };
  });

  const [tooltip, setTooltip] = useState<TooltipProps | null>(null);
  const [states, setStates] = useState(
    usaStates.map((defaultState: StateProps) => {
      let result = defaultState;
      if (props.states) {
        const match = props.states.find((state) => state && state.id === defaultState.id);
        if (match) {
          result = {
            ...defaultState,
            ...match,
          };
        }
      }
      if (props.disabledStates) {
        const disabled = props.disabledStates.includes(defaultState.id);
        result = {
          ...result,
          disabled,
        };
      }
      return result;
    })
  );

  const showTooltip = (props: StateProps | MarkerProps): void => {
    if ((props.name || props.tooltipContent) && !props.disableTooltip) {
      setTooltip({
        visible: true,
        content: props.tooltipContent || props.name,
      });
    }
  };

  const handleStateEnter = (state: StateProps) => {
    showTooltip(state);
    onStateEnter(state);
  };

  const handleStateLeave = (state: StateProps) => {
    setTooltip(null);
    onStateLeave(state);
  };

  const handleStateClick = (state: StateProps) => {
    showTooltip(state);
    setStates((prevStates) =>
      prevStates.map((prevState) => {
        if (prevState.id === state.id) {
          return {
            ...prevState,
            selected: true,
          };
        }
        return {
          ...prevState,
          selected: false,
        };
      })
    );
    onStateClick(state);
  };

  const handleTouchStart = (event: TouchEvent, props: StateProps | MarkerProps): void => {
    setTooltip({
      visible: true,
      content: props.tooltipContent || props.name,
      event,
    });
  };

  const handleMarkerClick = (marker: MarkerProps) => {
    showTooltip(marker);
    onMarkerClick(marker);
  };

  const handleMarkerEnter = (marker: MarkerProps) => {
    showTooltip(marker);
    onMarkerEnter(marker);
  };

  const handleMarkerLeave = (marker: MarkerProps) => {
    setTooltip(null);
    onMarkerLeave(marker);
  };

  const sortStates = useCallback(
    () =>
      states
        .sort((a, b) => {
          return Number(a.disabled) - Number(b.disabled);
        })
        .sort((a, b) => {
          return Number(a.over) - Number(b.over);
        })
        .sort((a, b) => {
          return Number(a.selected) - Number(b.selected);
        }),
    [states]
  );

  return (
    <div className="relative">
      {enableMapCoordinates && <MapCoordinates />}
      {!mapConfig.disableTooltips && <Tooltip {...tooltip} />}
      <svg className="react-usa-map" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 930 590">
        {sortStates().map((state) => {
          return (
            <State
              {...mapConfig}
              {...state}
              key={state.id}
              onClick={handleStateClick}
              onEnter={handleStateEnter}
              onLeave={handleStateLeave}
              onTouchStart={handleTouchStart}
            />
          );
        })}
        {markers &&
          markers.map((marker: MarkerProps) => (
            <Marker
              key={marker.id}
              {...marker}
              onClick={handleMarkerClick}
              onEnter={handleMarkerEnter}
              onLeave={handleMarkerLeave}
            />
          ))}
      </svg>
    </div>
  );
});

USAMap.displayName = 'USAMap';

export default USAMap;
