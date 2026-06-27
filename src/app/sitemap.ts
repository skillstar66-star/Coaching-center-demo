import { MetadataRoute } from "next"
import { getBranches, getBlogs } from "@/lib/data-service"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://skillstar.com"

  // Core static landing pages
  const staticPages = ["", "/courses", "/scholarships", "/blog", "/contact"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: path === "" ? 1.0 : 0.8,
  }))

  // Dynamic Locations Pages
  const branches = await getBranches()
  const branchPages = branches.map((b) => ({
    url: `${baseUrl}/branches/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Dynamic Blogs Pages
  const blogs = await getBlogs()
  const blogPages = blogs.map((bl) => ({
    url: `${baseUrl}/blog/${bl.slug}`,
    lastModified: new Date(bl.updatedAt || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...branchPages, ...blogPages]
}
