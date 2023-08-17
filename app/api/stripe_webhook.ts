// file path: app/api/stripe/webhook/route.ts
// @ts-nocheck

import { NextResponse } from "next/server";
import prisma from "../../lib/prismadb";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("Stripe-Signature");
  if (!sig) {
    console.log("No signature");
    return NextResponse.json({ error: "No signature" });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
    typescript: true,
  });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.log(`Webhook signature verification failed.`, err.message);
    return NextResponse.json({ error: err });
  }
}

// Successfully constructed event.
console.log("✅ Success:", event.type);

// Cast event data to Stripe object.
if (
  event.type === "payment_intent.succeeded" ||
  event.type === "checkout.session.completed"
) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  console.log(`💰 PaymentIntent: ${JSON.stringify(paymentIntent)}`);

  // @ts-ignore
  const userEmail = paymentIntent.customer_details.email;

  let creditAmount = 0;

  // @ts-ignore
  switch (paymentIntent.amount_subtotal) {
    case 100:
      creditAmount = 20;
      break;
    case 1900:
    case 3000:
      creditAmount = 100;
      break;
    case 3500:
    case 5000:
      creditAmount = 250;
      break;
    case 7000:
    case 10000:
      creditAmount = 750;
      break;
  }
  await prisma.user.update({
    where: {
      email: userEmail,
    },
    data: {
      credits: {
        increment: creditAmount,
      },
    },
  });

  await prisma.purchase.create({
    data: {
      creditAmount: creditAmount,
      user: {
        connect: {
          email: userEmail,
        },
      },
    },
  });
} else if (event.type === "payment_intent.payment_failed") {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  console.log(
    `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
  );
} else if (event.type === "charge.succeeded") {
  const charge = event.data.object as Stripe.Charge;
  console.log(`💵 Charge id: ${charge.id}`);
} else {
  console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
}

// Return a response to acknowledge receipt of the event

return NextResponse.json({ received: true });
