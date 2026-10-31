// Schema.org JSON-LD Structured Data Generator for Medical Entities
// Compliant with Google Search Central MedicalBusiness, DiagnosticLab & Physician specifications.

export interface ClinicalPracticeListing {
  id: string;
  name: string;
  specialty: "Cardiology" | "Pediatrics" | "Internal Medicine" | "Pathology" | "Radiology";
  category: "MedicalClinic" | "DiagnosticLab" | "Physician";
  telephone: string;
  email: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  openingHours: string[];
  medicalLicenseNumber: string;
  isVerified: boolean;
  telemedicineAvailable: boolean;
  website: string;
}

export class SchemaGenerator {
  public static generateJsonLd(listing: ClinicalPracticeListing): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": listing.category,
      "@id": `https://directory.example.com/clinic/${listing.id}`,
      "name": listing.name,
      "medicalSpecialty": listing.specialty,
      "telephone": listing.telephone,
      "email": listing.email,
      "url": listing.website,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": listing.address.street,
        "addressLocality": listing.address.city,
        "addressRegion": listing.address.region,
        "postalCode": listing.address.postalCode,
        "addressCountry": listing.address.country
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": listing.geo.latitude,
        "longitude": listing.geo.longitude
      },
      "openingHoursSpecification": listing.openingHours.map(hours => ({
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": hours.split("-")[0].trim(),
        "closes": hours.split("-")[1].trim()
      })),
      "availableService": {
        "@type": "MedicalProcedure",
        "name": `${listing.specialty} Consultation & Diagnostic Evaluation`,
        "procedureType": "NoninvasiveProcedure"
      },
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Medical Registration License",
        "recognizedBy": {
          "@type": "MedicalOrganization",
          "name": "State Medical Council Regulatory Authority"
        }
      }
    };
  }
}
