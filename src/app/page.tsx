import { Metadata } from "next"
import { Hero } from "@/sections/hero"
import { Dream } from "@/sections/dream"
import { PainPoints } from "@/sections/pain-points"
import { Transformation } from "@/sections/transformation"
import { Comparison } from "@/sections/comparison"
import { ResultsWall } from "@/sections/results-wall"
import { FacultyShowcase } from "@/sections/faculty-showcase"
import { Courses } from "@/sections/courses"
import { Testimonials } from "@/sections/testimonials"
import { Scholarship } from "@/sections/scholarship"
import { ParentTrust } from "@/sections/parent-trust"
import { CampusGallery } from "@/sections/campus-gallery"
import { LeadMagnet } from "@/sections/lead-magnet"
import { SuccessTools } from "@/sections/success-tools"
import { FAQ } from "@/sections/faq"
import { FinalCTA } from "@/sections/final-cta"
import { GsapAnimations } from "@/components/gsap-animations"
import { BranchesShowcase } from "@/sections/branches-showcase"
import {
  getBranches,
  getCourses,
  getResults,
  getTestimonials,
  getFAQs,
  getFaculty,
  getSEOByPath
} from "@/lib/data-service"

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOByPath("/")
  if (!seo) return {}
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    openGraph: seo.ogTitle ? {
      title: seo.ogTitle,
      description: seo.ogDescription || undefined,
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
    } : undefined
  }
}

export default async function Home() {
  // Parallel fetch on the server side
  const [branches, courses, results, testimonials, faqs, faculty] = await Promise.all([
    getBranches(),
    getCourses(),
    getResults(),
    getTestimonials(),
    getFAQs(),
    getFaculty(),
  ])

  // Build JSON-LD schemas
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "SkillStar",
    "url": "https://skillstar.com",
    "logo": "https://skillstar.com/favicon.ico",
    "description": "India's premium coaching institute for NEET & JEE Advanced prep.",
    "contactPoint": branches.map(b => ({
      "@type": "ContactPoint",
      "telephone": b.phone,
      "contactType": "admissions",
      "email": b.email,
      "areaServed": "IN"
    }))
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  }

  const courseSchema = courses.map(c => ({
    "@context": "https://schema.org",
    "@type": "Course",
    "name": c.title,
    "description": c.description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "SkillStar",
      "sameAs": "https://skillstar.com"
    }
  }))

  const localBusinessSchemas = branches.map(b => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `SkillStar - ${b.name}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": b.address,
      "addressLocality": b.city,
      "addressRegion": b.state,
      "addressCountry": "IN"
    },
    "telephone": b.phone,
    "email": b.email,
    "url": `https://skillstar.com/branches/${b.slug}`
  }))

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {courseSchema.map((cs, idx) => (
        <script
          key={`course-schema-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(cs) }}
        />
      ))}
      {localBusinessSchemas.map((lbs, idx) => (
        <script
          key={`local-schema-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lbs) }}
        />
      ))}

      {/* Sections */}
      <Hero />
      <Dream />
      <PainPoints />
      <Transformation />
      <Comparison />
      <ResultsWall items={results} />
      <FacultyShowcase items={faculty} />
      <Courses items={courses} />
      <Testimonials items={testimonials} />
      <Scholarship />
      <ParentTrust />
      <CampusGallery />
      <BranchesShowcase branches={branches} />
      <LeadMagnet />
      <SuccessTools />
      <FAQ items={faqs} />
      <FinalCTA />
      <GsapAnimations />
    </>
  )
}
