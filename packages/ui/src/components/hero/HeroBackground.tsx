'use client'

import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface HeroBackgroundProps {
  className?: string
  children?: React.ReactNode
}

export function HeroBackground({ className, children }: HeroBackgroundProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* Gradient background */}
      <div className="absolute inset-0 hero-gradient opacity-50" />
      
      {/* Animated orbs */}
      <motion.div
        className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary-200 opacity-30 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary-200 opacity-30 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      
      {/* Content */}
      {children}
    </div>
  )
}