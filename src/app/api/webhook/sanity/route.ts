// Webhook handler for Sanity content updates
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { handleWebhook } from '@/lib/sanity/api';
import { handleContentUpdate, validateDataConsistency } from '@/lib/utils/sync';

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature (optional but recommended)
    const signature = request.headers.get('sanity-webhook-signature');
    const webhookSecret = process.env.SANITY_WEBHOOK_SECRET;

    if (webhookSecret && signature) {
      // Implement signature verification here if needed
      // This is a security measure to ensure the webhook is from Sanity
    }

    const body = await request.json();
    
    // Handle content update and validation
    const { _type, _id } = body;
    await handleContentUpdate(_type, _id);
    
    // Handle the webhook and get paths to revalidate
    const pathsToRevalidate = handleWebhook(body);

    // Revalidate the affected paths
    for (const path of pathsToRevalidate) {
      try {
        revalidatePath(path);
        console.log(`Revalidated path: ${path}`);
      } catch (error) {
        console.error(`Failed to revalidate path ${path}:`, error);
      }
    }

    // Also revalidate the homepage and main sections
    try {
      revalidatePath('/');
      revalidatePath('/library');
      revalidatePath('/narrators');
    } catch (error) {
      console.error('Failed to revalidate main paths:', error);
    }

    return NextResponse.json({
      success: true,
      revalidated: pathsToRevalidate,
      message: `Revalidated ${pathsToRevalidate.length} paths`,
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Handle GET requests (for webhook verification)
export async function GET() {
  return NextResponse.json({
    message: 'FableFoundry Sanity webhook endpoint',
    timestamp: new Date().toISOString(),
  });
}