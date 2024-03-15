import Pre from '@/components/ui/pre';

const Usage = () => {
  return (
    <div className="md:w-3/4 lg:w-1/2 mx-auto py-4">
      <p>
        Here is a list of all the properties you can pass to the component. An example
        implementation of these properties is included in your download in ./examples/advanced.tsx
      </p>
      <Pre>
        {`import USAMap from 'path/to/react-usa-map';

const MyApp = () => {
  return (
    <USAMap
      ref={mapRef}
      onStateEnter={onStateEnter}
      onStateLeave={onStateLeave}
      onStateClick={onStateClick}
      onMarkerEnter={onMarkerEnter}
      onMarkerLeave={onMarkerLeave}
      onMarkerClick={onMarkerClick}
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
      states={myStatesConfig}
      disabledStates={disabledStates}
      markers={[
        {
          id: '1',
          name: 'SVG Marker',
          content: SVGElement,
          description: 'You can add svg elements as markers',
          tooltipContent: (
            <>
              <h4>SVG Marker</h4>
              <p>You can add svg elements as markers</p>
            </>
          ),
        },
      ]}
    />
  )
}

export default MyApp;`}
      </Pre>
    </div>
  );
};

export default Usage;
