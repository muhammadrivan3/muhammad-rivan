import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

export const WebGLContextHandler = () => {
  const { gl } = useThree();

  useEffect(() => {
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn('WebGL context lost, attempting to restore...');
    };

    const handleContextRestore = () => {
      console.log('WebGL context restored');
      // Force re-render
      gl.setSize(gl.domElement.width, gl.domElement.height);
    };

    const canvas = gl.domElement;
    
    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestore);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestore);
    };
  }, [gl]);

  return null;
};
