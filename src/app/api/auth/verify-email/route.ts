import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendVerificationEmail } from '@/lib/email';

// Store verification codes temporarily (in production, use Redis or database)
const verificationCodes = new Map<string, { code: string; expires: Date }>();

// POST - Send verification code
export async function POST(request: NextRequest) {
  try {
    const { email, action } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if email is already registered
    if (action === 'send') {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'This email is already registered' },
          { status: 400 }
        );
      }

      // Generate 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Store the code
      verificationCodes.set(email, { code, expires });

      // Check if SMTP is configured
      const smtpConfigured = process.env.SMTP_USER && process.env.SMTP_PASS;

      if (smtpConfigured) {
        // Send verification email
        const sent = await sendVerificationEmail(email, code);
        if (!sent) {
          console.log(`Email failed, verification code for ${email}: ${code}`);
        }
      } else {
        // SMTP not configured - log the code
        console.log(`[DEV MODE] Verification code for ${email}: ${code}`);
      }

      return NextResponse.json({
        success: true,
        message: smtpConfigured ? 'Verification code sent to your email' : 'Verification code generated',
        // Return code if SMTP is not configured (development mode)
        ...(!smtpConfigured && { devCode: code }),
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Failed to send verification code' },
      { status: 500 }
    );
  }
}

// PUT - Verify code
export async function PUT(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and code are required' },
        { status: 400 }
      );
    }

    const stored = verificationCodes.get(email);

    if (!stored) {
      return NextResponse.json(
        { error: 'No verification code found. Please request a new one.' },
        { status: 400 }
      );
    }

    if (new Date() > stored.expires) {
      verificationCodes.delete(email);
      return NextResponse.json(
        { error: 'Verification code has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    if (stored.code !== code) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // Code is valid - remove it
    verificationCodes.delete(email);

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (error) {
    console.error('Code verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify code' },
      { status: 500 }
    );
  }
}
