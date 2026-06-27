"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Play, CheckCircle, TrendingUp, Award, Users, Star, GraduationCap, Target, Sparkles, BookOpen, Clock } from "lucide-react"
import { TextReveal } from "@/components/text-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { useAdmissionModal } from "@/hooks/use-admission-modal"

const trustCards = [
  { icon: Star, value: "42", label: "NEET Top 1000", desc: "Rankers in 3 years", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  { icon: TrendingUp, value: "98.6%", label: "Success Rate", desc: "Students qualifying yearly", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { icon: Award, value: "5000+", label: "Selections", desc: "Medical & Engineering", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { icon: Users, value: "50+", label: "Expert Faculty", desc: "From IITs & AIIMS", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
]

export function Hero() {
  const { open: openAdmission } = useAdmissionModal()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const rightColY = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <section id="hero" ref={containerRef} className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#05020c]">
      {/* Background Gradient Maps */}
      <motion.div className="absolute inset-0 bg-gradient-to-br from-[#080510] via-[#0F0A1C] to-[#25103F]" style={{ opacity: bgOpacity }} />
      
      {/* Pinned Glowing Lights */}
      <div className="absolute inset-0">
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-purple-600/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[30%] right-[15%] w-[400px] h-[400px] rounded-full bg-violet-600/8 blur-[150px] animate-pulse" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      {/* Clean Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" />

      <motion.div style={{ y: contentY }} className="relative w-full pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* LEFT: Premium Typography & Brand CTA */}
            <div className="lg:col-span-6 space-y-8">
              {/* Admissions Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">Admissions Open 2026-27</span>
              </motion.div>

              {/* Enhanced Hero Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-[1.05] tracking-tight text-white">
                  From Dream to Doctor. <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-400">
                    From Aspiration to IIT.
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-lg">
                  India&apos;s most premium coaching institute. 42 NEET rankers in top 1000. 28 JEE Advanced in top 500. Learn from IIT & AIIMS expert faculty.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <MagneticButton
                  onClick={openAdmission}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full text-sm hover:bg-primary-dark transition-all duration-300 shadow-2xl shadow-primary/20 hover:shadow-primary/40 cursor-pointer"
                >
                  Book Free Counseling
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
                <MagneticButton
                  onClick={openAdmission}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm text-white/90 font-semibold rounded-full text-sm hover:bg-white/10 transition-all duration-300 border border-white/10 cursor-pointer"
                >
                  Apply Online
                </MagneticButton>
              </div>

            </div>

            {/* RIGHT: Bento Student Analytics Mockup Dashboard */}
            <motion.div style={{ y: rightColY }} className="lg:col-span-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                
                {/* Large Bento Card: Live Class & Progress */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ y: -4, borderColor: "rgba(147, 51, 234, 0.4)", backgroundColor: "rgba(255, 255, 255, 0.06)" }}
                  className="sm:col-span-8 rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[280px]"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full bg-primary/5 -z-10" />
                  
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/40 flex items-center justify-center font-heading font-bold text-white text-sm">
                        RS
                      </div>
                      <div>
                        <div className="text-white/90 text-xs font-semibold">Rohan Sharma</div>
                        <div className="text-[9px] text-white/50">NEET Target 2026</div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-[9px] font-bold uppercase tracking-wider border border-emerald-500/20">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" /> Live Class
                    </span>
                  </div>

                  {/* Course list progress */}
                  <div className="space-y-4 my-auto py-2">
                    {[
                      { subject: "Physics (Mechanics)", progress: 78, color: "bg-purple-500" },
                      { subject: "Chemistry (Organic)", progress: 84, color: "bg-emerald-400" },
                      { subject: "Biology (Genetics)", progress: 91, color: "bg-indigo-400" }
                    ].map((subj) => (
                      <div key={subj.subject} className="space-y-1">
                        <div className="flex justify-between text-[10px] text-white/60">
                          <span>{subj.subject}</span>
                          <span className="font-semibold text-white/90">{subj.progress}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${subj.progress}%` }}
                            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                            className={`h-full rounded-full ${subj.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer status */}
                  <div className="flex items-center justify-between text-[9px] text-white/40 border-t border-white/10 pt-4">
                    <span>Attendance Rate: 91.5%</span>
                    <span className="text-emerald-300 font-semibold">Class starts in 10 mins</span>
                  </div>
                </motion.div>

                {/* Small Bento Card: Target Rank */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ y: -4, borderColor: "rgba(147, 51, 234, 0.5)", backgroundColor: "rgba(147, 51, 234, 0.35)" }}
                  className="sm:col-span-4 rounded-2xl bg-gradient-to-b from-[#9333EA]/35 to-[#6B21A8]/15 border border-primary/30 backdrop-blur-xl p-6 shadow-2xl flex flex-col justify-between min-h-[280px]"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                    <Target size={20} />
                  </div>
                  <div className="mt-auto">
                    <span className="text-[9px] uppercase font-bold text-white/50 tracking-wider">NEET Rank Wall</span>
                    <span className="text-3xl font-heading font-bold text-white mt-1 block">AIR #42</span>
                    <span className="text-[10px] text-purple-200 font-semibold mt-1 block">AIIMS Delhi Target</span>
                  </div>
                </motion.div>

              </div>

              {/* Bento Row 2: Secondary stats and metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                
                {/* Performance Analytics Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ y: -4, borderColor: "rgba(147, 51, 234, 0.4)", backgroundColor: "rgba(255, 255, 255, 0.06)" }}
                  className="sm:col-span-4 p-5 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-sm flex items-center gap-3 min-h-[90px] cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-300 border border-emerald-500/20">
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <span className="text-[9px] text-white/50 uppercase block">Mock Tests</span>
                    <span className="text-sm font-semibold text-white mt-0.5 block">685/720 Score</span>
                  </div>
                </motion.div>

                {/* Study Planner Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ y: -4, borderColor: "rgba(147, 51, 234, 0.4)", backgroundColor: "rgba(255, 255, 255, 0.06)" }}
                  className="sm:col-span-8 p-5 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-sm flex items-center justify-between min-h-[90px] cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-500/15 flex items-center justify-center text-indigo-300 border border-indigo-500/20">
                      <BookOpen size={16} />
                    </div>
                    <div>
                      <span className="text-[9px] text-white/50 uppercase block">Daily Planner</span>
                      <span className="text-xs font-semibold text-white mt-0.5 block">Chapter revision checklist</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/70 text-[9px] font-semibold">
                    2 Pending
                  </span>
                </motion.div>

              </div>
            </motion.div>

          </div>


        </div>
      </motion.div>
    </section>
  )
}
