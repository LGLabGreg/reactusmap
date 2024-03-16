import Pre from '@/components/ui/pre';

const headers = ['Prop', 'Description'];
const rows = [
  {
    key: 'ref',
    prop: 'ref',
    description: (
      <>
        <p>
          ref to be forwarded to the map component. The component exposes a selectState API which
          you can call to select a state using its id.
          <br />
          You can find all state ids in{' '}
          <span className="font-semibold">./react-usa-map/config/states.ts</span>
        </p>
        <Pre>
          {`import USAMap from 'path/to/react-usa-map';
import { useRef } from 'react';

const MyApp = () => {
  const mapRef = useRef(null);
  const myHandler = (id) => {
    mapRef.current?.selectState({ id })
  }
  return (
    <USAMap ref={mapRef} />
  )
}

export default MyApp;`}
        </Pre>
      </>
    ),
  },
  {
    key: 'config',
    prop: 'config',
    description: (
      <>
        <p>
          Object to extend the default global config properties such as colors.
          <br />
          You can find the default config properties in{' '}
          <span className="font-semibold">./react-usa-map/config/config.ts</span>
        </p>
        <Pre>
          {`import USAMap from 'path/to/react-usa-map';

const MyApp = () => {
  return (
    <USAMap
      config={{ 
        disableTooltips: false,
        abbreviationColor: "#333",
        abbreviationHoverColor: "#fff",
        abbreviationSelectedColor: "#fff",
        abbreviationDisabledColor: "#333",
        strokeWidth: 1,
        strokeColor: "#d1d5db",
        strokeHoverColor: "#fff",
        strokeSelectedColor: "#fff",
        strokeDisabledColor: "#ccc",
        stateColor: "#f2f2f2",
        stateHoverColor: "#20629C",
        stateSelectedColor: "#20629C",
        stateDisabledColor: "#d1d5db",
      }}
    />
  )
}

export default MyApp;`}
        </Pre>
      </>
    ),
  },
  {
    key: 'states',
    prop: 'states',
    description: (
      <>
        <p>
          Array to extend the default states properties.
          <br />
          You can find the default states properties in{' '}
          <span className="font-semibold">./react-usa-map/config/states.ts</span>
        </p>
        <p>
          You can override the existing state properties, including config properties such as
          colors, and add additional custom properties. Note that by default the tooltip will
          contain the <span className="font-semibold">name</span> property of the state, unless a{' '}
          <span className="font-semibold">tooltipContent</span> property is provided, which can
          contain either a string or ReactNode
        </p>
        <Pre>
          {`import USAMap from 'path/to/react-usa-map';
import states from 'path/to/react-usa-map/config/states';

const myStates = states.map((state) => {
  return {
    ...state,
    disabled: false,
    disableTooltip: false,
    stateColor: "#f2f2f2",
    tooltipContent: (
      <>
        <h4>{state.name}</h4>
        <p>"Lorem ipsum dolores..."</p>
      </>
    ),
    foo: 'bar',
  };
});

const MyApp = () => {
  const handleClick = (state) => {
    console.log(state.foo);
  }
  return (
    <USAMap onStateClick={handleClick} states={myStates} />
  )
}

export default MyApp;`}
        </Pre>
      </>
    ),
  },
  {
    key: 'disabledStates',
    prop: 'disabledStates',
    description: (
      <>
        <p>
          Array of state ids to be disabled.
          <br />
          You can find the default states ids in{' '}
          <span className="font-semibold">./react-usa-map/config/states.ts</span>
        </p>
        <Pre>
          {`import USAMap from 'path/to/react-usa-map';

const disabledStates = ['AL', 'FL'];

const MyApp = () => {
  return (
    <USAMap disabledStates={disabledStates} />
  )
}

export default MyApp;`}
        </Pre>
      </>
    ),
  },
  {
    key: 'markers',
    prop: 'markers',
    description: (
      <>
        <p>
          Array of markers to be displayed on the map. These must be svg elements such as{' '}
          {`<circle>`}, {`<rect>`}, {`<image>`}, etc..
        </p>
        <p>The example below uses tailwind to apply hover styles but you can use regular css</p>
        <Pre>
          {`import USAMap from 'path/to/react-usa-map';

const MyApp = () => {
  return (
    <USAMap markers={[
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
    ]} />
  )
}

export default MyApp;`}
        </Pre>
      </>
    ),
  },
  {
    key: 'enableMapCoordinates',
    prop: 'enableMapCoordinates',
    description: (
      <>
        <p>
          Boolean to enable tracking of the x/y coordinates on the map, you can enable this to help
          placing markers on the map.
          <br />
          When enabled, the map will be disabled and while hovering over the map, the coordinates
          will be logged to the dev tools console as{' '}
          <span className="font-semibold">
            React USA Map, coordinates on map {`{ x: 76, y: 252 }`}
          </span>
        </p>
        <Pre>
          {`import USAMap from 'path/to/react-usa-map';

const MyApp = () => {
  return (
    <USAMap enableMapCoordinates={true} />
  )
}

export default MyApp;`}
        </Pre>
      </>
    ),
  },
  {
    key: 'events',
    prop: (
      <>
        onStateClick
        <br />
        onStateEnter
        <br />
        onStateLeave
        <br />
        onMarkerClick
        <br />
        onMarkerEnter
        <br />
        onMarkerLeave
        <br />
      </>
    ),
    description: (
      <>
        <p>Callbacks for state events that receive a state object</p>
        <Pre>
          {`import USAMap from 'path/to/react-usa-map';

const MyApp = () => {
  const handleClick = (state) => {
    console.log(state);
  }
  return (
    <USAMap onStateClick={handleClick} />
  )
}

export default MyApp;`}
        </Pre>
      </>
    ),
  },
];

const Props = () => {
  return (
    <div className="md:w-3/4 lg:w-3/4 mx-auto py-4">
      <div className="relative overflow-x-auto rounded-md">
        <table className="w-full text-left">
          <thead className="bg-primary text-primary-foreground">
            <tr>
              {headers.map((header) => (
                <th key={header} scope="col" className="px-4 py-2 font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ key, prop, description }) => (
              <tr className="border-b" key={key}>
                <td className="px-4 py-4 align-top">{prop}</td>
                <td className="px-4 py-4">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Props;
