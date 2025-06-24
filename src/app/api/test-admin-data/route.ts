import { NextResponse } from 'next/server'
import { getW9Requests, getW9RequestStats } from '@/lib/database'

export async function GET() {
  try {
    // Use the same user ID from the debug page
    const userId = '2b240720-7525-4daa-b3ab-4fa9d71e8cbc'
    
    console.log('Test Admin Data: Starting test for user:', userId)
    
    console.log('Test Admin Data: Testing getW9Requests...')
    const requests = await getW9Requests(userId)
    console.log('Test Admin Data: Got requests:', requests.length)
    
    console.log('Test Admin Data: Testing getW9RequestStats...')
    const stats = await getW9RequestStats(userId)
    console.log('Test Admin Data: Got stats:', stats)
    
    return NextResponse.json({
      success: true,
      data: {
        requests: requests.length,
        stats,
        requestSample: requests.slice(0, 2) // First 2 requests for debugging
      }
    })
    
  } catch (error) {
    console.error('Test Admin Data: Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
