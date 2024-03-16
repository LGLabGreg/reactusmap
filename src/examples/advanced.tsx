'use client';

import { ChangeEvent, useRef, useState } from 'react';

import USAMap from '@/components/react-usa-map';
import { type StateProps } from '@/components/react-usa-map/components/State';
import { type MarkerProps } from '@/components/react-usa-map/components/Marker';
import states from '@/components/react-usa-map/config/states';
import { USAMapApi } from '@/components/react-usa-map/USAMap';

const descriptions = [
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quod incidunt iusto, fugiat laborum reiciendis qui? Consequatur unde voluptas rem ipsa quibusdam eligendi harum quaerat enim nobis. Quam, tempore eaque.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
];
const disabledStates = ['FL', 'CO'];

const myStatesConfig = states.map((state, index) => {
  const description = descriptions[index % 2];

  if (disabledStates.includes(state.id)) {
    return {
      ...state,
      name: state.name,
      disableTooltip: false,
      tooltipContent: (
        <>
          <h4 className="mb-1">{state.name} is disabled</h4>
          <p className="line-clamp-2">You can disable the tooltip if you want</p>
        </>
      ),
    };
  }

  return {
    ...state,
    description,
    tooltipContent: (
      <>
        <h4 className="mb-1">{state.name}</h4>
        <p className="line-clamp-2">{description}</p>
      </>
    ),
  };
});

function Advanced() {
  const mapRef = useRef<USAMapApi>(null);

  const [selectedItem, setSelectedItem] = useState<any>(null);

  const onStateClick = (state: StateProps): void => {
    setSelectedItem(state);
  };
  const onMarkerClick = (marker: MarkerProps): void => {
    setSelectedItem(marker);
  };
  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedState = myStatesConfig.find((state) => state.id === e.target.value);
    if (selectedState) {
      mapRef.current?.selectState(selectedState);
    }
  };

  return (
    <div className="lg:flex w-full">
      <div className="w-full lg:w-3/4 py-3 lg:px-4">
        <USAMap
          ref={mapRef}
          onStateClick={onStateClick}
          onMarkerClick={onMarkerClick}
          config={{}}
          states={myStatesConfig}
          disabledStates={disabledStates}
          markers={[
            {
              id: '1',
              name: 'SVG Marker',
              content: (
                <circle
                  cx="150"
                  cy="150"
                  r="20"
                  fill="#dc2626"
                  className="hover:fill-red-500 hover:scale-125 transition-all"
                />
              ),
              description: 'You can add svg elements as markers',
              tooltipContent: (
                <>
                  <h4 className="mb-1">SVG Marker</h4>
                  <p className="line-clamp-2">You can add svg elements as markers</p>
                </>
              ),
            },

            {
              id: '2',
              name: 'SVG Marker',
              content: (
                <circle
                  cx="450"
                  cy="75"
                  r="25"
                  fill="#dc2626"
                  className="hover:fill-red-500 hover:scale-125 transition-all"
                />
              ),
              description: 'You can add svg elements as markers',
              tooltipContent: (
                <>
                  <h4 className="mb-1">SVG Marker</h4>
                  <p className="line-clamp-2">You can add svg elements as markers</p>
                </>
              ),
            },
            {
              id: '3',
              name: 'Image Marker',
              content: (
                <image
                  x="340"
                  y="340"
                  href="./images/airport.svg"
                  height="40"
                  width="40"
                  className="hover:fill-red-500 hover:scale-125 transition-all"
                />
              ),
              description: 'You can add images as markers',
              tooltipContent: (
                <>
                  <h4 className="mb-1">Image Marker</h4>
                  <p className="line-clamp-2">You can add images as markers</p>
                </>
              ),
            },
          ]}
        />
      </div>
      <div className="w-full lg:w-1/4 py-3 lg:px-4">
        <form className="max-w-sm mx-auto mb-4">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a state
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={onSelectChange}
            defaultValue="default"
            value={selectedItem?.id}
          >
            <option value="default">Choose a state</option>
            {myStatesConfig
              .filter((state) => !disabledStates.includes(state.id))
              .map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
          </select>
        </form>

        {selectedItem ? (
          <>
            <h3 className="mb-3">{selectedItem.name}</h3>
            <p>{selectedItem.description}</p>
          </>
        ) : (
          <h3>No state selected</h3>
        )}
      </div>
    </div>
  );
}

export default Advanced;
