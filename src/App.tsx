/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Loader } from '@react-three/drei';
import { Scene } from './Scene';
import { Music, Music2, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { STAGES } from './constants';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // Audio setup (using a soft placeholder or just a toggle for now)
  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    // In a real app, you'd play/pause an actual audio element here
  };

  return (
    <div className="h-screen w-full bg-pink-50 font-sans selection:bg-pink-200">
      {/* Intro Overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-pink-100"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center"
            >
              <Heart className="w-20 h-20 text-pink-500 mx-auto mb-6 animate-pulse" />
              <h1 className="text-6xl md:text-8xl font-display text-pink-600 mb-4">
                Bernadette König
              </h1>
              <p className="text-xl text-pink-400 mb-8 tracking-widest uppercase">
                A Journey of Love & Memories
              </p>
              <button 
                onClick={() => setShowIntro(false)}
                className="px-10 py-4 bg-pink-500 text-white rounded-full font-bold text-lg hover:bg-pink-600 transition-all transform hover:scale-105 shadow-lg shadow-pink-200"
              >
                Begin the Journey
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={STAGES.length} damping={0.3}>
            <Scene />
          </ScrollControls>
        </Suspense>
      </Canvas>

      {/* UI Elements */}
      <div className="fixed top-6 left-6 z-40">
        <h2 className="text-2xl font-display text-pink-500 drop-shadow-sm">
          From your husband
        </h2>
      </div>

      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4">
        <button 
          onClick={toggleMusic}
          className="p-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg text-pink-500 hover:text-pink-600 transition-colors"
        >
          {isPlaying ? <Music className="w-6 h-6" /> : <Music2 className="w-6 h-6 opacity-50" />}
        </button>
        <div className="text-xs text-pink-400 font-medium uppercase tracking-tighter vertical-text">
          Scroll to explore
        </div>
      </div>

      <Loader />
    </div>
  );
}
