"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Star, TrendingUp, Award, GraduationCap, ArrowUpRight, Quote, Sparkles } from "lucide-react"
import { TextReveal, BlurReveal } from "@/components/text-reveal"
import { useCountUp } from "@/hooks/use-count-up"

const bigNumbers = [
  { value: 5000, suffix: "+", label: "Total Selections", icon: Award },
  { value: 850, suffix: "+", label: "NEET Selections", icon: Star },
  { value: 320, suffix: "+", label: "Medical Admissions", icon: GraduationCap },
  { value: 180, suffix: "+", label: "IIT Admissions", icon: TrendingUp },
]

const topRankers = [
  { name: "Aarav Sharma", rank: "NEET AIR 42", exam: "MBBS at AIIMS Delhi", score: "685/720", highlight: "Top 50 AIR" },
  { name: "Priya Patel", rank: "JEE Adv AIR 18", exam: "IIT Bombay CSE", score: "99.98%ile", highlight: "IIT Bombay" },
  { name: "Rahul Verma", rank: "NEET AIR 87", exam: "MBBS at Maulana Azad", score: "672/720", highlight: "Top 100 AIR" },
  { name: "Sneha Reddy", rank: "JEE Main 99.98%ile", exam: "IIT Delhi ECE", score: "100% Maths", highlight: "IIT Delhi" },
  { name: "Arjun Nair", rank: "NEET AIR 156", exam: "MBBS at KEM Hospital", score: "655/720", highlight: "Govt Medical" },
  { name: "Neha Gupta", rank: "JEE Adv AIR 234", exam: "IIT Kanpur", score: "99.95%ile", highlight: "IIT Kanpur" },
]

const banners = [
  { label: "NEET TOP 1000", value: "42", suffix: " Rankers" },
  { label: "JEE ADV TOP 500", value: "28", suffix: " Rankers" },
  { label: "MEDICAL COLLEGES", value: "320+", suffix: " Admissions" },
  { label: "IIT ADMISSIONS", value: "180+", suffix: " Selections" },
]

function HallOfFameNumber({ value, suffix, label, icon: Icon, index }: typeof bigNumbers[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -20])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.4, 1, 1, 0.6])

  const isInView = useRef(false)
  const countRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white via-white to-primary/[0.02] border border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500 group"
    >
      <Icon size={20} className="text-primary/40 mb-3 group-hover:text-primary/70 transition-colors" />
      <div className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground tabular-nums">
        <AnimatedCount target={value} />
        <span className="text-muted-foreground">{suffix}</span>
      </div>
      <div className="text-sm text-muted-foreground mt-2">{label}</div>
    </motion.div>
  )
}

function AnimatedCount({ target }: { target: number | string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const numTarget = typeof target === "string" ? parseInt(target.replace(/\D/g, "")) || 0 : target
  const count = useCountUp(inView ? numTarget : 0)

  return <span ref={ref}>{count}</span>
}

interface ResultItem {
  id?: string
  studentName: string
  photoUrl: string
  examType: "NEET" | "JEE_MAIN" | "JEE_ADVANCED"
  rank: number
  marks: string
  year: number
  college: string
  category: string
}

export function ResultsWall({ items }: { items?: ResultItem[] }) {
  const displayRankers = (items && items.length > 0
    ? items.map(r => ({
        name: r.studentName,
        rank: `${r.examType.replace('_', ' ')} AIR ${r.rank}`,
        exam: r.college,
        score: r.marks,
        highlight: r.rank <= 100 ? "Top 100 AIR" : "Selections"
      }))
    : topRankers).slice(0, 4)

  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const headingScale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1])
  const headingY = useTransform(scrollYProgress, [0, 0.2], [40, 0])
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [0.6, 0.8, 1])

  return (
    <section id="results" ref={sectionRef} className="relative py-28 sm:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          style={{ scale: headingScale, y: headingY, opacity: headingOpacity }}
          className="text-center mb-20"
        >
          <BlurReveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-4">
              <Sparkles size={12} className="text-primary" />
              <span className="text-primary text-xs font-medium">Hall of Fame</span>
            </span>
          </BlurReveal>
          <TextReveal as="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.05]">
            Results That Define Excellence
          </TextReveal>
          <BlurReveal delay={0.3}>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Every number represents a student&apos;s dream turning into reality.
            </p>
          </BlurReveal>
        </motion.div>
 
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {bigNumbers.map((n, i) => (
            <HallOfFameNumber key={n.label} {...n} index={i} />
          ))}
        </div>

        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h3 className="text-2xl sm:text-3xl font-heading font-bold">
              Top Rankers
              <span className="text-primary">.</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayRankers.map((ranker, i) => (
              <motion.div
                key={ranker.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group p-5 rounded-xl bg-white border border-border/50 hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <span className="text-primary font-heading font-bold text-sm">
                    {ranker.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-semibold text-sm text-foreground truncate">{ranker.name}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-primary/5 text-primary text-[9px] font-bold uppercase tracking-wider">{ranker.highlight}</span>
                  </div>
                  <p className="text-xs text-primary font-medium mt-0.5">{ranker.rank}</p>
                  <p className="text-[11px] text-muted-foreground">{ranker.exam} · {ranker.score}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <a
            href="/results"
            className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline underline-offset-4 group"
          >
            View Complete Results Wall
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
