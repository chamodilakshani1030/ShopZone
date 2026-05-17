

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if credentials are valid before creating client
const isConfigured = !!(supabaseUrl && supabaseUrl.startsWith('http'))

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      supabaseUrl: null,
      from: () => ({
        select: () => Promise.resolve({ data: [], error: true }),
        eq: () => Promise.resolve({ data: null, error: true }),
        single: () => Promise.resolve({ data: null, error: true }),
      }),
    }
