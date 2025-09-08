# Tomorrow App - Development Guide for Claude Code

## Project Overview

Tomorrow is a minimalist productivity app that leverages evening planning psychology to help users wake up with clear priorities and focused momentum. The core concept: **Plan tomorrow tonight, wake up ready to execute.**

## Audit Trail Requirements

### IMPORTANT: Create an audit file after EVERY prompt

After completing any task or answering any prompt, create an audit file with the following:

**File Naming Convention:**

```
audits/YYYY-MM-DD-HH-MM-SS-[brief-description].md
```

Example: `audits/2025-01-15-14-30-45-component-creation.md`

**Audit File Template:**

```markdown
# Audit Log - [Date Time]

## Prompt Summary

[Summarize what the user asked for]

## Actions Taken

1. [List each action performed]
2. [Include files created/modified]
3. [Note any decisions made]

## Files Changed

- `path/to/file1.tsx` - [Brief description of changes]
- `path/to/file2.ts` - [Brief description of changes]

## Components/Features Affected

- [Component/Feature name]
- [Related dependencies]

## Testing Considerations

- [What should be tested]
- [Potential edge cases]

## Next Steps

- [Suggested follow-up tasks]
- [Related tickets from Linear]

## Notes

[Any additional context, warnings, or important information]

## Timestamp

Created: YYYY-MM-DD HH:MM:SS
Ticket Reference: TOM-XX (if applicable)
```

### Why This Matters

1. **Complete Development History**: Every change is documented
2. **Easy Debugging**: Quick reference for what was changed and why
3. **Knowledge Transfer**: New developers can understand the evolution
4. **Project Management**: Track progress against Linear tickets
5. **Quality Assurance**: Know exactly what needs testing

### Example Audit File

```markdown
# Audit Log - 2025-01-15 14:30:45

## Prompt Summary

User requested creation of TaskCard component with drag-and-drop functionality

## Actions Taken

1. Created TaskCard.tsx component in components/planning/
2. Added drag-and-drop hooks using @dnd-kit
3. Implemented MIT star toggle functionality
4. Added time estimate display
5. Created corresponding test file

## Files Changed

- `components/planning/TaskCard.tsx` - New component created
- `components/planning/index.ts` - Added export
- `lib/store/planStore.ts` - Added toggleMIT action
- `__tests__/components/TaskCard.test.tsx` - Test file created

## Components/Features Affected

- TaskCard component
- Planning interface
- Drag and drop system
- MIT selection feature

## Testing Considerations

- Test drag and drop in different browsers
- Verify touch support on mobile
- Test MIT toggle state persistence
- Check accessibility with screen readers

## Next Steps

- Implement PlanLock component (TOM-38)
- Add animation transitions
- Test with real data from Supabase

## Notes

Used Framer Motion for animations. Consider performance impact with many tasks.

## Timestamp

Created: 2025-01-15 14:30:45
Ticket Reference: TOM-34
```

**Always create these files to maintain a complete development history. The chronological naming ensures automatic sorting and easy tracking of the project's evolution.**

---

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Drag & Drop**: @dnd-kit/sortable
- **Hosting**: Vercel
- **Payments**: Stripe
- **Theme**: Light/Dark mode with CSS variables

## Project Structure

```
tomorrow-app/
├── apps/
│   ├── landing/                 # Marketing & waitlist site (Next.js)
│   ├── web/                     # Main web application (Next.js)
│   └── mobile/                  # React Native mobile app
├── packages/
│   ├── ui/                      # Shared UI components
│   ├── database/                # Supabase client & schemas
│   ├── config/                  # Shared configs
│   └── utils/                   # Shared utilities
├── audits/                      # Audit trail files (YYYY-MM-DD-HH-MM-SS-*.md)
└── docs/
    └── claude.md                # This file
```

## Core Features Implementation

### 1. Evening Planning Mode (Default: 8 PM)

**Key Components:**

- Brain dump area for quick capture
- Task selection (3 free, 6 pro)
- MIT (Most Important Task) selection with star
- Drag-to-reorder functionality
- Time estimates (optional)
- Lock mechanism to prevent late-night editing

