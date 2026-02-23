import React, { useLayoutEffect, useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { RealisticScrew, RealisticNut, WingNut, LagScrew, SelfTappingScrew } from "./RealisticHardware";
import { Hammer, Screwdriver, Wrench } from "./RealisticTools";

gsap.registerPlugin(ScrollTrigger);




/* ---------- MAIN EXPERIENCE ---------- */

export default function Experience() {
  const timeline = useRef();
  const { camera } = useThree();

  useLayoutEffect(() => {
    camera.position.set(0, 0, 5.5);
    camera.fov = 35;
    camera.updateProjectionMatrix();

    timeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
    });

    timeline.current
      .to(camera.position, {
        x: 0.4,
        y: 0.2,
        z: 5.2,
        ease: "power3.out",
      })
      .to(
        camera.position,
        {
          x: 0,
          y: 0,
          z: 5.5,
          ease: "power2.out",
        },
        "+=0.4",
      );

    return () => {
      timeline.current?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [camera]);

  return (
    <>
      {/* LIGHTING */}
      <ambientLight intensity={0.8} />

      <directionalLight
        position={[12, 15, 8]}
        intensity={3.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <pointLight position={[-8, 6, -6]} intensity={0.6} />
      <pointLight position={[6, -4, 4]} intensity={0.4} />

      {/* ENV */}
      <Environment preset="warehouse" />

      {/* SHADOWS */}
      <ContactShadows
        position={[0, -3.6, 0]}
        opacity={0.4}
        scale={14}
        blur={6}
        far={6}
      />

      {/* Floating Hardware Elements - Flying Forward */}
      <FlowingHardware />


    </>
  );
}

function MovingItem({ children, offsetZ = 0, speed = 3, xRange = 8, yRange = 6 }) {
  const ref = useRef();
  // Store current speed in a ref so we can vary it per loop without re-rendering
  const currentSpeed = useRef(speed);

  const startZ = -15;
  const endZ = 10;

  useFrame((state, delta) => {
    if (ref.current) {
      // Move forward
      ref.current.position.z += delta * currentSpeed.current;

      // Reset loop
      if (ref.current.position.z > endZ) {
        ref.current.position.z = startZ;

        // Randomize X and Y to create new trajectory
        ref.current.position.x = (Math.random() - 0.5) * xRange;
        ref.current.position.y = (Math.random() - 0.5) * yRange;

        // Randomize speed slightly (+- 20%) to prevent synchronization
        currentSpeed.current = speed * (0.8 + Math.random() * 0.4);

        // Randomize rotation
        ref.current.rotation.x = Math.random() * Math.PI * 2;
        ref.current.rotation.y = Math.random() * Math.PI * 2;
        ref.current.rotation.z = Math.random() * Math.PI * 2;
      }
    }
  });

  return (
    <group ref={ref} position={[0, 0, offsetZ]}>
      {children}
    </group>
  );
}

function FlowingHardware() {
  return (
    <group rotation={[0, 0, 0]}>
      {/* 
          Wrap Float inside MovingItem so they bob while moving. 
          We spread them out on X/Y initially.
          offsetZ adjusts their initial position in the loop.
      */}

      {/* Item 1: Large Lag Screw */}
      <MovingItem offsetZ={-2} speed={2.5}>
        <Float speed={2} rotationIntensity={2} floatIntensity={2}>
          <LagScrew position={[-6, 3, 0]} rotation={[0.5, 1, 0.2]} scale={0.7} />
        </Float>
      </MovingItem>

      {/* Item 2: Wing Nut */}
      <MovingItem offsetZ={-8} speed={3}>
        <Float speed={2} rotationIntensity={2} floatIntensity={2}>
          <WingNut position={[7, -3, 0]} rotation={[-0.5, 0.5, 0]} scale={0.8} />
        </Float>
      </MovingItem>

      {/* Item 3: Self Tapping Screw */}
      <MovingItem offsetZ={-14} speed={2.8}>
        <Float speed={2} rotationIntensity={2} floatIntensity={2}>
          <SelfTappingScrew position={[-2, 5, 0]} rotation={[1, 0, 1]} scale={0.6} />
        </Float>
      </MovingItem>

      {/* --- TOOLS --- */}

      {/* Item 3: Hammer */}
      <MovingItem offsetZ={-4} speed={2.0}>
        <Float speed={1.5} rotationIntensity={1.5}>
          <Hammer position={[-4, -2, 0]} rotation={[0, 0, Math.PI / 4]} scale={0.8} />
        </Float>
      </MovingItem>

      {/* Item 4: Screwdriver (Phillips) */}
      <MovingItem offsetZ={-12} speed={3.2}>
        <Float speed={2.5} rotationIntensity={2}>
          <Screwdriver position={[6, 2, 0]} rotation={[1, 1, 0]} scale={0.8} type="phillips" />
        </Float>
      </MovingItem>

      {/* Item 5: Wrench */}
      <MovingItem offsetZ={-16} speed={2.4}>
        <Float speed={2} rotationIntensity={2}>
          <Wrench position={[-3, 4, 0]} rotation={[0.5, 0.5, 0]} scale={0.8} />
        </Float>
      </MovingItem>
    </group>
  );
}
