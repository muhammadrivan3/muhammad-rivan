/* eslint-disable */
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Box, Cylinder, Cone, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const ProjectBox = ({ 
  position, 
  rotation, 
  project 
}: { 
  position: [number, number, number];
  rotation: [number, number, number];
  project: { title: string; color: string; category: string };
}) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.1 : clicked ? 0.9 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      if (hovered) {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <Box
        ref={meshRef}
        position={position}
        rotation={rotation}
        args={[1, 1, 1]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={() => setClicked(true)}
        onPointerUp={() => setClicked(false)}
      >
        <meshStandardMaterial
          color={project.color}
          transparent
          opacity={0.8}
          emissive={project.color}
          emissiveIntensity={hovered ? 0.2 : 0.05}
          roughness={0.1}
          metalness={0.1}
        />
      </Box>
    </Float>
  );
};

const ServiceGeometry = ({ 
  position, 
  geometryType, 
  service 
}: { 
  position: [number, number, number];
  geometryType: 'box' | 'cylinder' | 'cone';
  service: { title: string; color: string };
}) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      
      const targetY = position[1] + (hovered ? 0.5 : 0);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
    }
  });

  const GeometryComponent = () => {
    switch (geometryType) {
      case 'cylinder':
        return <Cylinder args={[0.5, 0.5, 1, 8]} />;
      case 'cone':
        return <Cone args={[0.5, 1, 8]} />;
      default:
        return <Box args={[1, 1, 1]} />;
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <GeometryComponent />
        <meshStandardMaterial
          color={service.color}
          transparent
          opacity={0.7}
          wireframe={hovered}
          emissive={service.color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
    </Float>
  );
};

export const Portfolio3D = () => {
  const projects = [
    { title: "AR Shopping", color: "#ff6b6b", category: "Web Development" },
    { title: "Neural Viz", color: "#4ecdc4", category: "Data Viz" },
    { title: "Fashion App", color: "#45b7d1", category: "Mobile" },
    { title: "Portfolio", color: "#96ceb4", category: "Web" },
    { title: "VR Gallery", color: "#ffeaa7", category: "VR/AR" },
    { title: "Fintech", color: "#dda0dd", category: "Finance" },
  ];

  const services = [
    { title: "Development", color: "#8b5cf6" },
    { title: "3D & Animation", color: "#ec4899" },
    { title: "UI/UX Design", color: "#06b6d4" },
    { title: "Consulting", color: "#84cc16" },
  ];

  return (
    <div className="w-full h-[600px]">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 50 }}
        shadows
      >
        <Environment preset="studio" />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />
        
        {/* Projects */}
        {projects.map((project, index) => {
          const angle = (index / projects.length) * Math.PI * 2;
          const radius = 4;
          const position: [number, number, number] = [
            Math.cos(angle) * radius,
            Math.sin(index * 0.5) * 2,
            Math.sin(angle) * radius
          ];
          const rotation: [number, number, number] = [
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          ];
          
          return (
            <ProjectBox
              key={project.title}
              position={position}
              rotation={rotation}
              project={project}
            />
          );
        })}
        
        {/* Services */}
        {services.map((service, index) => {
          const geometryTypes: ('box' | 'cylinder' | 'cone')[] = ['box', 'cylinder', 'cone', 'box'];
          const positions: [number, number, number][] = [
            [-6, 2, 0],
            [6, 2, 0],
            [-6, -2, 0],
            [6, -2, 0],
          ];
          
          return (
            <ServiceGeometry
              key={service.title}
              position={positions[index]}
              geometryType={geometryTypes[index]}
              service={service}
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