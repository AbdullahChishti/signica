import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { TABLES } from '@/lib/supabase'

// Create a Supabase client that can handle both authenticated and service role operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

export async function POST(request: NextRequest) {
  try {
    const { vendorName, vendorEmail, userId } = await request.json()

    if (!vendorName || !vendorEmail || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields: vendorName, vendorEmail, userId' },
        { status: 400 }
      )
    }

    // Get the authorization header to verify the user
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      )
    }

    // Create Supabase client with the user's session
    const supabase = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      global: {
        headers: {
          Authorization: authHeader
        }
      }
    })

    // Verify the user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user || user.id !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Create the W9 request with proper authentication context
    const { data, error } = await supabase
      .from(TABLES.W9_REQUESTS)
      .insert({
        vendor_name: vendorName,
        vendor_email: vendorEmail,
        created_by: userId,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Database error creating W9 request:', error)
      return NextResponse.json(
        { error: 'Failed to create W9 request', details: error.message },
        { status: 500 }
      )
    }

    console.log('✅ W9 request created successfully:', data.id)
    return NextResponse.json({ 
      success: true, 
      request: data 
    })

  } catch (error) {
    console.error('Error creating W9 request:', error)
    return NextResponse.json(
      { error: 'Failed to create W9 request' },
      { status: 500 }
    )
  }
}
