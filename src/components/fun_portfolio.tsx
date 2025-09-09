import {
  ContactShadows,
  Environment,
  Float,
  Html,
  PresentationControls,
  useGLTF,
  Text,
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
          <Text
            position={[2, 0.75, 0.75]}
            rotation-y={-1.25}
            font="/fonts/bangers-v20-latin-regular.woff"
            fontSize={1}
            maxWidth={2} // Line break
          >
            BRUNO SIMON
          </Text>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={"#ff6900"}
            rotation={[-0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          <primitive object={computer.scene} position-y={-1.2}>
            <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe src="https://bruno-simon.com/html/" />
            </Html>
          </primitive>
        </Float>
      </PresentationControls>
      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}
