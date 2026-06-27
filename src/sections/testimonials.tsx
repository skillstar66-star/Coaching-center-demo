"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote, Play } from "lucide-react"
import { TextReveal, BlurReveal } from "@/components/text-reveal"

const testimonials = [
  {
    name: "Ananya Gupta",
    role: "NEET AIR 156",
    before: "Scored 450 in my first mock test. Had no direction.",
    after: "685/720 in NEET 2025. MBBS at Maulana Azad Medical College.",
    quote: "SkillStar completely transformed my preparation. The faculty doesn't just teach — they mentor. My physics was weak, but the personalized attention helped me score 170+ in NEET Physics.",
    rating: 5,
    type: "student",
    improvement: "+235 marks",
  },
  {
    name: "Suresh Patel",
    role: "Parent of JEE Ranker",
    before: "My son was struggling with self-study. Nothing was working.",
    after: "JEE Advanced AIR 234. Now at IIT Bombay.",
    quote: "As a parent, I was worried about my son's preparation. The regular progress reports and parent-teacher meetings kept us informed. The result speaks for itself.",
    rating: 5,
    type: "parent",
    improvement: "IIT Bombay",
  },
  {
    name: "Rohit Singh",
    role: "JEE Advanced AIR 234",
    before: "Mock test rank was 5000+. Couldn't crack advanced problems.",
    after: "AIR 234 in JEE Advanced 2025. IIT Bombay CSE.",
    quote: "The test series at SkillStar is absolutely brilliant. Every mock test felt like the real JEE exam. The detailed analysis after each test helped me improve my rank from 5000+ to under 300.",
    rating: 5,
    type: "student",
    improvement: "4766 rank jump",
  },
  {
    name: "Meera Joshi",
    role: "NEET AIR 89",
    before: "Failed my first dropper year. Lost all confidence.",
    after: "AIR 89 in NEET 2025. MBBS at AIIMS Delhi.",
    quote: "I joined SkillStar for my dropper year. The structured approach and daily tests kept me on track. The faculty believed in me even when I doubted myself. Forever grateful!",
    rating: 5,
    type: "student",
    improvement: "Top 100 AIR",
  },
]

interface TestimonialItem {
  id?: string
  studentName: string
  course: string
  photoUrl: string
  videoUrl?: string | null
  review: string
  parentReview?: string | null
  year: number
  rank?: string | null
}

export function Testimonials({ items }: { items?: TestimonialItem[] }) {
  const [current, setCurrent] = useState(0)

  const displayTestimonials = items && items.length > 0
    ? items.map(t => ({
        name: t.studentName,
        role: t.rank ? `${t.course} · ${t.rank}` : t.course,
        before: "Aspirant seeking structured guidance.",
        after: `${t.rank || "Secured Top Seat"} in ${t.year}`,
        quote: t.review,
        rating: 5,
        type: t.parentReview ? "parent" : "student",
        improvement: t.rank || "Top Improvement"
      }))
    : testimonials

  const next = () => setCurrent((prev) => (prev + 1) % displayTestimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length)

  if (displayTestimonials.length === 0) return null;

  return (
    <section className="relative py-28 sm:py-40 bg-off-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground leading-[1.1]"
          >
            Real Stories. Real Transformations.
          </TextReveal>
          <BlurReveal delay={0.3}>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Before and after — the numbers don&apos;t lie.
            </p>
          </BlurReveal>
        </div>

        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-white rounded-2xl border border-border/50 p-8 sm:p-10 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Quote size={24} className="text-primary/10" />
                    <span className="inline-flex px-2.5 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-semibold uppercase tracking-wider">
                      {displayTestimonials[current].type === "parent" ? "Parent" : "Student"}
                    </span>
                  </div>

                  <p className="text-base sm:text-lg text-foreground/90 leading-relaxed italic">
                    &ldquo;{displayTestimonials[current].quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-1 mt-4">
                    {Array.from({ length: displayTestimonials[current].rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <span className="text-primary font-heading font-bold text-sm">
                        {displayTestimonials[current].name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-heading font-semibold text-foreground">{displayTestimonials[current].name}</div>
                      <div className="text-sm text-muted-foreground">{displayTestimonials[current].role}</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-white rounded-xl border border-border/50 p-5">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1">Before</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{displayTestimonials[current].before}</p>
                  </div>

                  <div className="relative bg-gradient-to-br from-primary/5 to-primary/[0.02] rounded-xl border border-primary/10 p-5">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-[10px] uppercase tracking-widest text-primary/60 font-semibold">After</div>
                      <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-semibold">
                        {displayTestimonials[current].improvement}
                      </span>
                    </div>
                    <p className="text-sm text-foreground font-medium">{displayTestimonials[current].after}</p>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors text-sm text-muted-foreground hover:text-foreground group">
                    <Play size={14} className="group-hover:text-primary transition-colors" />
                    Watch {displayTestimonials[current].name}&apos;s Story
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border hover:border-primary hover:text-primary transition-all flex items-center justify-center"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {displayTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === current ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/50"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border hover:border-primary hover:text-primary transition-all flex items-center justify-center"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
