import { NextRequest, NextResponse } from 'next/server';
import * as skillActions from '@/app/actions/skillActions';

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'userId parameter required' }, { status: 400 });
    }
    
    const skills = await skillActions.getSkillsByUserId(userId);
    return NextResponse.json(skills);
  } catch (error) {
    console.error('[v0] API error:', error);
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, ...skillData } = body;
    
    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }
    
    const result = await skillActions.addSkill(userId, skillData);
    return NextResponse.json(result);
  } catch (error) {
    console.error('[v0] API error:', error);
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
  }
}
