"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"
import { TextReveal } from "@/components/text-reveal"

const faqs = [
  {
    q: "What is the admission process?",
    a: "Admission begins with a free diagnostic test to assess your current level. Based on results, we recommend the right program. You can register online or visit our campus for a counseling session with our academic advisors.",
  },
  {
    q: "Are classes online or offline?",
    a: "We offer both. Our flagship program is offline at our Mumbai campus. Live online classes feature the same faculty, study material, and test series with real-time interaction and doubt resolution.",
  },
  {
    q: "What is the batch size?",
    a: "We maintain small batches of 30-40 students per class to ensure personalized attention. Every student gets individual doubt-clearing sessions and a dedicated mentor.",
  },
  {
    q: "How do you track progress?",
    a: "Our proprietary tracking system provides detailed performance reports after every test. Students and parents get weak area analysis, rank predictions, and personalized improvement plans.",
  },
  {
    q: "Is there a demo class available?",
    a: "Absolutely. We offer free demo classes for all programs. Experience our teaching methodology before enrolling. Book through our website or visit the campus.",
  },
  {
    q: "What is your success rate?",
    a: "Over 98% of our students qualify for NEET/JEE. In the last 3 years: 42 NEET rankers in top 1000, 28 JEE Advanced in top 500, 320+ medical admissions, 180+ IIT admissions.",
  },
  {
    q: "Do you provide hostel facilities?",
    a: "Yes, we partner with nearby hostels and PG accommodations. Our team helps outstation students find safe, comfortable housing near campus with all amenities.",
  },
]

interface FAQItem {
  id?: string
  question: string
  answer: string
  category?: string
}

export function FAQ({ items }: { items?: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  const displayFaqs = items && items.length > 0
    ? items.map(f => ({ q: f.question, a: f.answer }))
    : faqs

  return (
    <section id="faq" className="relative py-28 sm:py-40 bg-off-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground leading-[1.1]"
          >
            Everything You Need to Know
          </TextReveal>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Still have questions? We&apos;re here to help.
          </p>
        </div>

        <div className="space-y-3">
          {displayFaqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className={`rounded-xl border transition-all duration-500 ${
                openIndex === i
                  ? "border-primary/20 bg-white shadow-md"
                  : "border-border/50 bg-white hover:border-border"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
              >
                <span className="font-heading font-medium text-sm sm:text-base text-foreground pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-muted-foreground shrink-0 transition-transform duration-500 ${
                    openIndex === i ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
