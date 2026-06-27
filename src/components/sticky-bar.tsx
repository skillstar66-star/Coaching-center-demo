"use client"

import { Phone, MessageCircle, FileDown, Calendar } from "lucide-react"
import { motion } from "framer-motion"

export function StickyBar() {
  return (
    <>
      <div className="hidden md:block fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl border-t border-border/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">📞 Talk to our academic counselor:</span>
            <a href="tel:+919999999999" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
              +91 99999 99999
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#demo"
              className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/30"
            >
              <Calendar size={14} />
              Book Free Demo
            </a>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-500 text-white text-sm font-semibold rounded-full hover:bg-emerald-600 transition-all duration-300"
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2 bg-muted text-foreground/80 text-sm font-semibold rounded-full hover:bg-muted/80 transition-all duration-300 border border-border"
            >
              <FileDown size={14} />
              Brochure
            </a>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-2xl border-t border-border shadow-2xl safe-area-bottom"
      >
        <div className="flex items-center justify-around h-16 px-2">
          <a
            href="tel:+919999999999"
            className="flex flex-col items-center gap-0.5 px-3 py-1"
          >
            <Phone size={18} className="text-primary" />
            <span className="text-[10px] text-foreground/70 font-medium">Call</span>
          </a>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-0.5 px-3 py-1"
          >
            <MessageCircle size={18} className="text-emerald-500" />
            <span className="text-[10px] text-foreground/70 font-medium">WhatsApp</span>
          </a>
          <a
            href="#demo"
            className="flex items-center gap-2 px-5 py-2 bg-primary text-white text-xs font-semibold rounded-full shadow-lg shadow-primary/25 -mt-3"
          >
            <Calendar size={14} />
            Book Demo
          </a>
          <a
            href="#"
            className="flex flex-col items-center gap-0.5 px-3 py-1"
          >
            <FileDown size={18} className="text-foreground/60" />
            <span className="text-[10px] text-foreground/70 font-medium">Brochure</span>
          </a>
          <a
            href="#contact"
            className="flex flex-col items-center gap-0.5 px-3 py-1"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/60">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-[10px] text-foreground/70 font-medium">Visit</span>
          </a>
        </div>
      </motion.div>
    </>
  )
}
