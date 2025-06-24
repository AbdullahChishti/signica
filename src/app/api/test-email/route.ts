import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      )
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Send test email
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: '🎉 Test Email from TaxForms App',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Test Email</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Email Test Successful!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your TaxForms email setup is working perfectly</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #333; margin-top: 0;">Congratulations! 🚀</h2>
            <p style="font-size: 16px; margin-bottom: 20px;">
              Your email integration is now ready to send W-9 form invitations to vendors.
            </p>
            
            <div style="background: #e8f5e8; padding: 15px; border-radius: 6px; border-left: 4px solid #4caf50;">
              <p style="margin: 0; font-size: 14px; color: #2e7d32;">
                <strong>✅ Setup Complete:</strong> Resend API is connected and working properly.
              </p>
            </div>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; font-size: 14px; color: #666;">
            <p>This is a test email from your TaxForms application.</p>
            <p style="margin-bottom: 0;">
              <strong>Next:</strong> Try creating a W-9 request to test the full workflow!
            </p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      )
    }

    console.log('✅ Test email sent successfully:', data)
    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully!',
      emailId: data?.id 
    })

  } catch (error) {
    console.error('Error sending test email:', error)
    return NextResponse.json(
      { error: 'Failed to send test email' },
      { status: 500 }
    )
  }
}
