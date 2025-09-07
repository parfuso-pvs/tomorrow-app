# Tomorrow App - Monorepo Setup & Development Guide

> **Plan tomorrow tonight, wake up ready to execute.**

A minimalist productivity app that leverages evening planning psychology to help users wake up with clear priorities and focused momentum.

## 📚 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Repository Setup](#repository-setup)
- [Monorepo Structure](#monorepo-structure)
- [Development Workflow](#development-workflow)
- [Environment Setup](#environment-setup)
- [Next Steps & Timeline](#next-steps--timeline)
- [Linear Ticket Structure](#linear-ticket-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Project Overview

Tomorrow is a productivity app built on the principle of evening planning to reduce morning decision fatigue. Users plan their next day in the evening (default 8 PM), and wake up with a clear, locked plan ready for execution.

### Core Features
- **Evening Lock™**: Tasks lock at night to prevent anxiety editing
- **Focused Momentum™**: Morning view prioritizes your Most Important Task (MIT)
- **The 3-6 Rule**: Free users get 3 tasks, Pro users get 6
- **Science-Backed**: Based on Zeigarnik Effect and decision fatigue research

### Business Model
- **Free**: Core functionality with 3 tasks
- **Pro**: $3.99/month or $39/year (6 tasks + analytics)

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand
- **Animations**: Framer Motion
- **DnD**: @dnd-kit/sortable

### Backend
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Payments**: Stripe
- **Email**: Resend
- **Hosting**: Vercel

### Development
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions

## 🚀 Repository Setup

### Prerequisites
- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Git

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/pixelversestudios/tomorrow-app.git
cd tomorrow-app

# Install pnpm if not already installed
npm install -g pnpm

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
pnpm dev
```

### Creating the Monorepo from Scratch

```bash
# Initialize the monorepo
pnpm init

# Add Turborepo
pnpm add -D turbo

# Create workspace structure
mkdir -p apps/web packages/{ui,database,config,utils} docs

# Set up the main Next.js app
cd apps
pnpm create next-app@latest web --typescript --tailwind --app --src-dir=false --import-alias "@/*"

# Return to root
cd ..
```

## 📁 Monorepo Structure

```
tomorrow-app/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # CI/CD pipeline
│   │   └── preview.yml          # Vercel preview deployments
│   └── CODEOWNERS
├── apps/
│   ├── web/                     # Main Next.js application
│   │   ├── app/                 # App Router pages
│   │   │   ├── (auth)/         # Auth routes (login, signup)
│   │   │   ├── (app)/          # Protected app routes
│   │   │   ├── (marketing)/    # Public marketing pages
│   │   │   └── api/            # API routes
│   │   ├── components/
│   │   │   ├── planning/       # Evening planning components
│   │   │   ├── execution/      # Morning execution components
│   │   │   └── shared/         # Shared components
│   │   ├── lib/
│   │   │   ├── supabase/       # Database client
│   │   │   ├── store/          # Zustand stores
│   │   │   └── utils/          # Utilities
│   │   └── package.json
│   └── landing/                 # Optional separate landing page
├── packages/
│   ├── ui/                      # Shared UI components & design system
│   │   ├── src/
│   │   │   ├── components/     # Reusable components
│   │   │   ├── hooks/          # Shared React hooks
│   │   │   ├── styles/         # Shared styles
│   │   │   └── index.ts
│   │   └── package.json
│   ├── database/                # Database types & queries
│   │   ├── src/
│   │   │   ├── client.ts       # Supabase client
│   │   │   ├── types.ts        # TypeScript types
│   │   │   ├── queries/        # Shared queries
│   │   │   └── schema.sql      # Database schema
│   │   └── package.json
│   ├── config/                  # Shared configurations
│   │   ├── eslint/             # ESLint config
│   │   ├── typescript/         # TypeScript config
│   │   └── tailwind/           # Tailwind base config
│   └── utils/                   # Shared utilities
│       ├── src/
│       │   ├── cn.ts           # className helper
│       │   ├── dates.ts        # Date utilities
│       │   ├── validation.ts   # Validation helpers
│       │   └── constants.ts    # App constants
│       └── package.json
├── docs/
│   ├── claude.md                # AI assistant context
│   └── README.md                # This file
├── .env.example
├── .gitignore
├── turbo.json                   # Turborepo config
├── pnpm-workspace.yaml          # pnpm workspace config
├── package.json                 # Root package.json
└── README.md
```

## 🔧 Configuration Files

### Root `package.json`
```json
{
  "name": "tomorrow-app",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "start": "turbo start",
    "lint": "turbo lint",
    "test": "turbo test",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "db:push": "turbo db:push",
    "db:migrate": "turbo db:migrate",
    "type-check": "turbo type-check"
  },
  "devDependencies": {
    "turbo": "latest",
    "prettier": "latest",
    "eslint": "latest",
    "typescript": "^5.0.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  },
  "packageManager": "pnpm@8.15.0"
}
```

### `pnpm-workspace.yaml`
```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### `turbo.json`
```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    },
    "type-check": {
      "dependsOn": ["^build"]
    },
    "db:push": {
      "cache": false
    },
    "db:migrate": {
      "cache": false
    }
  }
}
```

## 💻 Development Workflow

### Branch Strategy

```bash
# Main branches
main                    # Production-ready code
develop                 # Integration branch

# Feature branches (linked to Linear tickets)
feature/TOM-XX-description

# Other branches
hotfix/description      # Emergency fixes
release/v1.0.0         # Release preparation
```

### Common Commands

```bash
# Development
pnpm dev                        # Run all apps in dev mode
pnpm --filter web dev          # Run specific app
pnpm --filter @tomorrow/ui dev # Run specific package

# Building
pnpm build                      # Build all packages
pnpm --filter web build        # Build specific app

# Testing
pnpm test                       # Run all tests
pnpm test:watch                # Watch mode
pnpm test:coverage             # With coverage

# Database
pnpm db:push                   # Push schema changes
pnpm db:migrate                # Run migrations
pnpm db:seed                   # Seed database

# Dependencies
pnpm add axios --filter web    # Add to specific app
pnpm add @tomorrow/ui --filter web --workspace  # Add workspace package

# Utilities
pnpm lint                      # Lint all packages
pnpm format                    # Format all files
pnpm type-check               # TypeScript checking
pnpm clean                    # Clean all node_modules & build outputs
```

### Creating a New Feature

```bash
# 1. Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/TOM-XX-feature-name

# 2. Make changes and commit with Linear reference
git add .
git commit -m "TOM-XX: Implement feature description"

# 3. Push and create PR
git push -u origin feature/TOM-XX-feature-name

# 4. After PR approval, merge to develop
# PRs to main only from develop or hotfix branches
```

## 🔐 Environment Setup

### Environment Variables

Create `.env.local` in `apps/web/`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Resend (Email)
RESEND_API_KEY=your_resend_api_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Tomorrow"

# Analytics (Optional)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Supabase Setup

1. Create a new Supabase project
2. Run the database schema (see `packages/database/schema.sql`)
3. Set up Row Level Security policies
4. Configure Auth providers
5. Copy connection strings to `.env.local`

### Stripe Setup

1. Create Stripe account
2. Set up products and pricing
3. Configure webhooks endpoint
4. Copy API keys to `.env.local`

## 📅 Next Steps & Timeline

### Week 1: Foundation (TOM-11 to TOM-27)
- [x] Initialize Next.js with TypeScript
- [ ] Set up Supabase backend
- [ ] Configure Tailwind with theme system
- [ ] Create shared components
- [ ] Implement utility functions
- [ ] Set up Zustand stores

### Week 2: Core Features (TOM-28 to TOM-44)
- [ ] Build authentication system
- [ ] Create evening planning interface
- [ ] Implement morning execution views
- [ ] Add drag-and-drop functionality
- [ ] Build task management

### Week 3: Growth Features (TOM-45 to TOM-58)
- [ ] Design landing pages
- [ ] Create onboarding flow
- [ ] Build streak system
- [ ] Add gamification
- [ ] Implement analytics

### Week 4: Monetization & Launch (TOM-59 to TOM-70)
- [ ] Integrate Stripe payments
- [ ] Set up subscription management
- [ ] Configure PWA capabilities
- [ ] Testing & QA
- [ ] Deploy to production

## 📋 Linear Ticket Structure

### Epic Overview
1. **TOM-11**: Project Foundation & Setup (5 sub-tasks)
2. **TOM-16**: Shared Components & Utilities (4 sub-tasks)
3. **TOM-17**: Authentication System (5 sub-tasks)
4. **TOM-18**: Evening Planning Mode (7 sub-tasks)
5. **TOM-19**: Morning Execution Mode (5 sub-tasks)
6. **TOM-20**: Landing & Marketing Pages (5 sub-tasks)
7. **TOM-21**: User Onboarding Flow (5 sub-tasks)
8. **TOM-22**: Streak & Gamification System (4 sub-tasks)
9. **TOM-23**: Payment & Monetization (5 sub-tasks)
10. **TOM-64**: Testing & Quality Assurance
11. **TOM-65**: Deployment & Launch

### Linear Integration
- Branch names: `feature/TOM-XX-description`
- Commit messages: `TOM-XX: Description`
- PR titles: `[TOM-XX] Feature description`

## 🚢 Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
pnpm add -D vercel

# Deploy
vercel

# Configuration for monorepo:
# Root Directory: apps/web
# Build Command: cd ../.. && pnpm build --filter=web
# Output Directory: apps/web/.next
```

### Production Checklist
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Stripe webhooks configured
- [ ] Email templates set up
- [ ] Analytics configured
- [ ] Error monitoring (Sentry) set up
- [ ] Performance optimizations applied
- [ ] SEO meta tags configured
- [ ] PWA manifest configured
- [ ] Security headers configured

## 🤝 Contributing

### Code Style
- Use TypeScript for all code
- Follow ESLint configuration
- Use Prettier for formatting
- Write tests for new features
- Update documentation

### Commit Convention
```
feat: Add new feature
fix: Bug fix
docs: Documentation changes
style: Code style changes
refactor: Code refactoring
test: Test updates
chore: Build/config updates
```

### Pull Request Process
1. Create feature branch from `develop`
2. Make changes with clear commits
3. Update tests and documentation
4. Create PR with Linear ticket reference
5. Request review
6. Merge after approval

## 📚 Additional Resources

- [Claude.md](./docs/claude.md) - AI Assistant Context
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Turborepo Docs](https://turbo.build/repo/docs)
- [Linear API](https://developers.linear.app)
- [Stripe Docs](https://stripe.com/docs)

## 📝 License

Copyright © 2025 PixelVerse Studios. All rights reserved.

---

**Built with ❤️ by PixelVerse Studios**

*Plan tomorrow tonight, wake up ready to execute.*