import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oumbjhsctarbojffrldf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91bWJqaHNjdGFyYm9qZmZybGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMTE2MDksImV4cCI6MjA2Mjg4NzYwOX0.K-aT9oWvVeC_7YL3KvYNWlF7F5ztPL-dDgRd4Qa89f4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
