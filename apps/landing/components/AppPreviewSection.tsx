'use client'

import { AppPreview } from '@tomorrow/ui'
import { 
  CalendarIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  BellIcon,
  ChartBarIcon,
  MoonIcon,
  SparklesIcon,
  BoltIcon,
  HeartIcon,
  TrophyIcon,
  ShieldCheckIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'
import { generateMockupScreenshot, generateComparisonImage } from '@/utils/generateMockups'
import { useEffect, useState } from 'react'

export function AppPreviewSection() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)
  
  // Default to dark theme, ensure client-side only rendering
  useEffect(() => {
    setMounted(true)
    // Default to dark theme always
    setTheme('dark')
  }, [])
  
  // Use placeholder images on server, real ones on client
  const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LXNpemU9IjE4Ij5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg=='
  
  // Generate mobile screenshots dynamically (only on client)
  const mobileScreenshots = mounted ? [
    generateMockupScreenshot('mobile', 'planning', theme),
    generateMockupScreenshot('mobile', 'dashboard', theme), 
    generateMockupScreenshot('mobile', 'tasks', theme),
    generateMockupScreenshot('mobile', 'progress', theme),
    generateMockupScreenshot('mobile', 'settings', theme),
  ] : Array(5).fill(placeholderImage)

  // Generate desktop screenshots dynamically (only on client)
  const desktopScreenshots = mounted ? [
    generateMockupScreenshot('desktop', 'planning', theme),
    generateMockupScreenshot('desktop', 'dashboard', theme),
    generateMockupScreenshot('desktop', 'analytics', theme), 
    generateMockupScreenshot('desktop', 'calendar', theme),
  ] : Array(4).fill(placeholderImage)
  
  // Generate comparison images (only on client)
  const beforeImage = mounted ? generateComparisonImage('before', theme) : placeholderImage
  const afterImage = mounted ? generateComparisonImage('after', theme) : placeholderImage

  // Enhanced feature callouts with better positions and descriptions
  const features = [
    {
      id: 'evening-planning',
      title: 'Evening Planning Mode',
      description: 'Set your priorities for tomorrow when your mind is clear and focused. Research shows evening planning reduces decision fatigue by 40%.',
      position: { x: 25, y: 30 },
      icon: <MoonIcon className="w-4 h-4" />
    },
    {
      id: 'smart-scheduling',
      title: 'Smart Time Blocks',
      description: 'AI-powered scheduling that adapts to your energy patterns and automatically blocks time for deep work.',
      position: { x: 75, y: 45 },
      icon: <ClockIcon className="w-4 h-4" />
    },
    {
      id: 'progress-tracking',
      title: 'Progress Visualization',
      description: 'See your productivity patterns with beautiful charts and insights that motivate consistent improvement.',
      position: { x: 50, y: 70 },
      icon: <ChartBarIcon className="w-4 h-4" />
    },
    {
      id: 'focus-sessions',
      title: 'Focus Sessions',
      description: 'Built-in pomodoro timer with ambient sounds and break reminders to maintain peak concentration.',
      position: { x: 80, y: 25 },
      icon: <CheckCircleIcon className="w-4 h-4" />
    },
    {
      id: 'gentle-reminders',
      title: 'Gentle Reminders',
      description: 'Non-intrusive notifications that nudge without overwhelming, helping you stay on track naturally.',
      position: { x: 20, y: 60 },
      icon: <BellIcon className="w-4 h-4" />
    },
    {
      id: 'ai-insights',
      title: 'AI-Powered Insights',
      description: 'Get personalized productivity recommendations based on your work patterns and habits.',
      position: { x: 45, y: 20 },
      icon: <SparklesIcon className="w-4 h-4" />
    },
    {
      id: 'energy-optimization',
      title: 'Energy Optimization',
      description: 'Schedule tasks based on your natural energy levels for maximum efficiency.',
      position: { x: 60, y: 50 },
      icon: <BoltIcon className="w-4 h-4" />
    },
    {
      id: 'wellness-tracking',
      title: 'Wellness Integration',
      description: 'Balance productivity with well-being through built-in break reminders and mindfulness prompts.',
      position: { x: 35, y: 75 },
      icon: <HeartIcon className="w-4 h-4" />
    },
  ]

  // Placeholder video URL - in production, this would be a real demo video
  const demoVideoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4' // Using a sample video for demo
  
  return (
    <AppPreview
      mobileScreenshots={mobileScreenshots}
      desktopScreenshots={desktopScreenshots}
      demoVideoUrl={demoVideoUrl}
      beforeImage={beforeImage}
      afterImage={afterImage}
      features={features}
    />
  )
}