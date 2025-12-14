// API endpoint for manual content synchronization
import { NextResponse } from 'next/server';
import { syncContentFromCMS } from '@/lib/utils/sync';

export async function POST() {
  try {
    const result = await syncContentFromCMS();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Successfully synchronized ${result.updated} items`,
        updated: result.updated,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Synchronization completed with errors',
        updated: result.updated,
        errors: result.errors,
      }, { status: 207 }); // 207 Multi-Status
    }
  } catch (error) {
    console.error('Sync API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Synchronization failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Content synchronization endpoint',
    usage: 'POST to trigger sync',
  });
}