/* eslint-disable react-hooks/exhaustive-deps */
import THREE from "@definitions/three";
import {
  extend,
  useFrame,
  // useThree,
} from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function CustomObject() {
  const geometryRef = useRef<THREE.BufferGeometry>(null!);
  const verticesCount = 10 * 3;

  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < verticesCount * 3; i++)
      positions[i] = (Math.random() - 0.5) * 3;

    return positions;
  }, []);

  useEffect(() => {
    geometryRef.current.computeVertexNormals();
  }, [positions]);
  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={verticesCount}
          itemSize={3}
        />
      </bufferGeometry>
      <meshBasicMaterial color="red" side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function Experience() {
  // const { camera, gl } = useThree();

  extend({ OrbitControls });
  const sphereRef = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
    console.log(angle);
    state.camera.position.x = Math.sin(angle) * 8;
    state.camera.position.z = Math.cos(angle) * 8;
    state.camera.lookAt(0, 0, 0);
    // Rotate the sphere
    sphereRef.current.position.x += 0.001 * delta;
  });
  return (
    <>
      {/* <orbitControls args={[camera, gl.domElement]} /> */}
      <ambientLight intensity={1.5} />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <CustomObject />
      <mesh ref={sphereRef} position-x={2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh
        position={new THREE.Vector3(-2, -1, 0)}
        scale={12}
        rotation-x={-Math.PI / 2}
      >
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </>
  );
}
