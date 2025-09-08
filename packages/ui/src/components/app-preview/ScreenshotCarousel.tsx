'use client'

import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface ScreenshotCarouselProps {
  screenshots: string[]
  activeIndex: number
  onScreenshotClick: (index: number) => void
  className?: string
}

export function ScreenshotCarousel({
  screenshots,
  activeIndex,
  onScreenshotClick,
  className,
}: ScreenshotCarouselProps) {
  return (
    <div className={cn('w-full', className)}>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
        All Screenshots
      </h3>
      
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex gap-4 mx-auto">
          {screenshots.map((screenshot, index) => (
            <motion.button
              key={index}
              onClick={() => onScreenshotClick(index)}
              className={cn(
                'relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300',
                'hover:shadow-lg hover:-translate-y-1',
                activeIndex === index
                  ? 'ring-2 ring-primary-500 shadow-lg scale-105'
                  : 'hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600'
              )}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Screenshot */}
              <div className="w-32 h-64 sm:w-40 sm:h-80 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                <img
                  src={screenshot}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity',
                  activeIndex === index ? 'opacity-0' : 'opacity-100'
                )} />
              </div>

              {/* Active Indicator */}
              {activeIndex === index && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              {/* Screenshot Number */}
              <div className="absolute top-2 left-2 w-6 h-6 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xs font-bold">
                {index + 1}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Navigation Hint */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4"
      >
        Click any screenshot to preview • {screenshots.length} screens total
      </motion.p>
    </div>
  )
}