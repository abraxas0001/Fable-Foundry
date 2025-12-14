// API route for fetching narrators
import { NextRequest, NextResponse } from 'next/server';
import { getAllNarrators, getNarratorsSimple } from '@/lib/sanity/api';
import { paginateData } from '@/lib/utils/data';
import { validateData, paginationSchema } from '@/lib/validation/schemas';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const simple = searchParams.get('simple') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // Validate pagination
    const paginationValidation = validateData(paginationSchema, { page, limit });
    if (!paginationValidation.success) {
      return NextResponse.json(
        { error: 'Invalid pagination parameters', details: paginationValidation.errors },
        { status: 400 }
      );
    }

    // Fetch narrators from Sanity
    const narrators = simple ? await getNarratorsSimple() : await getAllNarrators();

    // Paginate results if not simple
    if (simple) {
      return NextResponse.json({
        success: true,
        data: narrators,
      });
    }

    const paginatedResult = paginateData(narrators, page, limit);

    return NextResponse.json({
      success: true,
      data: paginatedResult.data,
      pagination: paginatedResult.pagination,
    });

  } catch (error) {
    console.error('Error in narrators API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}