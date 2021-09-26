import { forwardRef, useState, useLayoutEffect } from "react";
import {
  animated,
  useSprings,
  useSpring,
  useTrail,
  config,
} from "react-spring";
import { randomInteger } from "@/utils";

const Title = forwardRef(
  ({ children, beingHovered, setBeingHovered, ...props }, ref) => {
    const [letters, setLetters] = useState(() => children.split(""));

    const floating = () => {
      return {
        from: {
          transform: `translateY(${randomInteger(-15, 15)}px)`,
        },
        to: { transform: `translateY(0px)` },
      };
    };

    const align = { transform: `translateY(0)px` };

    const trail = useTrail(letters.length, {
      ...(beingHovered ? align : floating()),
      config: { ...config.slow },
      ...(!beingHovered ? { loop: { reverse: true } } : null),
      cancel: beingHovered,
    });

    const spring = useSpring({
      WebkitTextFillColor: beingHovered ? "black" : "white",
      WebkitTextStrokeWidth: "2px",
      WebkitTextStrokeColor: "black",
    });

    return (
      <animated.div
        className="text-7xl absolute"
        ref={ref}
        style={spring}
        onMouseEnter={() => setBeingHovered(true)}
        onMouseLeave={() => setBeingHovered(false)}
      >
        {trail.map((styles, index) => (
          <animated.span key={index} className="inline-block" style={styles}>
            {letters[index]}
          </animated.span>
        ))}
      </animated.div>
    );
  }
);

export default Title;
