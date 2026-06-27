import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MapPin, Phone, Mail, ArrowLeft, ExternalLink, Award, Users, CheckCircle, Sparkles } from "lucide-react"
import { getBranchBySlug, getBranches, getResults } from "@/lib/data-service"
import { TextReveal } from "@/components/text-reveal"

export async function generateStaticParams() {
  const branches = await getBranches()
  return branches.map((b) => ({
    slug: b.slug,
  }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const branch = await getBranchBySlug(slug)
  if (!branch) return {}

  return {
    title: `SkillStar - ${branch.name} | Best NEET & JEE Coaching`,
    description: `Accelerate your NEET & IIT-JEE prep at SkillStar ${branch.name} center. Located at ${branch.address}. Expert faculty, mock tests, and personal counseling.`,
    alternates: {
      canonical: `https://skillstar.com/branches/${slug}`,
    },
  }
}

export default async function BranchPage({ params }: PageProps) {
  const { slug } = await params
  const branch = await getBranchBySlug(slug)

  if (!branch) {
    notFound()
  }

  // Fetch results and filter for this branch
  const allResults = await getResults()
  const branchResults = allResults.filter(
    (r) => r.branchId === branch.id || (r as any).branch?.id === branch.id
  )

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `SkillStar - ${branch.name}`,
    "image": "https://skillstar.com/favicon.ico",
    "telephone": branch.phone,
    "email": branch.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": branch.address,
      "addressLocality": branch.city,
      "addressRegion": branch.state,
      "addressCountry": "IN"
    },
    "url": `https://skillstar.com/branches/${branch.slug}`
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="relative min-h-screen bg-off-white pt-24 pb-20">
        {/* Banner Grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080510] via-off-white to-off-white h-[400px] -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Branch Info */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                  <Sparkles size={12} />
                  SkillStar Campus
                </span>
                <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white leading-tight">
                  {branch.name}
                </h1>
                <p className="text-white/60 text-base max-w-xl">
                  Welcome to SkillStar&apos;s state-of-the-art training facility. Our center offers dedicated reading rooms, modern digital mock testing labs, and 1:1 guidance corners.
                </p>
              </div>

              {/* Photos Gallery */}
              <div className="rounded-2xl overflow-hidden bg-white border border-border/50 p-4 shadow-xl">
                <div className="h-64 sm:h-96 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                  {/* Fallback visual illustration */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9InJnYmEoMTQ3LDUxLDIzNCwwLjAzKSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
                  <div className="text-center p-6 relative">
                    <MapPin size={48} className="text-primary mx-auto mb-4 animate-bounce" />
                    <p className="font-heading font-bold text-lg text-foreground">{branch.name} Campus Facility</p>
                    <p className="text-xs text-muted-foreground mt-1">Smart Classrooms · Doubt Helpdesks · High-Tech Computer Labs</p>
                  </div>
                </div>
              </div>

              {/* Branch Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white border border-border/50 flex items-start gap-3">
                  <Users className="text-primary mt-1 shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">Top IIT & AIIMS Faculty</h4>
                    <p className="text-xs text-muted-foreground mt-1">Learn directly from subject matter experts with 12+ years average experience.</p>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white border border-border/50 flex items-start gap-3">
                  <Award className="text-primary mt-1 shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">Highest Success Ratios</h4>
                    <p className="text-xs text-muted-foreground mt-1">Over 98% qualification rates in NEET/JEE across past test batches.</p>
                  </div>
                </div>
              </div>

              {/* Branch Specific Results */}
              {branchResults.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-heading font-bold text-foreground">Branch Success Wall</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {branchResults.map((r) => (
                      <div key={r.id} className="p-4 rounded-xl bg-white border border-border/50 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-primary font-heading font-bold text-xs">{r.studentName.split(" ").map(n => n[0]).join("")}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-foreground">{r.studentName}</h4>
                          <p className="text-xs text-primary font-medium">{r.examType} AIR {r.rank}</p>
                          <p className="text-[10px] text-muted-foreground">{r.college} · {r.marks}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Contact, Maps & Leads Form */}
            <div className="lg:col-span-5 space-y-6">
              {/* Contact Card */}
              <div className="p-6 rounded-2xl bg-white border border-border/50 shadow-xl space-y-5">
                <h3 className="font-heading font-bold text-lg text-foreground border-b border-border/50 pb-3">
                  Center Contacts
                </h3>

                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                    <span>{branch.address}, {branch.city}, {branch.state}</span>
                  </div>
                  <a href={`tel:${branch.phone}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                    <Phone size={18} className="text-primary shrink-0" />
                    <span>{branch.phone}</span>
                  </a>
                  <a href={`mailto:${branch.email}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                    <Mail size={18} className="text-primary shrink-0" />
                    <span>{branch.email}</span>
                  </a>
                </div>

                <a
                  href={branch.googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:bg-muted/50 transition-colors text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  Get Directions in Google Maps
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* Dynamic Counselor callback form */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20 shadow-xl space-y-5">
                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    Book Free Counseling Session
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Meet our senior academic counselor at {branch.name} for 1:1 mentorship guidelines.
                  </p>
                </div>

                {/* Form placeholder linking to home page callbacks */}
                <form className="space-y-3">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-1">Student Name</label>
                    <input type="text" placeholder="John Doe" required className="w-full px-4 py-2 bg-white border border-border rounded-xl text-sm focus:outline-primary" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-1">Mobile Number</label>
                    <input type="tel" placeholder="+91 99999 99999" required className="w-full px-4 py-2 bg-white border border-border rounded-xl text-sm focus:outline-primary" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-1">Target Exam</label>
                    <select className="w-full px-4 py-2 bg-white border border-border rounded-xl text-sm focus:outline-primary">
                      <option>NEET</option>
                      <option>JEE Main & Advanced</option>
                      <option>Foundation (Class 8-10)</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-md shadow-primary/25"
                  >
                    Request Callback Session
                  </button>
                </form>
                <div className="text-[10px] text-muted-foreground text-center">
                  ⚡ Confirmed consultation slot will be shared via SMS.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
