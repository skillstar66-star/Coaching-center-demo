import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BookOpen, CheckCircle, Clock, GraduationCap, ArrowLeft, CreditCard, Sparkles } from "lucide-react"
import { getCourses } from "@/lib/data-service"
import { TextReveal } from "@/components/text-reveal"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const courses = await getCourses()
  return courses.map((c) => ({
    slug: c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const courses = await getCourses()
  const course = courses.find((c) => c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug)
  if (!course) return {}

  return {
    title: `${course.title} Syllabus & Eligibility | SkillStar`,
    description: `Details for ${course.title}. Duration: ${course.duration}. Eligibility: ${course.eligibility}. Enroll now in India's premium competitive coaching program.`,
  }
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params
  const courses = await getCourses()
  const course = courses.find((c) => c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug)

  if (!course) {
    notFound()
  }

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "SkillStar",
      "sameAs": "https://skillstar.com"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <div className="relative min-h-screen bg-off-white pt-24 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080510] via-off-white to-off-white h-[400px] -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Programs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Program Specs (Bento Layout) */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                  <Sparkles size={12} />
                  SkillStar Specialization
                </span>
                <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white leading-tight">
                  {course.title}
                </h1>
                <p className="text-white/60 text-base max-w-xl">
                  {course.description}
                </p>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-6 bg-white rounded-2xl border border-border/50 shadow-sm flex flex-col justify-between">
                  <Clock className="text-primary mb-4" size={24} />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground/60 block">Duration</span>
                    <span className="text-lg font-heading font-bold text-foreground mt-1 block">{course.duration}</span>
                  </div>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-border/50 shadow-sm flex flex-col justify-between">
                  <CreditCard className="text-primary mb-4" size={24} />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground/60 block">Tuition Fees</span>
                    <span className="text-lg font-heading font-bold text-foreground mt-1 block">₹{course.fees.toLocaleString()}</span>
                  </div>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-border/50 shadow-sm flex flex-col justify-between">
                  <GraduationCap className="text-primary mb-4" size={24} />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground/60 block">Eligibility</span>
                    <span className="text-xs font-heading font-bold text-foreground mt-2 block leading-relaxed">{course.eligibility}</span>
                  </div>
                </div>
              </div>

              {/* Program features */}
              <div className="p-6 sm:p-8 bg-white rounded-2xl border border-border/50 shadow-sm space-y-6">
                <h3 className="text-xl font-heading font-bold text-foreground">Program Offerings & Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs text-muted-foreground">
                      <CheckCircle className="text-success shrink-0" size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mock Curriculum block */}
              <div className="p-6 sm:p-8 bg-white rounded-2xl border border-border/50 shadow-sm space-y-6">
                <h3 className="text-xl font-heading font-bold text-foreground">Curriculum Outline</h3>
                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-off-white border border-border/30">
                    <span className="font-semibold text-foreground block mb-1">Phase 1: Conceptual Foundations</span>
                    <p className="text-muted-foreground">Deep dive into key syllabus chapters. Emphasis on building conceptual framework, problem layouts, and numerical calculations.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-off-white border border-border/30">
                    <span className="font-semibold text-foreground block mb-1">Phase 2: Speed & Accuracy Drills</span>
                    <p className="text-muted-foreground">Weekly time-constrained tests, paper patterns mapping, shortcut logic, and error-correction log analysis.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Admission Callback Box */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-border/50 shadow-xl space-y-6">
              <div>
                <h3 className="font-heading font-bold text-lg text-foreground">Register for Program</h3>
                <p className="text-xs text-muted-foreground mt-1">Submit your name below and schedule a counseling entry assessment slot.</p>
              </div>

              <form className="space-y-4 text-xs">
                <div>
                  <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-1">Full Name</label>
                  <input type="text" required placeholder="John Doe" className="w-full px-4 py-2 bg-off-white border border-border rounded-xl focus:outline-primary" />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-1">Mobile Number</label>
                  <input type="tel" required placeholder="+91 99999 99999" className="w-full px-4 py-2 bg-off-white border border-border rounded-xl focus:outline-primary" />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-1">Selected Center</label>
                  <select className="w-full px-4 py-2 bg-off-white border border-border rounded-xl focus:outline-primary">
                    <option>Kota Head Office</option>
                    <option>Delhi Janakpuri Center</option>
                    <option>Mumbai Andheri Center</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-md shadow-primary/20"
                >
                  Proceed to Admission Form
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
