import { NextRequest, NextResponse } from 'next/server';
import * as connectionActions from '@/app/actions/connectionActions';

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'userId parameter required' }, { status: 400 });
    }
    
    const connections = await connectionActions.getConnectionsByUserId(userId);
    return NextResponse.json(connections);
  } catch (error) {
    console.error('[v0] API error:', error);
    return NextResponse.json({ error: 'Failed to fetch connections' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, connectedUserId, status } = body;
    
    if (!userId || !connectedUserId) {
      return NextResponse.json({ error: 'userId and connectedUserId required' }, { status: 400 });
    }
    
    const result = await connectionActions.addConnection(userId, connectedUserId, status);
    return NextResponse.json(result);
  } catch (error) {
    console.error('[v0] API error:', error);
    return NextResponse.json({ error: 'Failed to create connection' }, { status: 500 });
  }
}
