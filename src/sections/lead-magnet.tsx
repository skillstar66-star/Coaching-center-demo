"use client"

import { motion } from "framer-motion"
import { Target, BarChart3, Compass, BookOpen, ClipboardCheck, ArrowRight, Sparkles } from "lucide-react"
import { TextReveal, BlurReveal } from "@/components/text-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { useAdmissionModal } from "@/hooks/use-admission-modal"

const tools = [
  {
    icon: Target,
    title: "NEET Rank Predictor",
    desc: "Answer 50 questions and get your predicted NEET rank instantly.",
    action: "Predict My Rank",
    color: "text-purple-500",
    bg: "bg-purple-50",
    badge: "Free",
  },
  {
    icon: BarChart3,
    title: "JEE Readiness Test",
    desc: "Assess your preparation level with our AI-powered diagnostic test.",
    action: "Start Assessment",
    color: "text-violet-500",
    bg: "bg-violet-50",
    badge: "Free",
  },
  {
    icon: Compass,
    title: "Career Guidance Session",
    desc: "Speak with our expert counselors and plan your medical or engineering career.",
    action: "Book Session",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    badge: "Free",
  },
  {
    icon: BookOpen,
    title: "Free Study Planner",
    desc: "Get a personalized 2-year study plan based on your target exam and current level.",
    action: "Download Planner",
    color: "text-amber-500",
    bg: "bg-amber-50",
    badge: "Free",
  },
]

export function LeadMagnet() {
  const { open: openAdmission } = useAdmissionModal()
  return (
    <section className="relative py-28 sm:py-40 bg-off-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <BlurReveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-4">
              <Sparkles size={12} className="text-primary" />
              <span className="text-primary text-xs font-medium">Free Resources</span>
            </span>
          </BlurReveal>
          <TextReveal as="h2" className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground leading-[1.1]">
            Know Where You Stand — For Free
          </TextReveal>
          <BlurReveal delay={0.3}>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Get a clear picture of your preparation level with our free assessment tools.
            </p>
          </BlurReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map((tool, i) => {
            const Icon = tool.icon
            return (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-6 sm:p-7 rounded-2xl bg-white border border-border/50 hover:border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${tool.bg} flex items-center justify-center`}>
                    <Icon size={22} className={tool.color} />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-semibold uppercase tracking-wider">
                    {tool.badge}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{tool.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{tool.desc}</p>
                <button
                  onClick={openAdmission}
                  className="mt-5 inline-flex items-center gap-2 text-sm text-primary font-semibold group/link cursor-pointer text-left w-fit"
                >
                  {tool.action}
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-muted-foreground">
            ⚡ No spam. No commitment required. Just pure value.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
