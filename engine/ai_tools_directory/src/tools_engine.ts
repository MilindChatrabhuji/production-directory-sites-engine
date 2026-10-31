// Developer & AI Healthcare Tools Directory Models & Comparison Engine

export interface HealthcareTool {
  id: string;
  name: string;
  tagline: string;
  category: "Clinical NLP" | "Radiology Vision" | "Pathology AI" | "EHR Automation" | "Genomics";
  url: string;
  upvotes: number;
  submittedAt: string;
  featuredTier: "FREE" | "FEATURED" | "SPOTLIGHT";
  pricingModel: "Free" | "Freemium" | "Commercial API";
  techStack: string[];
}

export class ToolsDirectoryEngine {
  private tools: HealthcareTool[] = [];

  constructor(initialTools: HealthcareTool[]) {
    this.tools = initialTools;
  }

  public getTools(): HealthcareTool[] {
    return this.tools;
  }

  public compareTools(idA: string, idB: string): Record<string, any> | null {
    const a = this.tools.find(t => t.id === idA);
    const b = this.tools.find(t => t.id === idB);
    if (!a || !b) return null;

    return {
      title: `${a.name} vs ${b.name} — Technical Healthcare AI Comparison`,
      toolA: a,
      toolB: b,
      comparison: {
        categoryMatch: a.category === b.category,
        pricingComparison: { a: a.pricingModel, b: b.pricingModel },
        sharedTech: a.techStack.filter(t => b.techStack.includes(t))
      }
    };
  }
}
