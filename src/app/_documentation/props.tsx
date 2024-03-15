import Pre from '@/components/ui/pre';

const headers = ['Prop', 'Description'];
const rows = [
  {
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
    prop: 'config',
    description: (
      <>
        <p>
          Object to override the default config such as colors.
          <br />
          You can find the default config in{' '}
          <span className="font-semibold">./react-usa-map/config/config.ts</span>
        </p>
        <Pre>
          {`import USAMap from 'path/to/react-usa-map';

const MyApp = () => {
  return (
    <USAMap
      config={{ 
        disableTooltips: true,
        stateColor: "#f2f2f2",
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
    prop: 'states',
    description: <>TBC</>,
  },
  {
    prop: 'disabledStates',
    description: <>TBC</>,
  },
  {
    prop: 'markers',
    description: <>TBC</>,
  },
  {
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
    <div className="md:w-3/4 lg:w-1/2 mx-auto py-4">
      <div className="relative overflow-x-auto rounded-md">
        <table className="w-full text-left">
          <thead className="bg-primary text-primary-foreground">
            <tr>
              {headers.map((header) => (
                <th scope="col" className="px-4 py-2 font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ prop, description }) => (
              <tr className="border-b ">
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
