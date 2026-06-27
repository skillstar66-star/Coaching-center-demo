import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Award, GraduationCap, CheckCircle, ArrowLeft, Trophy, Calendar, BookOpen } from "lucide-react"
import { getResults } from "@/lib/data-service"
import { TextReveal } from "@/components/text-reveal"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const results = await getResults()
  return results.map((r) => ({
    slug: r.studentName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const results = await getResults()
  const result = results.find((r) => r.studentName.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug)
  if (!result) return {}

  return {
    title: `${result.studentName} - ${result.examType} AIR ${result.rank} | Success Story`,
    description: `How ${result.studentName} scored ${result.marks} in ${result.examType} and got into ${result.college}. Read their full preparation strategy.`,
  }
}

export default async function ResultDetailPage({ params }: PageProps) {
  const { slug } = await params
  const results = await getResults()
  const result = results.find((r) => r.studentName.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug)

  if (!result) {
    notFound()
  }

  const successSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Course",
      "name": `${result.examType} Program`,
      "provider": {
        "@type": "EducationalOrganization",
        "name": "SkillStar"
      }
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": result.studentName
    },
    "reviewBody": `Scored AIR ${result.rank} with ${result.marks} in ${result.examType}. Admitted to ${result.college}.`
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(successSchema) }}
      />

      <div className="relative min-h-screen bg-off-white pt-24 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080510] via-off-white to-off-white h-[400px] -z-10" />

        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Ranks
          </Link>

          <div className="bg-white rounded-3xl border border-border/50 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-border/50 pb-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-4 border-primary/10 flex items-center justify-center text-primary font-heading font-bold text-3xl shrink-0">
                {result.studentName.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="text-center sm:text-left space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                  <Trophy size={10} /> AIR {result.rank}
                </div>
                <h1 className="text-3xl font-heading font-bold text-foreground">{result.studentName}</h1>
                <p className="text-sm text-primary font-semibold">{result.college}</p>
                <p className="text-xs text-muted-foreground">Exam: {result.examType} · Year: {result.year} · Category: {result.category}</p>
              </div>
            </div>

            {/* Scorecard specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-off-white border border-border/30 text-center">
                <span className="text-[10px] uppercase font-bold text-muted-foreground/60">Marks Scored</span>
                <span className="text-2xl font-heading font-bold text-foreground block mt-1">{result.marks}</span>
              </div>
              <div className="p-5 rounded-2xl bg-off-white border border-border/30 text-center">
                <span className="text-[10px] uppercase font-bold text-muted-foreground/60">All India Rank</span>
                <span className="text-2xl font-heading font-bold text-primary block mt-1">#{result.rank}</span>
              </div>
            </div>

            {/* Preparation Roadmap */}
            <div className="space-y-4">
              <h3 className="text-xl font-heading font-bold text-foreground">Student Success Story</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Achieving a top rank in highly competitive exams like {result.examType} requires a dedicated roadmap. At SkillStar, {result.studentName} spent over 600+ classroom learning hours building solid fundamentals, analyzing daily test performance log metrics, and optimizing chapter revision worksheets under personalized mentor guidance.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                &ldquo;The mock test sequences at SkillStar felt identical to the actual competitive exam sheets. The detailed review dashboards highlighted my weak chapters in electrodynamics and calculus, allowing me to take corrective actions prior to the exam day.&rdquo;
              </p>
            </div>

            {/* Counseling Quote block */}
            <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
              <BookOpen size={24} className="text-primary mt-1 shrink-0" />
              <div>
                <h4 className="font-heading font-bold text-sm text-foreground">Want similar selections for your child?</h4>
                <p className="text-xs text-muted-foreground mt-1">Book a free physical guidance counseling session with our coaching experts at your local center.</p>
                <Link href="/#apply" className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline mt-3">
                  Book Free Mentorship Session
                  <ArrowLeft size={12} className="rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
