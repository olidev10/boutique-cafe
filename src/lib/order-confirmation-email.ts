import type Stripe from "stripe";
import { formatPrice } from "@/lib/format-price";

type OrderEmailLineItem = {
  description: string | null;
  quantity: number | null;
  amount_total: number | null;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatLineItem(lineItem: OrderEmailLineItem) {
  const name = lineItem.description ?? "Produit";
  const quantity = lineItem.quantity ?? 1;
  const amount = lineItem.amount_total ?? 0;

  return { name, quantity, amount };
}

function buildOrderEmailHtml({
  session,
  lineItems,
}: {
  session: Stripe.Checkout.Session;
  lineItems: OrderEmailLineItem[];
}) {
  const rows = lineItems.map(formatLineItem);
  const total = session.amount_total ?? rows.reduce((sum, item) => sum + item.amount, 0);
  const customerName = session.customer_details?.name;

  return `
    <div style="font-family: Arial, sans-serif; color: #211713; background: #f7f0e6; padding: 24px;">
      <div style="max-width: 640px; margin: 0 auto; background: #fffdf8; border: 1px solid #e6d9c8; border-radius: 8px; overflow: hidden;">
        <div style="padding: 28px 28px 18px;">
          <p style="margin: 0 0 10px; color: #c59a4b; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">Kawa Maison</p>
          <h1 style="margin: 0; font-size: 28px; line-height: 1.2;">Commande confirmee</h1>
          <p style="margin: 16px 0 0; color: #75675d; line-height: 1.6;">
            ${customerName ? `Bonjour ${escapeHtml(customerName)},` : "Bonjour,"} merci pour votre achat. Voici le recapitulatif de votre commande.
          </p>
        </div>
        <div style="padding: 0 28px 28px;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th align="left" style="border-bottom: 1px solid #e6d9c8; padding: 12px 0; color: #75675d; font-size: 13px;">Produit</th>
                <th align="center" style="border-bottom: 1px solid #e6d9c8; padding: 12px 0; color: #75675d; font-size: 13px;">Qté</th>
                <th align="right" style="border-bottom: 1px solid #e6d9c8; padding: 12px 0; color: #75675d; font-size: 13px;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${rows
                .map(
                  (item) => `
                    <tr>
                      <td style="border-bottom: 1px solid #e6d9c8; padding: 14px 0; font-weight: 700;">${escapeHtml(item.name)}</td>
                      <td align="center" style="border-bottom: 1px solid #e6d9c8; padding: 14px 0;">${item.quantity}</td>
                      <td align="right" style="border-bottom: 1px solid #e6d9c8; padding: 14px 0; font-weight: 700;">${formatPrice(item.amount)}</td>
                    </tr>
                  `,
                )
                .join("")}
            </tbody>
          </table>
          <div style="margin-top: 18px; text-align: right;">
            <p style="margin: 0; color: #75675d;">Total payé</p>
            <p style="margin: 4px 0 0; font-size: 24px; font-weight: 700;">${formatPrice(total)}</p>
          </div>
          <p style="margin: 24px 0 0; color: #75675d; line-height: 1.6;">
            Nous préparons votre commande et vous tiendrons informé de son expédition sous 48h.
          </p>
        </div>
      </div>
    </div>
  `;
}

function buildOrderEmailText({
  session,
  lineItems,
}: {
  session: Stripe.Checkout.Session;
  lineItems: OrderEmailLineItem[];
}) {
  const rows = lineItems.map(formatLineItem);
  const total = session.amount_total ?? rows.reduce((sum, item) => sum + item.amount, 0);

  return [
    "Commande confirmée - Kawa Maison",
    "",
    "Merci pour votre achat. Voici le recapitulatif de votre commande :",
    "",
    ...rows.map((item) => `- ${item.name} x ${item.quantity} : ${formatPrice(item.amount)}`),
    "",
    `Total paye : ${formatPrice(total)}`,
    "",
    "Nous préparons votre commande et vous tiendrons informé de son expédition.",
  ].join("\n");
}

export async function sendOrderConfirmationEmail({
  session,
  lineItems,
}: {
  session: Stripe.Checkout.Session;
  lineItems: OrderEmailLineItem[];
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const replyTo = process.env.RESEND_REPLY_TO_EMAIL;
  const to = session.customer_details?.email ?? session.customer_email;

  if (!to) {
    throw new Error("Email client introuvable sur la session Stripe.");
  }

  if (!apiKey) {
    throw new Error("RESEND_API_KEY est manquant.");
  }

  if (!from) {
    throw new Error("RESEND_FROM_EMAIL est manquant.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `order-confirmation-${session.id}`,
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: replyTo,
      subject: "Votre commande Kawa Maison est confirmée",
      html: buildOrderEmailHtml({ session, lineItems }),
      text: buildOrderEmailText({ session, lineItems }),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Resend a refuse l'envoi: ${errorBody}`);
  }
}
