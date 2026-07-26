import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = true, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={`glass-card rounded-2xl p-5 ${hover ? 'glass-card-hover' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
