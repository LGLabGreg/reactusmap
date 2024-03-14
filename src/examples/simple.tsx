import USAMap from '@/components/react-usa-map';
import { StateProps } from '@/components/react-usa-map/components/State';

function Simple() {
  const onStateClick = (state: StateProps) => {
    window.open(`https://www.google.com/search?q=${state.name}`, '_blank');
  };

  return (
    <div className="lg:flex w-full">
      <div className="w-full lg:w-3/4 mx-auto py-3 px-4">
        <USAMap onStateClick={onStateClick} />
      </div>
    </div>
  );
}

export default Simple;
