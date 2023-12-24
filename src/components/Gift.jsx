import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useMemo, useRef, useState } from "react";
import { randFloat, randInt } from "three/src/math/MathUtils";
import * as THREE from "three";

const randomColor = () => ["red", "blue", "yellow", "pink","green"][randInt(0, 4)];

export function Gift(props) {
  const scroll = useScroll();
  const ref = useRef();
  const { nodes, materials } = useGLTF("./models/gift.gltf");
  const rotationSpeed = useMemo(() => randFloat(0.1, 1.2), []);
  const [initialPosition] = useState(props.position);
  const [initialScale] = useState(props.scale);

  useFrame((_state, delta) => {
    ref.current.rotation.y += delta * rotationSpeed;
    ref.current.position.set(
      initialPosition[0] * scroll.offset * 1.3,
      initialPosition[1] * scroll.offset * 1.3,
      initialPosition[2] * scroll.offset * 1.3
    );
    ref.current.scale.set(
      Math.min(initialScale[0], initialScale[0] * scroll.offset * 3),
      Math.min(initialScale[1], initialScale[1] * scroll.offset * 3),
      Math.min(initialScale[2], initialScale[2] * scroll.offset * 3)
    );
  });

  const giftMaterial = useMemo(
    () => {
      const material = new THREE.MeshStandardMaterial();
      material.color = new THREE.Color(randomColor());
      return material;
    },
    [] // Memoize the material creation function
  );

  return (
    <group {...props} ref={ref} dispose={null}>
      <mesh geometry={nodes.Gift.geometry} material={giftMaterial}>
        {["NurbsPath", "NurbsPath001"].map((nodeName, index) => (
          <mesh
            key={index}
            geometry={nodes[nodeName].geometry}
            material={materials.Palette}
            position={index === 0 ? [-0.5, 0.4, -0.18] : [-0.09, 0.4, 0.52]}
            rotation={index === 1 ? [-Math.PI, 1.39, -Math.PI] : undefined}
            scale={0.49}
          />
        ))}
        {["ribbons", "topribbons"].map((nodeName, index) => (
          <mesh
            key={index}
            geometry={nodes[nodeName].geometry}
            material={materials.Palette}
            position={index === 1 ? [0.01, 0.67, -0.01] : undefined}
            rotation={index === 1 ? [0, -Math.PI / 4, 0] : undefined}
            scale={0.49}
          />
        ))}
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/gift.gltf");
