import { type ReactNode, useRef } from "react";
import { useMousePosition } from "../lib/hooks";

const MouseCoordinates = (): ReactNode => {
  const mouseRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition(mouseRef);
  console.log("React USA Map, coordinates on map", mousePosition);
  return (
    <div
      className="absolute w-full h-full inset-0 bg-transparent"
      ref={mouseRef}
    ></div>
  );
};

export default MouseCoordinates;
