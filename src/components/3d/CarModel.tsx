import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CarModelProps {
  isNight: boolean;
  speed?: number;
}

export const CarModel: React.FC<CarModelProps> = ({ isNight, speed = 1 }) => {
  const carGroupRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);
  const headlightsLeftRef = useRef<THREE.SpotLight>(null);
  const headlightsRightRef = useRef<THREE.SpotLight>(null);

  // Wheel animation & car suspension vibration
  useFrame((state, delta) => {
    // Wheel rotation
    const rotationDelta = delta * 18 * speed;
    wheelsRef.current.forEach((wheel) => {
      if (wheel) wheel.rotation.x += rotationDelta;
    });

    // Subtle suspension vibration / road bounce
    if (carGroupRef.current) {
      const t = state.clock.getElapsedTime();
      carGroupRef.current.position.y = Math.sin(t * 12) * 0.015;
      carGroupRef.current.rotation.z = Math.sin(t * 4) * 0.008; // subtle roll
      carGroupRef.current.rotation.x = Math.sin(t * 6) * 0.005; // subtle pitch
    }
  });

  // Colors & Materials based on theme
  const bodyColor = isNight ? '#141416' : '#FAFAFA';
  const accentColor = '#FFD400'; // A ONE Motors Signature Yellow
  const glassColor = isNight ? '#05070A' : '#1A2A3A';

  return (
    <group ref={carGroupRef} position={[0, 0.45, 0]}>
      {/* --- CAR LOWER CHASSIS & FLOOR --- */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.9, 0.22, 4.4]} />
        <meshStandardMaterial
          color={bodyColor}
          metalness={0.85}
          roughness={0.2}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* --- FRONT HOOD / ENGINE HOOD --- */}
      <mesh position={[0, 0.35, 1.25]} rotation={[-0.08, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.82, 0.22, 1.8]} />
        <meshStandardMaterial
          color={bodyColor}
          metalness={0.88}
          roughness={0.18}
        />
      </mesh>

      {/* --- SIGNATURE HOOD RACING STRIPES (A ONE YELLOW) --- */}
      <mesh position={[0, 0.47, 1.25]} rotation={[-0.08, 0, 0]}>
        <boxGeometry args={[0.22, 0.01, 1.78]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={isNight ? accentColor : '#000000'}
          emissiveIntensity={isNight ? 0.35 : 0}
          roughness={0.3}
        />
      </mesh>

      {/* --- CABIN / COCKPIT ROOF --- */}
      <mesh position={[0, 0.72, -0.3]} castShadow>
        <boxGeometry args={[1.5, 0.55, 2.1]} />
        <meshStandardMaterial
          color={bodyColor}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* --- WINDSHIELD (FRONT) --- */}
      <mesh position={[0, 0.65, 0.8]} rotation={[-0.55, 0, 0]}>
        <boxGeometry args={[1.42, 0.6, 0.05]} />
        <meshPhysicalMaterial
          color={glassColor}
          transmission={0.65}
          opacity={0.85}
          transparent
          roughness={0.05}
          reflectivity={0.9}
        />
      </mesh>

      {/* --- REAR WINDSHIELD --- */}
      <mesh position={[0, 0.65, -1.35]} rotation={[0.55, 0, 0]}>
        <boxGeometry args={[1.38, 0.58, 0.05]} />
        <meshPhysicalMaterial
          color={glassColor}
          transmission={0.65}
          opacity={0.85}
          transparent
          roughness={0.05}
          reflectivity={0.9}
        />
      </mesh>

      {/* --- SIDE WINDOWS (LEFT & RIGHT) --- */}
      <mesh position={[-0.76, 0.68, -0.25]}>
        <boxGeometry args={[0.02, 0.42, 1.7]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.1} metalness={0.95} />
      </mesh>
      <mesh position={[0.76, 0.68, -0.25]}>
        <boxGeometry args={[0.02, 0.42, 1.7]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.1} metalness={0.95} />
      </mesh>

      {/* --- FRONT BUMPER & AERODYNAMIC AIR INTAKE --- */}
      <mesh position={[0, 0.16, 2.22]} castShadow>
        <boxGeometry args={[1.86, 0.3, 0.2]} />
        <meshStandardMaterial color="#111111" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.1, 2.32]}>
        <boxGeometry args={[1.92, 0.06, 0.15]} />
        <meshStandardMaterial color={accentColor} roughness={0.3} />
      </mesh>

      {/* --- HEADLIGHTS (LEFT & RIGHT) --- */}
      {/* Left Headlight Housing */}
      <mesh position={[-0.68, 0.32, 2.18]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.34, 0.12, 0.1]} />
        <meshStandardMaterial
          color={isNight ? '#FFFFFF' : '#E8EEF5'}
          emissive={isNight ? '#FFFFFF' : '#FFFCF0'}
          emissiveIntensity={isNight ? 3.5 : 0.8}
        />
      </mesh>
      {/* Right Headlight Housing */}
      <mesh position={[0.68, 0.32, 2.18]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.34, 0.12, 0.1]} />
        <meshStandardMaterial
          color={isNight ? '#FFFFFF' : '#E8EEF5'}
          emissive={isNight ? '#FFFFFF' : '#FFFCF0'}
          emissiveIntensity={isNight ? 3.5 : 0.8}
        />
      </mesh>

      {/* --- REAL THREE.JS SPOTLIGHT BEAMS (HEADLIGHTS ILLUMINATING THE ROAD) --- */}
      {isNight && (
        <>
          <spotLight
            ref={headlightsLeftRef}
            position={[-0.68, 0.35, 2.2]}
            target-position={[-0.68, -0.3, 14]}
            angle={0.42}
            penumbra={0.7}
            intensity={4.5}
            distance={24}
            color="#FFF2B2"
            castShadow
          />
          <spotLight
            ref={headlightsRightRef}
            position={[0.68, 0.35, 2.2]}
            target-position={[0.68, -0.3, 14]}
            angle={0.42}
            penumbra={0.7}
            intensity={4.5}
            distance={24}
            color="#FFF2B2"
            castShadow
          />
          {/* Volumetric Headlight Cone Visuals */}
          <mesh position={[-0.68, 0.1, 5]} rotation={[Math.PI / 2 + 0.04, 0, 0]}>
            <cylinderGeometry args={[0.08, 1.4, 6, 16, 1, true]} />
            <meshBasicMaterial
              color="#FFE885"
              transparent
              opacity={0.12}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          <mesh position={[0.68, 0.1, 5]} rotation={[Math.PI / 2 + 0.04, 0, 0]}>
            <cylinderGeometry args={[0.08, 1.4, 6, 16, 1, true]} />
            <meshBasicMaterial
              color="#FFE885"
              transparent
              opacity={0.12}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </>
      )}

      {/* --- REAR TAILLIGHTS (NEON RED LED LIGHTBAR) --- */}
      <mesh position={[0, 0.38, -2.22]}>
        <boxGeometry args={[1.72, 0.08, 0.06]} />
        <meshStandardMaterial
          color="#FF0033"
          emissive="#FF0022"
          emissiveIntensity={isNight ? 4.0 : 1.2}
          roughness={0.2}
        />
      </mesh>
      {/* Rear Number Plate "A ONE MOTORS" */}
      <mesh position={[0, 0.22, -2.22]}>
        <boxGeometry args={[0.65, 0.18, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
      </mesh>

      {/* --- SPORT REAR SPOILER --- */}
      <group position={[0, 0.72, -1.9]}>
        {/* Spoiler wing */}
        <mesh position={[0, 0.18, 0]} castShadow>
          <boxGeometry args={[1.76, 0.05, 0.32]} />
          <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Spoiler pillars */}
        <mesh position={[-0.55, 0.08, 0]}>
          <boxGeometry args={[0.05, 0.18, 0.1]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        <mesh position={[0.55, 0.08, 0]}>
          <boxGeometry args={[0.05, 0.18, 0.1]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      </group>

      {/* --- SIDE MIRRORS --- */}
      <mesh position={[-0.88, 0.58, 0.65]} rotation={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.18, 0.1, 0.16]} />
        <meshStandardMaterial color={accentColor} metalness={0.5} />
      </mesh>
      <mesh position={[0.88, 0.58, 0.65]} rotation={[0, -0.2, 0]} castShadow>
        <boxGeometry args={[0.18, 0.1, 0.16]} />
        <meshStandardMaterial color={accentColor} metalness={0.5} />
      </mesh>

      {/* --- FOUR WHEELS WITH ALLOY RIMS & BRAKE CALIPERS --- */}
      {[
        { x: -0.92, y: 0.12, z: 1.35, key: 'front-left' },
        { x: 0.92, y: 0.12, z: 1.35, key: 'front-right' },
        { x: -0.92, y: 0.12, z: -1.35, key: 'rear-left' },
        { x: 0.92, y: 0.12, z: -1.35, key: 'rear-right' },
      ].map((pos, idx) => (
        <group
          key={pos.key}
          position={[pos.x, pos.y, pos.z]}
          ref={(el) => {
            if (el) wheelsRef.current[idx] = el;
          }}
        >
          {/* Rubber Tire */}
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.34, 0.34, 0.28, 24]} />
            <meshStandardMaterial color="#1C1C1C" roughness={0.8} />
          </mesh>
          {/* Metal Alloy Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.24, 0.24, 0.29, 12]} />
            <meshStandardMaterial
              color="#A3A3A3"
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>
          {/* Wheel Yellow Hub Accent */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.07, 0.07, 0.3, 12]} />
            <meshStandardMaterial color={accentColor} />
          </mesh>
        </group>
      ))}

      {/* --- UNDERGLOW NEON (IN NIGHT MODE) --- */}
      {isNight && (
        <pointLight
          position={[0, 0.08, 0]}
          color={accentColor}
          intensity={1.8}
          distance={3.5}
        />
      )}
    </group>
  );
};
