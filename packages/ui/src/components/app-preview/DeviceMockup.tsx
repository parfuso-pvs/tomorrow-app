'use client'

import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useState } from 'react'

interface DeviceMockupProps {
  type: 'mobile' | 'desktop'
  screenshot: string
  isDark?: boolean
  className?: string
  isInteractive?: boolean
}

export function DeviceMockup({ type, screenshot, isDark = false, className, isInteractive = true }: DeviceMockupProps) {
  const [isHovered, setIsHovered] = useState(false)
  if (type === 'mobile') {
    return (
      <motion.div
        initial={{ rotateY: 0, rotateX: 0 }}
        whileHover={isInteractive ? { 
          scale: 1.02,
          rotateY: -5,
          rotateX: 5,
        } : {}}
        animate={{
          y: isHovered ? -10 : 0,
        }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={cn('relative mx-auto max-w-sm', className)}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {/* Phone Frame */}
        <div className={cn(
          'relative p-3 rounded-[2.5rem] shadow-2xl',
          isDark ? 'bg-gray-800 shadow-black/25' : 'bg-white shadow-black/10'
        )}>
          {/* Inner Frame */}
          <div className={cn(
            'relative rounded-[2rem] overflow-hidden border-2',
            isDark ? 'border-gray-700' : 'border-gray-200'
          )}>
            {/* Notch */}
            <div className={cn(
              'absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 rounded-b-2xl z-10',
              isDark ? 'bg-gray-800' : 'bg-white'
            )}>
              <div className={cn(
                'absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-full',
                isDark ? 'bg-gray-600' : 'bg-gray-300'
              )} />
            </div>

            {/* Screen */}
            <motion.img
              key={screenshot}
              src={screenshot}
              alt="App screenshot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover aspect-[9/19.5]"
            />

            {/* Screen Overlay for better visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 pointer-events-none" />
          </div>

          {/* Home Indicator */}
          <div className={cn(
            'absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 rounded-full',
            isDark ? 'bg-gray-600' : 'bg-gray-300'
          )} />
        </div>

        {/* Enhanced Glow Effect with animation */}
        <motion.div 
          className="absolute inset-0 -z-10"
          animate={{
            scale: isHovered ? 1.15 : 1.1,
            opacity: isHovered ? 0.3 : 0.2
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full h-full bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-purple-500/20 rounded-[2.5rem] blur-xl" />
        </motion.div>
        
        {/* Reflection effect */}
        <div className="absolute inset-x-0 -bottom-20 h-40 opacity-20 transform scale-y-[-1] scale-x-100">
          <div className={cn(
            'relative p-3 rounded-[2.5rem]',
            isDark ? 'bg-gray-800' : 'bg-white'
          )} style={{ filter: 'blur(2px)' }}>
            <div className={cn(
              'relative rounded-[2rem] overflow-hidden border-2',
              isDark ? 'border-gray-700' : 'border-gray-200'
            )}>
              <img
                src={screenshot}
                alt="Reflection"
                className="w-full h-full object-cover aspect-[9/19.5] opacity-30"
              />
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ rotateY: 0, rotateX: 0 }}
      whileHover={isInteractive ? { 
        scale: 1.02,
        rotateY: 3,
        rotateX: -3,
      } : {}}
      animate={{
        y: isHovered ? -10 : 0,
      }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn('relative mx-auto max-w-4xl', className)}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Desktop Frame */}
      <div className={cn(
        'relative rounded-t-xl shadow-2xl',
        isDark ? 'bg-gray-800 shadow-black/25' : 'bg-white shadow-black/10'
      )}>
        {/* Top Bar */}
        <div className={cn(
          'flex items-center gap-2 px-4 py-3 border-b',
          isDark ? 'border-gray-700' : 'border-gray-200'
        )}>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <div className={cn(
            'flex-1 mx-4 h-6 rounded-md flex items-center px-3 text-xs',
            isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
          )}>
            <span>🔒 tomorrow-app.com</span>
          </div>
        </div>

        {/* Screen */}
        <div className="relative overflow-hidden rounded-b-xl">
          <motion.img
            key={screenshot}
            src={screenshot}
            alt="App screenshot"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover aspect-[16/10]"
          />
        </div>

        {/* Stand */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
          <div className={cn(
            'w-48 h-4 rounded-full',
            isDark ? 'bg-gray-700' : 'bg-gray-300'
          )} />
          <div className={cn(
            'w-16 h-2 mx-auto mt-1 rounded-full',
            isDark ? 'bg-gray-600' : 'bg-gray-400'
          )} />
        </div>
      </div>

      {/* Enhanced Glow Effect with animation */}
      <motion.div 
        className="absolute inset-0 -z-10"
        animate={{
          scale: isHovered ? 1.15 : 1.1,
          opacity: isHovered ? 0.3 : 0.2
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full h-full bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-purple-500/20 rounded-xl blur-xl" />
      </motion.div>
      
      {/* Glass morphism overlay for depth */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm pointer-events-none" />
    </motion.div>
  )
}