import THREE from "@definitions/three";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import useGame from "@/stores/use_game";

export default function Player() {
  const body = useRef<RapierRigidBody>(null!);
  // const { rapier, world } = useRapier();
  const [subscribeKeys, getKeys] = useKeyboardControls();

  const startGame = useGame((state) => state.start);
  const endGame = useGame((state) => state.end);
  const blocksCount = useGame((state) => state.blocksCount);
  const restart = useGame((state) => state.restart);

  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  const jump = () => {
    if (!body.current) return;
    //     const origin = body.current.translation();
    //     origin.y -= 0.31; // slightly below the ball
    //     const direction = { x: 0, y: -1, z: 0 };
    //     const ray = new rapier.Ray(origin, direction);
    //     const hit = world.castRay(ray, 10, true); // 10 is the max distance for the ray
    //  if(hit.timeOfImpact < 0.15)
    //         body.current.applyImpulse({ x: 0, y: 0.5, z: 0 })
    // if (!hit) return; // don't jump if we're not on the ground
    // check if we're falling or not
    const velocity = body.current.linvel();
    if (Math.abs(velocity.y) > 0.05) return; // don't jump if we're not on the ground
    body.current.applyImpulse({ x: 0, y: 0.5, z: 0 }, true);
  };

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => {
        return state.jump;
      },
      (value) => {
        if (value) jump();
      }
    );

    const unsubscribeAny = subscribeKeys(() => {
      startGame();
    });
    return () => {
      unsubscribeJump();
      unsubscribeAny();
    };
  }, [subscribeKeys]);
  useFrame((state, delta) => {
    if (!body.current) return;
    const { forward, backward, leftward, rightward } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    body.current.applyImpulse(impulse, true);
    body.current.applyTorqueImpulse(torque, true);

    // Camrera follow the player
    const bodyPosition = body.current.translation();
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;
    //  set a Vector3 for where the camera is going to look and we want it to focus its attention slightly above the marble.
    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    //  the camera will get slightly closer to where it’s supposed to be and it’ll keep doing that on each frame.
    // or linear interpolation
    smoothedCameraPosition.lerp(cameraPosition, 5 * delta); // the value will get  5 * delta closer to the destination.
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(cameraTarget);

    if (bodyPosition.z < -(blocksCount * 4 + 2)) endGame();

    if (bodyPosition.y < -4) restart();
  });

  const reset = () => {
    if (!body.current) return;
    body.current.setTranslation({ x: 0, y: 1, z: 0 }, true); //put it back at the origin
    body.current.setLinvel({ x: 0, y: 0, z: 0 }, true); // remove any translation force
    body.current.setAngvel({ x: 0, y: 0, z: 0 }, true); // remove any angular force
  };

  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ready") reset();
      }
    );

    return () => {
      unsubscribeReset();
      // ...
    };
  }, []);
  return (
    <RigidBody
      ref={body}
      colliders="ball"
      restitution={0.2}
      friction={1}
      position={[0, 1, 0]}
      canSleep={false}
      linearDamping={0.5} // want the marble to slow down on its own without having to bump into walls or obstacles.
      angularDamping={0.5}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color="mediumpurple" />
      </mesh>
    </RigidBody>
  );
}
