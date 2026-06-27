"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, MapPin, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useAdmissionModal } from "@/hooks/use-admission-modal"

const navLinks = [
  { label: "Results", href: "/#results" },
  { label: "Faculty", href: "/#faculty" },
  { label: "Courses", href: "/#courses" },
  { label: "Branches", href: "/#branches" },
  { label: "Contact", href: "/#contact" },
]

// Standalone fallback list to guarantee instant render
const STATIC_BRANCH_LINKS = [
  { name: "Kota Head Office", slug: "kota" },
  { name: "Delhi Janakpuri Center", slug: "delhi-janakpuri" },
  { name: "Mumbai Andheri Center", slug: "mumbai-andheri" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [branchOpen, setBranchOpen] = useState(false)
  const [branches, setBranches] = useState(STATIC_BRANCH_LINKS)
  const { open: openAdmission } = useAdmissionModal()

  const displayLinks = scrolled
    ? [{ label: "Home", href: "/" }, ...navLinks]
    : navLinks

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })

    // Optional dynamic branch loading
    fetch("/api/branches")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setBranches(data.map(b => ({ name: b.name, slug: b.slug })))
        }
      })
      .catch(() => {}) // Fallback quietly

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isMobile?: boolean) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      if (href === "/" || href.startsWith("/#")) {
        e.preventDefault()
        const targetId = href === "/" ? "hero" : href.substring(2)
        const element = document.getElementById(targetId)
        
        if (isMobile) {
          setMobileOpen(false)
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ behavior: "smooth" })
            }, 300)
          }
        } else {
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }
      }
    } else {
      if (isMobile) {
        setMobileOpen(false)
      }
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        scrolled
          ? "bg-white/80 backdrop-blur-2xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        <a href="/" onClick={(e) => handleNavLinkClick(e, "/")} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-bold text-sm tracking-tight">AA</span>
          </div>
          <span
            className={cn(
              "font-heading font-semibold text-lg tracking-tight transition-colors duration-300",
              scrolled ? "text-foreground" : "text-white"
            )}
          >
            SkillStar
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {displayLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavLinkClick(e, link.href)}
              className={cn(
                "text-sm font-medium transition-colors duration-300 relative group",
                scrolled ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white"
              )}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          {/* Branch Dropdown */}
          <div className="relative">
            <button
              suppressHydrationWarning
              onClick={() => setBranchOpen(!branchOpen)}
              onMouseEnter={() => setBranchOpen(true)}
              className={cn(
                "text-sm font-medium transition-colors duration-300 flex items-center gap-1 hover:opacity-80",
                scrolled ? "text-foreground/70" : "text-white/70"
              )}
            >
              Centers
              <ChevronDown size={14} className={cn("transition-transform duration-300", branchOpen ? "rotate-180" : "")} />
            </button>
            
            <AnimatePresence>
              {branchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onMouseLeave={() => setBranchOpen(false)}
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-border/50 shadow-2xl p-2 z-50"
                >
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider px-3 py-2 border-b border-border/30 mb-1 flex items-center gap-1.5">
                    <MapPin size={10} className="text-primary" /> Select a Branch
                  </div>
                  {branches.map((b) => (
                    <a
                      key={b.slug}
                      href={`/branches/${b.slug}`}
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-foreground/80 hover:bg-primary/5 hover:text-primary transition-all"
                    >
                      {b.name}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            suppressHydrationWarning
            onClick={openAdmission}
            className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95 cursor-pointer animate-pulse-subtle"
          >
            Book Free Demo
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          suppressHydrationWarning
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn(
            "lg:hidden p-2 rounded-lg transition-colors duration-300",
            scrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
          )}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:hidden bg-white border-b border-border overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
              <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-2">Navigation</div>
              {displayLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href, true)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="text-sm font-semibold text-foreground/80 hover:text-primary py-2.5 px-2 rounded-lg hover:bg-muted transition-all"
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mt-4 mb-2">Our Branches</div>
              {branches.map((b, i) => (
                <motion.a
                  key={b.slug}
                  href={`/branches/${b.slug}`}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.04 }}
                  className="text-xs font-medium text-foreground/60 hover:text-primary py-2 px-4 rounded-lg hover:bg-muted transition-all flex items-center gap-2"
                >
                  <MapPin size={12} className="text-primary" /> {b.name}
                </motion.a>
              ))}

              <motion.button
                suppressHydrationWarning
                onClick={() => {
                  setMobileOpen(false)
                  openAdmission()
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-5 px-5 py-3 bg-primary text-white text-sm font-semibold rounded-full text-center hover:bg-primary-dark transition-colors cursor-pointer"
              >
                Book Free Demo
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
