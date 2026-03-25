import * as THREE from 'three';

export interface StageData {
  id: string;
  title: string;
  description: string;
  image: string;
  position: [number, number, number];
  rotation: [number, number, number];
  type: 'default' | 'polaroid' | 'sparkle' | 'adventure' | 'bond' | 'present' | 'finale';
}

export const STAGES: StageData[] = [
  {
    id: 'intro',
    title: 'The Beginning of Us 💕',
    description: 'A beautiful journey started with a single step into the soft sky of our dreams.',
    image: 'https://picsum.photos/seed/bernadette1/600/400',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    type: 'default'
  },
  {
    id: 'meeting',
    title: 'How We Met 💫',
    description: 'The moment the stars aligned and our worlds collided in a burst of magic.',
    image: 'https://picsum.photos/seed/bernadette2/600/400',
    position: [4, -2, -8],
    rotation: [0, -0.5, 0],
    type: 'sparkle'
  },
  {
    id: 'early-days',
    title: 'First Moments 🫶',
    description: 'Captured in time, these memories are the foundation of our love.',
    image: 'https://picsum.photos/seed/bernadette3/600/400',
    position: [-4, -4, -16],
    rotation: [0, 0.5, 0],
    type: 'polaroid'
  },
  {
    id: 'adventures',
    title: 'Our Adventures ✈️',
    description: 'Exploring the world together, one paper plane flight at a time.',
    image: 'https://picsum.photos/seed/bernadette4/600/400',
    position: [3, -6, -24],
    rotation: [0, -0.3, 0],
    type: 'adventure'
  },
  {
    id: 'bond',
    title: 'Through Everything 🤍',
    description: 'A bond that grows stronger with every sunset we share.',
    image: 'https://picsum.photos/seed/bernadette5/600/400',
    position: [-3, -8, -32],
    rotation: [0, 0.3, 0],
    type: 'bond'
  },
  {
    id: 'present',
    title: 'Today 🏡',
    description: 'Building our cozy home, filled with laughter and endless warmth.',
    image: 'https://picsum.photos/seed/bernadette6/600/400',
    position: [0, -10, -40],
    rotation: [0, 0, 0],
    type: 'present'
  },
  {
    id: 'finale',
    title: 'Happy Birthday, Bernadette! 🎂',
    description: 'Wishing you the most magical day filled with love and joy.',
    image: '',
    position: [0, -12, -48],
    rotation: [0, 0, 0],
    type: 'finale'
  }
];
