import React, { Suspense } from "react";
import { useGLTF, Float } from "@react-three/drei";

/**
 * Component to load a Blender model (GLB)
 * @param {string} url - Path to the .glb file in the public folder
 */
export function ImportedModel({ url, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, animate = false }) {
    // We use Suspense in the parent to handle loading
    const { scene } = useGLTF(url);

    const content = (
        <primitive
            object={scene}
            position={position}
            rotation={rotation}
            scale={scale}
        />
    );

    if (animate) {
        return (
            <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
                {content}
            </Float>
        );
    }

    return content;
}

// Pre-load the model if you have a specific one (uncomment and change path)
// useGLTF.preload("/models/your_model.glb");
