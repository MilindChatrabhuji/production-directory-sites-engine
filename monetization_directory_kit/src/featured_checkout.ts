// Directory Monetization & Featured Listing Checkout Tiers

export interface DirectoryTier {
  id: "TIER_FREE" | "TIER_FEATURED" | "TIER_SPOTLIGHT";
  name: string;
  priceUsd: number;
  priceInr: number;
  billingPeriod: "one_time" | "monthly";
  benefits: string[];
}

export const DIRECTORY_TIERS: Record<string, DirectoryTier> = {
  TIER_FREE: {
    id: "TIER_FREE",
    name: "Verified Standard Listing",
    priceUsd: 0,
    priceInr: 0,
    billingPeriod: "one_time",
    benefits: [
      "Standard directory placement",
      "Verified accreditation badge",
      "Schema.org JSON-LD generation"
    ]
  },
  TIER_FEATURED: {
    id: "TIER_FEATURED",
    name: "Featured Sponsor Placement",
    priceUsd: 9.0,
    priceInr: 750,
    billingPeriod: "monthly",
    benefits: [
      "Top-of-category highlighted placement",
      "Golden 'Featured Partner' badge",
      "Direct phone & telemedicine link",
      "3x search exposure boost"
    ]
  },
  TIER_SPOTLIGHT: {
    id: "TIER_SPOTLIGHT",
    name: "Partner Spotlight Hero",
    priceUsd: 19.0,
    priceInr: 1599,
    billingPeriod: "monthly",
    benefits: [
      "Homepage hero banner spotlight",
      "Dofollow canonical backlink",
      "Monthly performance & lead report",
      "Inclusion in weekly subscriber digest"
    ]
  }
};
