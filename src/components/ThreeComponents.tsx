import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Image, MeshWobbleMaterial, Sparkles, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { StageData } from '../constants';

export const MemoryFrame: React.FC<{ stage: StageData }> = ({ stage }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth tilt effect on hover
    const targetRotationX = hovered ? (state.mouse.y * 0.2) : 0;
    const targetRotationY = hovered ? (state.mouse.x * 0.2) : 0;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.1);
  });

  return (
    <group position={stage.position} rotation={stage.rotation}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group 
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          {/* Frame Backing */}
          <mesh scale={[4.2, 3.2, 0.1]}>
            <boxGeometry args={[1, 1, 1]} />
            <MeshWobbleMaterial 
              color={stage.type === 'bond' ? '#ffedd5' : '#ffffff'} 
              factor={0.1} 
              speed={1} 
            />
          </mesh>

          {/* Image */}
          {stage.image && (
            <Image 
              url={stage.image} 
              scale={[4, 3]} 
              position={[0, 0, 0.06]} 
              transparent
              opacity={1}
            />
          )}

          {/* Polaroid Style */}
          {stage.type === 'polaroid' && (
            <mesh position={[0, -1.8, 0.06]} scale={[4, 0.8, 0.01]}>
              <planeGeometry />
              <meshStandardMaterial color="white" />
            </mesh>
          )}

          {/* Sparkles for Meeting */}
          {stage.type === 'sparkle' && (
            <Sparkles count={50} scale={6} size={2} speed={0.4} color="#ffd700" />
          )}

          {/* Adventure Paper Planes (Simple placeholder meshes) */}
          {stage.type === 'adventure' && (
            <group position={[2.5, 1.5, 0]}>
               <mesh rotation={[0.5, 0.5, 0]}>
                 <coneGeometry args={[0.2, 0.5, 3]} />
                 <meshStandardMaterial color="#bae6fd" />
               </mesh>
            </group>
          )}
        </group>
      </Float>
    </group>
  );
};

export const Cloud: React.FC<{ position: [number, number, number], scale?: number }> = ({ position, scale = 1 }) => {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#fbcfe8" transparent opacity={0.6} />
        <mesh position={[0.8, 0.2, 0]} scale={0.7}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#fbcfe8" transparent opacity={0.6} />
        </mesh>
        <mesh position={[-0.8, -0.2, 0]} scale={0.8}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#fbcfe8" transparent opacity={0.6} />
        </mesh>
      </mesh>
    </Float>
  );
};

export const Heart: React.FC<{ position: [number, number, number], color?: string }> = ({ position, color = "#f472b6" }) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
    s.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1);
    s.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0);
    s.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0);
    return s;
  }, []);

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position} rotation={[Math.PI, 0, 0]} scale={0.5}>
        <extrudeGeometry args={[shape, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.1 }]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </Float>
  );
};

export const Cake: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Tier 1 */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 1, 32]} />
          <meshStandardMaterial color="#fbcfe8" />
        </mesh>
        {/* Tier 2 */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[1, 1, 0.8, 32]} />
          <meshStandardMaterial color="#f9a8d4" />
        </mesh>
        {/* Candles */}
        {[0, 1, 2, 3, 4].map((i) => (
          <group key={i} rotation={[0, (i * Math.PI * 2) / 5, 0]}>
            <mesh position={[0.6, 1.4, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
              <meshStandardMaterial color="#ffffff" />
              <mesh position={[0, 0.25, 0]}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} />
              </mesh>
            </mesh>
          </group>
        ))}
      </Float>
    </group>
  );
};
