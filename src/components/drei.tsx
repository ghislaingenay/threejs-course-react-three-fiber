import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  Float,
  Text,
  MeshReflectorMaterial,
  useHelper,
} from "@react-three/drei";
import { useEffect, useRef } from "react";
import THREE from "@definitions/three";
import { useControls, button } from "leva";
import { Perf } from "r3f-perf";

export default function Drei() {
  const cube = useRef<THREE.Object3D | THREE.Mesh>(null!);
  const sphere = useRef<THREE.Object3D | THREE.Mesh>(null!);

  const {
    position: pos,
    color,
    visible,
    perfVisible,
  } = useControls({
    color: "#ff0000",
    // can set an interval which is like a range but with two cursors
    myInterval: {
      min: 0,
      max: 10,
      value: [4, 5],
    },
    position: {
      value: { x: -2, y: 0 },
      step: 0.01,
      joystick: "invertY",
    },
    clickMe: button(() => {
      console.log("ok");
    }),
    visible: true,
    perfVisible: true,
  });

  return (
    <>
      {perfVisible && <Perf position="top-left" />}
      <OrbitControls makeDefault enableDamping={false} />
      <directionalLight position={[1, 2, 3]} intensity={4.5} />

      <ambientLight intensity={1.5} />

      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={2}
        axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
      >
        <mesh
          visible={visible}
          ref={sphere}
          position={pos && [pos.x, pos.y, 0]}
        >
          <sphereGeometry />
          <meshStandardMaterial color={color} />
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
        <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1} // mixBlur to 1 to make the reflection blurry:
          mirror={0.5} // make the reflection clearer
          color="greenyellow"
        />
      </mesh>
      <Float speed={5} floatIntensity={2} rotationIntensity={5}>
        <Text
          position-y={2}
          fontSize={3}
          maxWidth={2}
          textAlign="center"
          color="salmon"
          font="/bangers-v20-latin-regular.woff"
        >
          I LOVE R3F
          {/* <meshNormalMaterial /> */}
        </Text>
      </Float>
    </>
  );
}
