'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/utils'

interface StaggerChildrenProps extends HTMLMotionProps<'div'> {
  staggerDelay?: number
  children: React.ReactNode
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export function StaggerChildren({ 
  staggerDelay = 0.2, 
  children, 
  className,
  ...props 
}: StaggerChildrenProps) {
  return (
    <motion.div
      variants={{
        ...containerVariants,
        visible: {
          ...containerVariants.visible,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      initial="hidden"
      animate="visible"
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ 
  children, 
  className,
  ...props 
}: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      variants={itemVariants}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}