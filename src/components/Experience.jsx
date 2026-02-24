import React, { useLayoutEffect, useRef, useMemo, Suspense } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ImportedModel } from "./ImportedModel";

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
      {/* 1. oc1.glb */}
      <MovingItem offsetZ={-2} speed={2.5}>
        <Suspense fallback={null}>
          <ImportedModel url="/models/oc1.glb" scale={1.5} position={[-2, 1.5, 0]} animate={true} />
        </Suspense>
      </MovingItem>

      {/* 2. bua.glb */}
      <MovingItem offsetZ={-8} speed={3.0}>
        <Suspense fallback={null}>
          <ImportedModel url="/models/bua.glb" scale={0.8} position={[4, -1, 0]} animate={true} />
        </Suspense>
      </MovingItem>

      {/* 3. bua2.glb */}
      <MovingItem offsetZ={-14} speed={2.2}>
        <Suspense fallback={null}>
          <ImportedModel url="/models/bua2.glb" scale={0.7} position={[-3, -3, 0]} animate={true} />
        </Suspense>
      </MovingItem>

      {/* 4. cole.glb */}
      <MovingItem offsetZ={-5} speed={2.8}>
        <Suspense fallback={null}>
          <ImportedModel url="/models/cole.glb" scale={1.0} position={[2, 3, 0]} animate={true} />
        </Suspense>
      </MovingItem>

      {/* 5. kim.glb */}
      <MovingItem offsetZ={-11} speed={2.4}>
        <Suspense fallback={null}>
          <ImportedModel url="/models/kim.glb" scale={0.9} position={[-4, 0.5, 0]} animate={true} />
        </Suspense>
      </MovingItem>

      {/* 6. maykhoang.glb */}
      <MovingItem offsetZ={-17} speed={2.0}>
        <Suspense fallback={null}>
          <ImportedModel url="/models/maykhoang.glb" scale={1.2} position={[0, -2, 0]} animate={true} />
        </Suspense>
      </MovingItem>

      {/* 7. tovit.glb */}
      <MovingItem offsetZ={-3} speed={3.2}>
        <Suspense fallback={null}>
          <ImportedModel url="/models/tovit.glb" scale={0.8} position={[3, 1, 0]} animate={true} />
        </Suspense>
      </MovingItem>

      {/* 8. xabeng.glb */}
      <MovingItem offsetZ={-9} speed={2.6}>
        <Suspense fallback={null}>
          <ImportedModel url="/models/xabeng.glb" scale={1.1} position={[-1, 4, 0]} animate={true} />
        </Suspense>
      </MovingItem>
    </group>
  );
}
