# Tomorrow App

> **Plan tomorrow tonight, wake up ready to execute.**

A minimalist productivity app that leverages evening planning psychology to help users wake up with clear priorities and focused momentum.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

## 📁 Project Structure

This is a monorepo powered by Turborepo and pnpm workspaces.

```
tomorrow-app/
├── apps/
│   └── web/          # Next.js application
├── packages/
│   ├── ui/           # Shared UI components
│   ├── database/     # Database types & queries
│   ├── config/       # Shared configurations
│   └── utils/        # Shared utilities
└── docs/             # Documentation
```

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **State**: Zustand
- **Database**: Supabase
- **Auth**: Supabase Auth
- **Payments**: Stripe
- **Monorepo**: Turborepo, pnpm

## 📚 Documentation

- [Development Guide](./docs/README.md)
- [Claude AI Context](./docs/claude.md)

## 📝 License

Copyright © 2025 PixelVerse Studios. All rights reserved.