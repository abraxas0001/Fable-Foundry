// API route for fetching individual story by slug
import { NextRequest, NextResponse } from 'next/server';
import { getStoryBySlug, getPreviewStoryBySlug } from '@/lib/sanity/api';

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
        { error: 'Story slug is required' },
        { status: 400 }
      );
    }

    let story;
    
    if (preview && token) {
      // Fetch preview version with token
      story = await getPreviewStoryBySlug(slug, token);
    } else {
      // Fetch published version
      story = await getStoryBySlug(slug);
    }

    if (!story) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: story,
      preview: preview && !!token,
    });

  } catch (error) {
    console.error('Error fetching story:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}