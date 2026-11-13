import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HighwayRoadProps {
  isNight: boolean;
  speed?: number;
}

export const HighwayRoad: React.FC<HighwayRoadProps> = ({ isNight, speed = 1 }) => {
  const roadLinesRef = useRef<THREE.InstancedMesh>(null);
  const sideMarkersRef = useRef<THREE.InstancedMesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const LINE_COUNT = 32;
  const ROAD_LENGTH = 160;
  const SPACING = ROAD_LENGTH / LINE_COUNT;

  // Static positions initialized once
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Floating speed dust particles
  const particleCount = 200;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30; // X
      pos[i * 3 + 1] = Math.random() * 8 + 0.2; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * ROAD_LENGTH; // Z
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    const moveZ = delta * 24 * speed;

    // Animate dashed center lane markings
    if (roadLinesRef.current) {
      for (let i = 0; i < LINE_COUNT; i++) {
        roadLinesRef.current.getMatrixAt(i, dummy.matrix);
        dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);

        dummy.position.z -= moveZ;
        if (dummy.position.z < -40) {
          dummy.position.z += ROAD_LENGTH;
        }

        dummy.updateMatrix();
        roadLinesRef.current.setMatrixAt(i, dummy.matrix);
      }
      roadLinesRef.current.instanceMatrix.needsUpdate = true;
    }

    // Animate side road reflectors / cat-eyes
    if (sideMarkersRef.current) {
      for (let i = 0; i < LINE_COUNT * 2; i++) {
        sideMarkersRef.current.getMatrixAt(i, dummy.matrix);
        dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);

        dummy.position.z -= moveZ;
        if (dummy.position.z < -40) {
          dummy.position.z += ROAD_LENGTH;
        }

        dummy.updateMatrix();
        sideMarkersRef.current.setMatrixAt(i, dummy.matrix);
      }
      sideMarkersRef.current.instanceMatrix.needsUpdate = true;
    }

    // Animate flying atmospheric particles
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 2] -= moveZ * 1.5;
        if (positions[i * 3 + 2] < -40) {
          positions[i * 3 + 2] += ROAD_LENGTH;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Colors based on theme
  const asphaltColor = isNight ? '#0D0D10' : '#2A2D34';
  const yellowLineColor = '#FFD400';
  const whiteLineColor = isNight ? '#E0E0E0' : '#FFFFFF';

  return (
    <group position={[0, 0, 0]}>
      {/* --- ASPHALT MAIN ROAD SURFACE --- */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 20]} receiveShadow>
        <planeGeometry args={[14, ROAD_LENGTH]} />
        <meshStandardMaterial
          color={asphaltColor}
          roughness={0.7}
          metalness={0.25}
        />
      </mesh>

      {/* --- ROAD SHOULDERS / ROAD CURBS --- */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-7.2, 0.05, 20]}>
        <planeGeometry args={[0.5, ROAD_LENGTH]} />
        <meshStandardMaterial color={isNight ? '#222222' : '#888888'} roughness={0.8} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[7.2, 0.05, 20]}>
        <planeGeometry args={[0.5, ROAD_LENGTH]} />
        <meshStandardMaterial color={isNight ? '#222222' : '#888888'} roughness={0.8} />
      </mesh>

      {/* --- OUTER SOLID LANE LINES (WHITE) --- */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5.5, 0.01, 20]}>
        <planeGeometry args={[0.2, ROAD_LENGTH]} />
        <meshBasicMaterial color={whiteLineColor} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5.5, 0.01, 20]}>
        <planeGeometry args={[0.2, ROAD_LENGTH]} />
        <meshBasicMaterial color={whiteLineColor} />
      </mesh>

      {/* --- INNER SOLID LANE LINES (SUBDIVIDING LANES) --- */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2.75, 0.005, 20]}>
        <planeGeometry args={[0.08, ROAD_LENGTH]} />
        <meshBasicMaterial color={isNight ? '#444444' : '#888888'} opacity={0.6} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.75, 0.005, 20]}>
        <planeGeometry args={[0.08, ROAD_LENGTH]} />
        <meshBasicMaterial color={isNight ? '#444444' : '#888888'} opacity={0.6} transparent />
      </mesh>

      {/* --- CENTER DASHED A ONE YELLOW LANE MARKINGS (INSTANCED MESH) --- */}
      <instancedMesh
        ref={roadLinesRef}
        args={[undefined, undefined, LINE_COUNT]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[0.26, 2.5]} />
        <meshBasicMaterial
          color={yellowLineColor}
          toneMapped={false}
        />
      </instancedMesh>

      {/* --- ROAD CAT-EYES / REFLECTORS ON BOTH SIDES --- */}
      <instancedMesh
        ref={sideMarkersRef}
        args={[undefined, undefined, LINE_COUNT * 2]}
        position={[0, 0.02, 0]}
      >
        <boxGeometry args={[0.1, 0.04, 0.1]} />
        <meshBasicMaterial
          color={isNight ? '#FFD400' : '#FFDD33'}
        />
      </instancedMesh>

      {/* --- HORIZON ROAD FOG FADE --- */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 90]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial
          color={isNight ? '#080808' : '#F8F8F5'}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* --- FLOATING SPEED STREAK PARTICLES --- */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isNight ? 0.07 : 0.05}
          color={isNight ? '#FFE885' : '#888888'}
          transparent
          opacity={isNight ? 0.6 : 0.3}
          blending={isNight ? THREE.AdditiveBlending : THREE.NormalBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};
