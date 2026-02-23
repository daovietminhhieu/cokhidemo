import React, { useMemo } from "react";
import * as THREE from "three";

import {
    generateRoughnessMap,
    generateNormalMap,
    generateWoodTexture,
    generatePlasticTexture
} from "./RealisticUtils";

// ====================== MATERIAL HOOKS ======================

const useSteelMaterial = (color = "#AAAAAA", roughness = 0.3) => {
    const roughnessMap = useMemo(() => generateRoughnessMap(64), []);
    const normalMap = useMemo(() => generateNormalMap(64), []);

    return useMemo(() => new THREE.MeshPhysicalMaterial({
        color: color,
        metalness: 0.9,
        roughness: roughness,
        roughnessMap: roughnessMap,
        normalMap: normalMap,
        normalScale: new THREE.Vector2(0.5, 0.5),
        clearcoat: 0.2,
        clearcoatRoughness: 0.2,
        side: THREE.DoubleSide
    }), [color, roughness, roughnessMap, normalMap]);
};

const useWoodMaterial = (color = "#8B5A2B") => {
    const woodMap = useMemo(() => generateWoodTexture(256, 256), []);
    const roughnessMap = useMemo(() => generateRoughnessMap(64), []);

    return useMemo(() => new THREE.MeshPhysicalMaterial({
        color: color,
        map: woodMap,
        metalness: 0.0,
        roughness: 0.7,
        roughnessMap: roughnessMap,
        bumpMap: roughnessMap,
        bumpScale: 0.05,
        side: THREE.DoubleSide
    }), [color, woodMap, roughnessMap]);
};

const usePlasticMaterial = (color = "#E0E0E0") => {
    const bumpMap = useMemo(() => generatePlasticTexture(128, 128), []);

    return useMemo(() => new THREE.MeshPhysicalMaterial({
        color: color,
        metalness: 0.1,
        roughness: 0.4,
        bumpMap: bumpMap,
        bumpScale: 0.02,
        clearcoat: 0.3,
        clearcoatRoughness: 0.2,
        side: THREE.DoubleSide
    }), [color, bumpMap]);
};

const useRubberMaterial = (color = "#333333") => {
    return useMemo(() => new THREE.MeshPhysicalMaterial({
        color: color,
        metalness: 0.0,
        roughness: 0.9,
        clearcoat: 0.1,
        side: THREE.DoubleSide
    }), [color]);
};

// ====================== IMPROVED TOOLS ======================

// 1. HAMMER - Fixed with normals
export function Hammer({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
    const steelMaterial = useSteelMaterial("#999999", 0.3);
    const woodMaterial = useWoodMaterial("#8B5A2B");

    const parts = useMemo(() => {
        // Cán búa - đặt ở vị trí thấp hơn
        const handleGeo = new THREE.CylinderGeometry(0.15, 0.15, 3.0, 16);
        handleGeo.translate(0, 0, 0); // Không dịch xuống

        // Đầu búa - nằm trên đầu cán
        // Đầu búa - hình trụ nằm ngang
        const headGeo = new THREE.CylinderGeometry(0.35, 0.35, 1.2, 24);
        headGeo.rotateZ(Math.PI / 2);
        headGeo.translate(0, 1.65, 0);

        // Móc búa - gắn vào đầu búa
        const createClaw = (side = 1) => {
            const clawGeo = new THREE.CylinderGeometry(0.03, 0.02, 0.6, 8);
            clawGeo.translate(-0.35, 1.65 + (0.2 * side), 0); // Gắn vào đầu búa
            clawGeo.rotateZ(side * Math.PI / 6);
            return clawGeo;
        };

        const leftClaw = createClaw(-1);
        const rightClaw = createClaw(1);

        return { handleGeo, headGeo, leftClaw, rightClaw };
    }, []);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            {/* Cán búa - nằm ở dưới */}
            <mesh geometry={parts.handleGeo} material={woodMaterial} castShadow receiveShadow />

            {/* Đầu búa - nằm trên cùng */}
            <mesh
                geometry={parts.headGeo}
                material={steelMaterial}
                castShadow receiveShadow
            />

        </group>
    );
}
// 2. SCREWDRIVER - Improved with transition
export function Screwdriver({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1,
    type = "phillips"
}) {
    const handleMaterial = usePlasticMaterial("#FFCC00");
    const steelMaterial = useSteelMaterial("#BBBBBB", 0.25);

    const parts = useMemo(() => {
        // Tay cầm công thái học
        const handleGeo = new THREE.CylinderGeometry(0.4, 0.35, 1.5, 16);
        handleGeo.translate(0, 0.75, 0);

        // Thân chính
        const shaftGeo = new THREE.CylinderGeometry(0.08, 0.07, 2.2, 12);
        shaftGeo.translate(0, -1.1, 0);

        // Phần chuyển tiếp giữa thân và mũi
        const transitionGeo = new THREE.CylinderGeometry(0.07, 0.05, 0.2, 12);
        transitionGeo.translate(0, -1.95, 0);

        // Mũi tuốc nơ vít
        let tipGeo;
        if (type === "flat") {
            // Mũi dẹt - hình nêm
            const tip = new THREE.BoxGeometry(0.18, 0.4, 0.05);
            tip.translate(0, -2.15, 0);
            tipGeo = tip;
        } else {
            // Phillips - hình chữ thập
            const blade1 = new THREE.BoxGeometry(0.04, 0.4, 0.1);
            blade1.translate(0, -2.15, 0);

            const blade2 = new THREE.BoxGeometry(0.1, 0.4, 0.04);
            blade2.translate(0, -2.15, 0);

            tipGeo = [blade1, blade2];
        }

        return { handleGeo, shaftGeo, transitionGeo, tipGeo };
    }, [type]);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh geometry={parts.handleGeo} material={handleMaterial} castShadow receiveShadow />
            <mesh geometry={parts.shaftGeo} material={steelMaterial} castShadow receiveShadow />
            <mesh geometry={parts.transitionGeo} material={steelMaterial} castShadow receiveShadow />

            {Array.isArray(parts.tipGeo) ? (
                <group>
                    <mesh geometry={parts.tipGeo[0]} material={steelMaterial} castShadow receiveShadow />
                    <mesh geometry={parts.tipGeo[1]} material={steelMaterial} castShadow receiveShadow />
                </group>
            ) : (
                <mesh geometry={parts.tipGeo} material={steelMaterial} castShadow receiveShadow />
            )}
        </group>
    );
}

