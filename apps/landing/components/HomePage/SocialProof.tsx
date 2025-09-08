'use client'

import { motion } from 'framer-motion'

interface SocialProofProps {
  userCount?: string
  rating?: number
  showAvatars?: boolean
}

export function SocialProof({ 
  userCount = '1,000+', 
  rating = 4.9,
  showAvatars = true 
}: SocialProofProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
      {/* User avatars */}
      {showAvatars && (
        <div className="flex items-center">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-primary-400 to-secondary-400"
                style={{
                  backgroundImage: `url('https://i.pravatar.cc/100?img=${i}')`,
                  backgroundSize: 'cover',
                }}
              />
            ))}
            <div className="h-10 w-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">+{userCount}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Stats */}
      <div className="flex items-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="font-medium">{rating}</span>
        </div>
        
        <div className="h-4 w-px bg-gray-300" />
        
        <div>
          <span className="font-medium">{userCount}</span> early adopters
        </div>
      </div>
    </div>
  )
}