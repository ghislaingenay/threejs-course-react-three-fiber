import THREE from "@definitions/three";
import {
  OrbitControls,
  Sparkles,
  useGLTF,
  useTexture,
  Center,
  shaderMaterial,
} from "@react-three/drei";
import portalVertexShader from "./vertex.glsl";
import portalFragmentShader from "./fragment.glsl";
import { useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#000000"),
  },
  portalVertexShader,
  portalFragmentShader
);
export type { PortalMaterial };
extend({ PortalMaterial });

export default function PortalExperience() {
  const { nodes } = useGLTF("/portal/portal.glb");

  const shaderRef = useRef<THREE.ShaderMaterial>(null!);

  const bakedTexture = useTexture("/portal/baked.jpg");
  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  const poleLightAMesh = nodes.poleLightA as THREE.Mesh;
  const poleLightBMesh = nodes.poleLightB as THREE.Mesh;
  const portalLightMesh = nodes.portalLight as THREE.Mesh;

  useFrame((state, delta) => {
    if (shaderRef.current.uniforms)
      shaderRef.current.uniforms.uTime.value += delta;
  });

  return (
    <>
      <Center>
        <mesh
          geometry={poleLightAMesh.geometry}
          position={poleLightAMesh.position}
          rotation={poleLightAMesh.rotation}
          scale={poleLightAMesh.scale}
        >
          <meshBasicMaterial color="#ffffffe5" />
        </mesh>
        <mesh
          geometry={poleLightBMesh.geometry}
          position={poleLightBMesh.position}
          rotation={poleLightBMesh.rotation}
          scale={poleLightBMesh.scale}
        >
          <meshBasicMaterial color="#ffffffe5" />
        </mesh>
        <mesh
          geometry={portalLightMesh.geometry}
          position={portalLightMesh.position}
          rotation={portalLightMesh.rotation}
          scale={portalLightMesh.scale}
        >
          <portalMaterial ref={shaderRef} transparent depthWrite={false} />
        </mesh>

        <OrbitControls makeDefault />
        <mesh geometry={(nodes.baked as THREE.Mesh).geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <Sparkles
          position-y={1.2}
          size={6}
          speed={0.2}
          count={100}
          scale={new THREE.Vector3(4, 2, 4)}
        />
      </Center>
    </>
  );
}

useGLTF.preload("/portal/portal.glb");
