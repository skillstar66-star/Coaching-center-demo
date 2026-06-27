"use client"

import { motion } from "framer-motion"
import { X, Check, Minus, ArrowRight } from "lucide-react"
import { TextReveal, BlurReveal } from "@/components/text-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { useAdmissionModal } from "@/hooks/use-admission-modal"

const criteria = [
  { label: "Structured Curriculum", self: false, avg: true, us: true },
  { label: "Expert Faculty from IITs/AIIMS", self: false, avg: false, us: true },
  { label: "Personal Mentor", self: false, avg: false, us: true },
  { label: "Weekly Mock Tests", self: false, avg: true, us: true },
  { label: "AI-Powered Performance Analysis", self: false, avg: false, us: true },
  { label: "Doubt Resolution Within 24hrs", self: false, avg: false, us: true },
  { label: "Parent Progress Reports", self: false, avg: false, us: true },
  { label: "Exam Temperament Training", self: false, avg: false, us: true },
  { label: "Career Counseling", self: false, avg: false, us: true },
  { label: "Success Rate >95%", self: false, avg: false, us: true },
]

export function Comparison() {
  const { open: openAdmission } = useAdmissionModal()
  return (
    <section className="relative py-28 sm:py-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <TextReveal as="h2" className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground leading-[1.1]">
            The Difference Is Clear
          </TextReveal>
          <BlurReveal delay={0.3}>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Why most students struggle — and why SkillStar students succeed.
            </p>
          </BlurReveal>
        </div>

        <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm">
          <div className="grid grid-cols-4 gap-px bg-border/50">
            <div className="bg-white p-4 sm:p-5" />
            <div className="bg-white p-4 sm:p-5 text-center">
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Self Study</div>
              <div className="text-lg sm:text-xl font-heading font-bold text-foreground">🧑‍🎓</div>
            </div>
            <div className="bg-white p-4 sm:p-5 text-center">
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Average Coaching</div>
              <div className="text-lg sm:text-xl font-heading font-bold text-foreground">📚</div>
            </div>
            <div className="bg-primary/5 p-4 sm:p-5 text-center relative">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" />
              <div className="text-xs text-primary font-medium uppercase tracking-wider mb-1">SkillStar</div>
              <div className="text-lg sm:text-xl font-heading font-bold text-primary">🏆</div>
            </div>
          </div>

          <div className="divide-y divide-border/50">
            {criteria.map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="grid grid-cols-4 gap-px"
              >
                <div className="bg-white p-3 sm:p-4">
                  <span className="text-xs sm:text-sm text-foreground font-medium">{row.label}</span>
                </div>
                <div className="bg-white p-3 sm:p-4 flex items-center justify-center">
                  {row.self ? (
                    <Check size={16} className="text-success" />
                  ) : (
                    <X size={16} className="text-red-300" />
                  )}
                </div>
                <div className="bg-white p-3 sm:p-4 flex items-center justify-center">
                  {row.avg ? (
                    <Check size={16} className="text-success" />
                  ) : (
                    <X size={16} className="text-red-300" />
                  )}
                </div>
                <div className="bg-primary/[0.02] p-3 sm:p-4 flex items-center justify-center">
                  <Check size={16} className="text-primary" />
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
          className="mt-10 text-center"
        >
          <MagneticButton
            onClick={openAdmission}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full text-sm hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/20 cursor-pointer"
          >
            Experience the Difference
            <ArrowRight size={16} />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
