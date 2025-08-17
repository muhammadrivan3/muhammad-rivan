/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useMemo, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { WebGLContextHandler } from './WebGLContextHandler';

const AnimatedSphere = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Base rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // Mouse interaction
      meshRef.current.rotation.x += mousePosition.y * 0.0005;
      meshRef.current.rotation.y += mousePosition.x * 0.0005;
      
      // Scale with mouse proximity
      const distance = Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2);
      const scale = 2.4 + Math.sin(distance * 0.01 + state.clock.elapsedTime) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
    
    if (materialRef.current) {
      materialRef.current.distort = 0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      materialRef.current.speed = 1.5 + mousePosition.x * 0.001;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 200]}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#8b5cf6"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  );
};

const InteractiveParticles = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const points = useRef<THREE.Points>(null);
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(500 * 3);
    const colors = new Float32Array(500 * 3);
    
    for (let i = 0; i < 500; i++) {
      // Position
      positions[i * 3 + 0] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      
      // Colors
      const hue = Math.random() * 0.1 + 0.7; // Purple to pink range
      colors[i * 3 + 0] = hue;
      colors[i * 3 + 1] = 0.5 + Math.random() * 0.5;
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05 + mousePosition.y * 0.0001;
      points.current.rotation.y = state.clock.elapsedTime * 0.075 + mousePosition.x * 0.0001;
      
      // Animate individual particles
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + positions[i]) * 0.001;
      }
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.positions.length / 3}
          array={particlesPosition.positions}
          itemSize={3}
          args={[particlesPosition.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesPosition.colors.length / 3}
          array={particlesPosition.colors}
          itemSize={3}
          args={[particlesPosition.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.02} 
        vertexColors 
        transparent 
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
};

const FloatingGeometry = ({ position, mousePosition }: { 
  position: [number, number, number], 
  mousePosition: { x: number; y: number } 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      
      // Mouse influence
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5 + mousePosition.x * 0.001;
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime + position[1]) * 0.5 + mousePosition.y * 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.3]} />
      <meshStandardMaterial 
        color="#a855f7" 
        transparent 
        opacity={0.6} 
        wireframe 
      />
    </mesh>
  );
};

interface ThreeBackgroundProps {
  className?: string;
  interactive?: boolean;
  onReady?: () => void;
}

export const ThreeBackground = ({ className = "", interactive = true, onReady }: ThreeBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (!interactive) return;
    
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    
    setMousePosition({
      x: (clientX - innerWidth / 2) / (innerWidth / 2),
      y: (clientY - innerHeight / 2) / (innerHeight / 2)
    });
  }, [interactive]);

  const geometryPositions: [number, number, number][] = [
    [-4, 2, -2],
    [4, -2, -1],
    [-2, -3, -3],
    [3, 3, -2],
    [-5, -1, -1],
    [2, -4, -2]
  ];

  return (
    <div 
      className={`absolute inset-0 ${className}`}
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]} // Reduced from 2 to prevent context loss
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false
        }}
        onCreated={({ gl }) => {
          // Set pixel ratio based on device capabilities
          const maxPixelRatio = Math.min(window.devicePixelRatio, 1.5);
          gl.setPixelRatio(maxPixelRatio);
          // Call onReady prop when the canvas is created and ready
          if (onReady) {
            onReady();
          }
        }}
      >
        <WebGLContextHandler />
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />
          
          <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={0.5} />
          
          <AnimatedSphere mousePosition={mousePosition} />
          <InteractiveParticles mousePosition={mousePosition} />
          
          {geometryPositions.map((position, index) => (
            <FloatingGeometry 
              key={index} 
              position={position} 
              mousePosition={mousePosition} 
            />
          ))}
          
          {interactive && <OrbitControls enableZoom={false} enablePan={false} />}
        </Suspense>
      </Canvas>
    </div>
  );
};