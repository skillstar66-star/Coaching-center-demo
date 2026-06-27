import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, User, Tag, ArrowLeft, Share2, Clock, Sparkles } from "lucide-react"
import { getBlogBySlug, getBlogs } from "@/lib/data-service"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const blogs = await getBlogs()
  return blogs.map((bl) => ({
    slug: bl.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) return {}

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.content.substring(0, 150),
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    notFound()
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": blog.ogImage || "https://skillstar.com/favicon.ico",
    "genre": blog.category,
    "keywords": blog.tags.join(" "),
    "url": `https://skillstar.com/blog/${blog.slug}`,
    "datePublished": blog.createdAt,
    "author": {
      "@type": "Person",
      "name": blog.author
    },
    "description": blog.metaDescription
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="relative min-h-screen bg-off-white pt-24 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080510] via-off-white to-off-white h-[400px] -z-10" />

        <article className="max-w-3xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </Link>

          <div className="bg-white rounded-3xl border border-border/50 shadow-xl overflow-hidden p-6 sm:p-10 space-y-6">
            {/* Meta */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                <Sparkles size={12} />
                {blog.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground leading-tight">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-b border-border/50 pb-5">
                <span className="flex items-center gap-1.5">
                  <User size={14} className="text-primary/70" />
                  {blog.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-primary/70" />
                  {new Date(blog.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-primary/70" />
                  5 Min Read
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-6 pt-2">
              <p>{blog.content}</p>
              <p>
                In competitive milestones such as NEET and JEE Advanced, conceptual logic beats rote learning. Experts recommend maintaining a structured error log dashboard, logging every incorrect mock test sheet question, and scheduling revision calendars to solidify target formulas.
              </p>
            </div>

            {/* Tags footer */}
            <div className="flex flex-wrap items-center gap-2 border-t border-border/50 pt-6">
              <Tag size={14} className="text-primary/60" />
              {blog.tags.map((t) => (
                <span key={t} className="text-xs bg-off-white px-2.5 py-1 rounded-full border border-border/30 text-muted-foreground font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </>
  )
}
