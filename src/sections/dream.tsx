"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Stethoscope, Cpu, Building, GraduationCap, Heart, Target } from "lucide-react"
import { TextReveal, BlurReveal } from "@/components/text-reveal"

const aspirations = [
  {
    icon: Stethoscope,
    title: "Doctor",
    desc: "MBBS from AIIMS, MS from top medical colleges",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: Cpu,
    title: "Engineer",
    desc: "IIT Bombay, IIT Delhi, BITS Pilani",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: Building,
    title: "Medical College",
    desc: "Top government and private medical seats",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: GraduationCap,
    title: "IIT",
    desc: "Computer Science, AI, Aerospace at IITs",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
]

export function Dream() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-150px" })

  return (
    <section className="relative py-28 sm:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-off-white to-background" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1]"
          >
            What Does Your Child Dream Of Becoming?
          </TextReveal>
          <BlurReveal delay={0.4}>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every parent wants to see their child succeed. At SkillStar, we turn those dreams into admissions.
            </p>
          </BlurReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aspirations.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                className="group relative p-8 rounded-2xl bg-white border border-border/50 hover:border-primary/20 transition-all duration-500 text-center hover:-translate-y-2 hover:shadow-xl"
              >
                <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon size={28} className={item.color} />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/5 border border-primary/10">
            <Heart size={16} className="text-primary" />
            <span className="text-sm text-primary font-medium">
              Because the right guidance changes everything
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
