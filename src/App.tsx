import Experience from "@components/experience";
import "./App.css";
import { Canvas, type CameraProps } from "@react-three/fiber";
import THREE from "@definitions/three";
import Drei from "@components/drei";

function App() {
  const cameraSettings = {
    fov: 45,
    near: 0.1,
    far: 200,
    position: [3, 2, 6],
  } satisfies CameraProps;
  return (
    <Canvas
      dpr={[1, 2]} // set pixel ratio
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      camera={cameraSettings}
    >
      <Drei />
    </Canvas>
  );
}

export default App;
