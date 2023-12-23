import {
  MeshReflectorMaterial,
  RoundedBox,
  useScroll,
} from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import backgroundTexture from "../assets/4734550.jpg";

export const Stage = (props) => {
  const ref = useRef();
  const scroll = useScroll();
  const tl = useRef();

  const texture = useLoader(TextureLoader, backgroundTexture);

  useFrame(() => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();
    tl.current.to(ref.current.position, { duration: 3, x: 0, y: -10, z: 0 }, 0);
    tl.current.to(ref.current.rotation, { duration: 4, x: 0, y: 0, z: 0 }, 0);
    tl.current.to(
      ref.current.position,
      { duration: 1, x: 0, y: -3.5, z: 2 },
      3
    );
  }, []);

  return (
    <group {...props} ref={ref}>
      <RoundedBox smoothness={10} radius={0.03} scale={[14, 1, 8]}>
        <meshStandardMaterial map={texture} />
      </RoundedBox>
    </group>
  );
};
