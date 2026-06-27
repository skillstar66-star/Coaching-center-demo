"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { GraduationCap, Award, BookOpen, Quote, ArrowRight, Star, Sparkles, CheckCircle2 } from "lucide-react"
import { TextReveal, BlurReveal } from "@/components/text-reveal"

const facultyMembers = [
  {
    name: "Dr. Amit Khanna",
    role: "Physics",
    qualification: "PhD, IIT Bombay",
    experience: "18 years",
    expertise: "Electrodynamics, Mechanics, Quantum",
    highlight: "Produced 15 NEET rankers in top 500",
    results: "90% students scored 160+ in Physics",
    quote: "Physics is not about formulas. It's about understanding the universe.",
    initials: "AK",
  },
  {
    name: "Prof. Neha Gupta",
    role: "Chemistry",
    qualification: "M.Sc., IIT Delhi",
    experience: "15 years",
    expertise: "Physical, Organic & Inorganic Chemistry",
    highlight: "12 years JEE Advanced paper setting",
    results: "25+ JEE Advanced rankers mentored",
    quote: "Chemistry is the bridge between the seen and the unseen.",
    initials: "NG",
  },
  {
    name: "Dr. Rajesh Kumar",
    role: "Biology",
    qualification: "MBBS, AIIMS Delhi",
    experience: "12 years",
    expertise: "Human Physiology, Genetics, Ecology",
    highlight: "100% students qualified NEET 2025",
    results: "42 students scored 350+ in Biology",
    quote: "Biology is the story of life itself.",
    initials: "RK",
  },
  {
    name: "Prof. Vikram Singh",
    role: "Mathematics",
    qualification: "M.Tech, IIT Kanpur",
    experience: "20 years",
    expertise: "Calculus, Algebra, Geometry, Trigonometry",
    highlight: "Mentored 25+ JEE Advanced rankers",
    results: "8 students in JEE Advanced Top 500",
    quote: "Mathematics is the poetry of logical ideas.",
    initials: "VS",
  },
  {
    name: "Dr. Sneha Patel",
    role: "Zoology",
    qualification: "PhD, Pune University",
    experience: "10 years",
    expertise: "Genetics, Evolution, Animal Kingdom",
    highlight: "Best Teacher Award 2024, 2025",
    results: "95% students scored full marks in Genetics",
    quote: "Understanding life starts with understanding its building blocks.",
    initials: "SP",
  },
  {
    name: "Prof. Arjun Nair",
    role: "Physics",
    qualification: "M.Sc., IIT Madras",
    experience: "14 years",
    expertise: "Optics, Modern Physics, Semiconductors",
    highlight: "Author of 3 best-selling physics books",
    results: "2000+ students mentored to top ranks",
    quote: "Every problem is an opportunity to think differently.",
    initials: "AN",
  },
]

interface FacultyItem {
  id?: string
  name: string
  photoUrl: string
  qualification: string
  experience: string
  subjects: string[]
  achievements: string
  bio: string
  resultsProduced: string
}

export function FacultyShowcase({ items }: { items?: FacultyItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
  const x = useTransform(scrollYProgress, [0, 0.5, 1], ["5%", "0%", "-45%"])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const displayFaculty = items && items.length > 0
    ? items.map(f => ({
        name: f.name,
        role: f.subjects.join(" & "),
        qualification: f.qualification,
        experience: f.experience,
        expertise: f.subjects.slice(0, 3).join(", "),
        highlight: f.achievements,
        results: f.resultsProduced,
        quote: f.bio,
        initials: f.name.split(" ").map(n => n[0]).join("")
      }))
    : facultyMembers

  return (
    <section id="faculty" ref={containerRef} className="relative py-28 sm:py-40 overflow-hidden bg-off-white">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <TextReveal as="h2" className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground leading-[1.1]">
          Learn from India&apos;s Finest Minds
        </TextReveal>
        <BlurReveal delay={0.3}>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Every faculty member is an expert in their field. They don&apos;t just teach — they create rankers.
          </p>
        </BlurReveal>
      </div>

      <div className="relative">
        <motion.div className="flex gap-6 px-6" style={{ x }}>
          {[...displayFaculty, ...displayFaculty].map((faculty, i) => (
            <motion.div
              key={`${faculty.initials}-${i}`}
              className="group w-[340px] sm:w-[380px] shrink-0 p-6 sm:p-7 rounded-2xl bg-white border border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <span className="text-primary font-heading font-bold text-lg">{faculty.initials}</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-xl text-foreground">{faculty.name}</h3>
                    <p className="text-primary font-medium text-sm">{faculty.role} Faculty</p>
                  </div>
                </div>
                <span className="inline-flex px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-semibold uppercase tracking-wider">
                  {faculty.experience}
                </span>
              </div>

              <p className="text-xs text-muted-foreground italic leading-relaxed mb-4 flex items-start gap-2 bg-muted/30 p-3 rounded-xl">
                <Quote size={12} className="text-primary/30 mt-0.5 shrink-0" />
                {faculty.quote}
              </p>

              <div className="flex flex-col gap-2 text-xs border-t border-border/50 pt-4 mb-4">
                <span className="flex items-center gap-2.5 text-muted-foreground">
                  <GraduationCap size={12} className="text-primary/60 shrink-0" />
                  {faculty.qualification}
                </span>
                <span className="flex items-center gap-2.5 text-muted-foreground">
                  <Award size={12} className="text-primary/60 shrink-0" />
                  {faculty.highlight}
                </span>
                <span className="flex items-center gap-2.5 text-muted-foreground">
                  <BookOpen size={12} className="text-primary/60 shrink-0" />
                  {faculty.expertise}
                </span>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50/50 border border-emerald-100/50">
                <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                <span className="text-[11px] text-emerald-700 font-medium">{faculty.results}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="text-center mt-12">
        <BlurReveal>
          <a href="#" className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline underline-offset-4 group">
            Meet All Faculty Members
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </BlurReveal>
      </div>
    </section>
  )
}