// 3. WRENCH - Enhanced with better geometry
export function Wrench({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
    const chromeMaterial = useSteelMaterial("#DDDDDD", 0.1);

    const parts = useMemo(() => {
        // Tay cầm lục giác
        const handleGeo = new THREE.CylinderGeometry(0.15, 0.15, 2.8, 6);
        handleGeo.rotateZ(Math.PI / 2);

        // Đầu mở (U-shape)
        const createOpenEndShape = () => {
            const shape = new THREE.Shape();
            const jawSize = 0.35;

            shape.moveTo(jawSize / 2, -0.1);
            shape.lineTo(jawSize / 2 + 0.2, -0.1);
            shape.lineTo(jawSize / 2 + 0.2, 0.3);
            shape.lineTo(jawSize / 2, 0.3);
            shape.lineTo(jawSize / 2, 0.2);
            shape.quadraticCurveTo(0, 0.25, -jawSize / 2, 0.2);
            shape.lineTo(-jawSize / 2, 0.3);
            shape.lineTo(-jawSize / 2 - 0.2, 0.3);
            shape.lineTo(-jawSize / 2 - 0.2, -0.1);
            shape.lineTo(-jawSize / 2, -0.1);
            shape.lineTo(-jawSize / 2, 0.1);
            shape.quadraticCurveTo(0, 0.15, jawSize / 2, 0.1);
            shape.lineTo(jawSize / 2, -0.1);

            return shape;
        };

        const openEndGeo = new THREE.ExtrudeGeometry(createOpenEndShape(), {
            depth: 0.2,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.02,
            bevelSegments: 2
        });
        openEndGeo.computeVertexNormals();
        openEndGeo.center();
        openEndGeo.rotateZ(-Math.PI / 2);
        openEndGeo.translate(1.6, 0, 0);

        // Đầu kín (ổ lục giác)
        const createClosedEndShape = () => {
            const shape = new THREE.Shape();
            const socketSize = 0.25;

            // Hình vuông ngoài
            shape.moveTo(-socketSize, -socketSize);
            shape.lineTo(socketSize, -socketSize);
            shape.lineTo(socketSize, socketSize);
            shape.lineTo(-socketSize, socketSize);
            shape.lineTo(-socketSize, -socketSize);

            // Lỗ lục giác bên trong
            const hexHole = new THREE.Path();
            const hexRadius = 0.18;
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                const x = hexRadius * Math.cos(angle);
                const y = hexRadius * Math.sin(angle);
                if (i === 0) hexHole.moveTo(x, y);
                else hexHole.lineTo(x, y);
            }
            hexHole.closePath();
            shape.holes.push(hexHole);

            return shape;
        };

        const closedEndGeo = new THREE.ExtrudeGeometry(createClosedEndShape(), {
            depth: 0.2,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.02,
            bevelSegments: 2
        });
        closedEndGeo.computeVertexNormals();
        closedEndGeo.center();
        closedEndGeo.rotateZ(-Math.PI / 2);
        closedEndGeo.translate(-1.6, 0, 0);

        return { handleGeo, openEndGeo, closedEndGeo };
    }, []);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh geometry={parts.handleGeo} material={chromeMaterial} castShadow receiveShadow />
            <mesh geometry={parts.openEndGeo} material={chromeMaterial} castShadow receiveShadow />
            <mesh geometry={parts.closedEndGeo} material={chromeMaterial} castShadow receiveShadow />
        </group>
    );
}

