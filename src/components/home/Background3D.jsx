import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import Experience from "../Experience";

const Background3D = React.memo(() => (
  <div
    className="home-3d"
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 0,
      pointerEvents: "none",
    }}
  >
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ 
        antialias: false, 
        alpha: true, 
        powerPreference: "high-performance",
        stencil: false,
        depth: true
      }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
    >
      <AdaptiveDpr pixelated />
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
    </Canvas>
  </div>
));

export default Background3D;
