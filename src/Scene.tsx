import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Scroll, useScroll, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { STAGES } from './constants';
import { MemoryFrame, Cloud, Heart, Cake } from './components/ThreeComponents';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export const Scene: React.FC = () => {
  const scroll = useScroll();
  const { camera } = useThree();
  const lastStageRef = useRef<number>(-1);

  useFrame((state) => {
    const offset = scroll.offset;
    
    // Camera Path: Gentle S-Curve
    // We want the camera to move from z=5 down to z=-50
    const zPos = 5 - offset * 55;
    const xPos = Math.sin(offset * Math.PI * 2) * 2;
    const yPos = -offset * 12;

    camera.position.lerp(new THREE.Vector3(xPos, yPos, zPos), 0.1);
    
    // Look slightly ahead
    const lookAtPos = new THREE.Vector3(
      Math.sin((offset + 0.05) * Math.PI * 2) * 2,
      -(offset + 0.05) * 12,
      5 - (offset + 0.05) * 55
    );
    camera.lookAt(lookAtPos);

    // Trigger confetti at the end
    const currentStage = Math.floor(offset * STAGES.length);
    if (offset > 0.95 && lastStageRef.current !== 99) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbcfe8', '#f9a8d4', '#f472b6', '#fbbf24']
      });
      lastStageRef.current = 99;
    } else if (offset < 0.9) {
      lastStageRef.current = currentStage;
    }
  });

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Background Elements */}
      <group>
        {Array.from({ length: 20 }).map((_, i) => (
          <Cloud 
            key={i} 
            position={[
              (Math.random() - 0.5) * 20,
              -i * 3,
              -i * 5
            ]} 
            scale={1 + Math.random() * 2}
          />
        ))}
        {Array.from({ length: 30 }).map((_, i) => (
          <Heart 
            key={i} 
            position={[
              (Math.random() - 0.5) * 15,
              -i * 2,
              -i * 4
            ]} 
            color={i % 2 === 0 ? "#f472b6" : "#e879f9"}
          />
        ))}
      </group>

      {/* Stages */}
      {STAGES.map((stage) => (
        stage.type === 'finale' ? (
          <Cake key={stage.id} position={stage.position} />
        ) : (
          <MemoryFrame key={stage.id} stage={stage} />
        )
      ))}

      <ContactShadows position={[0, -15, -48]} opacity={0.4} scale={20} blur={2} far={4.5} />

      {/* HTML Overlay via Scroll.Html */}
      <Scroll html>
        <div className="w-screen">
          {STAGES.map((stage, i) => (
            <section 
              key={stage.id} 
              className="h-screen flex flex-pointer items-center justify-center pointer-events-none"
              style={{ paddingLeft: i % 2 === 0 ? '10%' : '50%', paddingRight: i % 2 === 0 ? '50%' : '10%' }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-md p-8 glass rounded-3xl pointer-events-auto"
              >
                <h2 className="text-4xl font-display text-pink-600 mb-4">{stage.title}</h2>
                <p className="text-lg text-gray-700 leading-relaxed">{stage.description}</p>
              </motion.div>
            </section>
          ))}
        </div>
      </Scroll>
    </>
  );
};
