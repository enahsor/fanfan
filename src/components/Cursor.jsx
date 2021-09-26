import { useTrail, animated, useSpring, config } from "react-spring";
import { useLayoutEffect, useState, forwardRef } from "react";
import { useCursor } from "@/hooks";
import { useRef } from "react";

const Main = forwardRef(({ size = 16, hovering, ...props }, ref) => {
  const animation = useSpring({
    transform: `translateX(-50%) translateY(-50%) scale(${hovering ? 1.5 : 1})`,
    config: config.stiff,
  });
  return (
    <animated.div
      className={`absolute w-${size} h-${size} transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full pointer-events-none mix-blend-difference`}
      ref={ref}
      style={animation}
      {...props}
    ></animated.div>
  );
});

const Follower = ({ size = 8, ...props }) => {
  return (
    <animated.div
      className={`h-${size} w-${size} rounded-full absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none border-solid border-2 border-black`}
      {...props}
    ></animated.div>
  );
};

const Cursor = ({ followers = [], hoveringTarget = false, ...props }) => {
  const ref = useRef();
  const { x, y } = useCursor(ref);
  const trail = useTrail(followers.length, {
    top: y,
    left: x,
    opacity: hoveringTarget ? 0 : 1,
    config: { ...config.stiff, clamp: true },
    immediate: hoveringTarget,
  });

  return (
    <>
      <Main ref={ref} hovering={hoveringTarget} />
      {trail.map((style, index) => (
        <Follower key={index} size={followers[index]} style={style} />
      ))}
    </>
  );
};

export default Cursor;
