import { useGLTF, useAnimations } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect } from "react";

export default function Fox() {
  const model = useGLTF("/load_models/Fox/glTF/Fox.gltf");

  const animations = useAnimations(model.animations, model.scene);

  const { animation } = useControls({
    animation: {
      options: Object.keys(animations.actions),
      value: "Survey",
    },
  });

  useEffect(() => {
    const action = animations.actions[animation];
    if (!action) return;
    action.reset().fadeIn(0.5).play();

    // Fade out the previous action

    return () => {
      action.fadeOut(0.5);
    };
  }, [animation]);

  return <primitive object={model.scene} scale={0.02} position-y={-1} />;
}

useGLTF.preload("/load_models/Fox/glTF/Fox.gltf");
