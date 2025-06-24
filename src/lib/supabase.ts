import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface User {
  id: string
  email: string
  name: string
  created_at: string
  updated_at: string
}

export interface W9Request {
  id: string
  vendor_name: string
  vendor_email: string
  status: 'pending' | 'completed' | 'expired'
  created_by: string
  created_at: string
  updated_at: string
  expires_at: string
  form_data?: W9FormData
}

export interface W9FormData {
  id: string
  request_id: string
  legal_name: string
  business_name?: string
  tax_classification: string
  ssn_ein: string
  street_address: string
  apartment?: string
  city: string
  state: string
  zip_code: string
  signature: string
  signature_type: 'typed' | 'drawn'
  submitted_at: string
}

// Database table names
export const TABLES = {
  USERS: 'users',
  W9_REQUESTS: 'w9_requests',
  W9_FORM_DATA: 'w9_form_data'
} as const
