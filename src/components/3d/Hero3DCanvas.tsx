import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { CarModel } from './CarModel';
import { HighwayRoad } from './HighwayRoad';
import { useTheme } from '../../context/ThemeContext';
import { playEngineStart, playCarHorn } from '../../utils/audio';
import { Camera, Volume2, Sparkles, FastForward } from 'lucide-react';

type CameraAngle = 'chase' | 'front' | 'side';

interface SceneContentProps {
  isNight: boolean;
  angle: CameraAngle;
  speed: number;
  mousePos: { x: number; y: number };
}

const SceneContent: React.FC<SceneContentProps> = ({ isNight, angle, speed, mousePos }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  // Target camera configurations for each angle
  const cameraPresets = {
    // Looking at the car from behind and above as it tears down the highway
    chase: {
      position: [0, 2.2, -5.8] as [number, number, number],
      lookAt: [0, 0.8, 12] as [number, number, number],
    },
    // Dramatic frontal view: car approaching the camera down the road
    front: {
      position: [0.8, 1.3, 6.2] as [number, number, number],
      lookAt: [0, 0.6, 0] as [number, number, number],
    },
    // Editorial three-quarter angled rolling profile
    side: {
      position: [-3.8, 1.6, -1.8] as [number, number, number],
      lookAt: [0, 0.6, 2] as [number, number, number],
    },
  };

  const target = cameraPresets[angle];

  useFrame((_, delta) => {
    if (!cameraRef.current) return;

    // Smooth lerp towards target position + subtle mouse parallax
    const parallaxX = mousePos.x * 0.4;
    const parallaxY = mousePos.y * 0.25;

    cameraRef.current.position.x = THREE.MathUtils.damp(
      cameraRef.current.position.x,
      target.position[0] + parallaxX,
      3.5,
      delta
    );
    cameraRef.current.position.y = THREE.MathUtils.damp(
      cameraRef.current.position.y,
      target.position[1] + parallaxY,
      3.5,
      delta
    );
    cameraRef.current.position.z = THREE.MathUtils.damp(
      cameraRef.current.position.z,
      target.position[2],
      3.5,
      delta
    );

    // Look at target with smoothing
    const lookTarget = new THREE.Vector3(target.lookAt[0], target.lookAt[1], target.lookAt[2]);
    cameraRef.current.lookAt(lookTarget);
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={48}
        near={0.1}
        far={200}
        position={cameraPresets[angle].position}
      />

      {/* --- DAY / NIGHT LIGHTING --- */}
      {isNight ? (
        <>
          <ambientLight intensity={0.4} color="#0B101D" />
          <directionalLight
            position={[10, 20, 15]}
            intensity={0.6}
            color="#99B8E8"
            castShadow
          />
          <pointLight position={[0, 4, -4]} intensity={1.2} color="#FFD400" distance={15} />
          <fog attach="fog" args={['#080808', 25, 90]} />
        </>
      ) : (
        <>
          <ambientLight intensity={1.2} color="#FFFFFF" />
          <directionalLight
            position={[12, 24, 18]}
            intensity={2.8}
            color="#FFF8E7"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-10, 10, -10]} intensity={0.8} color="#DCEBFF" />
          <fog attach="fog" args={['#F8F8F5', 30, 95]} />
        </>
      )}

      {/* --- CAR & ROAD --- */}
      <CarModel isNight={isNight} speed={speed} />
      <HighwayRoad isNight={isNight} speed={speed} />
    </>
  );
};

export const Hero3DCanvas: React.FC = () => {
  const { isNight } = useTheme();
  const [cameraAngle, setCameraAngle] = useState<CameraAngle>('chase');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isBoosting, setIsBoosting] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Mouse Parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });
  };

  const cycleCamera = () => {
    setCameraAngle((prev) => {
      if (prev === 'chase') return 'front';
      if (prev === 'front') return 'side';
      return 'chase';
    });
  };

  const handleSoundRev = () => {
    setHasInteracted(true);
    playEngineStart();
  };

  const handleHorn = () => {
    setHasInteracted(true);
    playCarHorn();
  };

  const handleBoost = () => {
    setIsBoosting(true);
    setSpeedMultiplier(2.2);
    playEngineStart();
    setTimeout(() => {
      setSpeedMultiplier(1);
      setIsBoosting(false);
    }, 2000);
  };

  return (
    <div
      className="relative w-full h-full min-h-[580px] lg:min-h-[720px] overflow-hidden select-none"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Canvas */}
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          <SceneContent
            isNight={isNight}
            angle={cameraAngle}
            speed={speedMultiplier}
            mousePos={mousePos}
          />
        </Suspense>
      </Canvas>

      {/* --- INTERACTIVE 3D COCKPIT CONTROLS BAR (BOTTOM OF 3D CANVAS) --- */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-wrap items-center gap-2">
        {/* Camera Angle Toggle */}
        <button
          onClick={cycleCamera}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wider backdrop-blur-md transition-all duration-300 border border-white/20 bg-black/40 hover:bg-black/60 text-white hover:border-brand-yellow hover:text-brand-yellow shadow-lg"
          title="Switch 3D View Angle"
        >
          <Camera className="w-3.5 h-3.5 text-brand-yellow" />
          <span className="hidden sm:inline uppercase">Cam:</span>
          <span className="uppercase font-bold text-brand-yellow">{cameraAngle}</span>
        </button>

        {/* Engine Sound Rev */}
        <button
          onClick={handleSoundRev}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wider backdrop-blur-md transition-all duration-300 border border-white/20 bg-black/40 hover:bg-black/60 text-white hover:border-brand-yellow hover:text-brand-yellow shadow-lg"
          title="Start / Rev Engine Sound"
        >
          <Volume2 className="w-3.5 h-3.5 text-brand-yellow animate-pulse" />
          <span className="hidden sm:inline">REV ENGINE</span>
        </button>

        {/* Car Horn */}
        <button
          onClick={handleHorn}
          className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold tracking-wider backdrop-blur-md transition-all duration-300 border border-white/20 bg-black/40 hover:bg-black/60 text-white hover:border-brand-yellow hover:text-brand-yellow shadow-lg"
          title="Honk Car Horn"
        >
          <span className="text-brand-yellow font-bold">HORN</span>
        </button>

        {/* Throttle Boost */}
        <button
          onClick={handleBoost}
          disabled={isBoosting}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wider backdrop-blur-md transition-all duration-300 border shadow-lg ${
            isBoosting
              ? 'bg-brand-yellow text-black border-brand-yellow scale-105 shadow-glow-yellow'
              : 'border-white/20 bg-black/40 hover:bg-black/60 text-white hover:border-brand-yellow hover:text-brand-yellow'
          }`}
          title="Accelerate Highway Speed"
        >
          <FastForward className="w-3.5 h-3.5" />
          <span>{isBoosting ? 'ACCELERATING!' : 'ACCELERATE'}</span>
        </button>
      </div>

      {/* Subtle Live Speedometer Telemetry Badge */}
      <div className="absolute top-24 right-6 z-20 hidden md:flex items-center gap-3 px-4 py-2 rounded-xl backdrop-blur-md bg-black/40 border border-white/10 text-white text-xs font-mono">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <div>
          <span className="text-gray-400">SIM VMAX: </span>
          <span className="text-brand-yellow font-bold text-sm">
            {isBoosting ? '118' : '65'} KM/H
          </span>
        </div>
        <div className="border-l border-white/20 pl-3">
          <span className="text-gray-400">GEAR: </span>
          <span className="text-white font-bold">{isBoosting ? 'D5' : 'D3'}</span>
        </div>
      </div>
    </div>
  );
};
