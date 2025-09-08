import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  Bloom,
  EffectComposer,
  Glitch,
  DepthOfField,
  Noise,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { ToneMappingMode, BlendFunction, GlitchMode } from "postprocessing";
import THREE from "@definitions/three";
import Drunk from "./drunk_effect";
import { useEffect, useRef, type JSX } from "react";
import { useControls } from "leva";
export default function PostProcessing() {
  const drunkRef = useRef<JSX.IntrinsicElements["primitive"]>(null!);

  const drunkProps = useControls("Drunk Effect", {
    frequency: { value: 2, min: 0, max: 20, step: 0.1 },
    amplitude: { value: 0.1, min: 0, max: 1, step: 0.01 },
  });

  useEffect(() => {
    console.log(drunkRef.current);
  }, []);

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <EffectComposer multisampling={8}>
        {/* <Vignette
          blendFunction={BlendFunction.MULTIPLY}
          eskil={false}
          offset={0.1}
          opacity={0.9}
          darkness={1.1}
        /> */}
        {/* <Glitch
          mode={GlitchMode.SPORADIC}
          delay={new THREE.Vector2(0.5, 1)}
          duration={new THREE.Vector2(0.1, 0.3)}
          strength={new THREE.Vector2(0.1, 0.1)}
        /> */}
        {/* <Noise
          opacity={0.025}
          premultipliedOpacity={0.5}
          blendFunction={BlendFunction.SOFT_LIGHT}
        />
        <Bloom mipmapBlur luminanceThreshold={1.1} /> */}
        {/* <DepthOfField
          // clip-space from 0 to 1
          focusDistance={0.025}
          focalLength={0.025}
          bokehScale={6}
          height={480}
        /> */}
        <Drunk
          ref={drunkRef}
          {...drunkProps}
          blendFunction={BlendFunction.DARKEN}
        />

        {/* Keep at the end */}
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial
          // color={new THREE.Color(1.5, 1, 4)}
          emissive="orange"
          emissiveIntensity={2}
          // emissive
          color={new THREE.Color("orange")}
        />
        {/* <meshBasicMaterial
          color={new THREE.Color(1.5, 1, 4)}
          toneMapped={false}
        /> */}
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
