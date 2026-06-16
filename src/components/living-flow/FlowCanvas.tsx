"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ── deterministic PRNG so the field is stable across renders ── */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SAMPLES = 64; // points sampled per curve

type Field = {
  curves: Float32Array[]; // flat [x,y,z] * SAMPLES per curve
  linePositions: Float32Array;
  lineAlphas: Float32Array;
  nodePositions: Float32Array;
  nodeSizes: Float32Array;
  nodeSeeds: Float32Array;
  count: number;
  curveOf: Int16Array;
  tOf: Float32Array;
  speedOf: Float32Array;
  sizeOf: Float32Array;
  seedOf: Float32Array;
  pulsePositions: Float32Array;
};

function buildField(width: number, height: number, curveCount: number, particles: number): Field {
  const rand = mulberry32(1337);
  const halfW = width / 2;
  const halfH = height / 2;

  const curves: Float32Array[] = [];
  const nodePts: number[] = [];

  for (let c = 0; c < curveCount; c++) {
    // Vine-like control walk: start high, drift down with sideways noise (§4)
    const cps: THREE.Vector3[] = [];
    const cpCount = 4 + Math.floor(rand() * 3);
    let x = (rand() * 1.5 - 0.75) * halfW;
    let y = halfH * (0.55 + rand() * 0.7);
    for (let k = 0; k < cpCount; k++) {
      cps.push(new THREE.Vector3(x, y, (rand() - 0.5) * 0.6));
      x += (rand() - 0.5) * halfW * 0.95;
      y -= (0.45 + rand() * 0.65) * halfH * 0.65;
    }
    const curve = new THREE.CatmullRomCurve3(cps, false, "catmullrom", 0.5);
    const sampled = curve.getPoints(SAMPLES - 1);
    const flat = new Float32Array(SAMPLES * 3);
    for (let i = 0; i < SAMPLES; i++) {
      flat[i * 3] = sampled[i].x;
      flat[i * 3 + 1] = sampled[i].y;
      flat[i * 3 + 2] = sampled[i].z;
    }
    curves.push(flat);
    // soft nodes at a couple of interior junctions
    for (let n = 0; n < 2; n++) {
      const idx = Math.floor((0.25 + rand() * 0.5) * (SAMPLES - 1));
      nodePts.push(flat[idx * 3], flat[idx * 3 + 1], flat[idx * 3 + 2]);
    }
  }

  // Line segments (LINE pairs) with per-vertex translucent ink alpha
  const segPerCurve = SAMPLES - 1;
  const linePositions = new Float32Array(curveCount * segPerCurve * 2 * 3);
  const lineAlphas = new Float32Array(curveCount * segPerCurve * 2);
  let lp = 0;
  let la = 0;
  for (let c = 0; c < curveCount; c++) {
    const flat = curves[c];
    const baseAlpha = 0.09 + rand() * 0.11;
    for (let i = 0; i < segPerCurve; i++) {
      // fade toward the two ends of each curve
      const endFade = Math.sin((i / segPerCurve) * Math.PI) * 0.7 + 0.3;
      for (const j of [i, i + 1]) {
        linePositions[lp++] = flat[j * 3];
        linePositions[lp++] = flat[j * 3 + 1];
        linePositions[lp++] = flat[j * 3 + 2];
        lineAlphas[la++] = baseAlpha * endFade;
      }
    }
  }

  // Pulses — each one is "a task being automated" riding a curve (§4)
  const count = particles;
  const curveOf = new Int16Array(count);
  const tOf = new Float32Array(count);
  const speedOf = new Float32Array(count);
  const sizeOf = new Float32Array(count);
  const seedOf = new Float32Array(count);
  const pulsePositions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    curveOf[i] = Math.floor(rand() * curveCount);
    tOf[i] = rand();
    speedOf[i] = 0.02 + rand() * 0.05;
    sizeOf[i] = 0.45 + rand() * 0.9;
    seedOf[i] = rand();
  }

  const nodePositions = new Float32Array(nodePts);
  const nodeCount = nodePositions.length / 3;
  const nodeSizes = new Float32Array(nodeCount);
  const nodeSeeds = new Float32Array(nodeCount);
  for (let i = 0; i < nodeCount; i++) {
    nodeSizes[i] = 0.5 + rand() * 0.5;
    nodeSeeds[i] = rand();
  }

  return {
    curves,
    linePositions,
    lineAlphas,
    nodePositions,
    nodeSizes,
    nodeSeeds,
    count,
    curveOf,
    tOf,
    speedOf,
    sizeOf,
    seedOf,
    pulsePositions,
  };
}

