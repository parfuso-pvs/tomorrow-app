'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Citation {
  authors: string
  year: number
  title: string
  journal?: string
  url?: string
}

interface CitationTooltipProps {
  citation: Citation
  children: React.ReactNode
}

export function CitationTooltip({ citation, children }: CitationTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 mb-2 w-72 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl z-50"
          >
            <div className="relative">
              <p className="font-semibold mb-1">{citation.title}</p>
              <p className="text-gray-300 mb-1">
                {citation.authors} ({citation.year})
              </p>
              {citation.journal && (
                <p className="text-gray-400 italic">{citation.journal}</p>
              )}
              {citation.url && (
                <a
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-400 hover:text-blue-300 underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Study
                </a>
              )}
              <div className="absolute -bottom-2 left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}