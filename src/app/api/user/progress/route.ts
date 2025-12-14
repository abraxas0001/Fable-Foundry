// API route for reading progress management
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const storyId = searchParams.get('storyId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    let query = supabase
      .from('reading_progress')
      .select('*')
      .eq('user_id', userId);

    if (storyId) {
      query = query.eq('story_id', storyId);
    }

    const { data, error } = await query.order('updated_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (error) {
    console.error('Error fetching reading progress:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, storyId, progressPercentage, lastPosition } = body;

    if (!userId || !storyId || progressPercentage === undefined) {
      return NextResponse.json(
        { error: 'User ID, Story ID, and progress percentage are required' },
        { status: 400 }
      );
    }

    // Upsert reading progress
    const { data, error } = await supabase
      .from('reading_progress')
      .upsert({
        user_id: userId,
        story_id: storyId,
        progress_percentage: progressPercentage,
        last_position: lastPosition || 0,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,story_id'
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (error) {
    console.error('Error updating reading progress:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}