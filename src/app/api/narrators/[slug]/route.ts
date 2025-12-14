// API route for fetching individual narrator by slug
import { NextRequest, NextResponse } from 'next/server';
import { getNarratorBySlug, getPreviewNarratorBySlug } from '@/lib/sanity/api';

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const preview = searchParams.get('preview') === 'true';
    const token = searchParams.get('token');

    if (!slug) {
      return NextResponse.json(
        { error: 'Narrator slug is required' },
        { status: 400 }
      );
    }

    let narrator;
    
    if (preview && token) {
      // Fetch preview version with token
      narrator = await getPreviewNarratorBySlug(slug, token);
    } else {
      // Fetch published version
      narrator = await getNarratorBySlug(slug);
    }

    if (!narrator) {
      return NextResponse.json(
        { error: 'Narrator not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: narrator,
      preview: preview && !!token,
    });

  } catch (error) {
    console.error('Error fetching narrator:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}