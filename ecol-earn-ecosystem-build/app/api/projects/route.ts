import { NextRequest, NextResponse } from 'next/server';
import * as projectActions from '@/app/actions/projectActions';

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'userId parameter required' }, { status: 400 });
    }
    
    const projects = await projectActions.getProjectsByUserId(userId);
    return NextResponse.json(projects);
  } catch (error) {
    console.error('[v0] API error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, ...projectData } = body;
    
    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }
    
    const result = await projectActions.addProject(userId, projectData);
    return NextResponse.json(result);
  } catch (error) {
    console.error('[v0] API error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
