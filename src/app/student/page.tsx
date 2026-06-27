import { BookOpen, FileText, CheckCircle, Clock, Bell, Download, Award } from "lucide-react"

export default function StudentDashboard() {
  const stats = [
    { label: "Class Attendance", value: "91.5%", desc: "Target min 85%", color: "text-indigo-400" },
    { label: "Syllabus Progress", value: "78.2%", desc: "Expected 75% today", color: "text-purple-400" },
    { label: "Latest Mock Score", value: "645/720", desc: "Rank: #12 in center", color: "text-emerald-400" },
    { label: "Open Assignments", value: "2 Pending", desc: "Due within 48 hours", color: "text-amber-400" }
  ]

  const materials = [
    { title: "Electrodynamics Formula Workbook", subject: "Physics", size: "4.2 MB", type: "PDF" },
    { title: "Organic Carbonyl Group Revision Sheet", subject: "Chemistry", size: "2.8 MB", type: "PDF" },
    { title: "Genetics & Recombination Workbook", subject: "Biology", size: "5.1 MB", type: "PDF" }
  ]

  const alerts = [
    { title: "NEET Mock Test #8 rescheduled", date: "Today", text: "The test scheduled for Saturday is shifted to Sunday 9:00 AM due to board practical matches.", urgency: "High" },
    { title: "New Assignment Published", date: "Yesterday", text: "Physics Mechanics workbook II is uploaded. Check assignment list for submission.", urgency: "Normal" }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">Welcome back, Rohan</h1>
          <p className="text-xs text-slate-400 mt-1">NEET 2-Year Program (AIR Target 100) · Kota Center</p>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold flex items-center gap-1.5">
          <Award size={14} /> Center Rank #12
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 rounded-2xl bg-[#0A0E1A] border border-slate-800 shadow-xl space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">{stat.label}</span>
            <div className="flex justify-between items-baseline">
              <span className="text-3xl font-bold text-white tabular-nums">{stat.value}</span>
              <span className={`text-[10px] font-semibold ${stat.color}`}>{stat.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Alerts & Updates */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0A0E1A] border border-slate-800 shadow-xl space-y-6">
          <div>
            <h3 className="font-heading font-semibold text-sm text-white">Academic Announcements</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Most recent updates from faculty and center counselors.</p>
          </div>

          <div className="space-y-4">
            {alerts.map((a, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex gap-3.5 items-start">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  a.urgency === "High" ? "bg-red-500/10 text-red-400" : "bg-indigo-500/10 text-indigo-400"
                }`}>
                  <Bell size={16} />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-baseline gap-2">
                    <h4 className="font-semibold text-xs text-white">{a.title}</h4>
                    <span className="text-[9px] text-slate-500 font-medium shrink-0">{a.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Study materials download block */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0A0E1A] border border-slate-800 shadow-xl space-y-6">
          <div>
            <h3 className="font-heading font-semibold text-sm text-white">Study Materials</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Latest revision sheets, handouts and workbooks published.</p>
          </div>

          <div className="space-y-3">
            {materials.map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 text-indigo-400">
                    <BookOpen size={16} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-xs text-white truncate">{m.title}</h4>
                    <span className="text-[9px] text-slate-500 font-semibold">{m.subject} · {m.size}</span>
                  </div>
                </div>

                <button className="p-2 text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all">
                  <Download size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
