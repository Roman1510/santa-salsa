import { ScrollControls, useDepthBuffer } from "@react-three/drei";
import { useMemo } from "react";
import { randFloat } from "three/src/math/MathUtils";
import { Tree } from "./Tree";
import { Gift } from "./Gift";
import { Stage } from "./Stage";
import { Salsa } from "./Salsa";
import { MovingSpot } from "./MovingSpot";

const GIFTS_NBR = 35;
const GIFTS_DISPERSION = 12;
const GIFTS_DEPTH = 2;

const generateRandomGifts = () => {
  const gifts = [];
  for (let i = 0; i < GIFTS_NBR; i++) {
    const scale = randFloat(0.4, 1.2);
    gifts.push({
      scale: [scale, scale, scale],
      position: [
        randFloat(-GIFTS_DISPERSION, GIFTS_DISPERSION),
        randFloat(-GIFTS_DISPERSION, GIFTS_DISPERSION),
        randFloat(-GIFTS_DISPERSION - GIFTS_DEPTH, -GIFTS_DEPTH),
      ],
      rotation: [
        randFloat(-Math.PI, Math.PI),
        randFloat(-Math.PI, Math.PI),
        randFloat(-Math.PI, Math.PI),
      ],
    });
  }
  return gifts;
};

const Gifts = (props) => {
  const randomGifts = useMemo(() => generateRandomGifts(), []);

  return (
    <group {...props}>
      {randomGifts.map((gift, index) => (
        <Gift
          key={index}
          position={gift.position}
          scale={gift.scale}
          rotation={gift.rotation}
        />
      ))}
    </group>
  );
};

export const Scene = () => {
  const depthBuffer = useDepthBuffer({ frames: 1 });

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight intensity={1.2} color={"#bd8adf"} position={[-5, 3, 5]} />
      <directionalLight intensity={0.8} color={"#FF0000"} position={[-3, 3, -5]} />
      <MovingSpot depthBuffer={depthBuffer} color="#92ced1" position={[-2, 5, 26]} />
      <ScrollControls pages={2}>
        <Tree receiveShadow position={[2, -3, 2]} />
        <group position={[-3, 3, 0]}>
          <Gifts />
        </group>
        <Salsa receiveShadow animationIndex={0} position={[-12, -3, 3]} scale={[180, 180, 180]} />
        <Stage receiveShadow position={[0, -34, -20]} rotation={[Math.PI / 2, 0, 0]} />
      </ScrollControls>
    </>
  );
};
