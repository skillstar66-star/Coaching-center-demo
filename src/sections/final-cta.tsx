"use client"

import { motion } from "framer-motion"
import { ArrowRight, Shield, Phone, MapPin, CheckCircle } from "lucide-react"
import { MagneticButton } from "@/components/magnetic-button"
import { useAdmissionModal } from "@/hooks/use-admission-modal"

const assurances = [
  { icon: Shield, label: "ISO Certified" },
  { icon: CheckCircle, label: "5000+ Selections" },
  { icon: MapPin, label: "Mumbai Campus" },
]

export function FinalCTA() {
  const { open: openAdmission } = useAdmissionModal()
  return (
    <section className="relative py-32 sm:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-[#0F172A] to-primary-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(37,99,235,0.15),transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(96,165,250,0.1),transparent_50%)]" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/60 text-sm font-medium">Limited Seats — Apply Now</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.08] tracking-tight">
            Your Medical Seat
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              Starts Today.
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Join India&apos;s most premium coaching institute. Book a free demo class, talk to our faculty, and see why parents trust us with their child&apos;s future.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              href="tel:+919999999999"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-foreground font-semibold rounded-full text-sm hover:bg-white/90 transition-all duration-300 shadow-2xl"
            >
              <Phone size={16} />
              Call Now: +91 99999 99999
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton
              onClick={openAdmission}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm text-white/80 font-semibold rounded-full text-sm hover:bg-white/10 transition-all duration-300 border border-white/10 cursor-pointer"
            >
              Schedule Campus Visit
            </MagneticButton>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {assurances.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-center gap-2 text-sm">
                  <Icon size={16} className="text-accent" />
                  <span className="text-white/40">{item.label}</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
