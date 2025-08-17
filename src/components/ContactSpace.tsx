import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Ring, Torus, Environment } from '@react-three/drei';
import * as THREE from 'three';

const InteractivePlanet = ({ position }: { position: [number, number, number] }) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      const scale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
    
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.5}>
      <group position={position}>
        <Sphere
          ref={meshRef}
          args={[0.8, 64, 64]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial
            color={hovered ? "#ec4899" : "#8b5cf6"}
            emissive={hovered ? "#ec4899" : "#8b5cf6"}
            emissiveIntensity={0.1}
            roughness={0.1}
            metalness={0.1}
          />
        </Sphere>
        
        <Ring
          ref={ringRef}
          args={[1.2, 1.5, 64]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial
            color="#a855f7"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </Ring>
      </group>
    </Float>
  );
};

const OrbitingMoons = ({ planetPosition }: { planetPosition: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={planetPosition}>
      <Sphere args={[0.1, 16, 16]} position={[2, 0, 0]}>
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.1} />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[-2.5, 0.5, 0]}>
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.1} />
      </Sphere>
    </group>
  );
};

const CosmicTorus = () => {
  const torusRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      torusRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <Torus
      ref={torusRef}
      args={[3, 0.1, 16, 100]}
      position={[0, 0, -5]}
    >
      <meshStandardMaterial
        color="#ec4899"
        emissive="#ec4899"
        emissiveIntensity={0.3}
        transparent
        opacity={0.7}
      />
    </Torus>
  );
};

export const ContactSpace = () => {
  const planetPositions: [number, number, number][] = [
    [-4, 2, -2],
    [4, -1, -3],
    [0, 3, -4],
  ];

  return (
    <div className="w-full h-[500px]">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Environment preset="night" />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />
        
        {planetPositions.map((position, index) => (
          <group key={index}>
            <InteractivePlanet position={position} />
            <OrbitingMoons planetPosition={position} />
          </group>
        ))}
        
        <CosmicTorus />
      </Canvas>
    </div>
  );
};