"use client";

import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function PostProcessingEffects() {
  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.35}
        luminanceSmoothing={0.7}
        mipmapBlur={false}
      />
    </EffectComposer>
  );
}
