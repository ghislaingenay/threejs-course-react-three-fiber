import THREE from "@definitions/three";
import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
} from "@react-three/drei";
import { ThreeElement, useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useMemo, useRef, useState } from "react";

export default function Text3DExperience() {
  const donutsGroup = useRef<THREE.Group>(null!);
  const donuts = useRef<THREE.Mesh[]>([]);

  const [torusGeometry, setTorusGeometry] = useState<THREE.TorusGeometry>();
  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);
  const [material, setMaterial] = useState<THREE.Material>();
  const array = useMemo(() => {
    const tempArray = Array(100)
      .fill(null)
      .map(() => ({
        position: new THREE.Vector3(
          Math.random() * 10 - 5,
          Math.random() * 10 - 5,
          Math.random() * 10 - 5
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          0
        ),
        scale: 0.2 + Math.random() * 0.2,
      }));

    console.log(tempArray);
    return tempArray;
  }, []);

  useFrame((state, delta) => {
    for (const donut of donutsGroup.current.children) {
      donut.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
      <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} />

      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          material={material}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          position-y={2}
        >
          Hello 3D Text
        </Text3D>
      </Center>
      <group ref={donutsGroup}>
        {array.map(({ position, rotation, scale }, i) => (
          <mesh
            ref={(element) => {
              if (element) donuts.current[i] = element;
            }}
            material={material}
            geometry={torusGeometry}
            position={position}
            rotation={rotation}
            scale={scale}
            key={i}
          ></mesh>
        ))}
      </group>
    </>
  );
}
