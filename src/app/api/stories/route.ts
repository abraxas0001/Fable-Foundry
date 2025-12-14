// API route for fetching stories
import { NextRequest, NextResponse } from 'next/server';
import { getAllStories, searchStories, getStoriesByGenre } from '@/lib/sanity/api';
import { filterStories, sortStories, paginateData } from '@/lib/utils/data';
import { validateData, storyFiltersSchema, paginationSchema } from '@/lib/validation/schemas';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const search = searchParams.get('search');
    const genre = searchParams.get('genre');
    const narrator = searchParams.getAll('narrator');
    const difficulty = searchParams.getAll('difficulty');
    const sortBy = (searchParams.get('sortBy') as 'newest' | 'oldest' | 'popular' | 'rating' | 'duration') || 'newest';
    const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';
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

    // Fetch stories from Sanity
    let stories;
    if (search) {
      stories = await searchStories(search);
    } else if (genre) {
      stories = await getStoriesByGenre(genre);
    } else {
      stories = await getAllStories();
    }

    // Apply additional filters
    const filters = {
      search: search || undefined,
      genre: genre ? [genre] : undefined,
      narrator: narrator.length > 0 ? narrator : undefined,
      difficulty: difficulty.length > 0 ? difficulty as ('beginner' | 'intermediate' | 'advanced')[] : undefined,
      sortBy,
      sortOrder,
    };

    // Validate filters
    const filtersValidation = validateData(storyFiltersSchema, filters);
    if (!filtersValidation.success) {
      return NextResponse.json(
        { error: 'Invalid filter parameters', details: filtersValidation.errors },
        { status: 400 }
      );
    }

    // Filter and sort stories
    const filteredStories = filterStories(stories, filters);
    const sortedStories = sortStories(filteredStories, sortBy, sortOrder);

    // Paginate results
    const paginatedResult = paginateData(sortedStories, page, limit);

    return NextResponse.json({
      success: true,
      data: paginatedResult.data,
      pagination: paginatedResult.pagination,
      filters: {
        applied: filters,
        totalResults: sortedStories.length,
      },
    });

  } catch (error) {
    console.error('Error in stories API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle POST requests for advanced filtering
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const filtersValidation = validateData(storyFiltersSchema, body.filters || {});
    const paginationValidation = validateData(paginationSchema, body.pagination || {});

    if (!filtersValidation.success) {
      return NextResponse.json(
        { error: 'Invalid filter parameters', details: filtersValidation.errors },
        { status: 400 }
      );
    }

    if (!paginationValidation.success) {
      return NextResponse.json(
        { error: 'Invalid pagination parameters', details: paginationValidation.errors },
        { status: 400 }
      );
    }

    const filters = filtersValidation.data;
    const { page, limit } = paginationValidation.data;

    // Fetch stories from Sanity
    let stories;
    if (filters.search) {
      stories = await searchStories(filters.search);
    } else {
      stories = await getAllStories();
    }

    // Apply filters and sorting
    const filteredStories = filterStories(stories, filters);
    const sortedStories = sortStories(
      filteredStories, 
      filters.sortBy || 'newest', 
      filters.sortOrder || 'desc'
    );

    // Paginate results
    const paginatedResult = paginateData(sortedStories, page, limit);

    return NextResponse.json({
      success: true,
      data: paginatedResult.data,
      pagination: paginatedResult.pagination,
      filters: {
        applied: filters,
        totalResults: sortedStories.length,
      },
    });

  } catch (error) {
    console.error('Error in stories POST API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}