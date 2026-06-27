"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, BarChart3, Target, ArrowRight, Percent, Brain, Sparkles } from "lucide-react"
import { TextReveal, BlurReveal } from "@/components/text-reveal"
import { MagneticButton } from "@/components/magnetic-button"

const calculators = [
  {
    icon: Percent,
    title: "NEET Rank Predictor",
    desc: "Input your mock test scores and get your predicted NEET rank and college options.",
    accuracy: "92% accuracy",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: Brain,
    title: "JEE Readiness Score",
    desc: "Take a 30-question diagnostic and get your JEE Main & Advanced readiness score.",
    accuracy: "Instantly calculated",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: Calculator,
    title: "Success Probability",
    desc: "Based on your current preparation level, topic mastery, and consistency score.",
    accuracy: "AI-powered analysis",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: BarChart3,
    title: "Career Path Assessment",
    desc: "Discover which career path — medical or engineering — aligns with your strengths.",
    accuracy: "Psychometric backed",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
]

export function SuccessTools() {
  const [activeTool, setActiveTool] = useState<number | null>(null)

  return (
    <section className="relative py-28 sm:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-off-white to-background" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <BlurReveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-4">
              <Sparkles size={12} className="text-primary" />
              <span className="text-primary text-xs font-medium">Success Tools</span>
            </span>
          </BlurReveal>
          <TextReveal as="h2" className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground leading-[1.1]">
            Know Your Score. Know Your Future.
          </TextReveal>
          <BlurReveal delay={0.3}>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Use our free AI-powered tools to assess your preparation level.
            </p>
          </BlurReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {calculators.map((tool, i) => {
            const Icon = tool.icon
            return (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-6 rounded-2xl bg-white border border-border/50 hover:border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col cursor-pointer"
                onClick={() => setActiveTool(activeTool === i ? null : i)}
              >
                <div className={`w-12 h-12 rounded-xl ${tool.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={22} className={tool.color} />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{tool.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{tool.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[10px] text-primary font-semibold uppercase tracking-wider">{tool.accuracy}</span>
                  <ArrowRight size={14} className="text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
