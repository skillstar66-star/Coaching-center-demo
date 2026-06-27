"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { AlertTriangle, Compass, FileSearch, HelpCircle, Timer, Brain } from "lucide-react"
import { TextReveal, BlurReveal } from "@/components/text-reveal"
import { ArrowRight } from "lucide-react"

const problems = [
  {
    icon: Compass,
    problem: "Lack of Guidance",
    solution: "Dedicated mentor for every student. 24/7 doubt resolution.",
    color: "text-red-500",
    border: "border-red-200",
    bg: "bg-red-50",
  },
  {
    icon: Brain,
    problem: "No Strategy",
    solution: "AI-powered personalized study plans based on diagnostic tests.",
    color: "text-orange-500",
    border: "border-orange-200",
    bg: "bg-orange-50",
  },
  {
    icon: FileSearch,
    problem: "Poor Test Analysis",
    solution: "Detailed performance reports with weak area identification.",
    color: "text-amber-500",
    border: "border-amber-200",
    bg: "bg-amber-50",
  },
  {
    icon: HelpCircle,
    problem: "Doubt Accumulation",
    solution: "Instant doubt clearing via app. No question left unanswered.",
    color: "text-rose-500",
    border: "border-rose-200",
    bg: "bg-rose-50",
  },
]

export function PainPoints() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative py-28 sm:py-40 bg-off-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="max-w-4xl mx-auto text-center mb-20">
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground leading-[1.1]"
          >
            Why 9 Out of 10 Students Miss Their Target
          </TextReveal>
          <BlurReveal delay={0.4}>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The problems are universal. But so is the solution.
            </p>
          </BlurReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {problems.map((item, i) => (
            <motion.div
              key={item.problem}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white border border-border/50 hover:shadow-lg transition-all duration-500"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="p-6 sm:p-8">
                  <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-3`}>
                    <item.icon size={20} className={item.color} />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground">{item.problem}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.solution}</p>
                </div>
                <div className="hidden sm:flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/[0.02] border-l border-border/50 p-6">
                  <div className="text-center">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1">Our Solution</div>
                    <ArrowRight size={20} className="text-primary mx-auto" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
