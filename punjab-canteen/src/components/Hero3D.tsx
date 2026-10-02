import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BRASS = '#C9962B';

function Bowl({ position, color }: { position: [number, number, number]; color: string }) {
  const profile = useMemo(
    () =>
      [
        [0, 0],
        [0.33, 0],
        [0.5, 0.2],
        [0.54, 0.3],
        [0.5, 0.3],
        [0.46, 0.2],
        [0.3, 0.04],
        [0, 0.04],
      ].map(([x, y]) => new THREE.Vector2(x, y)),
    [],
  );
  return (
    <group position={position}>
      <mesh>
        <latheGeometry args={[profile, 36]} />
        <meshStandardMaterial color="#B8B8B8" metalness={0.75} roughness={0.28} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.44, 0.44, 0.02, 32]} />
        <meshStandardMaterial color={color} roughness={0.55} />
      </mesh>
    </group>
  );
}

function Plate() {
  const bowls = useMemo(
    () =>
      ['#7A3B12', '#E5A21C', '#B3261E', '#C47A1A', '#8F2A1B', '#E8C547'].map((color, i) => {
        const a = (i / 6) * Math.PI * 2;
        return { color, pos: [Math.cos(a) * 1.35, 0.06, Math.sin(a) * 1.35] as [number, number, number] };
      }),
    [],
  );
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[2.2, 1.95, 0.12, 72]} />
        <meshStandardMaterial color={BRASS} metalness={0.7} roughness={0.32} />
      </mesh>
      <mesh position={[0, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.07, 16, 96]} />
        <meshStandardMaterial color="#E3B24A" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.065, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.02, 8, 96]} />
        <meshStandardMaterial color="#7A5A12" metalness={0.5} roughness={0.5} />
      </mesh>
      {bowls.map((b, i) => (
        <Bowl key={i} position={b.pos} color={b.color} />
      ))}
      {/* parathas in the centre */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.78, 0.78, 0.07, 48]} />
        <meshStandardMaterial color="#D9A55B" roughness={0.8} />
      </mesh>
      <mesh position={[0.05, 0.19, 0.02]} rotation={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.07, 48]} />
        <meshStandardMaterial color="#E9C88A" roughness={0.8} />
      </mesh>
      <mesh position={[0.05, 0.27, 0.02]}>
        <boxGeometry args={[0.2, 0.08, 0.2]} />
        <meshStandardMaterial color="#F6D768" roughness={0.4} />
      </mesh>
    </group>
  );
}

function Spices() {
  const group = useRef<THREE.Group>(null);
  const items = useMemo(() => {
    const colors = ['#F59E0B', '#8B1E1E', '#D4A017', '#C2410C', '#3F6212'];
    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    return Array.from({ length: 34 }, () => {
      const a = rnd() * Math.PI * 2;
      const r = 2.7 + rnd() * 1.4;
      return {
        pos: [Math.cos(a) * r, (rnd() - 0.5) * 3.2, Math.sin(a) * r * 0.6 - 0.5] as [number, number, number],
        scale: 0.05 + rnd() * 0.09,
        color: colors[Math.floor(rnd() * colors.length)],
        rot: [rnd() * 3, rnd() * 3, 0] as [number, number, number],
      };
    });
  }, []);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.08;
  });
  return (
    <group ref={group}>
      {items.map((it, i) => (
        <mesh key={i} position={it.pos} scale={it.scale} rotation={it.rot}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={it.color} roughness={0.5} metalness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function Rig() {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }, dt) => {
    const t = clock.getElapsedTime();
    if (spin.current) spin.current.rotation.y += dt * 0.22;
    if (tilt.current) {
      tilt.current.rotation.x = THREE.MathUtils.damp(tilt.current.rotation.x, 0.95 - pointer.y * 0.18, 4, dt);
      tilt.current.rotation.z = THREE.MathUtils.damp(tilt.current.rotation.z, pointer.x * 0.1, 4, dt);
      tilt.current.position.y = Math.sin(t * 0.9) * 0.09;
    }
  });
  return (
    <group ref={tilt}>
      <group ref={spin}>
        <Plate />
      </group>
    </group>
  );
}

export default function Hero3D({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.4, 7], fov: 42 }}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
      aria-hidden
    >
      <ambientLight intensity={0.7} />
      <hemisphereLight args={['#FFE9B8', '#3a1a10', 0.8]} />
      <directionalLight position={[4, 6, 5]} intensity={2.6} color="#FFF1D0" />
      <pointLight position={[-4, -1, 3]} intensity={40} color="#F59E0B" />
      <pointLight position={[3, 2, -3]} intensity={25} color="#8B1E1E" />
      <Rig />
      <Spices />
    </Canvas>
  );
}
