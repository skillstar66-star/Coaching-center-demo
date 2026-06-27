import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { GraduationCap, Award, BookOpen, Clock, ArrowLeft, Heart, CheckCircle } from "lucide-react"
import { getFaculty } from "@/lib/data-service"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const faculty = await getFaculty()
  return faculty.map((f) => ({
    slug: f.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const faculty = await getFaculty()
  const member = faculty.find((f) => f.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug)
  if (!member) return {}

  return {
    title: `${member.name} - ${member.subjects.join(" & ")} Expert | SkillStar Faculty`,
    description: `${member.name} holds ${member.qualification} with ${member.experience} of coaching experience. Learn more about their academic methodology.`,
  }
}

export default async function FacultyDetailPage({ params }: PageProps) {
  const { slug } = await params
  const faculty = await getFaculty()
  const member = faculty.find((f) => f.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug)

  if (!member) {
    notFound()
  }

  return (
    <div className="relative min-h-screen bg-off-white pt-24 pb-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#080510] via-off-white to-off-white h-[400px] -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Faculty Showcase
        </Link>

        <div className="bg-white rounded-3xl border border-border/50 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-border/50 pb-8">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-primary font-heading font-bold text-3xl shrink-0">
              {member.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="text-center sm:text-left space-y-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider">
                <Clock size={10} /> {member.experience} Experience
              </span>
              <h1 className="text-3xl font-heading font-bold text-foreground">{member.name}</h1>
              <p className="text-sm text-primary font-semibold">{member.subjects.join(" & ")} Faculty</p>
              <p className="text-xs text-muted-foreground">{member.qualification}</p>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl bg-off-white border border-border/30">
              <GraduationCap className="text-primary mb-3" size={20} />
              <span className="text-[10px] uppercase font-bold text-muted-foreground/60 block">Qualification</span>
              <span className="text-xs font-semibold text-foreground mt-1 block leading-relaxed">{member.qualification}</span>
            </div>
            <div className="p-5 rounded-xl bg-off-white border border-border/30">
              <Award className="text-primary mb-3" size={20} />
              <span className="text-[10px] uppercase font-bold text-muted-foreground/60 block">Achievements</span>
              <span className="text-xs font-semibold text-foreground mt-1 block leading-relaxed">{member.achievements}</span>
            </div>
            <div className="p-5 rounded-xl bg-off-white border border-border/30">
              <BookOpen className="text-primary mb-3" size={20} />
              <span className="text-[10px] uppercase font-bold text-muted-foreground/60 block">Expertise Areas</span>
              <span className="text-xs font-semibold text-foreground mt-1 block leading-relaxed">{member.subjects.join(", ")}</span>
            </div>
          </div>

          {/* Biography */}
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-bold text-foreground">Biography & Philosophy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {member.bio}
            </p>
          </div>

          {/* Historical Results */}
          <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100/50 flex items-start gap-4">
            <CheckCircle className="text-emerald-500 mt-1 shrink-0" size={20} />
            <div>
              <h4 className="font-heading font-bold text-sm text-emerald-800">Results Produced</h4>
              <p className="text-xs text-emerald-700 mt-1 leading-relaxed">{member.resultsProduced}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
