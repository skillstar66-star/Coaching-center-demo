import React from "react"
import Link from "next/link"
import { LayoutDashboard, Users, BookOpen, Trophy, MessageSquare, HelpCircle, LogOut } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sidebarLinks = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Leads Panel", href: "/admin/leads", icon: Users },
    { label: "Courses CMS", href: "/admin/courses", icon: BookOpen },
    { label: "Results CMS", href: "/admin/results", icon: Trophy },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { label: "FAQs CMS", href: "/admin/faqs", icon: HelpCircle },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0 p-6">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
              <span className="font-bold text-white text-sm">AA</span>
            </div>
            <div>
              <h2 className="font-heading font-bold text-sm tracking-tight">SkillStar Admin</h2>
              <p className="text-[10px] text-slate-500 font-medium">Enterprise Suite</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {sidebarLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-all group"
                >
                  <Icon size={16} className="text-slate-500 group-hover:text-purple-400 transition-colors" />
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* User profile / Logout */}
        <div className="border-t border-slate-800 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 font-bold text-xs flex items-center justify-center">
              SA
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">Super Admin</p>
              <p className="text-[9px] text-slate-500">admin@skillstar.com</p>
            </div>
          </div>
          <Link href="/" className="text-slate-500 hover:text-red-400 transition-colors" aria-label="Sign out">
            <LogOut size={16} />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 sm:p-10">
        {children}
      </main>
    </div>
  )
}
