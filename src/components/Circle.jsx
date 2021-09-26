import { animated } from "react-spring";

const Circle = ({ stroke = 1, ...props }) => {
  return (
    <animated.circle
      strokeWidth={stroke}
      cx="200"
      cy="200"
      r="130"
      data-svg-origin="200 200"
      transform="matrix(1,0,0,1,0,0)"
      {...props}
    ></animated.circle>
  );
};

export default Circle;
