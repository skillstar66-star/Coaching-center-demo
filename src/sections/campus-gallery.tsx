"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Wifi, BookOpen, Monitor, Users, Mic, Coffee, MapPin, Maximize2 } from "lucide-react"
import { TextReveal, BlurReveal } from "@/components/text-reveal"

const facilities = [
  { icon: Monitor, title: "Smart Classrooms", desc: "4K projectors, digital boards, lecture recording" },
  { icon: BookOpen, title: "Digital Library", desc: "10,000+ books, journals, online resources" },
  { icon: Users, title: "Study Lounges", desc: "Collaborative spaces for group learning" },
  { icon: Mic, title: "Seminar Hall", desc: "500-seat auditorium for guest lectures" },
  { icon: Wifi, title: "100 Mbps WiFi", desc: "High-speed internet across campus" },
  { icon: Coffee, title: "Cafeteria", desc: "Nutritious meals and healthy snacks" },
]

const galleryImages = [
  { id: 1, label: "Main Campus Building", src: "/images/main_campus.png" },
  { id: 2, label: "Smart Classroom", src: "/images/smart_classroom.png" },
  { id: 3, label: "Library Reading Hall", src: "/images/library_hall.png" },
  { id: 4, label: "Science Laboratory", src: "/images/science_lab.png" },
  { id: 5, label: "Auditorium", src: "/images/auditorium.png" },
  { id: 6, label: "Cafeteria", src: "/images/cafeteria.png" },
]

export function CampusGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.88, 1])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1])

  const row1X = useTransform(scrollYProgress, [0, 0.5, 1], ["-2%", "0%", "2%"])
  const row2X = useTransform(scrollYProgress, [0, 0.5, 1], ["2%", "0%", "-2%"])

  return (
    <section id="campus" ref={sectionRef} className="relative py-28 sm:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <TextReveal as="h2" className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground leading-[1.1]">
          A Campus That Inspires Greatness
        </TextReveal>
        <BlurReveal delay={0.3}>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Purpose-built for focused learning, collaboration, and holistic growth.
          </p>
        </BlurReveal>
      </div>

      <motion.div
        style={{ scale: imageScale, opacity: imageOpacity }}
        className="relative mx-4 sm:mx-6 mb-20"
      >
        <div className="max-w-7xl mx-auto space-y-4">
          <motion.div style={{ x: row1X }} className="flex gap-4 overflow-hidden">
            {galleryImages.slice(0, 3).map((img) => (
              <div
                key={img.id}
                className="flex-1 min-h-[200px] sm:min-h-[260px] rounded-2xl border border-border/50 flex items-center justify-center relative overflow-hidden group cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 z-10">
                  <div className="flex items-center gap-1.5 text-white/90">
                    <MapPin size={14} className="text-primary" />
                    <p className="text-xs font-semibold uppercase tracking-wider">{img.label}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
                  <Maximize2 size={20} className="text-white/60" />
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div style={{ x: row2X }} className="flex gap-4 overflow-hidden">
            {galleryImages.slice(3).map((img) => (
              <div
                key={img.id}
                className="flex-1 min-h-[200px] sm:min-h-[260px] rounded-2xl border border-border/50 flex items-center justify-center relative overflow-hidden group cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 z-10">
                  <div className="flex items-center gap-1.5 text-white/90">
                    <MapPin size={14} className="text-primary" />
                    <p className="text-xs font-semibold uppercase tracking-wider">{img.label}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
                  <Maximize2 size={20} className="text-white/60" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {facilities.map((facility, i) => {
            const Icon = facility.icon
            return (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group p-4 sm:p-5 rounded-xl bg-white border border-border/50 hover:border-primary/20 hover:shadow-md transition-all duration-500 text-center"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-500">
                  <Icon size={18} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xs sm:text-sm text-foreground mb-1">{facility.title}</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">{facility.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
