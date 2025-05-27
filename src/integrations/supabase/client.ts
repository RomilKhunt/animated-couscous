
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://giztfhgzypowkvapdxia.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpenRmaGd6eXBvd2t2YXBkeGlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxNTY0MTAsImV4cCI6MjA2MzczMjQxMH0.PS-nJ5T-I9WUDyLJJ6OkjlY1AeD8NGfcp09aKGZqYxU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
