import { useTrail, animated, useSpring, config } from "react-spring";
import {
  useLayoutEffect,
  useState,
  forwardRef,
  useRef,
  useEffect,
} from "react";
import { useCursor } from "@/hooks";

const Arrow = forwardRef(({ angle, ...props }, ref) => {
  const spring = useSpring({
    transform: `translate(0%, -50%) rotate(180deg)`,
    transformOrigin: "-32px 50%",
  });

  console.log({ angle });

  return (
    <animated.svg
      ref={ref}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      className="position absolute"
      style={{
        transform: `translate(0%, -50%) rotate(${angle}deg)`,
        transformOrigin: "-32px 50%",
      }}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z"
        clipRule="evenodd"
      ></path>
      <path
        fillRule="evenodd"
        d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z"
        clipRule="evenodd"
      ></path>
    </animated.svg>
  );
});

const Main = forwardRef(({ size = 16, hovering, x, y, ...props }, ref) => {
  const arrowRef = useRef();
  const [angle, setAngle] = useState(0);

  const animation = useSpring({
    transform: `translateX(-50%) translateY(-50%) scale(${hovering ? 1.5 : 1})`,
    config: config.stiff,
  });

  useLayoutEffect(() => {
    const angle = (Math.atan2(166 + 104 - y, 323 + 104 - x) * 180) / Math.PI;
    setAngle(angle);
  }, [x, y]);

  return (
    <animated.div
      className={` absolute w-${size} h-${size} transform bg-white rounded-full pointer-events-none mix-blend-difference`}
      ref={ref}
      style={animation}
      {...props}
    >
      <Arrow
        angle={angle}
        ref={arrowRef}
        className="absolute top-2/4 -right-4 bg-red-500 transform"
      />
    </animated.div>
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
      <Main ref={ref} hovering={hoveringTarget} x={x} y={y} />
      {trail.map((style, index) => (
        <Follower key={index} size={followers[index]} style={style} />
      ))}
    </>
  );
};

export default Cursor;