**Implementation Notes:**

```typescript
// Evening lock logic
const isLocked = () => {
  const now = new Date();
  const lockTime = new Date();
  lockTime.setHours(20, 0, 0); // 8 PM
  const unlockTime = new Date();
  unlockTime.setDate(unlockTime.getDate() + 1);
  unlockTime.setHours(6, 0, 0); // 6 AM next day

  return now >= lockTime || now < unlockTime;
};
```

### 2. Morning Execution Mode (Default: 6 AM)

**Two View Modes:**

- **Focus Mode**: Shows only MIT prominently, other tasks minimized
- **List Mode**: All tasks visible with visual hierarchy

**State Management:**

```typescript
interface PlanState {
  tasks: Task[];
  mit: string | null;
  isLocked: boolean;
  completedCount: number;
  viewMode: "focus" | "list";
}
```

### 3. The 3-6 Rule

```typescript
const MAX_TASKS = {
  free: 3,
  pro: 6,
} as const;

// Validation
const canAddTask = (userTier: "free" | "pro", currentTasks: number) => {
  return currentTasks < MAX_TASKS[userTier];
};
```

## Database Schema (Supabase)

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  timezone TEXT DEFAULT 'UTC',
  reminder_time TIME DEFAULT '20:00',
  wake_time TIME DEFAULT '06:00',
  subscription_status TEXT DEFAULT 'free',
  subscription_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Plans table
CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  planned_for DATE NOT NULL,
  locked BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  reflection_rating INTEGER CHECK (reflection_rating >= 1 AND reflection_rating <= 5),
  reflection_note TEXT,
  UNIQUE(user_id, planned_for)
);

-- Tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID REFERENCES plans(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  position INTEGER NOT NULL,
  is_mit BOOLEAN DEFAULT false,
  time_estimate INTEGER, -- in minutes
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,
  emergency BOOLEAN DEFAULT false
);

-- Streaks table
CREATE TABLE streaks (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_planned DATE,
  total_days_planned INTEGER DEFAULT 0,
  total_tasks_completed INTEGER DEFAULT 0
);
```

## Component Development Guidelines

### TaskCard Component

```tsx
interface TaskCardProps {
  task: Task;
  variant: "default" | "mit" | "completed" | "emergency";
  onComplete: (id: string) => void;
  onDragStart?: () => void;
  isDraggable: boolean;
}

// Key features:
// - Checkbox for completion
// - Star indicator for MIT
// - Time estimate display
// - Drag handle (when unlocked)
// - Smooth animations on state change
```

### PlanLock Component

```tsx
interface PlanLockProps {
  onLock: () => void;
  isLocked: boolean;
  taskCount: number;
}

// Features:
// - Celebration animation on lock
// - Warning if < 3 tasks
// - Confirmation dialog
// - Visual lock state indicator
```

## API Routes Structure

```typescript
// app/api/tasks/route.ts
export async function GET() {
  // Get today's tasks
}

export async function POST() {
  // Create new task
}

export async function PUT() {
  // Update task (complete, reorder)
}

// app/api/plans/lock/route.ts
export async function POST() {
  // Lock tonight's plan
}

// app/api/stripe/webhook/route.ts
export async function POST() {
  // Handle Stripe webhooks
}
```

## State Management (Zustand)

```typescript
// lib/store/planStore.ts
interface PlanStore {
  // State
  tasks: Task[];
  isLocked: boolean;
  viewMode: "focus" | "list";

