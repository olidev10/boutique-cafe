import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendOrderConfirmationEmail } from "@/lib/order-confirmation-email";

export const runtime = "nodejs";

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY est manquant.");
  }

  return new Stripe(secretKey);
}

async function sendConfirmationForSession(
  stripe: Stripe,
  session: Stripe.Checkout.Session,
) {
  if (!session.id) {
    throw new Error("Session Stripe introuvable.");
  }

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
  });

  await sendOrderConfirmationEmail({
    session,
    lineItems: lineItems.data.map((lineItem) => ({
      description: lineItem.description,
      quantity: lineItem.quantity,
      amount_total: lineItem.amount_total,
    })),
  });
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET est manquant." },
      { status: 500 },
    );
  }

  const stripe = getStripe();
  const payload = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Signature Stripe manquante." }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Signature Stripe invalide.";

    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      if (session.payment_status === "paid") {
        await sendConfirmationForSession(stripe, session);
      }
    }

    if (event.type === "checkout.session.async_payment_succeeded") {
      await sendConfirmationForSession(stripe, event.data.object);
    }
  } catch (error) {
    console.log("[STRIPE_WEBHOOK_EMAIL_ERROR]", error);

    return NextResponse.json(
      { error: "Impossible d'envoyer l'email de confirmation." },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}
