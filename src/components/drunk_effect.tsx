import { BlendFunction, Effect } from "postprocessing";
import type { ComponentPropsWithRef, JSX } from "react";
import THREE from "@definitions/three";
const { Uniform } = THREE;
export type DrunkEffectProps = JSX.IntrinsicElements["primitive"] & {
  frequency: number;
  amplitude: number;
  offset?: number;
  ref: React.Ref<ComponentPropsWithRef<"primitive">>;
};

export class DrunkEffect extends Effect {
  private static fragmentShader = /* glsl */ `
  uniform float frequency;
  uniform float amplitude;
  uniform float offset;
  // mainUv: function that modifies the uv coordinates before they are sent to mainImage.
  void mainUv(inout vec2 uv) {
    uv.y += sin(uv.x * 10.0) * 0.1;
  }
  // in: means that it’s a copy of the actual variable and changing it won’t affect the initial variable sent when calling the function.
  // out means that changing this value will change the variable sent when calling the function.
    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
     // inputColor contains the current color for that pixel which is defined by the previous effects.
     // uv contains the render coordinates (from 0,0 at the bottom left corner to 1,1 in the top right corner).
     // // outputColor is what we need to change in order to apply the effect.
      vec4 color = inputColor;
      color.rgb *= vec3(0.8,1.0,0.5); // only keep the green channel
 
      // frequency: how many waves in the screen space
      // amplitude: how strong is the distortion

      vec2 uv2 = uv;
      uv2.y += sin(uv.x * frequency) * amplitude;
      uv2.x += cos(uv.y * frequency) * amplitude;
      outputColor = vec4(color.rgb, inputColor.a);
    }
  `;

  constructor(
    props: Pick<DrunkEffectProps, "frequency" | "amplitude">,
    blendFunction?: BlendFunction
  ) {
    super("DrunkEffect", DrunkEffect.fragmentShader, {
      blendFunction: blendFunction ?? BlendFunction.SRC,
      uniforms: new Map([
        ["frequency", new Uniform(props.frequency)],
        ["amplitude", new Uniform(props.amplitude)],
        ["offset", new Uniform(0)],
      ]),
    });
  }

  update(
    renderer: THREE.WebGLRenderer,
    inputBuffer: THREE.WebGLRenderTarget,
    deltaTime?: number
  ): void {
    (this.uniforms.get("offset") as THREE.IUniform).value += deltaTime!;
    // super.update(renderer, inputBuffer, deltaTime);
  }
}

export default function Drunk({
  frequency,
  amplitude,
  ref,
  ...rest
}: Omit<DrunkEffectProps, "object">) {
  const effect = new DrunkEffect({ frequency, amplitude }, rest.blendFunction);

  return <primitive ref={ref} {...rest} object={effect} />;
}