// 4. PLIERS - Fixed pivot position and improved geometry
export function Pliers({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
    const steelMaterial = useSteelMaterial("#AAAAAA", 0.3);
    const gripMaterial = useRubberMaterial("#2C3E50");

    const parts = useMemo(() => {
        // Tạo một nửa kìm (hàm + tay cầm)
        const createJawPiece = (side = 1) => {
            const shape = new THREE.Shape();

            // Hàm cắt (cong)
            shape.moveTo(0, 0);
            shape.lineTo(-0.1 * side, 0.6); // Chiều dài hàm
            shape.lineTo(-0.08 * side, 0.65); // Đầu nhọn
            shape.lineTo(-0.06 * side, 0.6); // Quay lại hàm

            // Cổ nối
            shape.lineTo(-0.04 * side, 0.3);

            // Tay cầm
            shape.lineTo(-0.12 * side, -0.8); // Chiều dài tay cầm
            shape.lineTo(-0.08 * side, -0.85); // Đầu tay cầm
            shape.lineTo(0, -0.8);
            shape.lineTo(0, 0);

            const geometry = new THREE.ExtrudeGeometry(shape, {
                depth: 0.15,
                bevelEnabled: true,
                bevelThickness: 0.01,
                bevelSegments: 1
            });
            geometry.computeVertexNormals();
            geometry.center();
            geometry.translate(0, 0.4, 0); // Căn giữa theo chiều dọc

            return geometry;
        };

        const leftPiece = createJawPiece(1);
        const rightPiece = createJawPiece(-1);

        // Trục xoay
        const pivotGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.2, 16);
        pivotGeo.translate(0, 0.3, 0); // Đặt đúng vị trí giao hàm/tay cầm

        // Tay cầm cao su
        const gripGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.7, 8);
        gripGeo.rotateZ(Math.PI / 2);

        return { leftPiece, rightPiece, pivotGeo, gripGeo };
    }, []);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh geometry={parts.leftPiece} material={steelMaterial} castShadow receiveShadow />
            <mesh geometry={parts.rightPiece} material={steelMaterial} castShadow receiveShadow />

            {/* Trục xoay - đã được định vị đúng */}
            <mesh geometry={parts.pivotGeo} material={steelMaterial} castShadow receiveShadow />

            {/* Tay cầm cao su */}
            <mesh
                geometry={parts.gripGeo}
                material={gripMaterial}
                position={[0, -0.9, 0.1]}
                castShadow receiveShadow
            />
            <mesh
                geometry={parts.gripGeo}
                material={gripMaterial}
                position={[0, -0.9, -0.1]}
                castShadow receiveShadow
            />
        </group>
    );
}

