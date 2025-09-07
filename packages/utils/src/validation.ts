export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidTaskTitle(title: string): boolean {
  return title.trim().length > 0 && title.trim().length <= 200
}

export function canAddMoreTasks(currentCount: number, isPro: boolean): boolean {
  const limit = isPro ? 6 : 3
  return currentCount < limit
}

export function validateTaskOrder(tasks: any[]): boolean {
  const orders = tasks.map(t => t.order)
  const uniqueOrders = new Set(orders)
  return orders.length === uniqueOrders.size
}