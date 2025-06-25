import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// Initialize Supabase with service role key for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    const { requestId, vendorName, vendorEmail } = await request.json()

    if (!requestId || !vendorName || !vendorEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate the direct form link
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.headers.get('origin') || 'https://your-domain.vercel.app'
    const formLink = `${baseUrl}/form/${requestId}?direct=true`

    // Initialize Resend
    if (!process.env.RESEND_API_KEY) {
      console.log('📧 W-9 Email would be sent to:', {
        to: vendorEmail,
        subject: `W-9 Form Request - ${vendorName}`,
        formLink,
        message: 'Email service not configured. Set RESEND_API_KEY environment variable.'
      })

      return NextResponse.json({ 
        success: true, 
        message: 'Email logged (configure RESEND_API_KEY for actual sending)',
        formLink 
      })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>W-9 Form Request</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">W-9 Form Request</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Secure Tax Information Collection</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
          <h2 style="color: #333; margin-top: 0;">Hello ${vendorName},</h2>
          <p style="font-size: 16px; margin-bottom: 20px;">
            We need to collect your W-9 tax information for our records. Please complete the secure form using the link below.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${formLink}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      font-weight: bold; 
                      font-size: 16px; 
                      display: inline-block;
                      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
              Complete W-9 Form
            </a>
          </div>
          
          <div style="background: #e3f2fd; padding: 15px; border-radius: 6px; border-left: 4px solid #2196f3;">
            <p style="margin: 0; font-size: 14px; color: #1565c0;">
              <strong>🔒 Secure & Private:</strong> Your information is encrypted and protected. This link expires in 30 days.
            </p>
          </div>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 20px; font-size: 14px; color: #666;">
          <p>If you have any questions, please contact us.</p>
          <p style="margin-bottom: 0;">
            <strong>Direct link:</strong> <a href="${formLink}" style="color: #667eea;">${formLink}</a>
          </p>
        </div>
      </body>
      </html>
    `

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'delivered@resend.dev',
      to: vendorEmail,
      subject: `W-9 Form Request - ${vendorName}`,
      html: emailHtml,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      )
    }

    console.log('✅ W-9 Email sent successfully:', data)
    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      emailId: data?.id,
      formLink 
    })

  } catch (error) {
    console.error('Error sending W-9 email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
