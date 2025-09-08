import {
  ContactShadows,
  Environment,
  Float,
  PresentationControls,
  useGLTF,
} from "@react-three/drei";

export default function FunPortfolio() {
  const computer = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );

  return (
    <>
      <Environment preset="city" />
      <color args={["#241a1a"]} attach="background" />
      {/* <OrbitControls makeDefault /> */}

      <PresentationControls
        global
        snap
        rotation={[0.13, 0.9, 0]}
        polar={[-0.4, 0.2]} // vertical rotation limit
        azimuth={[-1, 0.75]} // horizontal rotation limit
        damping={0.1}
      >
        <Float rotationIntensity={0.4}>
          <primitive object={computer.scene} position-y={-1.2} />
        </Float>
      </PresentationControls>
      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}
