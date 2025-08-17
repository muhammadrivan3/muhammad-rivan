/* eslint-disable */
import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { WebGLContextHandler } from './WebGLContextHandler';
import { useIsMobile } from '@/hooks/use-mobile';

const MovingStars = ({ count }: { count: number }) => {
  const ref = useRef<THREE.Points>(null);
  // const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);
    
    for (let i = 0; i < count; i++) {
      // Random sphere distribution
      const radius = Math.random() * 25 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Color variation (purple to pink)
      const hue = 0.7 + Math.random() * 0.3;
      colors[i * 3] = hue;
      colors[i * 3 + 1] = 0.6 + Math.random() * 0.4;
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
    }
    
    return [positions, colors];
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 50;
      ref.current.rotation.y -= delta / 75;
      
      // Animate individual stars
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + positions[i]) * 0.001;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarField = () => {
  
  const isMobile = useIsMobile();
  const starCount = isMobile ? 500 : 1000;
  return (
    <div className="absolute inset-0 z-0 w-full min-h-screen">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: isMobile ? "low-power" : "high-performance",
          failIfMajorPerformanceCaveat: false
        }}
        dpr={[1, 1.5]}
        onCreated={({ gl }) => {
          const maxPixelRatio = Math.min(window.devicePixelRatio, 1.5);
          gl.setPixelRatio(maxPixelRatio);
        }}
      >
        <WebGLContextHandler />
        <Suspense fallback={null}>
          <MovingStars  count={starCount}/>
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};
