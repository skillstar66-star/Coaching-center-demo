"use client"

import { motion } from "framer-motion"
import { Award, Zap, TrendingUp, Calendar, ArrowRight, CheckCircle, Star } from "lucide-react"
import { TextReveal, BlurReveal } from "@/components/text-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { useAdmissionModal } from "@/hooks/use-admission-modal"

const benefits = [
  { icon: Zap, label: "Up to 100% Scholarship", desc: "Based on merit test performance" },
  { icon: TrendingUp, label: "Merit-Based Rewards", desc: "Top performers get additional benefits" },
  { icon: Calendar, label: "Annual Scholarship Exam", desc: "Conducted every January & July" },
  { icon: Star, label: "Special Category Benefits", desc: "Defense, single parent, girl child quota" },
]

const slabs = [
  { rank: "Top 1%", scholarship: "100% Tuition Fee Waiver", color: "text-emerald-600", bg: "bg-emerald-50" },
  { rank: "Top 5%", scholarship: "75% Tuition Fee Waiver", color: "text-purple-600", bg: "bg-purple-50" },
  { rank: "Top 15%", scholarship: "50% Tuition Fee Waiver", color: "text-violet-600", bg: "bg-violet-50" },
  { rank: "Top 30%", scholarship: "25% Tuition Fee Waiver", color: "text-amber-600", bg: "bg-amber-50" },
]

export function Scholarship() {
  const { open: openAdmission } = useAdmissionModal()
  return (
    <section className="relative py-28 sm:py-40 bg-gradient-to-b from-foreground to-primary-dark overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(147,51,234,0.15),transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(192,132,252,0.1),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <BlurReveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-4">
              <Award size={12} className="text-accent" />
              <span className="text-white/60 text-xs font-medium">Merit Scholarship Program</span>
            </span>
          </BlurReveal>
          <TextReveal as="h2" className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-[1.1]">
            Your Talent Deserves Recognition
          </TextReveal>
          <BlurReveal delay={0.3}>
            <p className="mt-4 text-white/50 max-w-xl mx-auto">
              Earn scholarships worth up to ₹5 Lakhs based on your performance in our All India Scholarship Test.
            </p>
          </BlurReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="p-5 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition-all duration-500"
                >
                  <Icon size={20} className="text-accent mb-2" />
                  <h3 className="font-heading font-semibold text-sm text-white">{b.label}</h3>
                  <p className="text-xs text-white/40 mt-1">{b.desc}</p>
                </motion.div>
              )
            })}
          </div>

          <div className="space-y-3">
            {slabs.map((slab, i) => (
              <motion.div
                key={slab.rank}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] transition-all duration-500"
              >
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${slab.bg} ${slab.color}`}>{slab.rank}</span>
                  <span className="text-white/80 text-sm font-medium">{slab.scholarship}</span>
                </div>
                <CheckCircle size={16} className="text-emerald-400/60 shrink-0" />
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
          <MagneticButton
            onClick={openAdmission}
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-foreground font-semibold rounded-full text-sm hover:bg-white/90 transition-all duration-300 shadow-2xl cursor-pointer"
          >
            Register for Scholarship Test
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
          <p className="text-white/30 text-xs mt-3">Next test: January 15, 2027 · Free registration</p>
        </motion.div>
      </div>
    </section>
  )
}
