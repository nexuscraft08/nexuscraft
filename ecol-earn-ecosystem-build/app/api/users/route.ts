import { NextRequest, NextResponse } from 'next/server';
import * as userActions from '@/app/actions/userActions';

export async function GET(request: NextRequest) {
  try {
    const users = await userActions.getAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error('[v0] API error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
