import Cursor from "@/components/Cursor";
import Circle from "@/components/Circle";
import Rings from "@/components/Rings";
import { useState } from "react";
import Title from "@/components/Title";
import { useCursorTarget } from "@/hooks";

const Container = (props) => {
  return (
    <div
      className="bg-white w-screen h-screen flex flex-col items-center justify-center"
      {...props}
    ></div>
  );
};

function App() {
  const [beingHovered, setBeingHovered] = useState(false);
  const { ref, hovering } = useCursorTarget();

  const followers = [8, 6, 4];

  return (
    <Container>
      <Title
        ref={ref}
        beingHovered={beingHovered}
        setBeingHovered={setBeingHovered}
      >
        brrrp
      </Title>
      <svg
        className="w-80"
        viewBox="0 0 400 400"
        stroke="#000000"
        fill="none"
        ref={ref}
        onMouseOver={() => setBeingHovered(true)}
        onMouseLeave={() => setBeingHovered(false)}
      >
        <Circle stroke="2" />
        <Rings stroke="2" />
      </svg>
      <Cursor followers={followers} hoveringTarget={hovering} />
    </Container>
  );
}

export default App;
