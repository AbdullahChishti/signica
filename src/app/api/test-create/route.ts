import { NextResponse } from 'next/server'
import { createW9Request } from '@/lib/database'

export async function POST() {
  try {
    console.log('Test Create: Attempting to create test W9 request')
    
    // Create a test request with a dummy user ID
    const testRequest = await createW9Request(
      'Test Vendor',
      'test@example.com',
      '00000000-0000-0000-0000-000000000000' // Dummy UUID
    )
    
    console.log('Test Create: Successfully created request:', testRequest)
    
    return NextResponse.json({
      success: true,
      request: testRequest
    })
    
  } catch (error) {
    console.error('Test Create: Failed to create request:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
