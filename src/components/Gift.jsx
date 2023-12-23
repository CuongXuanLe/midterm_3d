import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useMemo, useRef, useState } from "react";
import { randFloat, randInt } from "three/src/math/MathUtils";

import * as THREE from "three";

export function Gift(props) {
  const scroll = useScroll();
  const ref = useRef();
  const { nodes, materials } = useGLTF("./models/gift.gltf");
  const rotationSpeed = useMemo(() => {
    return randFloat(0.4, 1.2);
  }, []);
  const [initialPosition] = useState(props.position);
  const [initialScale] = useState(props.scale);
  useFrame((_state, delta) => {
    ref.current.rotation.y += delta * rotationSpeed;
    ref.current.position.x = initialPosition[0] * scroll.offset * 1.3;
    ref.current.position.y = initialPosition[1] * scroll.offset * 1.3;
    ref.current.position.z = initialPosition[2] * scroll.offset * 1.3;

    ref.current.scale.x = Math.min(
      initialScale[0],
      initialScale[0] * scroll.offset * 3
    );
    ref.current.scale.y = Math.min(
      initialScale[1],
      initialScale[1] * scroll.offset * 3
    );
    ref.current.scale.z = Math.min(
      initialScale[2],
      initialScale[2] * scroll.offset * 3
    );
  });

  const giftMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial();
    material.color = new THREE.Color(
      ["red", "blue", "yellow", "pink"][randInt(0, 3)]
    );
    return material;
  });

  return (
    <group {...props} ref={ref} dispose={null}>
      <mesh geometry={nodes.Gift.geometry} material={giftMaterial}>
        <mesh
          geometry={nodes.NurbsPath.geometry}
          material={materials.Palette}
          position={[-0.5, 0.4, -0.18]}
          scale={0.49}
        />
        <mesh
          geometry={nodes.NurbsPath001.geometry}
          material={materials.Palette}
          position={[-0.09, 0.4, 0.52]}
          rotation={[-Math.PI, 1.39, -Math.PI]}
          scale={0.49}
        />
        <mesh
          geometry={nodes.ribbons.geometry}
          material={materials.Palette}
          scale={0.49}
        />
        <mesh
          geometry={nodes.topribbons.geometry}
          material={materials.Palette}
          position={[0.01, 0.67, -0.01]}
          rotation={[0, -Math.PI / 4, 0]}
          scale={0.49}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/gift.gltf");
