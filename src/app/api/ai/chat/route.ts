import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma/client";

const SYSTEM_PROMPT = `You are Beberia's AI medical consultation assistant. You help Vietnamese customers who are interested in Korean medical tourism.

Key responsibilities:
- Help users find suitable Korean hospitals and medical procedures
- Provide general information about plastic surgery, ophthalmology, dentistry, dermatology, and oriental medicine in Korea
- Explain procedures, recovery times, and what to expect
- Recommend Beberia's support services (airport pickup, translation, accommodation, post-care)
- Emphasize Beberia member benefits and discounts

Guidelines:
- Be friendly, professional, and empathetic
- Respond in the same language as the user (Vietnamese, Korean, or English)
- Never provide specific medical advice or diagnoses
- Always recommend consulting with actual doctors for medical decisions
- When recommending hospitals, mention that users can browse the hospital listings on Beberia
- Keep responses concise and mobile-friendly (users are on phones)

Available hospital categories: Plastic Surgery, Ophthalmology, Dentistry, Dermatology, Oriental Medicine
Available services: Airport Pickup, Translation/Interpreter, Accommodation, Post-Surgery Care
Beberia members get exclusive discounts at partner hospitals.`;

async function getHospitalContext(): Promise<string> {
  try {
    const hospitals = await prisma.hospital.findMany({
      where: { isActive: true },
      select: {
        nameEn: true,
        nameVi: true,
        categories: true,
        ratingAvg: true,
        reviewCount: true,
        beberiaPartner: true,
        languagesSupported: true,
      },
      take: 10,
    });

    if (hospitals.length === 0) return "";

    const context = hospitals
      .map(
        (h) =>
          `- ${h.nameEn} (${h.nameVi}): ${h.categories.join(", ")}, Rating: ${h.ratingAvg}/5 (${h.reviewCount} reviews)${h.beberiaPartner ? " [Beberia Partner]" : ""}, Languages: ${h.languagesSupported.join(", ")}`
      )
      .join("\n");

    return `\n\nAvailable hospitals on Beberia:\n${context}`;
  } catch {
    return "";
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Fallback when no API key
      const lastMsg = messages?.[messages.length - 1]?.content || "";
      return Response.json({
        role: "assistant",
        content: getFallbackResponse(lastMsg),
      });
    }

    const hospitalContext = await getHospitalContext();

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT + hospitalContext,
      messages,
      maxOutputTokens: 500,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("AI chat error:", error);
    return Response.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("mũi") || lower.includes("nose") || lower.includes("코")) {
    return "Rhinoplasty (nose surgery) is one of the most popular procedures in Korea! Korean surgeons are world-renowned for natural-looking results. Browse our hospital listings to find the best clinic for you. Beberia members get exclusive discounts! 🏥";
  }
  if (lower.includes("mắt") || lower.includes("eye") || lower.includes("눈") || lower.includes("lasik")) {
    return "Korea offers excellent eye surgery options including LASIK, double eyelid surgery, and more. Our partner hospitals have top ophthalmologists. Check our hospital listings for ratings and reviews! 👁️";
  }
  if (lower.includes("răng") || lower.includes("dent") || lower.includes("치과") || lower.includes("tooth")) {
    return "Korean dental clinics offer high-quality treatments at competitive prices, from implants to veneers. Browse our dental hospitals and compare prices with Beberia member discounts! 🦷";
  }
  if (lower.includes("giá") || lower.includes("price") || lower.includes("가격") || lower.includes("cost")) {
    return "Prices vary by hospital and procedure. Beberia members get up to 30% off at partner hospitals! You can compare prices on our hospital listing page. Would you like to know about a specific procedure? 💰";
  }

  return "Thank you for your interest in Korean medical tourism! I can help you find the right hospital and procedure. You can:\n\n• Browse hospitals by category\n• Compare prices and reviews\n• Learn about our support services (pickup, translation, accommodation)\n• Join Beberia for exclusive member discounts\n\nWhat would you like to know more about? 😊";
}
