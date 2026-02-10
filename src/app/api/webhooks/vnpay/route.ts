import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Placeholder for VNPay webhook - will be implemented in Phase 8
  const body = await request.text();
  console.log("VNPay webhook received:", body.substring(0, 100));

  return NextResponse.json({ received: true });
}
