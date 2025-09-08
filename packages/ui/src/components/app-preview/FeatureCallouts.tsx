'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { cn } from '../../lib/utils'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface Feature {
  id: string
  title: string
  description: string
  position: { x: number; y: number }
  icon: React.ReactNode
}

interface FeatureCalloutsProps {
  features: Feature[]
  deviceType: 'mobile' | 'desktop'
  className?: string
}

export function FeatureCallouts({ features, deviceType, className }: FeatureCalloutsProps) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)

  const handleFeatureClick = (featureId: string) => {
    setActiveFeature(activeFeature === featureId ? null : featureId)
  }

  return (
    <div className={cn('absolute inset-0 pointer-events-none', className)}>
      {features.map((feature, index) => {
        const isActive = activeFeature === feature.id
        
        // Adjust positions based on device type
        const position = {
          x: deviceType === 'mobile' ? feature.position.x : feature.position.x * 1.2,
          y: deviceType === 'mobile' ? feature.position.y : feature.position.y * 1.1,
        }

        return (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="absolute pointer-events-auto"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Enhanced Pulse Animation */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.2,
              }}
              className="absolute inset-0 w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full -translate-x-1/2 -translate-y-1/2"
            />
            
            {/* Secondary pulse for depth */}
            <motion.div
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.2 + 0.5,
              }}
              className="absolute inset-0 w-10 h-10 bg-gradient-to-r from-primary-500/50 to-secondary-500/50 rounded-full -translate-x-1/2 -translate-y-1/2"
            />

            {/* Enhanced Callout Button with glassmorphism */}
            <motion.button
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleFeatureClick(feature.id)}
              className={cn(
                'relative w-10 h-10 rounded-full border-2 shadow-2xl transition-all z-10',
                'flex items-center justify-center text-white text-xs font-bold',
                'backdrop-blur-md bg-white/20',
                isActive
                  ? 'border-secondary-400 bg-secondary-500/80 scale-125'
                  : 'border-white/50 hover:bg-primary-500/80'
              )}
              style={{
                boxShadow: isActive 
                  ? '0 0 20px rgba(236, 72, 153, 0.5)'
                  : '0 0 15px rgba(59, 130, 246, 0.3)'
              }}
            >
              <span className="relative z-10">{index + 1}</span>
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full opacity-70" />
            </motion.button>

            {/* Feature Tooltip */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 z-20"
                  style={{ 
                    filter: 'drop-shadow(0 10px 40px rgba(0, 0, 0, 0.15))'
                  }}
                >
                  <div className="relative backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-5 min-w-72 max-w-96">
                    {/* Enhanced Arrow with gradient */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 border-l border-t border-white/20 dark:border-gray-700/50 rotate-45" />
                    
                    {/* Enhanced Close Button */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setActiveFeature(null)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 backdrop-blur-sm transition-all"
                    >
                      <XMarkIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </motion.button>

                    {/* Enhanced Content with animations */}
                    <motion.div 
                      className="flex items-start gap-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <motion.div 
                        className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white shadow-lg"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {feature.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-base">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {feature.description}
                        </p>
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="mt-3 text-xs text-primary-600 dark:text-primary-400 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                        >
                          Learn more →
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Connection Line */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
              className="absolute top-1/2 left-1/2 w-1 h-12 bg-gradient-to-b from-primary-500 to-transparent -translate-x-1/2 -translate-y-full opacity-50"
            />
          </motion.div>
        )
      })}
    </div>
  )
}