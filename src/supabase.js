import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oumbjhsctarbojffrldf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91bWJqaHNjdGFyYm9qZmZybGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNjMwNTgsImV4cCI6MjA4MjkzOTA1OH0.VOAsIugzj6dzU6plL68gvPG5n-OECkmcww6yykN44H8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
