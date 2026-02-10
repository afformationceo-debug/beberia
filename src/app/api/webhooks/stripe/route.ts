import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Placeholder for Stripe webhook - will be implemented in Phase 8
  const body = await request.text();
  console.log("Stripe webhook received:", body.substring(0, 100));

  return NextResponse.json({ received: true });
}