/* ── shaders ── */
const lineVert = /* glsl */ `
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uBendRadius;
  uniform float uBendStrength;
  attribute float aAlpha;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.x += sin(uTime * 0.4 + p.y * 0.6) * 0.045;
    p.y += cos(uTime * 0.3 + p.x * 0.5) * 0.035;
    float d = distance(p.xy, uMouse);
    float infl = smoothstep(uBendRadius, 0.0, d);
    vec2 dir = normalize(p.xy - uMouse + vec2(0.0001));
    p.xy += dir * infl * uBendStrength;
    vAlpha = aAlpha * (0.65 + infl * 0.9);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;
const lineFrag = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() { gl_FragColor = vec4(uColor, vAlpha); }
`;

const dotVert = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uStatic;
  uniform vec2 uMouse;
  uniform float uMouseR;
  attribute float aSize;
  attribute float aSeed;
  varying float vSeed;
  varying float vNear;
  void main() {
    vSeed = aSeed;
    // proximity to cursor (0..1), 1 right under the pointer
    float md = distance(position.xy, uMouse);
    vNear = (uMouseR > 0.01) ? smoothstep(uMouseR, 0.0, md) : 0.0;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float pulse = mix(0.7 + 0.3 * sin(uTime * 2.2 + aSeed * 6.2831), 1.0, uStatic);
    float size = aSize * pulse * (1.0 + vNear * 1.6);
    gl_PointSize = size * uPixelRatio * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;
const dotFrag = /* glsl */ `
  uniform vec3 uCore;
  uniform vec3 uHalo;
  uniform float uAlpha;
  varying float vNear;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.0, d);
    // soft colored halo + brighter core; cursor-near pulses brighten toward core
    vec3 col = mix(uHalo, uCore, pow(core, 2.0));
    col = mix(col, uCore, vNear * 0.6);
    float a = (pow(core, 1.5) + 0.18 * core) * uAlpha * (1.0 + vNear * 0.5);
    gl_FragColor = vec4(col, a);
  }
`;

const INK = new THREE.Color("#12140f");
const PULSE_CORE = new THREE.Color("#9bf29b");
const PULSE_HALO = new THREE.Color("#1f7a3d");

function FlowField({ quality }: { quality: "high" | "low" }) {
  const { viewport, gl } = useThree();
  const w = Math.round(viewport.width);
  const h = Math.round(viewport.height);
  const curveCount = quality === "high" ? 16 : 9;
  const particles = quality === "high" ? 560 : 200;

  const field = useMemo(
    () => buildField(w || 16, h || 9, curveCount, particles),
    [w, h, curveCount, particles]
  );

  const groupRef = useRef<THREE.Group>(null);
  const pulseAttr = useRef<THREE.BufferAttribute>(null);
  const lineUniforms = useMemo(
    () => ({
      uMouse: { value: new THREE.Vector2(999, 999) },
      uTime: { value: 0 },
      uBendRadius: { value: Math.min(w, h) * 0.26 || 2 },
      uBendStrength: { value: Math.min(w, h) * 0.045 || 0.3 },
      uColor: { value: INK },
    }),
    [w, h]
  );
  const pulseUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 1.6) },
      uStatic: { value: 0 },
      uMouse: { value: new THREE.Vector2(999, 999) },
      uMouseR: { value: Math.min(w, h) * 0.22 || 2 },
      uCore: { value: PULSE_CORE },
      uHalo: { value: PULSE_HALO },
      uAlpha: { value: 0.95 },
    }),
    [gl, w, h]
  );
  const nodeUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 1.6) },
      uStatic: { value: 0 },
      uMouse: { value: new THREE.Vector2(999, 999) },
      uMouseR: { value: 0 },
      uCore: { value: INK },
      uHalo: { value: INK },
      uAlpha: { value: 0.22 },
    }),
    [gl]
  );

  const mouse = useRef(new THREE.Vector2(999, 999));

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;

    // smoothed cursor in world units
    const mx = state.pointer.x * viewport.width * 0.5;
    const my = state.pointer.y * viewport.height * 0.5;
    mouse.current.x += (mx - mouse.current.x) * 0.12;
    mouse.current.y += (my - mouse.current.y) * 0.12;
    lineUniforms.uMouse.value.copy(mouse.current);
    pulseUniforms.uMouse.value.copy(mouse.current);
    lineUniforms.uTime.value = t;
    pulseUniforms.uTime.value = t;
    nodeUniforms.uTime.value = t;

    // advance pulses along their curves, accelerating near the cursor
    const pos = field.pulsePositions;
    for (let i = 0; i < field.count; i++) {
      const flat = field.curves[field.curveOf[i]];
      const f = tOfAt(field, i) * (SAMPLES - 1);
      const idx = Math.floor(f);
      const frac = f - idx;
      const a = idx * 3;
      const b = Math.min(idx + 1, SAMPLES - 1) * 3;
      const px = flat[a] + (flat[b] - flat[a]) * frac;
      const py = flat[a + 1] + (flat[b + 1] - flat[a + 1]) * frac;
      const pz = flat[a + 2] + (flat[b + 2] - flat[a + 2]) * frac;

      const dx = px - mouse.current.x;
      const dy = py - mouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const boost = 1 + 2.6 * Math.max(0, 1 - dist / (lineUniforms.uBendRadius.value * 1.4));

      let nt = field.tOf[i] + field.speedOf[i] * dt * boost;
      if (nt > 1) nt -= 1;
      field.tOf[i] = nt;

      pos[i * 3] = px;
      pos[i * 3 + 1] = py;
      pos[i * 3 + 2] = pz;
    }
    if (pulseAttr.current) pulseAttr.current.needsUpdate = true;

    // subtle scroll parallax so the field drifts as the hero leaves (§4)
    if (groupRef.current && typeof window !== "undefined") {
      const sc = window.scrollY * 0.0016;
      groupRef.current.position.y = sc * 1.4;
      groupRef.current.rotation.z = sc * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[field.linePositions, 3]} />
          <bufferAttribute attach="attributes-aAlpha" args={[field.lineAlphas, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={lineVert}
          fragmentShader={lineFrag}
          uniforms={lineUniforms}
          transparent
          depthWrite={false}
        />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[field.nodePositions, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[field.nodeSizes, 1]} />
          <bufferAttribute attach="attributes-aSeed" args={[field.nodeSeeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={dotVert}
          fragmentShader={dotFrag}
          uniforms={nodeUniforms}
          transparent
          depthWrite={false}
        />
      </points>

      <points>
        <bufferGeometry>
          <bufferAttribute
            ref={pulseAttr}
            attach="attributes-position"
            args={[field.pulsePositions, 3]}
          />
          <bufferAttribute attach="attributes-aSize" args={[field.sizeOf, 1]} />
          <bufferAttribute attach="attributes-aSeed" args={[field.seedOf, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={dotVert}
          fragmentShader={dotFrag}
          uniforms={pulseUniforms}
          transparent
          depthWrite={false}
          depthTest={false}
        />
      </points>
    </group>
  );
}

function tOfAt(field: Field, i: number) {
  return field.tOf[i];
}

export default function FlowCanvas({ quality }: { quality: "high" | "low" }) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 12], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
    >
      <FlowField quality={quality} />
    </Canvas>
  );
}
