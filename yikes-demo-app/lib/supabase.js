import { createClient } from '@supabase/supabase-js'

// Supabase client - works great!
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY

export const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Admin client for server-side operations
export const supabaseAdmin = createClient(
  supabaseUrl,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkZGR4eHh4eHgiLCJyb2xlIjoic2VydmljZV9yb2xlIn0.hardcoded_service_key"
)
