import React, { useLayoutEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Screw({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
    const groupRef = useRef();
    const headRef = useRef();
    const shaftRef = useRef();
    const threadsRef = useRef();

    useLayoutEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });

        // Rotation Animation only
        tl.to(groupRef.current.rotation, { x: Math.PI / 4, y: Math.PI / 3, duration: 4 }, 0);

        return () => {
            if (tl.scrollTrigger) tl.scrollTrigger.kill();
        };
    }, []);

    // Create a metallic material
    const material = new THREE.MeshStandardMaterial({
        color: '#888888',
        metalness: 1,
        roughness: 0.2,
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
            {/* Head */}
            <mesh ref={headRef} position={[0, 1.8, 0]} castShadow receiveShadow material={material}>
                <cylinderGeometry args={[0.8, 0.8, 0.6, 6]} />
            </mesh>
            {/* Shaft */}
            <mesh ref={shaftRef} position={[0, 0, 0]} castShadow receiveShadow material={material}>
                <cylinderGeometry args={[0.35, 0.35, 3, 32]} />
            </mesh>
            {/* Threads Group */}
            <group ref={threadsRef}>
                {Array.from({ length: 15 }).map((_, i) => (
                    <mesh key={i} position={[0, -1.2 + (i * 0.15), 0]} rotation={[Math.PI / 2, 0, 0]} material={material}>
                        <torusGeometry args={[0.36, 0.02, 16, 32]} />
                    </mesh>
                ))}
            </group>
        </group>
    );
}



// Improved Nut using shape
function FloatingNut() {
    // mesh ref removed

    // Create a Hexagon shape with a hole
    const shape = new THREE.Shape();
    const radius = 1;
    for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
    }
    const hole = new THREE.Path();
    hole.absarc(0, 0, 0.5, 0, Math.PI * 2, false);
    shape.holes.push(hole);

    const extrudeSettings = { depth: 0.6, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 };

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh position={[1.5, 0, 0.5]} rotation={[1, 0.5, 0]} scale={0.5}>
                <extrudeGeometry args={[shape, extrudeSettings]} />
                <meshStandardMaterial color="#FF6B00" metalness={0.8} roughness={0.2} />
            </mesh>
        </Float>
    )
}




export default function Experience() {
    const group = useRef();
    const { camera } = useThree();

    useLayoutEffect(() => {
        // GSAP Intro Animation
        gsap.from(camera.position, {
            z: 10,
            y: 5,
            duration: 2.5,
            ease: "power3.out"
        });

        gsap.to(group.current.rotation, {
            y: Math.PI * 2,
            duration: 20,
            repeat: -1,
            ease: "none"
        });
    }, [camera.position]);

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00A8E8" />

            <group ref={group}>
                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Screw position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 6]} scale={0.4} />
                </Float>
                <FloatingNut />



                {/* Background Particles or Abstract primitives */}
                <Float speed={1} rotationIntensity={2} floatIntensity={0.2}>
                    <mesh position={[-2, 1, -1]}>
                        <boxGeometry args={[0.3, 0.3, 0.3]} />
                        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.1} />
                    </mesh>
                </Float>
                <Float speed={1} rotationIntensity={2} floatIntensity={0.2}>
                    <mesh position={[2, -1, -0.5]}>
                        <torusGeometry args={[0.3, 0.08, 16, 32]} />
                        <meshStandardMaterial color="#00A8E8" metalness={0.8} roughness={0.1} />
                    </mesh>
                </Float>
            </group>

            <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={3} far={4} resolution={64} frames={1} />
        </>
    );
}
