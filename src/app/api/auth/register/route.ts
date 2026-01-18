import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// In-memory user storage (temporary - use database in production)
interface User {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country?: string;
  role: string;
  emailVerified: boolean;
  createdAt: string;
}

const globalForUsers = globalThis as unknown as {
  users: Map<string, User>;
};

if (!globalForUsers.users) {
  globalForUsers.users = new Map();
}

const users = globalForUsers.users;

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, phone, country } = await request.json();

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (users.has(email)) {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      passwordHash,
      firstName,
      lastName,
      phone: phone || undefined,
      country: country || undefined,
      role: 'CUSTOMER',
      emailVerified: true,
      createdAt: new Date().toISOString(),
    };

    users.set(email, user);

    console.log(`[Register] New user created: ${email}`);

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
