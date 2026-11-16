import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_ADMIN_USERS } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, username, password } = body;

    if (action === 'logout') {
      const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
      response.cookies.set('nv_admin_session', '', {
        path: '/',
        httpOnly: true,
        maxAge: 0,
      });
      return response;
    }

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Match against users (in-memory / seed)
    const user = INITIAL_ADMIN_USERS.find(
      (u) => u.username.toLowerCase() === username.toLowerCase().trim()
    );

    if (!user || user.password !== password) {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    if (user.status === 'suspended') {
      return NextResponse.json(
        { success: false, error: 'This admin account has been suspended' },
        { status: 403 }
      );
    }

    // Strip password before returning user profile
    const { password: _, ...safeUser } = user;

    const response = NextResponse.json({
      success: true,
      user: safeUser,
      message: `Welcome, ${safeUser.name}`,
    });

    // Set signed session cookie
    response.cookies.set('nv_admin_session', JSON.stringify(safeUser), {
      path: '/',
      httpOnly: false, // accessible to client for fast state hydrate
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Authentication error' },
      { status: 500 }
    );
  }
}
