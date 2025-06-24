import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { TABLES } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Test DB: Starting database connectivity test')
    
    // Test 1: Basic connection
    const { data: testData, error: testError } = await supabase
      .from(TABLES.W9_REQUESTS)
      .select('count')
      .limit(1)
    
    console.log('Test DB: Basic query result:', { testData, testError })
    
    // Test 2: Try to get all requests (might be blocked by RLS)
    const { data: allRequests, error: allError } = await supabase
      .from(TABLES.W9_REQUESTS)
      .select('*')
      .limit(10)
    
    console.log('Test DB: All requests query:', { count: allRequests?.length || 0, allError })
    
    // Test 3: Check table structure
    const { data: tableInfo, error: tableError } = await supabase
      .rpc('get_table_info', { table_name: 'w9_requests' })
      .limit(1)
    
    console.log('Test DB: Table info:', { tableInfo, tableError })
    
    return NextResponse.json({
      success: true,
      tests: {
        basicConnection: { success: !testError, error: testError?.message },
        allRequests: { count: allRequests?.length || 0, error: allError?.message },
        tableInfo: { success: !tableError, error: tableError?.message }
      },
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
    })
    
  } catch (error) {
    console.error('Test DB: Exception:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
