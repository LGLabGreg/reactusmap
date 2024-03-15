import { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import {
  State,
  type StateProps,
  type StateIdType,
  type StateConfigProps,
} from './components/State';
import { Marker, type MarkerProps } from './components/Marker';
import { Tooltip, TooltipProps } from './components/Tooltip';

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

  const handleStateEnter = (state: StateProps) => {
    if (state.name && !state.disableTooltip) {
      setTooltip({
        visible: true,
        content: state.tooltipContent || state.name,
      });
    }
    onStateEnter(state);
  };

  const handleStateLeave = (state: StateProps) => {
    setTooltip(null);
    onStateLeave(state);
  };

  const handleStateClick = (state: StateProps) => {
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

  const handleMarkerClick = (marker: MarkerProps) => {
    onMarkerClick(marker);
  };

  const handleMarkerEnter = (marker: MarkerProps) => {
    if (marker.name && !marker.disableTooltip) {
      setTooltip({
        visible: true,
        content: marker.tooltipContent || marker.name,
      });
    }
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
    <>
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
    </>
  );
});

USAMap.displayName = 'USAMap';

export default USAMap;