  // Actions
  addTask: (task: Omit<Task, "id">) => void;
  removeTask: (id: string) => void;
  reorderTasks: (startIndex: number, endIndex: number) => void;
  toggleComplete: (id: string) => void;
  setMIT: (id: string) => void;
  lockPlan: () => void;
  switchViewMode: () => void;
}
```

## Theme Configuration

### Tailwind Config (tailwind.config.ts)

```typescript
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds using CSS variables
        background: {
          DEFAULT: "var(--bg-main)",
          section: "var(--bg-section)",
          subtle: "var(--bg-subtle)",
          card: "var(--bg-card)",
        },
        // Text colors
        text: {
          heading: "var(--text-heading)",
          body: "var(--text-body)",
          muted: "var(--text-muted)",
        },
        // Brand colors (Tomorrow specific)
        tomorrow: {
          purple: "var(--tomorrow-purple)",
          blue: "var(--tomorrow-blue)",
          "purple-light": "var(--tomorrow-purple-light)",
          "blue-light": "var(--tomorrow-blue-light)",
        },
        // Semantic colors
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        // UI colors
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        heading: ["var(--font-poppins)"],
      },
      spacing: {
        "x-gap": "1.5rem",
        "y-gap": "2.5rem",
      },
      maxWidth: {
        container: "1400px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
```

### Global Styles (globals.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Tomorrow Brand Colors */
  --tomorrow-purple: #5d3a9b;
  --tomorrow-blue: #3b4c79;
  --tomorrow-purple-light: #7b5bb8;
  --tomorrow-blue-light: #5a6b99;

  /* Light Theme */
  --bg-main: #ffffff;
  --bg-section: #f9fafb;
  --bg-subtle: #f3f4f6;
  --bg-card: #ffffff;

  --text-heading: #111827;
  --text-body: #4b5563;
  --text-muted: #9ca3af;

  --primary: var(--tomorrow-purple);
  --primary-foreground: #ffffff;

  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;

  --border: #e5e7eb;
  --input: #f3f4f6;
  --ring: var(--tomorrow-purple);
}

.dark {
  /* Dark Theme */
  --bg-main: #0a0a0a;
  --bg-section: #111111;
  --bg-subtle: #1a1a1a;
  --bg-card: #1f1f1f;

  --text-heading: #f9fafb;
  --text-body: #d1d5db;
  --text-muted: #6b7280;

  --primary: var(--tomorrow-blue);
  --primary-foreground: #ffffff;

  --success: #059669;
  --warning: #d97706;
  --error: #dc2626;

  --border: #374151;
  --input: #1f2937;
  --ring: var(--tomorrow-blue);
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-text-body antialiased;
  }
  h1,
  h2,
  h3,
  h4 {
    @apply font-heading text-text-heading;
  }
}

@layer components {
  /* Reusable component classes */
  .container-custom {
    @apply mx-auto max-w-container px-x-gap;
  }

  .section-padding {
    @apply py-y-gap;
  }

  .card-base {
    @apply bg-background-card rounded-lg border border-border p-6;
  }

  .input-base {
    @apply bg-input border border-border rounded-md px-3 py-2 
           focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
           transition-colors;
  }

  .button-base {
    @apply px-4 py-2 rounded-md font-medium transition-all
           focus:outline-none focus:ring-2 focus:ring-offset-2;
  }

  .button-primary {
    @apply button-base bg-primary text-primary-foreground 
           hover:opacity-90 focus:ring-primary;
  }

  .button-ghost {
    @apply button-base hover:bg-background-subtle;
  }
}
```

## Reusable Components Library

### Base Components

#### Container Component

```tsx
// components/shared/Container.tsx
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const Container = ({
  children,
  className = "",
  as: Component = "div",
}: ContainerProps) => {
  return (
    <Component className={cn("container-custom", className)}>
      {children}
    </Component>
  );
};
```

#### Section Component

```tsx
// components/shared/Section.tsx
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "alternate" | "subtle";
}

export const Section = ({
  children,
  className = "",
  variant = "default",
}: SectionProps) => {
  const variants = {
    default: "bg-background",
    alternate: "bg-background-section",
    subtle: "bg-background-subtle",
  };

  return (
    <section className={cn("section-padding", variants[variant], className)}>
      <Container>{children}</Container>
    </section>
  );
};
```

#### Card Component

```tsx
// components/shared/Card.tsx
interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "bordered" | "elevated";
  onClick?: () => void;
}

export const Card = ({
  children,
  className = "",
  variant = "default",
  onClick,
}: CardProps) => {
  const variants = {
    default: "card-base",
    bordered: "card-base border-2",
    elevated: "card-base shadow-lg",
  };

  return (
    <div
      className={cn(variants[variant], onClick && "cursor-pointer", className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
```

### Theme Provider

```tsx
// components/providers/ThemeProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem("theme") as Theme) || "system";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
```

## Reusable Utilities & Helpers

### Class Name Utility

```typescript
// lib/utils/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Date/Time Utilities

```typescript
// lib/utils/dates.ts
export const isEveningLockTime = (userSettings: UserSettings): boolean => {
  const now = new Date();
  const lockTime = parseTime(userSettings.reminderTime); // Default 20:00
  const unlockTime = parseTime(userSettings.wakeTime); // Default 06:00

  // Handle next-day unlock
  if (unlockTime.hours < lockTime.hours) {
    return (
      now.getHours() >= lockTime.hours || now.getHours() < unlockTime.hours
    );
  }

  return now.getHours() >= lockTime.hours && now.getHours() < unlockTime.hours;
};

export const formatTimeEstimate = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

export const getTomorrowDate = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};
```

### Validation Utilities

```typescript
// lib/utils/validation.ts
export const validateTaskTitle = (title: string): ValidationResult => {
  if (!title.trim()) {
    return { valid: false, error: "Task cannot be empty" };
  }
  if (title.length > 200) {
    return { valid: false, error: "Task too long (max 200 characters)" };
  }
  return { valid: true };
};

