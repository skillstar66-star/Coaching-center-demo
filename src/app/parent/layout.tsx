import React from "react"
import Link from "next/link"
import { Calendar, BarChart3, Mail, Heart, LayoutDashboard, LogOut, CheckCircle2 } from "lucide-react"

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sidebarLinks = [
    { label: "Performance Overview", href: "/parent", icon: LayoutDashboard },
    { label: "Attendance Calendar", href: "/parent/attendance", icon: Calendar },
    { label: "Mock Test Records", href: "/parent/reports", icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-[#090615] text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0D0A1E] border-r border-purple-950/40 flex flex-col justify-between shrink-0 p-6">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
              <span className="font-bold text-white text-sm">AA</span>
            </div>
            <div>
              <h2 className="font-heading font-bold text-sm tracking-tight">SkillStar Parent</h2>
              <p className="text-[10px] text-purple-400 font-semibold">Monitoring Suite</p>
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
        <div className="border-t border-purple-950/40 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 font-bold text-xs flex items-center justify-center">
              MS
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">Mr. Sharma</p>
              <p className="text-[9px] text-slate-500">Child: Rohan Sharma</p>
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
