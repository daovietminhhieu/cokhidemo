import * as THREE from "three";

// Helper to generate a procedural roughness map for scratches/imperfections
export function generateRoughnessMap(width = 512, height = 512) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // Base roughness (mid-grey) - slightly lower for more gloss
    ctx.fillStyle = "#606060";
    ctx.fillRect(0, 0, width, height);

    // Add random scratches
    ctx.strokeStyle = "#202020"; // Darker scratches = shinier in roughness map usually (0=smooth, 1=rough)
    // Wait, in standard roughness: 0=smooth, 1=rough.
    // So distinct scratches should be rougher (lighter) or smoother? 
    // Usually scratches catch light, so maybe they are grooves. 
    // Let's make the base quite smooth (darker hex) and scratches rougher (lighter).

    // Adjusted: Base smoothish
    ctx.fillStyle = "#404040";
    ctx.fillRect(0, 0, width, height);

    // Scratches - rougher
    ctx.strokeStyle = "#909090";
    ctx.lineWidth = 1;
    for (let i = 0; i < 400; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + (Math.random() - 0.5) * 100, y + (Math.random() - 0.5) * 100);
        ctx.stroke();
    }

    // Add some noise
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 30;
        data[i] = Math.max(0, Math.min(255, data[i] + noise));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
        data[i + 3] = 255; // Alpha
    }
    ctx.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
}

// Helper to generate a procedural normal map
export function generateNormalMap(width = 512, height = 512) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // Fill with neutral normal blue (128, 128, 255)
    ctx.fillStyle = "rgb(128, 128, 255)";
    ctx.fillRect(0, 0, width, height);

    // We can imitate scratches by drawing slightly offset lines 
    // One dark, one light to simulate depth? 
    // Or just simple bright/dark noise converted to normal map colors?
    // Let's keep it simple: just some subtle noise that shifts the angle slightly.

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        // Random slight tilt
        // simple random noise on R and G channels shifts normal vector
        const noiseX = (Math.random() - 0.5) * 20;
        const noiseY = (Math.random() - 0.5) * 20;

        data[i] = Math.max(0, Math.min(255, 128 + noiseX));     // R
        data[i + 1] = Math.max(0, Math.min(255, 128 + noiseY)); // G
        // B stays mostly up (255), maybe slightly reduced to normalization? 
        // 255 is safe for "approx upwards"
        data[i + 2] = 255;
        data[i + 3] = 255;
    }

    // Draw some "deep" scratches (scratches in normal map are harder to proceduralize perfectly without height map first)
    // But we can try drawing lines with specific colors.
    // Scratch direction: 
    // Left side of scratch: nx < 0 (R < 128)
    // Right side of scratch: nx > 0 (R > 128)

    ctx.putImageData(imageData, 0, 0);

    // Let's add distinct scratches on top
    ctx.lineWidth = 1;
    for (let k = 0; k < 100; k++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const len = (Math.random() + 0.5) * 50;
        const angle = Math.random() * Math.PI * 2;

        // We'll draw two parallel lines very close to represent the cut groove
        const dx = Math.cos(angle);
        const dy = Math.sin(angle);

        // "Slope down" side
        ctx.strokeStyle = "rgb(100, 100, 255)";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + dx * len, y + dy * len);
        ctx.stroke();

        // "Slope up" side
        ctx.strokeStyle = "rgb(156, 156, 255)";
        ctx.beginPath();
        // Offset slightly
        const offX = -dy * 1.0;
        const offY = dx * 1.0;
        ctx.moveTo(x + offX, y + offY);
        ctx.lineTo(x + dx * len + offX, y + dy * len + offY);
        ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
}

// Helper to generate a THREAD normal map (diagonal stripes)
export function generateThreadNormalMap(width = 512, height = 512) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // Base Blue (Flat Normal)
    ctx.fillStyle = "rgb(128, 128, 255)";
    ctx.fillRect(0, 0, width, height);

    // Draw diagonal stripes
    // Thread angle is usually slight.
    const stripeCount = 40;
    const step = height / stripeCount;

    for (let i = -stripeCount; i < stripeCount * 2; i++) {
        const y = i * step;

        ctx.beginPath();
        // Slight diagonal:
        const xOffset = width * 0.1; // Amount of shift over width

        ctx.moveTo(0, y);
        ctx.lineTo(width, y + xOffset);

        // "Up" slope (facing +Y) -> Green > 128
        ctx.strokeStyle = "rgb(128, 160, 255)";
        ctx.lineWidth = step * 0.4;
        ctx.stroke();

        // "Down" slope (facing -Y) -> Green < 128
        ctx.beginPath();
        ctx.moveTo(0, y + step * 0.4);
        ctx.lineTo(width, y + xOffset + step * 0.4);
        ctx.strokeStyle = "rgb(128, 96, 255)";
        ctx.lineWidth = step * 0.4;
        ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 2); // Repeat vertically for density
    return texture;
}

