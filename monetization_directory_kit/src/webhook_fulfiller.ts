// Payment Webhook Fulfillment Engine (Stripe / PayPal / Domestic UPI)

export interface PaymentWebhookPayload {
  paymentId: string;
  provider: "STRIPE" | "PAYPAL" | "UPI";
  listingId: string;
  tierId: "TIER_FEATURED" | "TIER_SPOTLIGHT";
  amount: number;
  currency: "USD" | "INR";
  buyerEmail: string;
  timestamp: number;
}

export interface FulfillmentReceipt {
  success: boolean;
  listingId: string;
  activeUntil: string;
  badge: string;
  invoiceNumber: string;
}

export class WebhookFulfiller {
  public static fulfill(payload: PaymentWebhookPayload): FulfillmentReceipt {
    console.log(`[Webhook] Fulfilling ${payload.tierId} for listing ${payload.listingId} via ${payload.provider}`);

    // Activate for 30 days
    const activeUntilDate = new Date();
    activeUntilDate.setDate(activeUntilDate.getDate() + 30);

    const inv = `INV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    return {
      success: true,
      listingId: payload.listingId,
      activeUntil: activeUntilDate.toISOString().split("T")[0],
      badge: payload.tierId === "TIER_SPOTLIGHT" ? "PARTNER_SPOTLIGHT" : "FEATURED_SPONSOR",
      invoiceNumber: inv
    };
  }
}
