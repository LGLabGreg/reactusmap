import Pre from '@/components/ui/pre';

const GettingStarted = () => {
  return (
    <div className="md:w-3/4 lg:w-1/2 mx-auto py-4">
      <p>
        Your download includes a <span className="font-semibold">react-usa-map</span> folder which
        contains the React component. Add this folder anywhere in your project and import the
        component where you want to use it.
      </p>
      <Pre>
        {`import USAMap from 'path/to/react-usa-map';

const MyApp = () => {
  return (
    <USAMap />
  )
}

export default MyApp;`}
      </Pre>
      <p>
        Your download also includes a <span className="font-semibold">examples</span> folder which
        contains the maps used in this preview
      </p>
    </div>
  );
};

export default GettingStarted;
