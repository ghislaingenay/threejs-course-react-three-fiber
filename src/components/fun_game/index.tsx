import { OrbitControls } from "@react-three/drei";
import Lights from "./lights";
import Level from "./level";
import { Physics } from "@react-three/rapier";
import Player from "./player";

export default function FunGameExperience() {
  return (
    <>
      {/* <OrbitControls makeDefault /> */}

      <Physics>
        <Lights />
        <Level />
        <Player />
      </Physics>
    </>
  );
}
