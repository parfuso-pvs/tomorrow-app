'use client'

import { EmailCapture } from '../forms/EmailCapture'
import { Button } from '../Button'
import { FadeIn } from '../animations/FadeIn'
import { cn } from '../../lib/utils'

interface HeroActionsProps {
  showEmailCapture?: boolean
  emailPlaceholder?: string
  emailButtonText?: string
  onEmailSubmit?: (data: { email: string }) => Promise<void>
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  className?: string
  variant?: 'inline' | 'stacked'
}

export function HeroActions({
  showEmailCapture = true,
  emailPlaceholder = 'Enter your email',
  emailButtonText = 'Start Free',
  onEmailSubmit,
  secondaryAction,
  className,
  variant = 'inline',
}: HeroActionsProps) {
  return (
    <FadeIn delay={0.6} className={cn('w-full', className)}>
      <div className="flex flex-col items-center gap-4">
        {showEmailCapture && (
          <EmailCapture
            placeholder={emailPlaceholder}
            buttonText={emailButtonText}
            onSubmit={onEmailSubmit}
            variant={variant}
            className="w-full max-w-md"
          />
        )}
        
        {secondaryAction && (
          <Button
            variant="ghost"
            size="md"
            onClick={secondaryAction.onClick}
            className="group"
          >
            {secondaryAction.label}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Button>
        )}
        
        <p className="mt-2 text-xs text-gray-500">
          No credit card required • 14-day free trial
        </p>
      </div>
    </FadeIn>
  )
}