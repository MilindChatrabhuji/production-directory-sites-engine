// Automated XML Sitemap and RSS 2.0 Feed Generator

import { HealthcareTool } from "./tools_engine";

export class FeedGenerator {
  public static generateSitemapXml(tools: HealthcareTool[], baseUrl: string): string {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    xml += `  <url><loc>${baseUrl}/</loc><priority>1.0</priority></url>\n`;

    for (const tool of tools) {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/tool/${tool.id}</loc>\n`;
      xml += `    <lastmod>${tool.submittedAt.split("T")[0]}</lastmod>\n`;
      xml += `    <priority>${tool.featuredTier === "SPOTLIGHT" ? "0.9" : "0.7"}</priority>\n`;
      xml += `  </url>\n`;
    }

    xml += `</urlset>`;
    return xml;
  }

  public static generateRssFeed(tools: HealthcareTool[], baseUrl: string): string {
    let rss = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    rss += `<rss version="2.0">\n<channel>\n`;
    rss += `  <title>Healthcare AI & Developer Tools Directory</title>\n`;
    rss += `  <link>${baseUrl}</link>\n`;
    rss += `  <description>Latest verified healthcare AI models and developer microservices.</description>\n`;

    for (const tool of tools) {
      rss += `  <item>\n`;
      rss += `    <title><![CDATA[${tool.name} — ${tool.tagline}]]></title>\n`;
      rss += `    <link>${baseUrl}/tool/${tool.id}</link>\n`;
      rss += `    <pubDate>${new Date(tool.submittedAt).toUTCString()}</pubDate>\n`;
      rss += `    <category>${tool.category}</category>\n`;
      rss += `  </item>\n`;
    }

    rss += `</channel>\n</rss>`;
    return rss;
  }
}
