import React from 'react'

// Helper function to convert SVG string to base64
const svgToBase64 = (svgString: string): string => {
  // For browser environment
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    return btoa(unescape(encodeURIComponent(svgString)))
  }
  // For Node.js/server environment
  return Buffer.from(svgString, 'utf-8').toString('base64')
}

// Utility to generate SVG mockup screenshots for demo purposes
export const generateMockupScreenshot = (
  type: 'mobile' | 'desktop',
  screen: string,
  theme: 'light' | 'dark' = 'light'
): string => {
  const isDark = theme === 'dark'
  const bgColor = isDark ? '#111827' : '#F9FAFB'
  const primaryColor = '#3B82F6'
  const secondaryColor = '#EC4899'
  const textColor = isDark ? '#F3F4F6' : '#111827'
  const cardBg = isDark ? '#1F2937' : '#FFFFFF'
  
  if (type === 'mobile') {
    const width = 375
    const height = 812
    
    const mobileScreens: Record<string, string> = {
      'planning': `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${width}" height="${height}" fill="${bgColor}"/>
          
          <!-- Status Bar -->
          <rect x="0" y="0" width="${width}" height="44" fill="${cardBg}"/>
          <text x="20" y="28" fill="${textColor}" font-size="14" font-weight="600">9:41</text>
          <text x="${width - 60}" y="28" fill="${textColor}" font-size="14" text-anchor="end">100%</text>
          
          <!-- Header -->
          <rect x="0" y="44" width="${width}" height="100" fill="${cardBg}"/>
          <text x="20" y="84" fill="${textColor}" font-size="24" font-weight="700">Evening Planning</text>
          <text x="20" y="110" fill="${textColor}" font-size="14" opacity="0.7">Set tomorrow's priorities</text>
          
          <!-- Progress Ring -->
          <g transform="translate(${width/2}, 220)">
            <circle cx="0" cy="0" r="60" fill="none" stroke="${isDark ? '#374151' : '#E5E7EB'}" stroke-width="8"/>
            <circle cx="0" cy="0" r="60" fill="none" stroke="${primaryColor}" stroke-width="8" 
                    stroke-dasharray="377" stroke-dashoffset="94" stroke-linecap="round"
                    transform="rotate(-90)"/>
            <text x="0" y="5" fill="${textColor}" font-size="24" font-weight="700" text-anchor="middle">75%</text>
            <text x="0" y="25" fill="${textColor}" font-size="12" opacity="0.7" text-anchor="middle">Complete</text>
          </g>
          
          <!-- Task Cards -->
          <g transform="translate(20, 320)">
            <rect width="${width - 40}" height="80" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
            <circle cx="30" cy="40" r="4" fill="${primaryColor}"/>
            <text x="50" y="35" fill="${textColor}" font-size="16" font-weight="600">Morning Review</text>
            <text x="50" y="55" fill="${textColor}" font-size="12" opacity="0.7">Review yesterday's progress</text>
            <rect x="${width - 80}" y="30" width="40" height="20" rx="10" fill="${primaryColor}" opacity="0.2"/>
            <text x="${width - 60}" y="44" fill="${primaryColor}" font-size="10" font-weight="600" text-anchor="middle">8:00</text>
          </g>
          
          <g transform="translate(20, 410)">
            <rect width="${width - 40}" height="80" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
            <circle cx="30" cy="40" r="4" fill="${secondaryColor}"/>
            <text x="50" y="35" fill="${textColor}" font-size="16" font-weight="600">Deep Work Block</text>
            <text x="50" y="55" fill="${textColor}" font-size="12" opacity="0.7">Focus on main project</text>
            <rect x="${width - 80}" y="30" width="40" height="20" rx="10" fill="${secondaryColor}" opacity="0.2"/>
            <text x="${width - 60}" y="44" fill="${secondaryColor}" font-size="10" font-weight="600" text-anchor="middle">9:00</text>
          </g>
          
          <g transform="translate(20, 500)">
            <rect width="${width - 40}" height="80" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
            <circle cx="30" cy="40" r="4" fill="#10B981"/>
            <text x="50" y="35" fill="${textColor}" font-size="16" font-weight="600">Team Standup</text>
            <text x="50" y="55" fill="${textColor}" font-size="12" opacity="0.7">Daily sync with team</text>
            <rect x="${width - 80}" y="30" width="40" height="20" rx="10" fill="#10B981" opacity="0.2"/>
            <text x="${width - 60}" y="44" fill="#10B981" font-size="10" font-weight="600" text-anchor="middle">11:00</text>
          </g>
          
          <!-- Bottom Navigation -->
          <rect x="0" y="${height - 83}" width="${width}" height="83" fill="${cardBg}"/>
          <g transform="translate(${width/5}, ${height - 50})">
            <rect x="-15" y="-15" width="30" height="30" rx="8" fill="${primaryColor}" opacity="0.2"/>
            <circle cx="0" cy="0" r="2" fill="${primaryColor}"/>
          </g>
        </svg>
      `,
      'dashboard': `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${width}" height="${height}" fill="${bgColor}"/>
          
          <!-- Header -->
          <rect x="0" y="0" width="${width}" height="120" fill="${cardBg}"/>
          <text x="20" y="70" fill="${textColor}" font-size="28" font-weight="700">Good Morning!</text>
          <text x="20" y="95" fill="${textColor}" font-size="14" opacity="0.7">3 priorities for today</text>
          
          <!-- Stats Cards -->
          <g transform="translate(20, 140)">
            <rect width="155" height="100" rx="12" fill="url(#grad1)"/>
            <text x="20" y="35" fill="white" font-size="12" opacity="0.9">Completed</text>
            <text x="20" y="60" fill="white" font-size="28" font-weight="700">12</text>
            <text x="20" y="80" fill="white" font-size="12" opacity="0.7">+20% this week</text>
          </g>
          
          <g transform="translate(200, 140)">
            <rect width="155" height="100" rx="12" fill="url(#grad2)"/>
            <text x="20" y="35" fill="white" font-size="12" opacity="0.9">Focus Time</text>
            <text x="20" y="60" fill="white" font-size="28" font-weight="700">4.5h</text>
            <text x="20" y="80" fill="white" font-size="12" opacity="0.7">Above average</text>
          </g>
          
          <!-- Chart -->
          <g transform="translate(20, 260)">
            <rect width="${width - 40}" height="200" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
            <text x="20" y="30" fill="${textColor}" font-size="16" font-weight="600">Weekly Progress</text>
            <!-- Bar Chart -->
            <g transform="translate(30, 180)">
              <rect x="0" y="-40" width="30" height="40" fill="${primaryColor}" opacity="0.8" rx="4"/>
              <rect x="45" y="-60" width="30" height="60" fill="${primaryColor}" opacity="0.8" rx="4"/>
              <rect x="90" y="-80" width="30" height="80" fill="${primaryColor}" opacity="0.8" rx="4"/>
              <rect x="135" y="-70" width="30" height="70" fill="${primaryColor}" opacity="0.8" rx="4"/>
              <rect x="180" y="-90" width="30" height="90" fill="${primaryColor}" opacity="0.8" rx="4"/>
              <rect x="225" y="-110" width="30" height="110" fill="${primaryColor}" rx="4"/>
              <rect x="270" y="-100" width="30" height="100" fill="${secondaryColor}" rx="4"/>
            </g>
          </g>
          
          <!-- Gradients -->
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:1" />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#EC4899;stop-opacity:1" />
            </linearGradient>
          </defs>
        </svg>
      `,
      'tasks': `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${width}" height="${height}" fill="${bgColor}"/>
          
          <!-- Header -->
          <rect x="0" y="0" width="${width}" height="100" fill="${cardBg}"/>
          <text x="20" y="50" fill="${textColor}" font-size="24" font-weight="700">Today's Tasks</text>
          <text x="20" y="75" fill="${textColor}" font-size="14" opacity="0.7">5 remaining • 3 completed</text>
          
          <!-- Filter Pills -->
          <g transform="translate(20, 110)">
            <rect width="60" height="32" rx="16" fill="${primaryColor}"/>
            <text x="30" y="22" fill="white" font-size="12" font-weight="600" text-anchor="middle">All</text>
          </g>
          <g transform="translate(90, 110)">
            <rect width="80" height="32" rx="16" fill="${isDark ? '#374151' : '#E5E7EB'}"/>
            <text x="40" y="22" fill="${textColor}" font-size="12" font-weight="600" text-anchor="middle">Priority</text>
          </g>
          <g transform="translate(180, 110)">
            <rect width="80" height="32" rx="16" fill="${isDark ? '#374151' : '#E5E7EB'}"/>
            <text x="40" y="22" fill="${textColor}" font-size="12" font-weight="600" text-anchor="middle">In Progress</text>
          </g>
          
          <!-- Task List -->
          <g transform="translate(20, 160)">
            <rect width="${width - 40}" height="70" rx="12" fill="${cardBg}" stroke="${primaryColor}" stroke-width="2"/>
            <circle cx="30" cy="35" r="10" fill="${primaryColor}" opacity="0.2"/>
            <circle cx="30" cy="35" r="6" fill="${primaryColor}"/>
            <path d="M 26 35 L 28 37 L 34 31" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>
            <text x="55" y="30" fill="${textColor}" font-size="16" font-weight="600">Complete project proposal</text>
            <text x="55" y="48" fill="${textColor}" font-size="12" opacity="0.7">High Priority • Due 2pm</text>
          </g>
          
          <g transform="translate(20, 240)">
            <rect width="${width - 40}" height="70" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
            <circle cx="30" cy="35" r="10" stroke="${primaryColor}" stroke-width="2" fill="none"/>
            <text x="55" y="30" fill="${textColor}" font-size="16" font-weight="600">Review design mockups</text>
            <text x="55" y="48" fill="${textColor}" font-size="12" opacity="0.7">Medium Priority • Due 4pm</text>
          </g>
          
          <g transform="translate(20, 320)">
            <rect width="${width - 40}" height="70" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
            <circle cx="30" cy="35" r="10" stroke="${secondaryColor}" stroke-width="2" fill="none"/>
            <text x="55" y="30" fill="${textColor}" font-size="16" font-weight="600">Team brainstorming session</text>
            <text x="55" y="48" fill="${textColor}" font-size="12" opacity="0.7">Low Priority • Due 5pm</text>
          </g>
          
          <!-- Add Task Button -->
          <g transform="translate(${width - 80}, ${height - 120})">
            <circle cx="30" cy="30" r="28" fill="${primaryColor}"/>
            <path d="M 30 18 L 30 42 M 18 30 L 42 30" stroke="white" stroke-width="3" stroke-linecap="round"/>
          </g>
        </svg>
      `,
      'progress': `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${width}" height="${height}" fill="${bgColor}"/>
          
          <!-- Header -->
          <text x="20" y="60" fill="${textColor}" font-size="24" font-weight="700">Your Progress</text>
          <text x="20" y="85" fill="${textColor}" font-size="14" opacity="0.7">Last 30 days</text>
          
          <!-- Streak Card -->
          <g transform="translate(20, 110)">
            <rect width="${width - 40}" height="120" rx="12" fill="url(#progressGrad)"/>
            <text x="20" y="35" fill="white" font-size="14" opacity="0.9">Current Streak</text>
            <text x="20" y="65" fill="white" font-size="36" font-weight="700">14 days 🔥</text>
            <text x="20" y="95" fill="white" font-size="12" opacity="0.7">Your best: 21 days</text>
          </g>
          
          <!-- Stats Grid -->
          <g transform="translate(20, 250)">
            <rect width="165" height="90" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
            <text x="20" y="30" fill="${textColor}" font-size="12" opacity="0.7">Tasks Completed</text>
            <text x="20" y="55" fill="${textColor}" font-size="24" font-weight="700">156</text>
            <text x="20" y="75" fill="#10B981" font-size="12">↑ 12%</text>
          </g>
          
          <g transform="translate(190, 250)">
            <rect width="165" height="90" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
            <text x="20" y="30" fill="${textColor}" font-size="12" opacity="0.7">Focus Hours</text>
            <text x="20" y="55" fill="${textColor}" font-size="24" font-weight="700">89.5</text>
            <text x="20" y="75" fill="#10B981" font-size="12">↑ 8%</text>
          </g>
          
          <!-- Calendar Heatmap -->
          <g transform="translate(20, 360)">
            <rect width="${width - 40}" height="140" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
            <text x="20" y="30" fill="${textColor}" font-size="14" font-weight="600">Activity Heatmap</text>
            <!-- Heatmap Grid -->
            <g transform="translate(20, 50)">
              ${Array.from({ length: 7 }, (_, week) => 
                Array.from({ length: 5 }, (_, day) => {
                  const intensity = Math.random()
                  const color = intensity > 0.8 ? primaryColor : 
                               intensity > 0.6 ? `${primaryColor}99` :
                               intensity > 0.3 ? `${primaryColor}66` : 
                               `${primaryColor}33`
                  return `<rect x="${week * 45}" y="${day * 16}" width="40" height="12" rx="2" fill="${color}"/>`
                }).join('')
              ).join('')}
            </g>
          </g>
          
          <!-- Gradients -->
          <defs>
            <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#F59E0B;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#EF4444;stop-opacity:1" />
            </linearGradient>
          </defs>
        </svg>
      `,
      'settings': `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${width}" height="${height}" fill="${bgColor}"/>
          
          <!-- Header -->
          <text x="20" y="60" fill="${textColor}" font-size="24" font-weight="700">Settings</text>
          
          <!-- Profile Section -->
          <g transform="translate(20, 90)">
            <rect width="${width - 40}" height="100" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
            <circle cx="50" cy="50" r="25" fill="${primaryColor}" opacity="0.2"/>
            <text x="50" y="55" fill="${primaryColor}" font-size="20" font-weight="700" text-anchor="middle">JD</text>
            <text x="90" y="40" fill="${textColor}" font-size="16" font-weight="600">John Doe</text>
            <text x="90" y="60" fill="${textColor}" font-size="12" opacity="0.7">john@example.com</text>
          </g>
          
          <!-- Settings List -->
          <g transform="translate(20, 210)">
            <rect width="${width - 40}" height="60" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
            <circle cx="40" cy="30" r="15" fill="${primaryColor}" opacity="0.2"/>
            <text x="40" y="35" fill="${primaryColor}" font-size="16" text-anchor="middle">🔔</text>
            <text x="70" y="35" fill="${textColor}" font-size="16">Notifications</text>
            <circle cx="${width - 60}" cy="30" r="12" fill="${primaryColor}"/>
            <circle cx="${width - 48}" cy="30" r="8" fill="white"/>
          </g>
          
          <g transform="translate(20, 280)">
            <rect width="${width - 40}" height="60" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
            <circle cx="40" cy="30" r="15" fill="${secondaryColor}" opacity="0.2"/>
            <text x="40" y="35" fill="${secondaryColor}" font-size="16" text-anchor="middle">🌙</text>
            <text x="70" y="35" fill="${textColor}" font-size="16">Dark Mode</text>
            <circle cx="${width - 60}" cy="30" r="12" fill="${isDark ? primaryColor : '#D1D5DB'}"/>
            <circle cx="${isDark ? width - 48 : width - 72}" cy="30" r="8" fill="white"/>
          </g>
          
          <g transform="translate(20, 350)">
            <rect width="${width - 40}" height="60" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
            <circle cx="40" cy="30" r="15" fill="#10B981" opacity="0.2"/>
            <text x="40" y="35" fill="#10B981" font-size="16" text-anchor="middle">📊</text>
            <text x="70" y="35" fill="${textColor}" font-size="16">Analytics</text>
            <text x="${width - 60}" y="35" fill="${textColor}" font-size="16" opacity="0.5">›</text>
          </g>
        </svg>
      `
    }
    
    return `data:image/svg+xml;base64,${svgToBase64(mobileScreens[screen] || mobileScreens['dashboard'])}`
  }
  
  // Desktop screens
  const width = 1440
  const height = 900
  
  const desktopScreens: Record<string, string> = {
    'planning': `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${width}" height="${height}" fill="${bgColor}"/>
        
        <!-- Sidebar -->
        <rect width="280" height="${height}" fill="${cardBg}"/>
        <text x="30" y="50" fill="${textColor}" font-size="20" font-weight="700">Tomorrow</text>
        
        <!-- Navigation -->
        <g transform="translate(30, 100)">
          <rect width="220" height="45" rx="8" fill="${primaryColor}" opacity="0.2"/>
          <text x="20" y="28" fill="${primaryColor}" font-size="14" font-weight="600">Planning</text>
        </g>
        
        <!-- Main Content -->
        <text x="320" y="80" fill="${textColor}" font-size="32" font-weight="700">Evening Planning Session</text>
        <text x="320" y="110" fill="${textColor}" font-size="16" opacity="0.7">Set your priorities for tomorrow to wake up focused</text>
        
        <!-- Grid Layout -->
        <g transform="translate(320, 150)">
          <rect width="350" height="200" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
          <text x="30" y="40" fill="${textColor}" font-size="18" font-weight="600">Top Priorities</text>
          <circle cx="30" cy="80" r="4" fill="${primaryColor}"/>
          <text x="50" y="85" fill="${textColor}" font-size="14">Complete quarterly report</text>
          <circle cx="30" cy="110" r="4" fill="${secondaryColor}"/>
          <text x="50" y="115" fill="${textColor}" font-size="14">Review team proposals</text>
          <circle cx="30" cy="140" r="4" fill="#10B981"/>
          <text x="50" y="145" fill="${textColor}" font-size="14">Prepare client presentation</text>
        </g>
        
        <g transform="translate(700, 150)">
          <rect width="350" height="200" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
          <text x="30" y="40" fill="${textColor}" font-size="18" font-weight="600">Time Blocks</text>
          <!-- Time blocks visualization -->
          <rect x="30" y="70" width="290" height="30" rx="4" fill="${primaryColor}" opacity="0.2"/>
          <text x="40" y="90" fill="${primaryColor}" font-size="12" font-weight="600">9:00 - 11:00 Deep Work</text>
          <rect x="30" y="110" width="290" height="30" rx="4" fill="${secondaryColor}" opacity="0.2"/>
          <text x="40" y="130" fill="${secondaryColor}" font-size="12" font-weight="600">11:00 - 12:00 Meetings</text>
        </g>
        
        <!-- Bottom Section -->
        <g transform="translate(320, 380)">
          <rect width="730" height="400" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
          <text x="30" y="40" fill="${textColor}" font-size="18" font-weight="600">Tomorrow's Schedule</text>
          <!-- Calendar View -->
          <g transform="translate(30, 70)">
            ${Array.from({ length: 12 }, (_, hour) => `
              <line x1="0" y1="${hour * 25}" x2="670" y2="${hour * 25}" stroke="${isDark ? '#374151' : '#E5E7EB'}" opacity="0.5"/>
              <text x="0" y="${hour * 25 + 15}" fill="${textColor}" font-size="10" opacity="0.5">${8 + hour}:00</text>
            `).join('')}
            <!-- Event blocks -->
            <rect x="50" y="25" width="620" height="50" rx="4" fill="${primaryColor}" opacity="0.8"/>
            <text x="60" y="55" fill="white" font-size="14" font-weight="600">Deep Work: Quarterly Report</text>
            <rect x="50" y="100" width="620" height="25" rx="4" fill="${secondaryColor}" opacity="0.8"/>
            <text x="60" y="117" fill="white" font-size="12" font-weight="600">Team Standup</text>
          </g>
        </g>
        
        <!-- Gradients -->
        <defs>
          <linearGradient id="deskGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:1" />
          </linearGradient>
        </defs>
      </svg>
    `,
    'dashboard': `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${width}" height="${height}" fill="${bgColor}"/>
        
        <!-- Header -->
        <rect width="${width}" height="80" fill="${cardBg}"/>
        <text x="40" y="50" fill="${textColor}" font-size="24" font-weight="700">Tomorrow Dashboard</text>
        <rect x="${width - 200}" y="25" width="160" height="30" rx="15" fill="${primaryColor}"/>
        <text x="${width - 120}" y="45" fill="white" font-size="12" font-weight="600" text-anchor="middle">Start Planning</text>
        
        <!-- Stats Cards -->
        <g transform="translate(40, 120)">
          <rect width="320" height="120" rx="12" fill="url(#dashGrad1)"/>
          <text x="30" y="40" fill="white" font-size="14" opacity="0.9">Tasks Completed Today</text>
          <text x="30" y="75" fill="white" font-size="36" font-weight="700">24 / 28</text>
          <text x="30" y="100" fill="white" font-size="12" opacity="0.7">86% completion rate</text>
        </g>
        
        <g transform="translate(380, 120)">
          <rect width="320" height="120" rx="12" fill="url(#dashGrad2)"/>
          <text x="30" y="40" fill="white" font-size="14" opacity="0.9">Focus Time</text>
          <text x="30" y="75" fill="white" font-size="36" font-weight="700">5h 32m</text>
          <text x="30" y="100" fill="white" font-size="12" opacity="0.7">Above your average</text>
        </g>
        
        <g transform="translate(720, 120)">
          <rect width="320" height="120" rx="12" fill="url(#dashGrad3)"/>
          <text x="30" y="40" fill="white" font-size="14" opacity="0.9">Current Streak</text>
          <text x="30" y="75" fill="white" font-size="36" font-weight="700">14 days</text>
          <text x="30" y="100" fill="white" font-size="12" opacity="0.7">Keep it going! 🔥</text>
        </g>
        
        <!-- Chart Section -->
        <g transform="translate(40, 280)">
          <rect width="660" height="400" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
          <text x="30" y="40" fill="${textColor}" font-size="18" font-weight="600">Weekly Productivity</text>
          <!-- Line Chart -->
          <g transform="translate(60, 350)">
            <path d="M 0 0 L 90 -40 L 180 -80 L 270 -60 L 360 -120 L 450 -140 L 540 -100" 
                  stroke="${primaryColor}" stroke-width="3" fill="none"/>
            ${Array.from({ length: 7 }, (_, i) => `
              <circle cx="${i * 90}" cy="${-[0, 40, 80, 60, 120, 140, 100][i]}" r="4" fill="${primaryColor}"/>
            `).join('')}
          </g>
        </g>
        
        <!-- Task List -->
        <g transform="translate(720, 280)">
          <rect width="320" height="400" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
          <text x="30" y="40" fill="${textColor}" font-size="18" font-weight="600">Upcoming Tasks</text>
          <!-- Task items -->
          <g transform="translate(30, 70)">
            <circle cx="10" cy="10" r="4" fill="${primaryColor}"/>
            <text x="25" y="14" fill="${textColor}" font-size="14">Morning review - 8:00 AM</text>
          </g>
          <g transform="translate(30, 100)">
            <circle cx="10" cy="10" r="4" fill="${secondaryColor}"/>
            <text x="25" y="14" fill="${textColor}" font-size="14">Team standup - 9:30 AM</text>
          </g>
          <g transform="translate(30, 130)">
            <circle cx="10" cy="10" r="4" fill="#10B981"/>
            <text x="25" y="14" fill="${textColor}" font-size="14">Client call - 11:00 AM</text>
          </g>
        </g>
        
        <!-- Gradients -->
        <defs>
          <linearGradient id="dashGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:#06B6D4;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="dashGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:1" />
          </linearGradient>
          <linearGradient id="dashGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#F59E0B;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#EF4444;stop-opacity:1" />
          </linearGradient>
        </defs>
      </svg>
    `,
    'analytics': `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${width}" height="${height}" fill="${bgColor}"/>
        
        <!-- Header -->
        <text x="40" y="60" fill="${textColor}" font-size="28" font-weight="700">Analytics Overview</text>
        <text x="40" y="90" fill="${textColor}" font-size="16" opacity="0.7">Track your productivity trends and patterns</text>
        
        <!-- KPI Cards -->
        <g transform="translate(40, 130)">
          <rect width="240" height="100" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
          <text x="20" y="35" fill="${textColor}" font-size="12" opacity="0.7">Average Daily Tasks</text>
          <text x="20" y="65" fill="${textColor}" font-size="28" font-weight="700">18.5</text>
          <text x="20" y="85" fill="#10B981" font-size="12">↑ 12% vs last month</text>
        </g>
        
        <g transform="translate(300, 130)">
          <rect width="240" height="100" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
          <text x="20" y="35" fill="${textColor}" font-size="12" opacity="0.7">Completion Rate</text>
          <text x="20" y="65" fill="${textColor}" font-size="28" font-weight="700">87%</text>
          <text x="20" y="85" fill="#10B981" font-size="12">↑ 5% vs last month</text>
        </g>
        
        <g transform="translate(560, 130)">
          <rect width="240" height="100" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
          <text x="20" y="35" fill="${textColor}" font-size="12" opacity="0.7">Focus Sessions</text>
          <text x="20" y="65" fill="${textColor}" font-size="28" font-weight="700">126</text>
          <text x="20" y="85" fill="#EF4444" font-size="12">↓ 3% vs last month</text>
        </g>
        
        <g transform="translate(820, 130)">
          <rect width="240" height="100" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
          <text x="20" y="35" fill="${textColor}" font-size="12" opacity="0.7">Avg Focus Duration</text>
          <text x="20" y="65" fill="${textColor}" font-size="28" font-weight="700">52min</text>
          <text x="20" y="85" fill="#10B981" font-size="12">↑ 8% vs last month</text>
        </g>
        
        <!-- Charts -->
        <g transform="translate(40, 260)">
          <rect width="500" height="350" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
          <text x="30" y="40" fill="${textColor}" font-size="18" font-weight="600">Monthly Trend</text>
          <!-- Area Chart -->
          <g transform="translate(50, 300)">
            <path d="M 0 0 L 60 -20 L 120 -60 L 180 -40 L 240 -80 L 300 -100 L 360 -90 L 420 -110" 
                  stroke="${primaryColor}" stroke-width="2" fill="${primaryColor}" fill-opacity="0.2"/>
          </g>
        </g>
        
        <g transform="translate(560, 260)">
          <rect width="500" height="350" rx="12" fill="${cardBg}" stroke="${isDark ? '#374151' : '#E5E7EB'}"/>
          <text x="30" y="40" fill="${textColor}" font-size="18" font-weight="600">Task Distribution</text>
          <!-- Pie Chart -->
          <g transform="translate(250, 200)">
            <circle cx="0" cy="0" r="80" fill="${primaryColor}"/>
            <path d="M 0 0 L 80 0 A 80 80 0 0 1 40 69.3 Z" fill="${secondaryColor}"/>
            <path d="M 0 0 L 40 69.3 A 80 80 0 0 1 -40 69.3 Z" fill="#10B981"/>
            <path d="M 0 0 L -40 69.3 A 80 80 0 0 1 -80 0 Z" fill="#F59E0B"/>
          </g>
        </g>
      </svg>
    `,
    'calendar': `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${width}" height="${height}" fill="${bgColor}"/>
        
        <!-- Header -->
        <rect width="${width}" height="100" fill="${cardBg}"/>
        <text x="40" y="60" fill="${textColor}" font-size="24" font-weight="700">December 2024</text>
        <rect x="${width - 340}" y="35" width="100" height="30" rx="8" fill="${primaryColor}" opacity="0.2"/>
        <text x="${width - 290}" y="55" fill="${primaryColor}" font-size="14" font-weight="600" text-anchor="middle">Today</text>
        <rect x="${width - 220}" y="35" width="100" height="30" rx="8" fill="${isDark ? '#374151' : '#E5E7EB'}"/>
        <text x="${width - 170}" y="55" fill="${textColor}" font-size="14" text-anchor="middle">Week</text>
        <rect x="${width - 100}" y="35" width="80" height="30" rx="8" fill="${isDark ? '#374151' : '#E5E7EB'}"/>
        <text x="${width - 60}" y="55" fill="${textColor}" font-size="14" text-anchor="middle">Month</text>
        
        <!-- Calendar Grid -->
        <g transform="translate(40, 140)">
          <!-- Day Headers -->
          ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => `
            <text x="${i * 140 + 70}" y="20" fill="${textColor}" font-size="14" font-weight="600" text-anchor="middle" opacity="0.7">${day}</text>
          `).join('')}
          
          <!-- Calendar Days -->
          ${Array.from({ length: 35 }, (_, i) => {
            const day = i - 5 // Start from previous month
            const isCurrentMonth = day >= 0 && day < 31
            const isToday = day === 14
            const hasEvents = Math.random() > 0.7 && isCurrentMonth
            
            return `
              <g transform="translate(${(i % 7) * 140}, ${Math.floor(i / 7) * 120 + 40})">
                <rect width="130" height="110" rx="8" fill="${isToday ? primaryColor : cardBg}" fill-opacity="${isToday ? 0.1 : 1}" 
                      stroke="${isToday ? primaryColor : isDark ? '#374151' : '#E5E7EB'}"/>
                <text x="10" y="25" fill="${isCurrentMonth ? textColor : `${textColor}66`}" font-size="14" font-weight="${isToday ? '700' : '400'}">
                  ${isCurrentMonth ? day + 1 : ''}
                </text>
                ${hasEvents ? `
                  <rect x="10" y="40" width="110" height="20" rx="4" fill="${primaryColor}" opacity="0.8"/>
                  <text x="15" y="53" fill="white" font-size="10">Team Meeting</text>
                  <rect x="10" y="65" width="110" height="20" rx="4" fill="${secondaryColor}" opacity="0.8"/>
                  <text x="15" y="78" fill="white" font-size="10">Project Review</text>
                ` : ''}
              </g>
            `
          }).join('')}
        </g>
      </svg>
    `
  }
  
  return `data:image/svg+xml;base64,${svgToBase64(desktopScreens[screen] || desktopScreens['dashboard'])}`
}

