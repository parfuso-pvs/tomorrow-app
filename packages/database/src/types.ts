export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  user_id: string
  title: string
  description?: string
  is_mit: boolean
  order: number
  completed: boolean
  locked_at?: string
  created_at: string
  updated_at: string
}

export interface DailyPlan {
  id: string
  user_id: string
  date: string
  locked: boolean
  locked_at?: string
  created_at: string
  updated_at: string
}