// Helper to generate procedural WOOD texture
export function generateWoodTexture(width = 512, height = 512) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // Base wood color
    ctx.fillStyle = "#e0c0a0";
    ctx.fillRect(0, 0, width, height);

    // Grain
    for (let i = 0; i < 60; i++) {
        const x = Math.random() * width;
        const thickness = Math.random() * 20 + 5;

        ctx.beginPath();
        ctx.moveTo(x, 0);
        // Wavy grain line
        ctx.bezierCurveTo(
            x + Math.random() * 50 - 25, height / 3,
            x + Math.random() * 50 - 25, 2 * height / 3,
            x + Math.random() * 20 - 10, height
        );

        ctx.lineWidth = thickness;
        ctx.strokeStyle = `rgba(160, 100, 50, ${Math.random() * 0.2 + 0.1})`;
        ctx.stroke();
    }

    // Noise/specks
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        if (Math.random() > 0.8) {
            const darken = Math.random() * 20;
            data[i] -= darken;
            data[i + 1] -= darken;
            data[i + 2] -= darken;
        }
    }
    ctx.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

// Helper to generate procedural PLASTIC texture (bump map style)
export function generatePlasticTexture(width = 256, height = 256) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // Base noise for bump map
    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 40;
        const val = 128 + noise;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
}

// Helper to create true 3D spiral thread geometry
export function createSpiralThreadGeometry(radius, height, turns, isInternal = false) {
    const path = new HelicalPath(radius, height, turns);

    // Calculate pitch (distance between threads)
    const pitch = height / turns;

    // Triangular thread profile (ISO 60 deg metric)
    const threadSize = pitch * 1.0;
    const threadDepth = threadSize * 0.8;

    const threadShape = new THREE.Shape();

    if (isInternal) {
        // Pointing INWARDS 
        // Start from -threadDepth/2 to +threadDepth/2 relative to path radius
        // Path radius is the "midpoint" of thread depth? 
        // No, let's keep path radius as surface.
        // Internal Thread: Path is hole surface. Shape goes into hole (towards center).
        // Tangent frames can be tricky.
        // Standard Extrude shape is in XY plane.
        // We want it to point towards center (-X usually).
        threadShape.moveTo(0, -threadSize / 2);
        threadShape.lineTo(-threadDepth, 0);
        threadShape.lineTo(0, threadSize / 2);
        threadShape.lineTo(0, -threadSize / 2);
    } else {
        // Pointing OUTWARDS (Standard Screw)
        // Path is core surface. Shape goes outwards (+X).
        threadShape.moveTo(0, -threadSize / 2);
        threadShape.lineTo(threadDepth, 0);
        threadShape.lineTo(0, threadSize / 2);
        threadShape.lineTo(0, -threadSize / 2);
    }

    const geometry = new THREE.ExtrudeGeometry(threadShape, {
        steps: turns * 30, // Higher resolution
        extrudePath: path,
    });

    // Center alignment
    // geometry.translate(0, -height / 2, 0);
    // HelicalPath is already centered at 0 (from -h/2 to +h/2).
    // So we don't need to translate it.

    return geometry;
}

// Custom Curve for Helical Threads
export class HelicalPath extends THREE.Curve {
    constructor(radius = 1, height = 5, turns = 10) {
        super();
        this.radius = radius;
        this.height = height;
        this.turns = turns;
    }

    getPoint(t, optionalTarget = new THREE.Vector3()) {
        const angle = t * Math.PI * 2 * this.turns;
        const x = this.radius * Math.cos(angle);
        const z = this.radius * Math.sin(angle);
        const y = t * this.height - this.height / 2;

        return optionalTarget.set(x, y, z);
    }
}

// ====================== GEOMETRY UTILITIES ======================
export const createDetailedThreadGeometry = (radius, height, turns, threadDepth = 0.1, threadCount = 8) => {
    const geometry = new THREE.BufferGeometry();
    const segments = 32;
    const pointsPerTurn = 24;
    const totalPoints = Math.floor(turns * pointsPerTurn);

    const vertices = [];
    const normals = [];
    const uvs = [];
    const indices = [];

    // Create thread profile
    for (let i = 0; i <= totalPoints; i++) {
        const t = i / totalPoints;
        const angle = t * Math.PI * 2 * turns;
        const y = height * t - height / 2;

        // Thread profile with multiple starts
        const threadProfile = Math.sin(angle * threadCount) * 0.5 + 0.5;
        const currentRadius = radius + threadDepth * threadProfile;

        for (let j = 0; j <= segments; j++) {
            const segmentAngle = (j / segments) * Math.PI * 2;
            const x = currentRadius * Math.cos(segmentAngle);
            const z = currentRadius * Math.sin(segmentAngle);

            vertices.push(x, y, z);

            // Calculate normal
            const nx = Math.cos(segmentAngle);
            const nz = Math.sin(segmentAngle);
            normals.push(nx, 0, nz);

            // UVs
            uvs.push(j / segments, t);

            // Create faces
            if (i < totalPoints && j < segments) {
                const a = i * (segments + 1) + j;
                const b = a + segments + 1;
                const c = a + 1;
                const d = b + 1;

                indices.push(a, b, c);
                indices.push(b, d, c);
            }
        }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);

    return geometry;
};

export const createCoarseThreadGeometry = (radius, height, turns, threadDepth = 0.15) => {
    return createDetailedThreadGeometry(radius, height, turns, threadDepth, 4);
};

export const createFineThreadGeometry = (radius, height, turns, threadDepth = 0.06) => {
    return createDetailedThreadGeometry(radius, height, turns, threadDepth, 12);
};
