import { createContext, useState, useLayoutEffect, useRef } from "react";

export const CursorContext = createContext();

const CursorProvider = (props) => {
  const [hoveringTarget, setHoveringTarget] = useState(false);
  const targetsRef = useRef([]);

  const addElementAsTarget = (element) => {
    if (element && !targetsRef.current.includes(element)) {
      targetsRef.current.push(element);
    }
  };

  useLayoutEffect(() => {
    const isHovering = () => setHoveringTarget(true);
    const isNotHovering = () => setHoveringTarget(false);

    const addListeners = (element) => {
      element.addEventListener("mouseover", isHovering);
      element.addEventListener("mouseleave", isNotHovering);
    };

    const removeListeners = (element) => {
      element.removeEventListener("mouseover", isHovering);
      element.removeEventListener("mouseleave", isNotHovering);
    };

    targetsRef.current.forEach(addListeners);

    return () => targetsRef.current.forEach(removeListeners);
  }, []);

  const value = { ref: addElementAsTarget, hovering: hoveringTarget };
  return (
    <CursorContext.Provider {...props} value={value}></CursorContext.Provider>
  );
};

export default CursorProvider;
