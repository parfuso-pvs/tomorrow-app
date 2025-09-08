'use client'

import { HeroBackground } from './HeroBackground'
import { HeroContent } from './HeroContent'
import { HeroActions } from './HeroActions'
import { cn } from '../../lib/utils'

interface HeroProps {
  headline: string
  subheadline: string
  badge?: string
  socialProof?: React.ReactNode
  showEmailCapture?: boolean
  emailPlaceholder?: string
  emailButtonText?: string
  onEmailSubmit?: (data: { email: string }) => Promise<void>
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  className?: string
  variant?: 'centered' | 'left-aligned'
  emailVariant?: 'inline' | 'stacked'
}

export function Hero({
  headline,
  subheadline,
  badge,
  socialProof,
  showEmailCapture = true,
  emailPlaceholder,
  emailButtonText,
  onEmailSubmit,
  secondaryAction,
  className,
  variant = 'centered',
  emailVariant = 'inline',
}: HeroProps) {
  return (
    <section 
      className={cn(
        'relative min-h-screen flex items-center justify-center overflow-hidden',
        className
      )}
    >
      <HeroBackground />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className={cn(
          'flex flex-col gap-12',
          variant === 'centered' ? 'items-center text-center' : 'items-start'
        )}>
          <HeroContent
            headline={headline}
            subheadline={subheadline}
            badge={badge}
            socialProof={socialProof}
            className={variant === 'left-aligned' ? 'text-left' : ''}
          />
          
          <HeroActions
            showEmailCapture={showEmailCapture}
            emailPlaceholder={emailPlaceholder}
            emailButtonText={emailButtonText}
            onEmailSubmit={onEmailSubmit}
            secondaryAction={secondaryAction}
            variant={emailVariant}
            className={variant === 'left-aligned' ? 'items-start' : ''}
          />
        </div>
      </div>
    </section>
  )
}