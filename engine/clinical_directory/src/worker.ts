// Cloudflare Workers Entry Point for Clinical Directory Engine
import { AutoRouter, IRequest } from "itty-router";
import { SchemaGenerator, ClinicalPracticeListing } from "./schema_generator";
import { DirectorySearchEngine } from "./directory_search";
import { ClinicalVerificationPipeline } from "./verification_pipeline";

const router = AutoRouter();

// Sample Verified Clinical Practices (RFC 2606 compliant sample records)
const SAMPLE_LISTINGS: ClinicalPracticeListing[] = [
  {
    id: "clinic-001",
    name: "Metropolitan Cardiology & Heart Rhythm Center",
    specialty: "Cardiology",
    category: "MedicalClinic",
    telephone: "+1-555-019-2831",
    email: "clinic@example.com",
    address: {
      street: "100 Medical Plaza, Suite 400",
      city: "Metro City",
      region: "CA",
      postalCode: "90001",
      country: "US"
    },
    geo: { latitude: 34.0522, longitude: -118.2437 },
    openingHours: ["08:00 - 17:00"],
    medicalLicenseNumber: "MED-CARDIO-84920",
    isVerified: true,
    telemedicineAvailable: true,
    website: "https://example.com/cardiology"
  },
  {
    id: "lab-002",
    name: "Precision Hematology & Diagnostic Pathology Labs",
    specialty: "Pathology",
    category: "DiagnosticLab",
    telephone: "+1-555-019-5829",
    email: "lab@example.com",
    address: {
      street: "250 Bioscience Blvd",
      city: "Metro City",
      region: "CA",
      postalCode: "90002",
      country: "US"
    },
    geo: { latitude: 34.0580, longitude: -118.2500 },
    openingHours: ["06:30 - 20:00"],
    medicalLicenseNumber: "LAB-CLIA-99201",
    isVerified: true,
    telemedicineAvailable: false,
    website: "https://example.com/pathology"
  },
  {
    id: "ped-003",
    name: "Valley Pediatric & Neonatal Care Center",
    specialty: "Pediatrics",
    category: "MedicalClinic",
    telephone: "+1-555-019-9182",
    email: "pediatrics@example.com",
    address: {
      street: "500 Children Way",
      city: "Valley View",
      region: "CA",
      postalCode: "90003",
      country: "US"
    },
    geo: { latitude: 34.1012, longitude: -118.3000 },
    openingHours: ["08:30 - 18:00"],
    medicalLicenseNumber: "MED-PED-10293",
    isVerified: true,
    telemedicineAvailable: true,
    website: "https://example.com/pediatrics"
  }
];

const searchEngine = new DirectorySearchEngine(SAMPLE_LISTINGS);

router.get("/api/directory", () => {
  return Response.json({ success: true, count: SAMPLE_LISTINGS.length, listings: SAMPLE_LISTINGS });
});

router.get("/api/directory/search", (req: IRequest) => {
  const url = new URL(req.url);
  const specialty = url.searchParams.get("specialty") || undefined;
  const city = url.searchParams.get("city") || undefined;
  const telemedicineOnly = url.searchParams.get("telemedicine") === "true";
  const verifiedOnly = url.searchParams.get("verified") === "true";

  const results = searchEngine.search({ specialty, city, telemedicineOnly, verifiedOnly });
  return Response.json({ success: true, ...results });
});

router.get("/api/schema/:id", (req: IRequest) => {
  const id = req.params.id;
  const listing = SAMPLE_LISTINGS.find(item => item.id === id);
  if (!listing) {
    return Response.json({ success: false, error: "Listing not found" }, { status: 404 });
  }
  const jsonLd = SchemaGenerator.generateJsonLd(listing);
  return Response.json(jsonLd);
});

router.post("/api/directory/verify", async (req: IRequest) => {
  try {
    const body = await req.json();
    const result = ClinicalVerificationPipeline.verify(body as any);
    return Response.json({ success: true, verification: result });
  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 400 });
  }
});

export default {
  fetch: router.fetch
};
