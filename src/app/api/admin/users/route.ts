import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_ADMIN_USERS } from '@/lib/auth';
import { AdminUser } from '@/lib/types';

let adminUsersList: AdminUser[] = [...INITIAL_ADMIN_USERS];

export async function GET() {
  const safeUsers = adminUsersList.map(({ password, ...u }) => u);
  return NextResponse.json({ success: true, data: safeUsers });
}

export async function POST(request: NextRequest) {
  try {
    const newUser: AdminUser = await request.json();

    if (!newUser.username || !newUser.name || !newUser.role) {
      return NextResponse.json(
        { success: false, error: 'Username, Name, and Role Level are required' },
        { status: 400 }
      );
    }

    if (adminUsersList.some((u) => u.username.toLowerCase() === newUser.username.toLowerCase())) {
      return NextResponse.json(
        { success: false, error: 'Username already exists' },
        { status: 409 }
      );
    }

    const created: AdminUser = {
      ...newUser,
      id: `usr-${Date.now()}`,
      created_at: new Date().toISOString().split('T')[0],
      status: newUser.status || 'active',
      avatar: newUser.name.slice(0, 2).toUpperCase(),
    };

    adminUsersList.push(created);

    const { password, ...safeUser } = created;
    return NextResponse.json({ success: true, data: safeUser }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create user' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    const index = adminUsersList.findIndex((u) => u.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    adminUsersList[index] = { ...adminUsersList[index], ...updates };

    const { password, ...safeUser } = adminUsersList[index];
    return NextResponse.json({ success: true, data: safeUser });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    adminUsersList = adminUsersList.filter((u) => u.id !== id);
    return NextResponse.json({ success: true, message: 'User deleted' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete user' },
      { status: 500 }
    );
  }
}
