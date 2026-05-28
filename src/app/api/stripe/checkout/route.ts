import { NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "@/lib/products";

type CheckoutItem = {
  productId: string;
  quantity: number;
};

type CheckoutRequestBody = {
  items?: CheckoutItem[];
};

const shipping = 490;

export async function POST(request: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (!secretKey) {
      throw new Error("STRIPE_SECRET_KEY est manquant.");
    }

    if (!siteUrl) {
      throw new Error("NEXT_PUBLIC_SITE_URL est manquant.");
    }

    const stripe = new Stripe(secretKey);
    const body = (await request.json()) as CheckoutRequestBody;
    const items = body.items;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Le panier est vide." }, { status: 400 });
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        throw new Error(`Produit introuvable: ${item.productId}`);
      }

      if (!product.stripePriceId) {
        throw new Error(`Price ID Stripe manquant pour: ${product.name}`);
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity < 1 || quantity > product.stock) {
        throw new Error(`Quantite invalide pour: ${product.name}`);
      }

      return {
        price: product.stripePriceId,
        quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/panier`,
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "CH", "LU", "MC"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: shipping,
              currency: "eur",
            },
            display_name: "Livraison standard",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 2,
              },
              maximum: {
                unit: "business_day",
                value: 5,
              },
            },
          },
        },
      ],
      metadata: {
        source: "kawa-maison",
        item_count: String(items.reduce((total, item) => total + item.quantity, 0)),
        product_ids: items.map((item) => item.productId).join(","),
      },
    });

    if (!session.url) {
      throw new Error("Stripe n'a pas renvoye d'URL de checkout.");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[CHECKOUT_ERROR]", error);

    return NextResponse.json(
      { error: "Impossible de créer la session de paiement." },
      { status: 500 }
    );
  }
}
