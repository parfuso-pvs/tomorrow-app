'use client'

import { FadeIn } from '../animations/FadeIn'
import { StaggerChildren, StaggerItem } from '../animations/StaggerChildren'
import { cn } from '../../lib/utils'

interface HeroContentProps {
  headline: string
  subheadline: string
  badge?: string
  socialProof?: React.ReactNode
  className?: string
}

export function HeroContent({
  headline,
  subheadline,
  badge,
  socialProof,
  className,
}: HeroContentProps) {
  return (
    <StaggerChildren className={cn('text-center', className)}>
      {badge && (
        <StaggerItem>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
            </span>
            <span className="text-sm font-medium text-primary-700">
              {badge}
            </span>
          </div>
        </StaggerItem>
      )}
      
      <StaggerItem>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">{headline}</span>
        </h1>
      </StaggerItem>
      
      <StaggerItem>
        <p className="mt-6 text-lg text-gray-600 sm:text-xl md:text-2xl max-w-3xl mx-auto">
          {subheadline}
        </p>
      </StaggerItem>
      
      {socialProof && (
        <StaggerItem>
          <div className="mt-8">
            {socialProof}
          </div>
        </StaggerItem>
      )}
    </StaggerChildren>
  )
}