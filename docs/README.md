# Tomorrow App - Development Documentation

## Overview

Tomorrow is a productivity app built on the principle of evening planning to reduce morning decision fatigue. Users plan their next day in the evening (default 8 PM), and wake up with a clear, locked plan ready for execution.

## Core Concepts

### Evening Lock™
Tasks automatically lock at a set time (default 8 PM) to prevent anxiety-driven editing and ensure users wake up with a committed plan.

### Focused Momentum™
The morning view emphasizes the user's Most Important Task (MIT) to create immediate clarity and momentum.

### The 3-6 Rule
- **Free users**: Can plan up to 3 tasks per day
- **Pro users**: Can plan up to 6 tasks per day

This limitation is intentional, based on research showing that realistic daily task limits improve completion rates and reduce overwhelm.

## Architecture

### Monorepo Structure
The project uses Turborepo with pnpm workspaces for efficient dependency management and build optimization.

### Key Packages
- **@tomorrow/ui**: Reusable UI components built with React and Tailwind
- **@tomorrow/database**: Database types, queries, and Supabase client
- **@tomorrow/utils**: Shared utility functions (dates, validation, etc.)
- **@tomorrow/config**: Shared configuration files (TypeScript, ESLint, Tailwind)

## Development Workflow

### Getting Started
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

### Adding Dependencies
```bash
# Add to specific workspace
pnpm add axios --filter web

# Add workspace dependency
pnpm add @tomorrow/ui --filter web --workspace

# Add to all workspaces
pnpm add -w prettier
```

### Creating New Components
1. Add component to `packages/ui/src/components`
2. Export from `packages/ui/src/components/index.ts`
3. Import in apps using `@tomorrow/ui`

## Database Schema

### Core Tables
- **users**: User accounts and profiles
- **tasks**: Individual tasks with ordering and completion status
- **daily_plans**: Daily task collections with lock status
- **subscriptions**: Pro subscription management

## Feature Implementation Guide

### Adding New Features
1. Create feature branch: `git checkout -b feature/TOM-XX-description`
2. Implement in appropriate package/app
3. Add tests if applicable
4. Update documentation
5. Create PR with Linear ticket reference

### Testing Strategy
- Unit tests for utility functions
- Component tests for UI elements
- Integration tests for API routes
- E2E tests for critical user flows

## Deployment

### Environment Variables
Required environment variables are documented in `.env.example`

### Production Deployment
The app is configured for deployment on Vercel with automatic preview deployments for PRs.

## Troubleshooting

### Common Issues
1. **Build failures**: Run `pnpm clean` then `pnpm install`
2. **Type errors**: Ensure all packages are built with `pnpm build`
3. **Module not found**: Check workspace dependencies are properly linked

## Contributing

Please follow the commit convention and ensure all tests pass before creating PRs.