// 5. ADJUSTABLE WRENCH - Enhanced with threaded screw
export function AdjustableWrench({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
    const steelMaterial = useSteelMaterial("#CCCCCC", 0.2);
    const darkSteelMaterial = useSteelMaterial("#888888", 0.4);

    const parts = useMemo(() => {
        // Tay cầm chính
        const handleGeo = new THREE.BoxGeometry(3.0, 0.3, 0.4);

        // Hàm cố định
        const fixedJawGeo = new THREE.BoxGeometry(0.5, 0.6, 0.4);
        fixedJawGeo.translate(1.8, 0.15, 0);

        // Hàm di động
        const movingJawGeo = new THREE.BoxGeometry(0.5, 0.5, 0.4);
        movingJawGeo.translate(0.8, 0, 0);

        // Vít điều chỉnh có ren
        const screwGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.0, 16);
        screwGeo.rotateZ(Math.PI / 2);
        screwGeo.translate(1.3, 0, 0);

        // Thêm rãnh ren đơn giản
        const createThreadGrooves = () => {
            const grooves = [];
            for (let i = -4; i <= 4; i++) {
                const groove = new THREE.TorusGeometry(0.09, 0.01, 8, 16, Math.PI * 2);
                groove.rotateY(Math.PI / 2);
                groove.translate(i * 0.12 + 1.3, 0, 0);
                grooves.push(groove);
            }
            return grooves;
        };

        // Núm điều chỉnh
        const knobGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 6);
        knobGeo.translate(1.8, 0, 0.2);

        // Thêm rãnh trên núm
        const knobGroove = new THREE.TorusGeometry(0.18, 0.01, 8, 16, Math.PI * 2);
        knobGroove.rotateX(Math.PI / 2);
        knobGroove.translate(1.8, 0, 0.25);

        return {
            handleGeo,
            fixedJawGeo,
            movingJawGeo,
            screwGeo,
            knobGeo,
            threadGrooves: createThreadGrooves(),
            knobGroove
        };
    }, []);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh geometry={parts.handleGeo} material={steelMaterial} castShadow receiveShadow />
            <mesh geometry={parts.fixedJawGeo} material={steelMaterial} castShadow receiveShadow />
            <mesh geometry={parts.movingJawGeo} material={steelMaterial} castShadow receiveShadow />
            <mesh geometry={parts.screwGeo} material={darkSteelMaterial} castShadow receiveShadow />

            {/* Rãnh ren trên vít */}
            {parts.threadGrooves.map((groove, index) => (
                <mesh key={index} geometry={groove} material={darkSteelMaterial} castShadow receiveShadow />
            ))}

            <mesh geometry={parts.knobGeo} material={steelMaterial} castShadow receiveShadow />
            <mesh geometry={parts.knobGroove} material={darkSteelMaterial} castShadow receiveShadow />
        </group>
    );
}

// ====================== ADDITIONAL TOOLS ======================

// 6. TAPE MEASURE - Thước cuộn
export function TapeMeasure({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
    const caseMaterial = usePlasticMaterial("#FFD700");
    const tapeMaterial = useSteelMaterial("#F0F0F0", 0.1);
    const buttonMaterial = usePlasticMaterial("#FF4444");

    const parts = useMemo(() => {
        // Vỏ thước
        const caseGeo = new THREE.BoxGeometry(0.8, 0.5, 0.4);

        // Nắp trên
        const topGeo = new THREE.BoxGeometry(0.9, 0.15, 0.45);
        topGeo.translate(0, 0.175, 0);

        // Tay cầm
        const handleGeo = new THREE.BoxGeometry(0.3, 0.6, 0.15);
        handleGeo.translate(0, -0.55, 0.2);

        // Nút khóa
        const buttonGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 16);
        buttonGeo.translate(0.2, 0.1, 0.25);

        // Thước kim loại
        const tapeGeo = new THREE.BoxGeometry(0.02, 0.4, 1.5);
        tapeGeo.rotateZ(Math.PI / 12);
        tapeGeo.translate(0.4, 0, -0.5);

        return { caseGeo, topGeo, handleGeo, buttonGeo, tapeGeo };
    }, []);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh geometry={parts.caseGeo} material={caseMaterial} castShadow receiveShadow />
            <mesh geometry={parts.topGeo} material={caseMaterial} castShadow receiveShadow />
            <mesh geometry={parts.handleGeo} material={caseMaterial} castShadow receiveShadow />
            <mesh geometry={parts.buttonGeo} material={buttonMaterial} castShadow receiveShadow />
            <mesh geometry={parts.tapeGeo} material={tapeMaterial} castShadow receiveShadow />
        </group>
    );
}

// ====================== TOOL COLLECTION DISPLAY ======================
export function ToolCollectionDisplay({ position = [0, 0, 0], scale = 0.7 }) {
    const spacing = 2.5;

    return (
        <group position={position} scale={scale}>
            <gridHelper args={[15, 15]} rotation={[Math.PI / 2, 0, 0]} />

            {/* Row 1 */}
            <Hammer position={[-spacing * 2, 0, 0]} rotation={[0, Math.PI / 4, 0]} />
            <Screwdriver position={[-spacing, 0, 0]} type="phillips" rotation={[0, 0, Math.PI / 2]} />
            <Screwdriver position={[0, 0, 0]} type="flat" rotation={[0, 0, Math.PI / 2]} />
            <Wrench position={[spacing, 0, 0]} rotation={[0, -Math.PI / 4, 0]} />
            <Pliers position={[spacing * 2, 0, 0]} rotation={[0, 0, Math.PI / 2]} />

            {/* Row 2 */}
            <AdjustableWrench position={[-spacing * 1.5, -spacing, 0]} rotation={[0, Math.PI / 6, 0]} />
            <TapeMeasure position={[spacing * 1.5, -spacing, 0]} rotation={[0, -Math.PI / 6, 0]} />
        </group>
    );
}

