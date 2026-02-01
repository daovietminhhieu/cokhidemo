import React, { useMemo } from "react";
import * as THREE from "three";
import {
    generateRoughnessMap,
    generateNormalMap,
    generateThreadNormalMap,
    createDetailedThreadGeometry,
    createCoarseThreadGeometry,
    createFineThreadGeometry
} from "./RealisticUtils";

// ====================== MATERIAL HOOKS ======================
const useScrewMaterial = (color = "#888888", roughness = 0.4, metalness = 0.8) => {
    const roughnessMap = useMemo(() => generateRoughnessMap(64), []);
    const normalMap = useMemo(() => generateNormalMap(64), []);

    return useMemo(() => new THREE.MeshPhysicalMaterial({
        color: color,
        metalness: metalness,
        roughness: roughness,
        roughnessMap: roughnessMap,
        normalMap: normalMap,
        normalScale: new THREE.Vector2(0.3, 0.3),
        side: THREE.DoubleSide,
        flatShading: false
    }), [color, roughness, metalness, roughnessMap, normalMap]);
};

const useThreadMaterial = (color = "#707070") => {
    const roughnessMap = useMemo(() => generateRoughnessMap(64), []);
    const threadNormalMap = useMemo(() => generateThreadNormalMap(128), []);

    return useMemo(() => new THREE.MeshPhysicalMaterial({
        color: color,
        metalness: 0.9,
        roughness: 0.6,
        roughnessMap: roughnessMap,
        normalMap: threadNormalMap,
        normalScale: new THREE.Vector2(2.0, 2.0),
        side: THREE.DoubleSide
    }), [color, roughnessMap, threadNormalMap]);
};

// ====================== SCREW COMPONENTS ======================

// 1. Machine screw with oval head
export function MachineScrewOvalHead({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1
}) {
    const screwMaterial = useScrewMaterial("#AAAAAA", 0.3, 0.9);
    const threadMaterial = useThreadMaterial("#888888");

    const parts = useMemo(() => {
        // Oval head (domed)
        const headGeo = new THREE.SphereGeometry(0.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        headGeo.scale(1, 0.4, 1);
        headGeo.translate(0, 0.25, 0);

        // Small collar under head
        const collarGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.08, 16);
        collarGeo.translate(0, 0.04, 0);

        // Shank (unthreaded portion)
        const shankHeight = 0.3;
        const shankGeo = new THREE.CylinderGeometry(0.2, 0.2, shankHeight, 16);
        shankGeo.translate(0, -shankHeight / 2, 0);

        // Fine machine threads
        const threadHeight = 2.0;
        const threadGeo = createFineThreadGeometry(0.2, threadHeight, 16, 0.07);
        threadGeo.translate(0, -threadHeight / 2 - shankHeight / 2, 0);

        return { headGeo, collarGeo, shankGeo, threadGeo };
    }, []);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh geometry={parts.headGeo} material={screwMaterial} castShadow receiveShadow />
            <mesh geometry={parts.collarGeo} material={screwMaterial} castShadow receiveShadow />
            <mesh geometry={parts.shankGeo} material={screwMaterial} castShadow receiveShadow />
            <mesh geometry={parts.threadGeo} material={threadMaterial} castShadow receiveShadow />
        </group>
    );
}

// 2. Set screw with hollow head (Allen/hex socket)
export function SetScrewHollowHead({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1
}) {
    const screwMaterial = useScrewMaterial("#999999", 0.4, 0.85);
    const threadMaterial = useThreadMaterial("#777777");

    const parts = useMemo(() => {
        // Cylindrical head with hollow center
        const headGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.4, 16);

        // Hex socket (simulated with cylinder with 6 sides)
        const socketDepth = 0.35;
        const socketGeo = new THREE.CylinderGeometry(0.18, 0.18, socketDepth, 6);
        socketGeo.translate(0, 0.02, 0);

        // Full-length threads (set screws are fully threaded)
        const threadHeight = 2.2;
        const threadGeo = createFineThreadGeometry(0.25, threadHeight, 18, 0.08);
        threadGeo.translate(0, -threadHeight / 2 - 0.2, 0);

        // Slightly tapered end
        const tipHeight = 0.3;
        const tipGeo = new THREE.ConeGeometry(0.12, tipHeight, 12);
        tipGeo.translate(0, -threadHeight - 0.2 - tipHeight / 2, 0);

        return { headGeo, socketGeo, threadGeo, tipGeo };
    }, []);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh geometry={parts.headGeo} material={screwMaterial} castShadow receiveShadow />
            <mesh geometry={parts.socketGeo} material={screwMaterial} castShadow receiveShadow />
            <mesh geometry={parts.threadGeo} material={threadMaterial} castShadow receiveShadow />
        </group>
    );
}

