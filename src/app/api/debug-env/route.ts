import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Check environment variables (without exposing sensitive values)
    const envCheck = {
      RESEND_API_KEY: process.env.RESEND_API_KEY ? 'SET' : 'NOT SET',
      FROM_EMAIL: process.env.FROM_EMAIL || 'NOT SET',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT SET',
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET',
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL ? 'YES' : 'NO',
      VERCEL_ENV: process.env.VERCEL_ENV || 'NOT SET'
    }

    return NextResponse.json({
      success: true,
      environment: envCheck,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error checking environment:', error)
    return NextResponse.json(
      { error: 'Failed to check environment' },
      { status: 500 }
    )
  }
}
