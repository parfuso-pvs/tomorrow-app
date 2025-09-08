'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [])

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        updateSliderPosition(e.clientX)
      }
    },
    [isDragging, updateSliderPosition]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        updateSliderPosition(e.touches[0].clientX)
      }
    },
    [isDragging, updateSliderPosition]
  )

  const handleClick = (e: React.MouseEvent) => {
    if (!isDragging) {
      updateSliderPosition(e.clientX)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return
      const isActive = document.activeElement === containerRef.current
      if (!isActive) return
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setSliderPosition(prev => Math.max(0, prev - 5))
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setSliderPosition(prev => Math.min(100, prev + 5))
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  return (
    <div 
      className={cn('relative rounded-xl overflow-hidden shadow-lg', className)}
      role="slider"
      aria-label="Before and after comparison slider"
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`Showing ${Math.round(sliderPosition)}% of before image and ${Math.round(100 - sliderPosition)}% of after image`}
    >
      <div
        ref={containerRef}
        className="relative aspect-video cursor-col-resize select-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-xl"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        onClick={handleClick}
        tabIndex={0}
        role="application"
        aria-label="Drag or use arrow keys to compare before and after images"
      >
        {/* After Image (Full Width) */}
        <div className="absolute inset-0">
          <img
            src={afterImage}
            alt={`After: ${afterLabel}`}
            className="w-full h-full object-cover"
            draggable={false}
            loading="lazy"
          />
          
          {/* After Label */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full shadow-lg">
            {afterLabel}
          </div>
        </div>

        {/* Before Image (Clipped) */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt={`Before: ${beforeLabel}`}
            className="w-full h-full object-cover"
            draggable={false}
            loading="lazy"
          />
          
          {/* Before Label */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full shadow-lg">
            {beforeLabel}
          </div>
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Top Handle */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-white rounded-b-lg shadow-lg" />
          
          {/* Bottom Handle */}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-white rounded-t-lg shadow-lg" />
        </div>

        {/* Slider Handle */}
        <motion.div
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 cursor-col-resize"
          style={{ left: `${sliderPosition}%` }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: isDragging ? 1.1 : 1 }}
        >
          <div
            className="w-12 h-12 bg-white rounded-full shadow-xl border-4 border-gray-100 flex items-center justify-center cursor-col-resize"
            onMouseDown={handleMouseDown}
            onTouchStart={() => setIsDragging(true)}
            role="button"
            aria-label="Drag handle for comparison slider"
            tabIndex={0}
          >
            <div className="flex items-center gap-0.5">
              <div className="w-1 h-4 bg-gray-400 rounded-full" />
              <div className="w-1 h-4 bg-gray-400 rounded-full" />
            </div>
          </div>
          
          {/* Arrows */}
          <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-2 border-b-2 border-r-4 border-transparent border-r-white" />
          <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-2 border-b-2 border-l-4 border-transparent border-l-white" />
        </motion.div>

        {/* Instruction Text */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isDragging ? 0 : 1 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/50 text-white text-sm rounded-full backdrop-blur-sm"
        >
          Drag to compare
        </motion.div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
        <motion.div
          className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
          style={{ width: `${sliderPosition}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  )
}