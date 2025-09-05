import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
} from "@react-three/drei";
import { useRef } from "react";
import THREE from "@definitions/three";

export default function Drei() {
  const cube = useRef<THREE.Object3D | THREE.Mesh>(null!);
  const sphere = useRef<THREE.Object3D | THREE.Mesh>(null!);

  return (
    <>
      <OrbitControls makeDefault enableDamping={false} />
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={2}
        axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
      >
        <mesh position-x={-2} ref={sphere}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html
            center
            wrapperClass="label"
            position={[1, 1, 0]}
            distanceFactor={8}
            occlude={[sphere, cube]}
          >
            That's a sphere 👍
          </Html>
        </mesh>
      </PivotControls>

      <mesh ref={cube} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls object={cube} mode="rotate" />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