// 3. Self-tapping screw
export function SelfTappingScrew({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1
}) {
    const screwMaterial = useScrewMaterial("#777777", 0.5, 0.8);
    const threadMaterial = useThreadMaterial("#666666");

    const parts = useMemo(() => {
        // Flat head with Phillips-like cross (simplified)
        const headGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.15, 16);
        headGeo.translate(0, 0.075, 0);

        // Cross slot
        const slotGeo1 = new THREE.BoxGeometry(0.4, 0.06, 0.06);
        const slotGeo2 = new THREE.BoxGeometry(0.06, 0.06, 0.4);
        slotGeo1.translate(0, 0.075, 0);
        slotGeo2.translate(0, 0.075, 0);

        // Coarse, deep threads for self-tapping
        const threadHeight = 1.8;
        const threadGeo = createCoarseThreadGeometry(0.2, threadHeight, 10, 0.12);
        threadGeo.translate(0, -threadHeight / 2 - 0.075, 0);

        // Self-tapping tip
        const tipHeight = 0.6;
        const tipGeo = new THREE.ConeGeometry(0.08, tipHeight, 8);
        // Position tip at the bottom of the threads
        // -0.075 (start) - 1.8 (length) - 0.3 (half tip) = -2.175
        tipGeo.translate(0, -threadHeight - 0.075 - tipHeight / 2, 0);

        return { headGeo, slotGeo1, slotGeo2, threadGeo, tipGeo };
    }, []);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh geometry={parts.headGeo} material={screwMaterial} castShadow receiveShadow />
            <mesh geometry={parts.slotGeo1} material={screwMaterial} castShadow receiveShadow />
            <mesh geometry={parts.slotGeo2} material={screwMaterial} castShadow receiveShadow />
            <mesh geometry={parts.threadGeo} material={threadMaterial} castShadow receiveShadow />
        </group>
    );
}

// 4. Flat-head wood screw
export function FlatHeadWoodScrew({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1
}) {
    const screwMaterial = useScrewMaterial("#666666", 0.6, 0.7);
    const threadMaterial = useThreadMaterial("#555555");

    const parts = useMemo(() => {
        // Conical flat head
        const headGeo = new THREE.ConeGeometry(0.75, 0.25, 16);
        headGeo.translate(0, 0.125, 0);

        // Straight slot
        const slotGeo = new THREE.BoxGeometry(0.5, 0.04, 0.04);
        slotGeo.translate(0, 0.125, 0);

        // Tapered shank
        const shankHeight = 0.4;
        const shankGeo = new THREE.CylinderGeometry(0.22, 0.15, shankHeight, 12);
        shankGeo.translate(0, -shankHeight / 2, 0);

        // Very coarse wood threads
        const threadHeight = 2.2;
        const threadGeo = createCoarseThreadGeometry(0.15, threadHeight, 6, 0.18);
        threadGeo.translate(0, -threadHeight / 2 - shankHeight / 2, 0);

        // Sharp point - widened base to match shaft/thread
        const tipHeight = 0.5;
        // Radius 0.15 matches the thread minor diameter better than 0.02
        const tipGeo = new THREE.ConeGeometry(0.15, tipHeight, 6);
        tipGeo.translate(0, -threadHeight - shankHeight / 2 - tipHeight / 2, 0);

        return { headGeo, slotGeo, shankGeo, threadGeo, tipGeo };
    }, []);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh geometry={parts.headGeo} material={screwMaterial} castShadow receiveShadow />
            <mesh geometry={parts.slotGeo} material={screwMaterial} castShadow receiveShadow />
            <mesh geometry={parts.shankGeo} material={screwMaterial} castShadow receiveShadow />
            <mesh geometry={parts.threadGeo} material={threadMaterial} castShadow receiveShadow />
        </group>
    );
}

