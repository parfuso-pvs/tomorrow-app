'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { DeviceMockup } from './DeviceMockup'
import { FeatureCallouts } from './FeatureCallouts'
import { BeforeAfterSlider } from './BeforeAfterSlider'
import { VideoPlayer } from './VideoPlayer'
import { ScreenshotCarousel } from './ScreenshotCarousel'
import { Button } from '../Button'
import { 
  PlayIcon, 
  PauseIcon, 
  SunIcon, 
  MoonIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

interface AppPreviewProps {
  className?: string
  mobileScreenshots: string[]
  desktopScreenshots: string[]
  demoVideoUrl?: string
  beforeImage: string
  afterImage: string
  features: {
    id: string
    title: string
    description: string
    position: { x: number; y: number }
    icon: React.ReactNode
  }[]
}

export function AppPreview({
  className,
  mobileScreenshots,
  desktopScreenshots,
  demoVideoUrl,
  beforeImage,
  afterImage,
  features,
}: AppPreviewProps) {
  const [activeDevice, setActiveDevice] = useState<'mobile' | 'desktop'>('mobile')
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0)
  const [isDark, setIsDark] = useState(true)
  const [showVideo, setShowVideo] = useState(false)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [showFeatureCallouts, setShowFeatureCallouts] = useState(false)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const currentScreenshots = activeDevice === 'mobile' ? mobileScreenshots : desktopScreenshots

  // Auto-advance screenshots
  useEffect(() => {
    if (isAutoPlay && !showVideo) {
      intervalRef.current = setInterval(() => {
        setCurrentScreenIndex((prev) => (prev + 1) % currentScreenshots.length)
      }, 4000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlay, showVideo, currentScreenshots.length])

  const handlePrevious = () => {
    setCurrentScreenIndex((prev) => 
      prev === 0 ? currentScreenshots.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentScreenIndex((prev) => (prev + 1) % currentScreenshots.length)
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <section className={cn(
      'relative py-24 sm:py-32 bg-gradient-to-br from-background via-muted/20 to-background',
      className
    )}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-secondary-500/20 to-primary-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
            Interactive Demo
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Experience Tomorrow
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              {' '}in Action
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            See how Tomorrow transforms chaotic mornings into focused productivity sessions. 
            Click through the app, watch it in action, and discover the features that make it magical.
          </motion.p>
        </div>

        {/* Control Bar - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 px-4"
        >
          <div className="flex items-center gap-2 p-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveDevice('mobile')}
              className={cn(
                'flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all',
                activeDevice === 'mobile'
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              )}
            >
              <DevicePhoneMobileIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Mobile</span>
              <span className="sm:hidden">Phone</span>
            </button>
            <button
              onClick={() => setActiveDevice('desktop')}
              className={cn(
                'flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all',
                activeDevice === 'desktop'
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              )}
            >
              <ComputerDesktopIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Desktop</span>
              <span className="sm:hidden">PC</span>
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              {isDark ? (
                <SunIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              ) : (
                <MoonIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            <button
              onClick={() => setShowFeatureCallouts(!showFeatureCallouts)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-all',
                showFeatureCallouts
                  ? 'bg-secondary-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              )}
            >
              Features
            </button>

            {demoVideoUrl && (
              <button
                onClick={() => setShowVideo(!showVideo)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all',
                  showVideo
                    ? 'bg-red-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                )}
              >
                {showVideo ? (
                  <>
                    <PauseIcon className="w-4 h-4" />
                    Hide Video
                  </>
                ) : (
                  <>
                    <PlayIcon className="w-4 h-4" />
                    Watch Demo
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>

        {/* Main Preview Area - Improved Responsive */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Device Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {showVideo && demoVideoUrl ? (
                <motion.div
                  key="video"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <VideoPlayer src={demoVideoUrl} />
                </motion.div>
              ) : (
                <motion.div
                  key="mockup"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <DeviceMockup
                    type={activeDevice}
                    screenshot={currentScreenshots[currentScreenIndex]}
                    isDark={isDark}
                  />

                  {/* Feature Callouts */}
                  <AnimatePresence>
                    {showFeatureCallouts && (
                      <FeatureCallouts
                        features={features}
                        deviceType={activeDevice}
                      />
                    )}
                  </AnimatePresence>

                  {/* Navigation Controls - Responsive */}
                  <div className="absolute -bottom-20 sm:-bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-2 sm:gap-4">
                    <button
                      onClick={handlePrevious}
                      className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                    >
                      <ArrowLeftIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>

                    <div className="flex items-center gap-2">
                      {currentScreenshots.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentScreenIndex(index)}
                          className={cn(
                            'w-2 h-2 rounded-full transition-all',
                            index === currentScreenIndex
                              ? 'bg-primary-500 w-6'
                              : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                          )}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleNext}
                      className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                    >
                      <ArrowRightIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>

                    <button
                      onClick={() => setIsAutoPlay(!isAutoPlay)}
                      className={cn(
                        'px-3 py-1 text-xs font-medium rounded-full transition-all',
                        isAutoPlay
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      )}
                    >
                      {isAutoPlay ? 'Auto' : 'Manual'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="space-y-8"
          >
            {/* Before/After Comparison */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                See the Transformation
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Compare your current morning routine with the Tomorrow experience. 
                Drag the slider to see the difference.
              </p>
              <BeforeAfterSlider
                beforeImage={beforeImage}
                afterImage={afterImage}
                beforeLabel="Before Tomorrow"
                afterLabel="With Tomorrow"
              />
            </div>

            {/* Feature Highlights - Responsive */}
            <div className="mt-8 lg:mt-0">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Key Features
              </h3>
              <div className="grid gap-3 sm:gap-4">
                {features.slice(0, 3).map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all"
                  >
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">
                        {feature.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                Get Started - It's Free
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Join the open beta • No limits
              </p>
            </div>
          </motion.div>
        </div>

        {/* Screenshot Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-24"
        >
          <ScreenshotCarousel
            screenshots={currentScreenshots}
            activeIndex={currentScreenIndex}
            onScreenshotClick={setCurrentScreenIndex}
          />
        </motion.div>
      </div>
    </section>
  )
}