export const canAddTask = (
  currentCount: number,
  userTier: "free" | "pro"
): boolean => {
  const limits = { free: 3, pro: 6 };
  return currentCount < limits[userTier];
};
```

## Custom Hooks Library

### useLocalStorage Hook

```typescript
// hooks/useLocalStorage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [storedValue, setValue] as const;
}
```

### useMediaQuery Hook

```typescript
// hooks/useMediaQuery.ts
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

// Usage
const isMobile = useMediaQuery("(max-width: 768px)");
const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
```

### usePlan Hook

```typescript
// hooks/usePlan.ts
export function usePlan(date?: string) {
  const { user } = useUser();
  const targetDate = date || getTomorrowDate();

  const {
    tasks,
    isLocked,
    addTask,
    removeTask,
    toggleComplete,
    reorderTasks,
    lockPlan,
  } = usePlanStore();

  const {
    data: plan,
    isLoading,
    error,
  } = useSWR(user ? `/api/plans/${targetDate}` : null, fetcher);

  return {
    plan,
    tasks,
    isLocked,
    isLoading,
    error,
    canEdit: !isLocked && !isEveningLockTime(user?.settings),
    actions: {
      addTask,
      removeTask,
      toggleComplete,
      reorderTasks,
      lockPlan,
    },
  };
}
```

## Component Patterns & Best Practices

### Compound Component Pattern

```tsx
// Example: Task component with sub-components
const Task = {
  Root: TaskRoot,
  Title: TaskTitle,
  Actions: TaskActions,
  TimeEstimate: TaskTimeEstimate,
};

// Usage
<Task.Root>
  <Task.Title>Complete project proposal</Task.Title>
  <Task.TimeEstimate minutes={120} />
  <Task.Actions onComplete={handleComplete} />
</Task.Root>;
```

### Render Props Pattern

```tsx
// Example: Draggable list with render props
interface DraggableListProps<T> {
  items: T[];
  renderItem: (item: T, index: number, isDragging: boolean) => React.ReactNode;
  onReorder: (startIndex: number, endIndex: number) => void;
}