// Generate before/after comparison images
export const generateComparisonImage = (type: 'before' | 'after', theme: 'light' | 'dark' = 'light'): string => {
  const isDark = theme === 'dark'
  const bgColor = isDark ? '#111827' : '#F9FAFB'
  const textColor = isDark ? '#F3F4F6' : '#111827'
  const cardBg = isDark ? '#1F2937' : '#FFFFFF'
  
  const width = 800
  const height = 600
  
  if (type === 'before') {
    const svgString = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${width}" height="${height}" fill="${bgColor}"/>
        
        <!-- Chaotic Morning Scene -->
        <text x="${width/2}" y="80" fill="${textColor}" font-size="32" font-weight="700" text-anchor="middle">Your Morning Without Tomorrow</text>
        <text x="${width/2}" y="110" fill="${textColor}" font-size="16" opacity="0.7" text-anchor="middle">Chaos, confusion, and decision fatigue</text>
        
        <!-- Scattered sticky notes -->
        <g transform="translate(100, 150) rotate(-5)">
          <rect width="120" height="120" fill="#FEF3C7" rx="4"/>
          <text x="10" y="30" fill="#92400E" font-size="14">Meeting at 9?</text>
          <text x="10" y="50" fill="#92400E" font-size="14">Or was it 10?</text>
        </g>
        
        <g transform="translate(250, 180) rotate(8)">
          <rect width="120" height="120" fill="#FED7AA" rx="4"/>
          <text x="10" y="30" fill="#9A3412" font-size="14">Call client</text>
          <text x="10" y="50" fill="#9A3412" font-size="14">Which one??</text>
        </g>
        
        <g transform="translate(400, 160) rotate(-3)">
          <rect width="120" height="120" fill="#FECACA" rx="4"/>
          <text x="10" y="30" fill="#991B1B" font-size="14">URGENT!</text>
          <text x="10" y="50" fill="#991B1B" font-size="14">Everything is</text>
          <text x="10" y="70" fill="#991B1B" font-size="14">urgent...</text>
        </g>
        
        <g transform="translate(550, 170) rotate(5)">
          <rect width="120" height="120" fill="#E0E7FF" rx="4"/>
          <text x="10" y="30" fill="#3730A3" font-size="14">Project due</text>
          <text x="10" y="50" fill="#3730A3" font-size="14">When?!</text>
        </g>
        
        <!-- Stress indicators -->
        <g transform="translate(200, 350)">
          <text x="0" y="0" fill="#EF4444" font-size="48" font-weight="700" opacity="0.8">😰</text>
          <text x="60" y="0" fill="${textColor}" font-size="18">Stressed</text>
        </g>
        
        <g transform="translate(350, 350)">
          <text x="0" y="0" fill="#F59E0B" font-size="48" font-weight="700" opacity="0.8">😵</text>
          <text x="60" y="0" fill="${textColor}" font-size="18">Overwhelmed</text>
        </g>
        
        <g transform="translate(500, 350)">
          <text x="0" y="0" fill="#6B7280" font-size="48" font-weight="700" opacity="0.8">😫</text>
          <text x="60" y="0" fill="${textColor}" font-size="18">Exhausted</text>
        </g>
        
        <!-- Clock showing late time -->
        <g transform="translate(${width/2}, 480)">
          <circle cx="0" cy="0" r="60" fill="none" stroke="#EF4444" stroke-width="4"/>
          <line x1="0" y1="0" x2="0" y2="-30" stroke="#EF4444" stroke-width="4" stroke-linecap="round"/>
          <line x1="0" y1="0" x2="25" y2="0" stroke="#EF4444" stroke-width="4" stroke-linecap="round"/>
          <text x="0" y="80" fill="#EF4444" font-size="16" font-weight="600" text-anchor="middle">Already Late!</text>
        </g>
      </svg>
    `
    return `data:image/svg+xml;base64,${svgToBase64(svgString)}`
  }
  
  const svgStringAfter = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${bgColor}"/>
      
      <!-- Organized Morning Scene -->
      <text x="${width/2}" y="80" fill="${textColor}" font-size="32" font-weight="700" text-anchor="middle">Your Morning With Tomorrow</text>
      <text x="${width/2}" y="110" fill="${textColor}" font-size="16" opacity="0.7" text-anchor="middle">Clear, focused, and ready to conquer</text>
      
      <!-- Organized task list -->
      <g transform="translate(150, 150)">
        <rect width="500" height="250" rx="12" fill="${cardBg}" stroke="#10B981" stroke-width="2"/>
        <text x="30" y="40" fill="${textColor}" font-size="20" font-weight="600">Today's Priorities</text>
        
        <g transform="translate(30, 70)">
          <circle cx="10" cy="10" r="8" fill="#10B981"/>
          <path d="M 6 10 L 9 13 L 14 8" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>
          <text x="30" y="14" fill="${textColor}" font-size="16">9:00 AM - Team standup meeting</text>
        </g>
        
        <g transform="translate(30, 110)">
          <circle cx="10" cy="10" r="8" fill="#3B82F6"/>
          <text x="30" y="14" fill="${textColor}" font-size="16">10:00 AM - Deep work: Quarterly report</text>
        </g>
        
        <g transform="translate(30, 150)">
          <circle cx="10" cy="10" r="8" fill="#8B5CF6"/>
          <text x="30" y="14" fill="${textColor}" font-size="16">2:00 PM - Client presentation prep</text>
        </g>
        
        <g transform="translate(30, 190)">
          <circle cx="10" cy="10" r="8" fill="#EC4899"/>
          <text x="30" y="14" fill="${textColor}" font-size="16">4:00 PM - Review team proposals</text>
        </g>
      </g>
      
      <!-- Positive indicators -->
      <g transform="translate(200, 440)">
        <text x="0" y="0" fill="#10B981" font-size="48" font-weight="700" opacity="0.8">😊</text>
        <text x="60" y="0" fill="${textColor}" font-size="18">Confident</text>
      </g>
      
      <g transform="translate(350, 440)">
        <text x="0" y="0" fill="#3B82F6" font-size="48" font-weight="700" opacity="0.8">💪</text>
        <text x="60" y="0" fill="${textColor}" font-size="18">Focused</text>
      </g>
      
      <g transform="translate(500, 440)">
        <text x="0" y="0" fill="#8B5CF6" font-size="48" font-weight="700" opacity="0.8">🚀</text>
        <text x="60" y="0" fill="${textColor}" font-size="18">Productive</text>
      </g>
      
      <!-- Clock showing on-time -->
      <g transform="translate(${width/2}, 520)">
        <circle cx="0" cy="0" r="40" fill="none" stroke="#10B981" stroke-width="3"/>
        <line x1="0" y1="0" x2="0" y2="-20" stroke="#10B981" stroke-width="3" stroke-linecap="round"/>
        <line x1="0" y1="0" x2="15" y2="-10" stroke="#10B981" stroke-width="3" stroke-linecap="round"/>
        <text x="0" y="60" fill="#10B981" font-size="14" font-weight="600" text-anchor="middle">Ready to Win!</text>
      </g>
    </svg>
  `
  return `data:image/svg+xml;base64,${svgToBase64(svgStringAfter)}`
}