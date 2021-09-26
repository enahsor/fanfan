import { animated, useSpring, config } from "react-spring";
import { randomInteger } from "@/utils";

const Ring = ({ pathToDraw, final = -520, stroke = 1, ...props }) => {
  const spring = useSpring({
    from: { strokeDashoffset: 0, strokeDasharray: "0px 99999px" },
    to: {
      strokeDashoffset: final,
      strokeDasharray: "80px 800px",
    },
    loop: true,
    config: {
      ...config.gentle,
      duration: randomInteger(1500, 3000),
      decay: 1,
    },
  });

  return (
    <animated.path
      strokeWidth={stroke}
      stroke="#000000"
      d={`M${pathToDraw}`}
      style={spring}
      {...props}
    ></animated.path>
  );
};

export default Ring;
