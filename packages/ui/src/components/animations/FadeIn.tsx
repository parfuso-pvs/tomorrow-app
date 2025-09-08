'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/utils'

interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number
  duration?: number
  children: React.ReactNode
  className?: string
}

export function FadeIn({ 
  delay = 0, 
  duration = 0.8, 
  children, 
  className,
  ...props 
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}