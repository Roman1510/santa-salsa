import {
  MeshReflectorMaterial,
  RoundedBox,
  useScroll,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

export const Stage = (props) => {
  const ref = useRef();
  const scroll = useScroll();
  const tl = useRef();

  useFrame(() => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();
    tl.current.to(ref.current.position, { duration: 3, x: -20, y: -55, z: 0 }, 0);
    tl.current.to(ref.current.rotation, { duration: 4, x: 0, y: 0, z: 0 }, 0);
    tl.current.to(
      ref.current.position,
      { duration: 2, x: 0, y: -3.5, z: 2 },
      3
    );
  }, []);

  return (
    <group {...props} ref={ref}>
      <RoundedBox smoothness={8} radius={0.5} scale={[14, 0.5, 10]}>
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={50}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#24406b"
          metalness={0.2}
        />
      </RoundedBox>
    </group>
  );
};
