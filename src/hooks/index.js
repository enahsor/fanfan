import { useLayoutEffect, useState, useContext } from "react";
import { CursorContext } from "@/context/cursor";

const useCursor = (ref) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useLayoutEffect(() => {
    function updateCoordinates(e) {
      const { pageX: x, pageY: y } = e;
      setX(x);
      setY(y);
    }

    window.addEventListener("mousemove", updateCoordinates);
    return () => window.removeEventListener("mousemove", updateCoordinates);
  }, []);

  useLayoutEffect(() => {
    ref.current.style.top = `${y}px`;
    ref.current.style.left = `${x}px`;
  }, [x, y]);

  return { x, y };
};

const useCursorTarget = () => {
  const context = useContext(CursorContext);

  if (!context) {
    throw new Error(
      `useCursorTarget must be wrapped by a CursorProvider component`
    );
  }

  const { ref, hovering, ...rest } = context;

  return { ref, hovering, ...rest };
};

export { useCursor, useCursorTarget };
