/* eslint-disable */
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedText3D = () => {
  const textRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Center>
        <Text3D
          ref={textRef}
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.8}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          SKILLS
          <MeshTransmissionMaterial
            transmission={0.9}
            thickness={0.1}
            roughness={0.1}
            chromaticAberration={0.1}
            color="#8b5cf6"
          />
        </Text3D>
      </Center>
    </Float>
  );
};

const SkillOrb = ({ position, skill }: { 
  position: [number, number, number], 
  skill: { name: string; level: number; color: string } 
}) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      
      const scale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          transparent
          opacity={0.8}
          emissive={skill.color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
    </Float>
  );
};

export const Skills3D = () => {
  const skills = [
    { name: "React", level: 95, color: "#61dafb" },
    { name: "Three.js", level: 85, color: "#000000" },
    { name: "TypeScript", level: 90, color: "#3178c6" },
    { name: "GSAP", level: 88, color: "#88ce02" },
    { name: "Node.js", level: 82, color: "#339933" },
    { name: "Python", level: 80, color: "#3776ab" },
  ];

  const positions: [number, number, number][] = [
    [-2, 1, 0],
    [2, 1, 0],
    [-1, -1, 1],
    [1, -1, 1],
    [0, 0, -1],
    [-2, -1, -1],
  ];

  return (
    <div className="w-full h-96">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
        
        <AnimatedText3D />
        
        {skills.map((skill, index) => (
          <SkillOrb
            key={skill.name}
            position={positions[index]}
            skill={skill}
          />
        ))}
      </Canvas>
    </div>
  );
};