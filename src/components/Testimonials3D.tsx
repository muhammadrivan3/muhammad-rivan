/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Html, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const TestimonialOrb = ({ 
  position, 
  testimonial, 
  isActive, 
  onClick 
}: { 
  position: [number, number, number];
  testimonial: any;
  isActive: boolean;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = isActive ? 1.3 : hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
      
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <Sphere
        ref={meshRef}
        position={position}
        args={[0.8, 32, 32]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <MeshDistortMaterial
          color={isActive ? "#ec4899" : "#8b5cf6"}
          distort={isActive ? 0.4 : 0.2}
          speed={2}
          transparent
          opacity={0.8}
          emissive={isActive ? "#ec4899" : "#8b5cf6"}
          emissiveIntensity={isActive ? 0.3 : 0.1}
        />
      </Sphere>
      
      {isActive && (
        <Html center distanceFactor={15}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card/90 backdrop-blur-sm border border-border rounded-xl p-6 max-w-sm text-center shadow-premium"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                {testimonial.name.charAt(0)}
              </div>
            </div>
            <p className="text-sm mb-4 italic">{`${testimonial.content}`}</p>
            <div>
              <div className="font-semibold text-sm">{testimonial.name}</div>
              <div className="text-xs text-muted-foreground">{testimonial.role}</div>
              <div className="text-xs text-muted-foreground">{testimonial.company}</div>
            </div>
            <div className="flex justify-center mt-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-yellow-400">⭐</span>
              ))}
            </div>
          </motion.div>
        </Html>
      )}
    </Float>
  );
};

export const Testimonials3D = ({ testimonials }: { testimonials: any[] }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const positions: [number, number, number][] = [
    [-3, 1, 0],
    [0, -1, 2],
    [3, 1, -1],
  ];

  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <Environment preset="studio" />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />
        
        {testimonials.map((testimonial, index) => (
          <TestimonialOrb
            key={testimonial.id}
            position={positions[index]}
            testimonial={testimonial}
            isActive={activeTestimonial === index}
            onClick={() => setActiveTestimonial(index)}
          />
        ))}
      </Canvas>
      
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Click on the floating orbs to read testimonials
        </p>
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                activeTestimonial === index ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};