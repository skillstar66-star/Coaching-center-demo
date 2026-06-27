"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Clock, Users, Target, Zap, BookOpen, BarChart3 } from "lucide-react"
import { TextReveal, BlurReveal } from "@/components/text-reveal"

const courses = [
  {
    title: "NEET Program",
    tagline: "Medical Seat Guaranteed",
    desc: "Comprehensive NEET preparation covering Physics, Chemistry, and Biology with 10,000+ practice questions and 50+ mock tests.",
    icon: Target,
    features: ["2-year comprehensive program", "500+ lecture hours", "10,000+ MCQs", "1:1 doubt sessions", "AI progress tracking"],
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50",
    badge: "Most Enrolled",
  },
  {
    title: "JEE Advanced",
    tagline: "IIT Cracking System",
    desc: "Rigorous JEE Main & Advanced preparation with advanced problem-solving, 3000+ challenging problems, and personalized mentorship.",
    icon: Zap,
    features: ["2-year intensive program", "600+ lecture hours", "3,000+ advanced problems", "Math Olympiad training", "Mock JEE every week"],
    color: "from-violet-500 to-violet-600",
    bg: "bg-violet-50",
    badge: "Top Rated",
  },
  {
    title: "Foundation",
    tagline: "Early Starter Advantage",
    desc: "Build rock-solid fundamentals for classes 8-10. Early exposure to competitive exam patterns and conceptual clarity.",
    icon: BookOpen,
    features: ["3-year gradual program", "Concept-based learning", "Science & Math mastery", "Olympiad preparation", "Career guidance sessions"],
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50",
    badge: "Early Bird",
  },
  {
    title: "Repeaters",
    tagline: "One Year. One Goal.",
    desc: "Intensive one-year crash program for droppers. Daily tests, focused revision, and stress management built in.",
    icon: BarChart3,
    features: ["12-month fast-track", "Daily mock tests", "Weak area focus", "Previous year deep dive", "Exam temperament training"],
    color: "from-amber-500 to-amber-600",
    bg: "bg-amber-50",
    badge: "Intensive",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
}

interface CourseItem {
  id?: string
  title: string
  description: string
  duration: string
  fees: number
  features: string[]
  eligibility: string
  ctaText?: string
  ctaUrl?: string
}

const colors = ["from-purple-500 to-purple-600", "from-violet-500 to-violet-600", "from-emerald-500 to-emerald-600", "from-amber-500 to-amber-600"]
const bgs = ["bg-purple-50", "bg-violet-50", "bg-emerald-50", "bg-amber-50"]
const badges = ["Most Enrolled", "Top Rated", "Early Bird", "Intensive"]

export function Courses({ items }: { items?: CourseItem[] }) {
  const displayCourses = items && items.length > 0
    ? items.map((c, i) => ({
        title: c.title,
        tagline: `${c.duration} Program · ${c.eligibility}`,
        desc: c.description,
        features: c.features,
        color: colors[i % colors.length],
        bg: bgs[i % bgs.length],
        badge: badges[i % badges.length],
        ctaText: c.ctaText || "Enroll Now",
        ctaUrl: c.ctaUrl || "#enroll"
      }))
    : courses

  return (
    <section id="courses" className="relative py-28 sm:py-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground leading-[1.1]"
          >
            Choose Your Path to Success
          </TextReveal>
          <BlurReveal delay={0.3}>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Every program is designed with one goal: to get you selected.
            </p>
          </BlurReveal>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {displayCourses.map((course) => {
            const Icon = 'icon' in course ? (course.icon as any) : Target
            return (
              <motion.div
                key={course.title}
                variants={cardVariants}
                className="group relative p-6 sm:p-8 rounded-2xl bg-white border border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-40 h-40 rounded-bl-full ${course.bg} opacity-20 group-hover:opacity-30 transition-opacity`} />
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${course.bg} flex items-center justify-center`}>
                      <Icon size={24} className="text-foreground" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-semibold uppercase tracking-wider">
                      {course.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-foreground">{course.title}</h3>
                  <p className="text-primary text-sm font-medium mt-0.5">{course.tagline}</p>
                  <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{course.desc}</p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {course.features.map((f) => (
                      <span key={f} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full">
                        <CheckCircle2 size={10} className="text-success" />
                        {f}
                      </span>
                    ))}
                  </div>

                  <a
                    href={'ctaUrl' in course ? (course.ctaUrl as string) : '#'}
                    className="mt-6 inline-flex items-center gap-2 text-sm text-primary font-semibold group/link hover:underline underline-offset-4"
                  >
                    {'ctaText' in course ? (course.ctaText as string) : "View Program Details"}
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
