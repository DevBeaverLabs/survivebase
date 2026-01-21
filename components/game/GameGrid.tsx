'use client';

import { Game } from '@/types';
import { motion } from 'framer-motion';
import GameCard from './GameCard';

interface GameGridProps {
  games: Game[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut' as const,
    },
  },
};

export default function GameGrid({ games }: GameGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {games.map((game) => (
        <motion.div key={game.appid} variants={itemVariants}>
          <GameCard game={game} />
        </motion.div>
      ))}
    </motion.div>
  );
}
