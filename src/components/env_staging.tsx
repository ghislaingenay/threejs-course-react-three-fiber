import THREE from "@definitions/three";
import {
  OrbitControls,
  // useHelper,
  // AccumulativeShadows,
  // BakeShadows,
  SoftShadows,
  Environment,
  // RandomizedLight,
  // Sky,
} from "@react-three/drei";
// import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { useRef } from "react";

export default function EnvStaging() {
  const cube = useRef<THREE.Object3D | THREE.Mesh>(null!);
  // const directionalLightRef = useRef<THREE.DirectionalLight>(null!);

  // const { sunPosition } = useControls("sky", {
  //   sunPosition: { value: [1, 2, 3] },
  // });

  // useHelper is a hook that adds a helper to the scene
  // useHelper(ref, helperType, size)
  // useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1.0);

  // if our sceene is static, we can use BakeShadows from drei to avoid rerender it
  return (
    <>
      {/* BakeShadows is used to bake shadows into the scene */}
      {/* It will create a shadow map that can be used to render shadows */}
      {/* It is useful for static scenes where the lights and objects don't move */}
      {/* It will improve performance by avoiding the need to recalculate shadows every frame */}
      {/* It will also improve the quality of the shadows by using a higher resolution shadow map */}
      {/* <BakeShadows /> */}

      {/* SoftShadows is used to create soft shadows */}
      {/*  size: radius of the softness
      samples: quality (more samples = less visual noise but worse performance)
      focus: distance where the shadow is the sharpest */}
      <SoftShadows size={25} samples={10} focus={0} />
      {/* Perf is a performance monitor for react-three-fiber */}
      <Perf position="top-left" />
      <OrbitControls />

      <Environment files={[]} />

      {/* <directionalLight
        ref={directionalLightRef}
        position={sunPosition}
        intensity={4.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      /> */}
      {/* <ambientLight castShadow intensity={1.5} /> */}

      {/* <Sky sunPosition={sunPosition} /> */}

      {/* <AccumulativeShadows
        temporal
        frames={1000}
        position-y={-0.99}
        scale={10}
        opacity={1}
      >
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={3}
          position={[1, 2, 3]}
          bias={0.001}
        />
      </AccumulativeShadows> */}

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow ref={cube} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
