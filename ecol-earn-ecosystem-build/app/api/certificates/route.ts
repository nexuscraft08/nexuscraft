import { NextRequest, NextResponse } from 'next/server';
import * as certificateActions from '@/app/actions/certificateActions';

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'userId parameter required' }, { status: 400 });
    }
    
    const certificates = await certificateActions.getCertificatesByUserId(userId);
    return NextResponse.json(certificates);
  } catch (error) {
    console.error('[v0] API error:', error);
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, ...certificateData } = body;
    
    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }
    
    const result = await certificateActions.addCertificate(userId, certificateData);
    return NextResponse.json(result);
  } catch (error) {
    console.error('[v0] API error:', error);
    return NextResponse.json({ error: 'Failed to create certificate' }, { status: 500 });
  }
}
