// import Experience from "@components/experience";
import "./App.css";
import { Canvas, type CameraProps } from "@react-three/fiber";
import THREE from "@definitions/three";
import FunGameExperience from "@components/fun_game";
import { KeyboardControls } from "@react-three/drei";

function App() {
  const cameraSettings = {
    fov: 45,
    near: 0.1,
    far: 200,
    position: [3, 2, 6],
  } satisfies CameraProps;
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas
        className="r3f"
        flat // disable dpr and antialias
        shadows // enable shadows in renderer
        dpr={[1, 2]} // set pixel ratio
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        // Update backgrund color
        // 1.Update html backgroud-color in CSS
        // 2. Update the rendered => chck App.tsx
        // onCreated={(state) => {
        //   state.gl.setClearColor("#171717", 1);
        //   // or
        //   state.scene.background = new THREE.Color("#171717");
        // }}
        camera={cameraSettings}
      >
        {/* Attach to a parent to a property */}
        {/* <color attach="background" args={[new THREE.Color("#171717")]} /> */}
        <FunGameExperience />
      </Canvas>
    </KeyboardControls>
  );
}

export default App;