// 5. Machine screw with Phillips head
export function MachineScrewPhillipsHead({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1
}) {
    const screwMaterial = useScrewMaterial("#AAAAAA", 0.3, 0.9);
    const threadMaterial = useThreadMaterial("#888888");

    const parts = useMemo(() => {
        // Rounded head
        const headGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.25, 16);
        const headTopGeo = new THREE.SphereGeometry(0.55, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);

        headGeo.translate(0, 0.125, 0);
        headTopGeo.translate(0, 0.25, 0);
        headTopGeo.scale(1, 0.5, 1);

        // Phillips cross (two intersecting slots)
        const crossGeo1 = new THREE.BoxGeometry(0.35, 0.05, 0.05);
        const crossGeo2 = new THREE.BoxGeometry(0.05, 0.05, 0.35);
        crossGeo1.translate(0, 0.125, 0);
        crossGeo2.translate(0, 0.125, 0);

        // Short shank
        const shankHeight = 0.15;
        const shankGeo = new THREE.CylinderGeometry(0.22, 0.22, shankHeight, 12);
        shankGeo.translate(0, -shankHeight / 2, 0);

        // Fine machine threads
        const threadHeight = 2.4;
        const threadGeo = createFineThreadGeometry(0.22, threadHeight, 20, 0.06);
        threadGeo.translate(0, -threadHeight / 2 - shankHeight / 2, 0);

        return { headGeo, headTopGeo, crossGeo1, crossGeo2, shankGeo, threadGeo };
    }, []);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh geometry={parts.headGeo} material={screwMaterial} castShadow receiveShadow />
            <mesh geometry={parts.headTopGeo} material={screwMaterial} castShadow receiveShadow />
            <mesh geometry={parts.crossGeo1} material={screwMaterial} castShadow receiveShadow />
            <mesh geometry={parts.crossGeo2} material={screwMaterial} castShadow receiveShadow />
            <mesh geometry={parts.shankGeo} material={screwMaterial} castShadow receiveShadow />
            <mesh geometry={parts.threadGeo} material={threadMaterial} castShadow receiveShadow />
        </group>
    );
}

// 6. Lag screw (large wood screw)
export function LagScrew({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1
}) {
    const screwMaterial = useScrewMaterial("#777777", 0.5, 0.8);
    const threadMaterial = useThreadMaterial("#666666");

    const parts = useMemo(() => {
        // Hex head (bolt-like)
        const headGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.35, 6);
        headGeo.translate(0, 0.175, 0);

        // Square section under head
        const squareGeo = new THREE.BoxGeometry(0.45, 0.25, 0.45);
        squareGeo.translate(0, -0.125, 0);

        // Very coarse, deep threads
        const threadHeight = 2.8;
        const threadGeo = createCoarseThreadGeometry(0.3, threadHeight, 5, 0.2);
        threadGeo.translate(0, -threadHeight / 2 - 0.125, 0);

        // Sharp, long point - widened base
        const tipHeight = 0.8;
        // Radius 0.2 matches closer to the thread core
        const tipGeo = new THREE.ConeGeometry(0.2, tipHeight, 8);
        tipGeo.translate(0, -threadHeight - 0.125 - tipHeight / 2, 0);

        return { headGeo, squareGeo, threadGeo, tipGeo };
    }, []);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh geometry={parts.headGeo} material={screwMaterial} castShadow receiveShadow />
            <mesh geometry={parts.squareGeo} material={screwMaterial} castShadow receiveShadow />
            <mesh geometry={parts.threadGeo} material={threadMaterial} castShadow receiveShadow />
        </group>
    );
}

// 7. Cap screw (socket head cap screw)
export function CapScrew({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1
}) {
    const screwMaterial = useScrewMaterial("#AAAAAA", 0.3, 0.9);
    const threadMaterial = useThreadMaterial("#888888");

    const parts = useMemo(() => {
        // Low-profile cylindrical head with rounded top
        const headGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.2, 16);
        const headTopGeo = new THREE.SphereGeometry(0.6, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);

        headGeo.translate(0, 0.1, 0);
        headTopGeo.translate(0, 0.2, 0);
        headTopGeo.scale(1, 0.33, 1);

        // Hex socket
        const socketGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.22, 6);
        socketGeo.translate(0, 0.09, 0);

        // Full-length fine threads
        const threadHeight = 3.0;
        const threadGeo = createFineThreadGeometry(0.28, threadHeight, 24, 0.07);
        threadGeo.translate(0, -threadHeight / 2, 0);

        return { headGeo, headTopGeo, socketGeo, threadGeo };
    }, []);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh geometry={parts.headGeo} material={screwMaterial} castShadow receiveShadow />
            <mesh geometry={parts.headTopGeo} material={screwMaterial} castShadow receiveShadow />
            <mesh geometry={parts.socketGeo} material={screwMaterial} castShadow receiveShadow />
            <mesh geometry={parts.threadGeo} material={threadMaterial} castShadow receiveShadow />
        </group>
    );
}

// ====================== BACKWARD COMPATIBILITY ======================
export const RealisticScrew = MachineScrewPhillipsHead;
export const RealisticNut = HexNut;

