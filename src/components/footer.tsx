import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react"
import Link from "next/link"

const footerLinks = {
  Courses: [
    { label: "NEET Coaching", href: "#courses" },
    { label: "JEE Coaching", href: "#courses" },
    { label: "Foundation", href: "#courses" },
    { label: "Repeaters", href: "#courses" },
  ],
  Results: [
    { label: "NEET Results", href: "#results" },
    { label: "JEE Results", href: "#results" },
    { label: "Medical Selections", href: "#results" },
    { label: "IIT Selections", href: "#results" },
  ],
  Institute: [
    { label: "About Us", href: "#" },
    { label: "Faculty", href: "#faculty" },
    { label: "Campus", href: "#campus" },
    { label: "Careers", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-heading font-semibold text-lg">
                SkillStar
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              India&apos;s most premium NEET and JEE coaching institute, building tomorrow&apos;s doctors and engineers.
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <a href="tel:+919999999999" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={14} className="text-primary" />
                +91 99999 99999
              </a>
              <a href="mailto:hello@skillstar.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={14} className="text-primary" />
                hello@skillstar.com
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} className="text-primary" />
                Mumbai, Maharashtra
              </span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-sm mb-4 text-white/90">
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight size={12} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} SkillStar. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
