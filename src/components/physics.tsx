import { OrbitControls, useGLTF } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  // BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
  type CollisionEnterPayload,
  // CylinderCollider,
  InstancedRigidBodies,
  type InstancedRigidBodyProps,
} from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import THREE from "@definitions/three";
export default function PhysicsExperience() {
  const cube = useRef<RapierRigidBody>(null!);
  const twister = useRef<RapierRigidBody>(null!);
  const [hitSound] = useState(() => new Audio("/physics/hit.mp3"));
  const cubeJump = () => {
    const mass = cube.current.mass();
    cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 }, true);
    cube.current.applyTorqueImpulse(
      {
        x: Math.random() - 0.5,
        y: Math.random() - 0.5,
        z: Math.random() - 0.5,
      },
      true
    );
    console.log(mass);
  };

  //   The difference between the kinematicPosition and the kinematicVelocity is how we update them.
  // For the kinematicPosition, we provide the next position and it’ll update the object velocity accordingly.
  // For the kinematicVelocity, we provide the velocity directly.

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const eulerRotation = new THREE.Euler(0, time, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);

    // setNextKinematicRotation to rotate the object.
    twister.current.setNextKinematicRotation(quaternionRotation);

    const angle = time * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    // setNextKinematicTranslation to move the object.
    twister.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z });
  });

  const collisionEnter = (event: CollisionEnterPayload) => {
    console.log("collision!", event);
    hitSound.currentTime = 0;
    hitSound.volume = Math.random();
    hitSound.play();
  };

  const hamburger = useGLTF("/physics/hamburger.glb");

  const cubes = useRef<THREE.InstancedMesh>(null!);
  const cubesCount = 100;

  useEffect(() => {
    for (let i = 0; i < cubesCount; i++) {
      const matrix = new THREE.Matrix4();
      cubes.current.setMatrixAt(i, matrix);
      matrix.compose(
        new THREE.Vector3(i * 2, 0, 0),
        new THREE.Quaternion(),
        new THREE.Vector3(1, 1, 1)
      );
      cubes.current.setMatrixAt(i, matrix);
    }
  }, []);

  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: "tomato" });

  const cubeInstances = useMemo(() => {
    const instances: InstancedRigidBodyProps[] = [];
    for (let i = 0; i < cubesCount; i++) {
      instances.push({
        key: "instance_" + i,
        position: [
          (Math.random() - 0.5) * 8,
          6 + i * 0.2,
          (Math.random() - 0.5) * 8,
        ],
        rotation: [Math.random(), Math.random(), Math.random()],
      });
    }

    return instances;
  }, []);
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <Physics debug gravity={[0, -9.81, 0]}>
        <InstancedRigidBodies instances={cubeInstances}>
          <instancedMesh
            castShadow
            ref={cubes}
            args={[boxGeometry, material, cubesCount]}
          />
        </InstancedRigidBodies>
        <RigidBody colliders="trimesh" position={[0, 4, 0]}>
          {/* <CylinderCollider args={[0.5, 1.25]} /> */}
          <primitive object={hamburger.scene} scale={0.25} />
        </RigidBody>
        <RigidBody colliders="ball">
          <mesh castShadow position={[-1.5, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>
        {/* Restitution = bounciness */}
        <RigidBody
          ref={cube}
          position={[1.5, 2, 0]}
          colliders={false}
          gravityScale={1}
          restitution={0}
          friction={0.7}
          onCollisionEnter={collisionEnter}
          onCollisionExit={() => {
            //  triggered if the object separates from another object it just collided with.
            console.log("exit");
          }}
          onSleep={() => {
            console.log("sleep");
          }}
          onWake={() => {
            console.log("wake");
          }}
        >
          <CuboidCollider mass={2} args={[0.5, 0.5, 0.5]} />
          <mesh onClick={cubeJump} castShadow position={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>
        <RigidBody
          ref={twister}
          position={[0, -0.8, 0]}
          friction={0}
          type="kinematicPosition"
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        {/* <RigidBody
          colliders={false}
          position={[0, 1, -0.25]}
          rotation={[Math.PI * 0.1, 0, 0]}
        >
          <BallCollider args={[1.5]} /> */}
        {/* <CuboidCollider args={[1.5, 1.5, 0.5]} />
          <CuboidCollider
            args={[0.25, 1, 0.25]}
            position={[0, 0, 1]}
            rotation={[-Math.PI * 0.35, 0, 0]}
          /> */}
        {/* <mesh
            castShadow
            position={[0, 1, 0]}
            rotation={[Math.PI * 0.5, 0, 0]}
          >
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>  */}

        <RigidBody type="fixed" restitution={0} friction={0.7}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
        </RigidBody>
      </Physics>
    </>
  );
}
