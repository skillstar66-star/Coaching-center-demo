"use client"

import { motion } from "framer-motion"
import { ClipboardCheck, BookOpen, Repeat, Target, GraduationCap, Trophy } from "lucide-react"

const steps = [
  {
    icon: ClipboardCheck,
    title: "Assessment",
    desc: "Diagnostic test to map strengths and identify initial weak areas.",
  },
  {
    icon: BookOpen,
    title: "Learning",
    desc: "Structured curriculum taught by IIT & AIIMS expert faculty.",
  },
  {
    icon: Repeat,
    title: "Testing",
    desc: "Weekly mock exams with detailed AI performance analysis.",
  },
  {
    icon: Target,
    title: "Weakness Fix",
    desc: "1:1 doubt workshops, remedial classes, and customized assignments.",
  },
  {
    icon: GraduationCap,
    title: "Exam Drills",
    desc: "Time management drills and exam temperament training.",
  },
  {
    icon: Trophy,
    title: "Selection",
    desc: "Comprehensive counseling, college selection, and career planning.",
  },
]

export function Transformation() {
  return (
    <section id="transformation" className="relative py-20 bg-[#05020c] overflow-hidden border-t border-white/5">
      {/* Background radial highlights */}
      <div className="absolute inset-0">
        <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] rounded-full bg-purple-600/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[300px] h-[300px] rounded-full bg-violet-600/5 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">The SkillStar System</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            A Proven System That Creates Rankers
          </h2>
          <p className="mt-3 text-sm text-white/40 max-w-md mx-auto">
            Six stages. Two years. One clean, high-performance transformation.
          </p>
        </div>

        {/* 3x2 Grid for Desktop, Stacking on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4, borderColor: "rgba(147, 51, 234, 0.4)", backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm transition-all duration-300 flex flex-col gap-4 cursor-default min-h-[160px]"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:text-white transition-colors duration-300">
                    <Icon size={18} />
                  </div>
                  <span className="text-white/20 text-xs font-mono font-bold group-hover:text-primary/40 transition-colors">0{i + 1}</span>
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-heading font-semibold text-white text-base">{step.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed group-hover:text-white/50 transition-colors">{step.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