export function DraggableList<T>({
  items,
  renderItem,
  onReorder,
}: DraggableListProps<T>) {
  // DnD implementation
  return (
    <div>{items.map((item, index) => renderItem(item, index, false))}</div>
  );
}
```

### Factory Pattern for Components

```typescript
// lib/factories/buttonFactory.ts
interface ButtonConfig {
  variant: "primary" | "secondary" | "ghost" | "danger";
  size: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const createButtonClasses = (config: ButtonConfig): string => {
  const base = "button-base";

  const variants = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    secondary:
      "bg-background-subtle text-text-body hover:bg-background-section",
    ghost: "hover:bg-background-subtle",
    danger: "bg-error text-white hover:bg-error/90",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return cn(
    base,
    variants[config.variant],
    sizes[config.size],
    config.fullWidth && "w-full"
  );
};
```

## Testing Strategy with Reusable Helpers

### Test Utilities

```typescript
// __tests__/utils/testUtils.tsx
import { render as rtlRender } from "@testing-library/react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

function render(ui: React.ReactElement, options = {}) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <ThemeProvider>{children}</ThemeProvider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
export { render };
```

### Mock Data Factories

```typescript
// __tests__/factories/index.ts
export const createMockTask = (overrides = {}): Task => ({
  id: "task-1",
  title: "Test task",
  position: 0,
  is_mit: false,
  time_estimate: 30,
  completed: false,
  ...overrides,
});

export const createMockPlan = (overrides = {}): Plan => ({
  id: "plan-1",
  user_id: "user-1",
  planned_for: getTomorrowDate(),
  locked: false,
  tasks: [createMockTask()],
  ...overrides,
});
```

## Performance Optimization Patterns

### Code Splitting

```typescript
// Lazy load heavy components
const Analytics = dynamic(() => import("@/components/analytics/Dashboard"), {
  loading: () => <Skeleton className="h-96" />,
  ssr: false,
});
```

### Memoization Patterns

```typescript
// Memoize expensive computations
const memoizedStats = useMemo(() => calculateCompletionStats(tasks), [tasks]);

// Memoize components
const TaskList = memo(
  ({ tasks }: TaskListProps) => {
    // Component implementation
  },
  (prevProps, nextProps) => {
    return (
      prevProps.tasks.length === nextProps.tasks.length &&
      prevProps.tasks.every((task, i) => task.id === nextProps.tasks[i].id)
    );
  }
);
```

### Optimistic Updates

```typescript
// Example: Optimistic task completion
const toggleTaskComplete = async (taskId: string) => {
  // Optimistic update
  setTasks((prev) =>
    prev.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
  );

  try {
    await updateTask(taskId, { completed: true });
  } catch (error) {
    // Revert on error
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    toast.error("Failed to update task");
  }
};
```

## Accessibility Patterns

### Focus Management

```typescript
// components/planning/TaskInput.tsx
export const TaskInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus on mount
    inputRef.current?.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      aria-label="New task"
      aria-describedby="task-helper-text"
      className="input-base"
    />
  );
};
```

### Keyboard Navigation

```typescript
// hooks/useKeyboardShortcuts.ts
export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K: Quick add task
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openQuickAdd();
      }

      // Escape: Close modals
      if (e.key === "Escape") {
        closeAllModals();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}
```

## Development Principles

1. **Component Reusability**: Every component should be built to be reused. Use composition over configuration.

2. **Consistent Theming**: Always use CSS variables and Tailwind classes. Never hardcode colors.

3. **Type Safety**: Leverage TypeScript for all components, hooks, and utilities. No `any` types.

4. **Performance First**: Use React.memo, useMemo, and useCallback appropriately. Lazy load heavy components.

5. **Accessibility Always**: Every interactive element needs proper ARIA labels, keyboard support, and focus management.

6. **Mobile First**: Design and develop for mobile, then enhance for desktop.

7. **DRY Principle**: Extract common logic into hooks, utilities, and shared components.

8. **Testing Coverage**: Write tests for utilities, hooks, and critical user flows.

9. **Audit Everything**: Create an audit file after every prompt/task completion for historical tracking.

## Resources & References

- [Supabase Docs](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Stripe Integration](https://stripe.com/docs)
- [Next.js 14 Docs](https://nextjs.org/docs)
- [@dnd-kit Examples](https://docs.dndkit.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Native](https://reactnative.dev/docs)
- [Linear Tickets](https://linear.app/pixelverse-studios)

---

**Core Mantras**:

- "Plan tomorrow tonight, wake up ready to execute"
- "Reusable, themeable, accessible"
- "Every pixel has a purpose"
- "Performance without sacrificing experience"
- "Document everything with audit trails"
- "Once done testing your work, kill your local development servers"