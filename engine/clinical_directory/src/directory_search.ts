// Directory Search & Filtering Engine
import { ClinicalPracticeListing } from "./schema_generator";

export interface SearchQuery {
  specialty?: string;
  city?: string;
  telemedicineOnly?: boolean;
  verifiedOnly?: boolean;
  page?: number;
  limit?: number;
}

export interface SearchResult {
  total: number;
  page: number;
  totalPages: number;
  listings: ClinicalPracticeListing[];
}

export class DirectorySearchEngine {
  private listings: ClinicalPracticeListing[] = [];

  constructor(initialData: ClinicalPracticeListing[]) {
    this.listings = initialData;
  }

  public search(query: SearchQuery): SearchResult {
    const page = Math.max(1, query.page || 1);
    const limit = Math.min(50, Math.max(1, query.limit || 10));

    let filtered = this.listings.filter(item => {
      if (query.specialty && item.specialty.toLowerCase() !== query.specialty.toLowerCase()) {
        return false;
      }
      if (query.city && item.address.city.toLowerCase() !== query.city.toLowerCase()) {
        return false;
      }
      if (query.telemedicineOnly && !item.telemedicineAvailable) {
        return false;
      }
      if (query.verifiedOnly && !item.isVerified) {
        return false;
      }
      return true;
    });

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return {
      total,
      page,
      totalPages,
      listings: paginated
    };
  }
}
