import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe/stripe";

export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: "price_1QPmkmRs7Bcn7mLseqXBN6K1",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });
    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    const error = err as { message?: string; statusCode?: number };
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: error.statusCode || 500 }
    );
  }
}
