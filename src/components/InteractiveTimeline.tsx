import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, ContactShadows, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const FloatingCard = ({ 
  position, 
  rotation, 
  text, 
  delay = 0 
}: { 
  position: [number, number, number];
  rotation: [number, number, number];
  text: string;
  delay?: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.1;
      meshRef.current.rotation.z = rotation[2] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.05;
      
      const scale = hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[2, 1.2, 0.1]} />
        <meshStandardMaterial
          color={hovered ? "#ec4899" : "#8b5cf6"}
          transparent
          opacity={0.8}
          emissive={hovered ? "#ec4899" : "#8b5cf6"}
          emissiveIntensity={0.1}
        />
        
        <Html center distanceFactor={10}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay * 0.5 }}
            className="text-white text-center font-medium text-sm bg-black/20 backdrop-blur-sm rounded-lg p-4 pointer-events-none"
            style={{ width: '200px' }}
          >
            {text}
          </motion.div>
        </Html>
      </mesh>
    </Float>
  );
};

const InteractiveTimeline = () => {
  const timelineEvents = [
    "Started Web Development",
    "First Freelance Project", 
    "Learned Three.js & WebGL",
    "Founded Digital Agency",
    "Award-Winning Portfolio",
    "Industry Recognition"
  ];

  return (
    <div className="w-full h-96">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Environment preset="night" />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />
        
        {timelineEvents.map((event, index) => {
          const angle = (index / timelineEvents.length) * Math.PI * 2;
          const radius = 4;
          const position: [number, number, number] = [
            Math.cos(angle) * radius,
            Math.sin(index * 0.5) * 1.5,
            Math.sin(angle) * radius
          ];
          const rotation: [number, number, number] = [0, angle, 0];
          
          return (
            <FloatingCard
              key={event}
              position={position}
              rotation={rotation}
              text={event}
              delay={index * 0.5}
            />
          );
        })}
        
        <ContactShadows 
          position={[0, -4, 0]} 
          opacity={0.4} 
          scale={20} 
          blur={2} 
          far={4.5} 
        />
      </Canvas>
    </div>
  );
};

export default InteractiveTimeline;