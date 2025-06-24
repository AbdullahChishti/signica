import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { TABLES } from '@/lib/supabase'

// Create a Supabase client with service role key to bypass RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    db: {
      schema: 'public'
    }
  }
)

console.log('API: Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('API: Using service role key:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const requestId = resolvedParams.id

    console.log('API: Fetching W9 request with ID:', requestId)

    if (!requestId) {
      console.log('API: No request ID provided')
      return NextResponse.json(
        { error: 'Request ID is required' },
        { status: 400 }
      )
    }

    // First, let's test if we can query the table at all
    console.log('API: Testing database connection...')
    const { data: allRequests, error: testError } = await supabaseAdmin
      .from(TABLES.W9_REQUESTS)
      .select('id, vendor_name, status')
      .limit(5)

    console.log('API: Test query - found requests:', allRequests?.length || 0, 'error:', testError)

    // Fetch the W9 request using admin client to bypass RLS
    console.log('API: Querying database for request ID:', requestId)
    const { data, error } = await supabaseAdmin
      .from(TABLES.W9_REQUESTS)
      .select(`
        *,
        w9_form_data (*)
      `)
      .eq('id', requestId)
      .single()

    console.log('API: Database response - data:', data, 'error:', error)

    if (error) {
      if (error.code === 'PGRST116') {
        console.log('API: Request not found (PGRST116)')
        return NextResponse.json(
          { error: 'W-9 request not found or has expired' },
          { status: 404 }
        )
      }
      console.error('API: Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch W-9 request' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'W-9 request not found or has expired' },
        { status: 404 }
      )
    }

    // Check if request is still valid for completion
    if (data.status === 'completed') {
      return NextResponse.json(
        { error: 'This W-9 form has already been completed' },
        { status: 400 }
      )
    }

    if (data.status === 'expired') {
      return NextResponse.json(
        { error: 'This W-9 request has expired' },
        { status: 400 }
      )
    }

    // Return the request data
    return NextResponse.json({ data })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
