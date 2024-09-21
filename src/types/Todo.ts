export interface Todo {
  title: string
  description?: string
  time_range: string
  priority: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High'
  is_complete: boolean
  order: number
  date: string
}
