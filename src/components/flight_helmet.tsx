import { useGLTF, Clone } from "@react-three/drei";
// import { useLoader } from "@react-three/fiber";
import type { JSX } from "react";
// import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";

export default function FlighHelmet() {
  // const model = useLoader(
  //   GLTFLoader,
  //   "/load_models/FlightHelmet/glTF/FlightHelmet.gltf",
  //   (loader) => {
  //     const dracoLoader = new DRACOLoader();
  //     dracoLoader.setDecoderPath("/src/draco/");
  //     loader.setDRACOLoader(dracoLoader);
  //     return loader;
  //   }
  // );

  const model = useGLTF("/load_models/FlightHelmet/glTF/FlightHelmet.gltf");

  return (
    <>
      <Clone object={model.scene} scale={5} position-y={-1} />
      <Clone object={model.scene} scale={5} position-x={-4} />
      <Clone object={model.scene} scale={5} position-x={4} />
    </>
  );
}

useGLTF.preload("/load_models/FlightHelmet/glTF/FlightHelmet.gltf");

//
export function Placeholder(props: JSX.IntrinsicElements["mesh"]) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
      <meshBasicMaterial wireframe color="red" />
    </mesh>
  );
}
