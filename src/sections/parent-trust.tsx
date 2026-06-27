"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Heart, Shield, BarChart3, MessageCircle, Eye, Users, PhoneCall, Star } from "lucide-react"
import { TextReveal, BlurReveal } from "@/components/text-reveal"

const trustPillars = [
  {
    icon: BarChart3,
    title: "Real-Time Progress Tracking",
    desc: "Weekly performance reports with rank analysis, weak area identification, and improvement suggestions. Parents get full visibility.",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: MessageCircle,
    title: "Regular Parent Updates",
    desc: "Scheduled calls with mentors after every test. Detailed feedback on academic performance, attendance, and attitude.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: Shield,
    title: "Complete Transparency",
    desc: "Access to class recordings, test scores, attendance records, and mentor notes. Nothing is hidden from parents.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: Eye,
    title: "Academic Monitoring",
    desc: "Dedicated academic counselor monitors each student&apos;s progress and intervenes when performance drops.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
]

const parentQuotes = [
  {
    name: "Rajesh Sharma",
    child: "Son — NEET AIR 87",
    quote: "The progress reports every week kept us informed. We knew exactly where our son stood. The transparency is unmatched.",
    rating: 5,
  },
  {
    name: "Anita Verma",
    child: "Daughter — IIT Bombay CSE",
    quote: "As a working parent, I couldn't monitor daily. SkillStar's counselor calls gave me complete peace of mind.",
    rating: 5,
  },
]

export function ParentTrust() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative py-28 sm:py-40 overflow-hidden bg-gradient-to-b from-background via-off-white to-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <BlurReveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-4">
              <Heart size={12} className="text-primary" />
              <span className="text-primary text-xs font-medium">For Parents</span>
            </span>
          </BlurReveal>
          <TextReveal as="h2" className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground leading-[1.1]">
            We Treat Your Child Like Our Own
          </TextReveal>
          <BlurReveal delay={0.3}>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Complete transparency. Regular updates. Unmatched care.
            </p>
          </BlurReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {trustPillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 sm:p-8 rounded-2xl bg-white border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-500"
              >
                <div className={`w-12 h-12 rounded-xl ${pillar.bg} flex items-center justify-center mb-4`}>
                  <Icon size={22} className={pillar.color} />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
              </motion.div>
            )
          })}
        </div>

        <div className="max-w-4xl mx-auto">
          <BlurReveal>
            <h3 className="text-2xl font-heading font-bold text-center mb-8">What Parents Say</h3>
          </BlurReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {parentQuotes.map((q, i) => (
              <motion.div
                key={q.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-border/50 hover:shadow-md transition-all duration-500"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: q.rating }).map((_, ri) => (
                    <Star key={ri} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic leading-relaxed mb-4">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
                    <span className="text-primary font-heading font-bold text-sm">{q.name.split(" ").map(n => n[0]).join("")}</span>
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-sm text-foreground">{q.name}</div>
                    <div className="text-xs text-muted-foreground">{q.child}</div>
                  </div>
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
          className="mt-12 text-center"
        >
          <a
            href="tel:+919999999999"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full text-sm hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/20"
          >
            <PhoneCall size={16} />
            Talk to a Parent Counselor
          </a>
        </motion.div>
      </div>
    </section>
  )
}