// ====================== NUT COMPONENTS ======================
export function HexNut({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1
}) {
    const nutMaterial = useScrewMaterial("#999999", 0.4, 0.85);
    const threadMaterial = useThreadMaterial("#777777");

    const parts = useMemo(() => {
        // Hex nut body
        const bodyGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.4, 6);

        // Chamfered edges
        const topChamfer = new THREE.ConeGeometry(0.7, 0.1, 6);
        topChamfer.translate(0, 0.25, 0);

        const bottomChamfer = new THREE.ConeGeometry(0.7, 0.1, 6);
        bottomChamfer.rotateX(Math.PI);
        bottomChamfer.translate(0, -0.25, 0);

        // Internal threads
        const threadHeight = 0.5;
        const threadGeo = createFineThreadGeometry(0.25, threadHeight, 4, -0.06);

        return { bodyGeo, topChamfer, bottomChamfer, threadGeo };
    }, []);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh geometry={parts.bodyGeo} material={nutMaterial} castShadow receiveShadow />
            <mesh geometry={parts.topChamfer} material={nutMaterial} castShadow receiveShadow />
            <mesh geometry={parts.bottomChamfer} material={nutMaterial} castShadow receiveShadow />
            <mesh geometry={parts.threadGeo} material={threadMaterial} castShadow receiveShadow />
        </group>
    );
}

export function WingNut({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1
}) {
    const nutMaterial = useScrewMaterial("#999999", 0.5, 0.8);

    const parts = useMemo(() => {
        // Central cylindrical body
        const bodyGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 16);

        // Wings (aerofoil shape simplified as boxes)
        const wingHeight = 0.1;
        const wingLength = 0.8;

        const leftWing = new THREE.BoxGeometry(wingLength, wingHeight, 0.25);
        leftWing.translate(-wingLength / 2 - 0.2, 0, 0);

        const rightWing = new THREE.BoxGeometry(wingLength, wingHeight, 0.25);
        rightWing.translate(wingLength / 2 + 0.2, 0, 0);

        // Hole through center
        const holeGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.3, 12);

        return { bodyGeo, leftWing, rightWing, holeGeo };
    }, []);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh geometry={parts.bodyGeo} material={nutMaterial} castShadow receiveShadow />
            <mesh geometry={parts.leftWing} material={nutMaterial} castShadow receiveShadow />
            <mesh geometry={parts.rightWing} material={nutMaterial} castShadow receiveShadow />
        </group>
    );
}

// ====================== DISPLAY ALL SCREWS ======================
export function AllScrewTypesDisplay({
    position = [0, 0, 0],
    scale = 0.8,
    showLabels = false
}) {
    const spacing = 3.2;

    return (
        <group position={position} scale={scale}>
            {/* Row 1: Left to Right */}
            <MachineScrewOvalHead position={[-spacing * 1.5, spacing, 0]} />
            <SetScrewHollowHead position={[-spacing * 0.5, spacing, 0]} />
            <SelfTappingScrew position={[spacing * 0.5, spacing, 0]} />
            <FlatHeadWoodScrew position={[spacing * 1.5, spacing, 0]} />

            {/* Row 2: Left to Right */}
            <MachineScrewPhillipsHead position={[-spacing * 1.5, 0, 0]} />
            <LagScrew position={[-spacing * 0.5, 0, 0]} />
            <CapScrew position={[spacing * 0.5, 0, 0]} />
            <HexNut position={[spacing * 1.5, 0, 0]} />

            {/* Row 3: Wing nut centered */}
            <WingNut position={[0, -spacing, 0]} />

            {/* Optional labels */}
            {showLabels && (
                <>
                    {/* You can add text labels here using Three.js TextGeometry or HTML overlays */}
                    <mesh position={[-spacing * 1.5, spacing + 1.2, 0]}>
                        <boxGeometry args={[0.05, 0.05, 0.05]} />
                        <meshBasicMaterial color="#ff4444" />
                    </mesh>
                    <mesh position={[-spacing * 0.5, spacing + 1.2, 0]}>
                        <boxGeometry args={[0.05, 0.05, 0.05]} />
                        <meshBasicMaterial color="#44ff44" />
                    </mesh>
                </>
            )}
        </group>
    );
}

// ====================== SCREW AND NUT ASSEMBLY ======================
export function ScrewNutAssembly({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1,
    screwType = "cap", // "oval", "phillips", "cap", "set", "wood", "lag", "selftap"
    nutType = "hex", // "hex", "wing"
    gap = 0.3,
    tightened = false
}) {
    const screwRotation = tightened ? [0, 0, Math.PI / 6] : [0, 0, 0];
    const nutRotation = tightened ? [0, 0, -Math.PI / 6] : [0, 0, 0];

    const ScrewComponent = {
        oval: MachineScrewOvalHead,
        phillips: MachineScrewPhillipsHead,
        cap: CapScrew,
        set: SetScrewHollowHead,
        wood: FlatHeadWoodScrew,
        lag: LagScrew,
        selftap: SelfTappingScrew
    }[screwType] || CapScrew;

    const NutComponent = {
        hex: HexNut,
        wing: WingNut
    }[nutType] || HexNut;

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <ScrewComponent
                position={[0, -gap, 0]}
                rotation={screwRotation}
            />
            <NutComponent
                position={[0, gap, 0]}
                rotation={nutRotation}
            />
        </group>
    );
}