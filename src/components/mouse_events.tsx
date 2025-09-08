import THREE from "@definitions/three";
import { meshBounds, OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useRef, type MouseEvent } from "react";

export default function MouseEvents() {
  const cube = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (!cube.current) return;
    cube.current.rotation.y += delta * 0.2;
  });

  const hamburger = useGLTF("/mouse_events/hamburger.glb");

  const eventHandler = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    console.log("---");
    console.log("distance", event.distance); // Distance between camera and hit point
    console.log("point", event.point); // Hit point coordinates (in 3D)
    console.log("uv", event.uv); // UV coordinates on the geometry (in 2D)
    console.log("object", event.object); // The object that triggered the event
    console.log("eventObject", event.eventObject); // The object that was listening to the event (useful where there is objects in objects)

    console.log("---");
    // console.log("x", event.x); // 2D screen coordinates of the pointer
    // console.log("y", event.y); // 2D screen coordinates of the pointer

    console.log("---");
    console.log("shiftKey", event.shiftKey); // If the SHIFT key was pressed
    console.log("ctrlKey", event.ctrlKey); // If the CTRL key was pressed
    console.log("metaKey", event.metaKey);
    (cube.current.material as THREE.MeshStandardMaterial).color.set(
      `hsl(${Math.random() * 360}, 100%, 75%)`
    );
  };

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh position-x={-2} onClick={(e) => e.stopPropagation()}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        onPointerEnter={() => {
          console.log("Pointer entered");
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
        raycast={meshBounds} // create a theoretical sphere around the mesh (called bounding sphere) and the pointer events will be tested on that sphere instead of testing the geometry of the mesh.
        onClick={eventHandler}
        ref={cube}
        position-x={2}
        scale={1.5}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        onClick={(e) => e.stopPropagation()}
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <primitive
        object={hamburger.scene}
        position-y={-1}
        scale={0.2}
        rotation-y={Math.PI * 0.5}
        onClick={(event: ThreeEvent<MouseEvent>) => {
          console.log(event.object);
          event.stopPropagation();
        }}
      />
    </>
  );
}

// Other events
