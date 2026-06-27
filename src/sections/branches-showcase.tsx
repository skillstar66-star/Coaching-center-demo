"use client"

import { MapPin, Phone, Mail, ArrowRight, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { TextReveal } from "@/components/text-reveal"

interface BranchItem {
  id: string
  name: string
  address: string
  city: string
  state: string
  phone: string
  email: string
  googleMapUrl: string
  slug: string
  photos?: string[]
}

export function BranchesShowcase({ branches }: { branches: BranchItem[] }) {
  return (
    <section id="branches" className="relative py-28 sm:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground leading-[1.1]"
          >
            Our Training Centers
          </TextReveal>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Find an SkillStar center near you. Experience premium infrastructure, expert faculty, and custom study halls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch, i) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-6 rounded-2xl bg-off-white border border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-5 text-primary group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {branch.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {branch.address}, {branch.city}, {branch.state}
                </p>

                <div className="space-y-3 text-xs text-muted-foreground border-t border-border/50 pt-5 mb-6">
                  <a href={`tel:${branch.phone}`} className="flex items-center gap-2.5 hover:text-primary transition-colors">
                    <Phone size={14} className="text-primary/60" />
                    {branch.phone}
                  </a>
                  <a href={`mailto:${branch.email}`} className="flex items-center gap-2.5 hover:text-primary transition-colors">
                    <Mail size={14} className="text-primary/60" />
                    {branch.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 mt-auto">
                <a
                  href={`/branches/${branch.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"
                >
                  Explore Center & Ranks
                  <ArrowRight size={14} />
                </a>

                <a
                  href={branch.googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground font-medium"
                >
                  Google Map
                  <ExternalLink size={10} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
