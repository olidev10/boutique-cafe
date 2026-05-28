import "dotenv/config";
import Stripe from "stripe";
import { products } from "@/lib/products";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is missing");
}

const stripe = new Stripe(stripeSecretKey);

async function findExistingStripeProduct(localId: string) {
    const result = await stripe.products.search({
      query: `metadata['localId']:'${localId}'`,
      limit: 1,
    });
  
    return result.data[0] ?? null;
  }

async function main() {
  console.log("Syncing products to Stripe...\n");

  for (const product of products) {

    const existingProduct = await findExistingStripeProduct(product.id);

    if (existingProduct) {
        console.log(`Already exists: ${product.name}`);
        continue;
    }

    console.log(`Creating product: ${product.name}`);

    const stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.shortDescription,
      metadata: {
        localId: product.id,
        slug: product.slug,
        category: product.category,
      },
      images: product.image?.startsWith("http") ? [product.image] : undefined,
    });

    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: product.price,
      currency: "eur",
      metadata: {
        localId: product.id,
        slug: product.slug,
      },
    });

    console.log({
      localId: product.id,
      name: product.name,
      stripeProductId: stripeProduct.id,
      stripePriceId: stripePrice.id,
    });

    console.log("");
  }

  console.log("Done.");
}

main().catch((error) => {
  console.error("Stripe sync failed:", error);
  process.exit(1);
});