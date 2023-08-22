import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "../../../lib/stripe";
import prisma from "../../../lib/prismadb";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

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

  // Return a response to acknowledge receipt of the event. Upgraded.
  res.json({ received: true });
} else {
  res.setHeader("Allow", "POST");
  res.status(405).end("Method Not Allowed");
}
};

export default (webhookHandler as any);
