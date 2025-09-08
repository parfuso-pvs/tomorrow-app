import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const waitlistSchema = z.object({
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const { email } = waitlistSchema.parse(body)
    
    // TODO: Save to Supabase
    // For now, we'll just log it and return success
    console.log('New waitlist signup:', email)
    
    // In production, you would:
    // 1. Save to Supabase database
    // 2. Send confirmation email
    // 3. Add to email marketing service
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully joined the waitlist!' 
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email address',
          errors: error.errors 
        },
        { status: 400 }
      )
    }
    
    console.error('Waitlist signup error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Something went wrong. Please try again.' 
      },
      { status: 500 }
    )
  }
}