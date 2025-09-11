import THREE from "@definitions/three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { useMemo, useRef, useState, type JSX } from "react";
import useGame from "src/stores/use_game";
type BlockProps = {
  position?: JSX.IntrinsicElements["mesh"]["position"];
};

type BlockStartProps = BlockProps & {};
type BlockSpinnerProps = BlockProps & {};

// const boxGeometry = new THREE.BoxGeometry(4, 0.2, 4);
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const blockStartEndMaterial = new THREE.MeshStandardMaterial({
  color: "limegreen",
});
const trapBlockFloorMaterial = new THREE.MeshStandardMaterial({
  color: "greenyellow",
});

const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

function BlockStart({ position = [0, 0, 0] }: BlockStartProps) {
  return (
    <group position={position}>
      {/* // Move it down slightly with the position attribute so that the top
      surface is at 0 */}
      <mesh
        scale={[4, 0.2, 4]}
        geometry={boxGeometry}
        receiveShadow
        material={blockStartEndMaterial}
        position={[0, -0.1, 0]}
      />
    </group>
  );
}

/**
 * Spinner trap
 */
function BlockSpinner({ position = [0, 0, 0] }: BlockSpinnerProps) {
  const obstacleRef = useRef<RapierRigidBody>(null!);
  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacleRef.current.setNextKinematicRotation(rotation);
  });
  return (
    <group position={position}>
      {/* Floor */}
      <mesh
        geometry={boxGeometry}
        material={trapBlockFloorMaterial}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      {/* Spinner trap */}
      <RigidBody
        ref={obstacleRef}
        type="kinematicPosition"
        friction={0}
        position={[0, 0.3, 0]}
        restitution={0.2} // set friction=0 and restritution=0.2 => marble will bounce a little, without rubbing too much against the floor
      >
        <mesh
          castShadow
          receiveShadow
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
        />
      </RigidBody>
    </group>
  );
}

function BlockLimbo({ position = [0, 0, 0] }: BlockProps) {
  const obstacle = useRef<RapierRigidBody>(null!);
  const currentPosition = position as number[];
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (!obstacle.current) return;
    const time = state.clock.getElapsedTime();

    const y = Math.sin(time + timeOffset) + 1.15;

    obstacle.current.setNextKinematicTranslation({
      x: currentPosition[0],
      y: currentPosition[1] + y,
      z: currentPosition[2],
    });
  });
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={trapBlockFloorMaterial}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

function BlockAxe({ position = [0, 0, 0] }: BlockProps) {
  const obstacle = useRef<RapierRigidBody>(null!);
  const currentPosition = position as number[];

  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (!obstacle.current) return;

    const time = state.clock.getElapsedTime();

    const x = Math.cos(time + timeOffset);
    obstacle.current.setNextKinematicTranslation({
      x: currentPosition[0] + x,
      y: currentPosition[1] + 0.75,
      z: currentPosition[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={trapBlockFloorMaterial}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

function BlockEnd({ position = [0, 0, 0] }: BlockStartProps) {
  const hamburger = useGLTF("/physics/hamburger.glb");
  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });
  return (
    <group position={position}>
      {/* // Move it down slightly with the position attribute so that the top
      surface is at 0 */}
      <mesh
        scale={[4, 0.2, 4]}
        geometry={boxGeometry}
        receiveShadow
        material={blockStartEndMaterial}
        position={[0, 0, 0]}
      />
      <RigidBody
        type="fixed"
        colliders="hull"
        position={[0, 0.25, 0]}
        restitution={0.2}
        friction={0}
      >
        <primitive object={hamburger.scene} scale={0.2} />
      </RigidBody>
    </group>
  );
}

function Bounds({ length = 1 }: { length: number }) {
  return (
    <RigidBody type="fixed" restitution={0.2} friction={0}>
      <mesh
        position={[2.15, 0.75, -(length * 2) + 2]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[0.3, 1.5, 4 * length]}
        castShadow
      />
      <mesh
        position={[-2.15, 0.75, -(length * 2) + 2]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[0.3, 1.5, 4 * length]}
        receiveShadow
      />
      <mesh
        position={[0, 0.75, -(length * 4) + 2]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[4, 1.5, 0.3]}
        receiveShadow
      />
      {/* covers the entire floor. */}
      <CuboidCollider
        args={[2, 0.1, 2 * length]}
        position={[0, -0.1, -(length * 2) + 2]}
      />
    </RigidBody>
  );
}

export default function Level() {
  const count = useGame((state) => state.blocksCount);

  const types = [BlockSpinner, BlockAxe, BlockLimbo];

  const memoBlocks = useMemo(() => {
    const blocks = [];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }

    return blocks;
  }, [count, types]);
  return (
    <>
      <BlockStart position={[0, 0, 0]} />

      {memoBlocks.map((Block, index) => (
        <Block key={index} position={[0, 0, -(index + 1) * 4]} />
      ))}

      <BlockEnd position={[0, 0, -(count + 1) * 4]} />
      <Bounds length={count + 2} />
    </>
  );
}
