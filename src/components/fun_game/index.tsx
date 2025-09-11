import { Float, Text } from "@react-three/drei";
import Lights from "./lights";
import Level from "./level";
import { Physics } from "@react-three/rapier";
import Player from "./player";

export default function FunGameExperience() {
  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <color args={["#bdedfc"]} attach="background" />
      <Physics>
        <Lights />
        <Level />
        <Player />
      </Physics>
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          font="/fonts/bebas-neue-v9-latin-regular.woff"
          scale={0.5}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0.75, 0.65, 0]}
          rotation-y={-0.25}
        >
          Marble Race
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
    </>
  );
}
