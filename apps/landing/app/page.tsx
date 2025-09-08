'use client'

import { Hero, BenefitsSection } from '@tomorrow/ui'
import { SocialProof } from '@/components/HomePage/SocialProof'
import { useState } from 'react'

export default function HomePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleEmailSubmit = async (data: { email: string }) => {
    setIsSubmitting(true)
    try {
      // TODO: Integrate with Supabase to save email
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        throw new Error('Failed to join waitlist')
      }
      
      console.log('Email submitted:', data.email)
    } catch (error) {
      console.error('Error submitting email:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLearnMore = () => {
    // Scroll to features section or navigate to about page
    const element = document.getElementById('features')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main>
      <Hero
        headline="Plan tomorrow tonight"
        subheadline="Transform your productivity with science-backed evening planning. Wake up with clear priorities, focused momentum, and zero decision fatigue."
        badge="Now in Beta"
        socialProof={<SocialProof userCount="1,000+" rating={4.9} />}
        showEmailCapture={true}
        emailPlaceholder="Enter your email to get started"
        emailButtonText="Start Free"
        onEmailSubmit={handleEmailSubmit}
        secondaryAction={{
          label: 'See how it works',
          onClick: handleLearnMore,
        }}
        emailVariant="inline"
      />
      
      <section id="features">
        <BenefitsSection />
      </section>
    </main>
  )
}