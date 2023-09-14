import React from "react";
import { useSpring, animated } from "react-spring";

function AnimatedNumber({ number }) {
  const { num } = useSpring({
    from: { num: 0 },
    num: number,
    delay: 0,
    config: { mass: 2.3, tension: 18, friction: 12.5 },
  });
  return (
    <animated.div className="font-mono">{num.to((n) => n.toFixed(0))}</animated.div>
  );
}

export default AnimatedNumber;
