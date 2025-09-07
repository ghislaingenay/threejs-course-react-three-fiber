import THREE from "@definitions/three";
import { OrbitControls, useHelper } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useRef } from "react";

export default function EnvStaging() {
  const cube = useRef<THREE.Object3D | THREE.Mesh>(null!);
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);

  // useHelper is a hook that adds a helper to the scene
  // useHelper(ref, helperType, size)
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1.0);

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls />

      <directionalLight
        ref={directionalLightRef}
        position={[1, 2, 3]}
        intensity={4.5}
      />
      <ambientLight intensity={1.5} />

      <mesh position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh ref={cube} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
