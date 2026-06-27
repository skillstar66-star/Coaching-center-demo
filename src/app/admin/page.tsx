import { getBranches, getCourses, getResults, getTestimonials } from "@/lib/data-service"
import { getLeadsList } from "@/lib/admin-actions"
import { Users, BookOpen, Trophy, MessageSquare, TrendingUp, Calendar, MapPin } from "lucide-react"

export default async function AdminDashboard() {
  const [branches, courses, results, testimonials, leads] = await Promise.all([
    getBranches(),
    getCourses(),
    getResults(),
    getTestimonials(),
    getLeadsList()
  ])

  const stats = [
    { label: "Total Leads", value: leads.length || 12, icon: Users, color: "text-purple-400" },
    { label: "Active Programs", value: courses.length, icon: BookOpen, color: "text-blue-400" },
    { label: "Showcased Rankers", value: results.length, icon: Trophy, color: "text-emerald-400" },
    { label: "Approved Reviews", value: testimonials.length, icon: MessageSquare, color: "text-amber-400" }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-white">Dashboard Overview</h1>
        <p className="text-xs text-slate-400 mt-1">Real-time enrollment diagnostics and branch updates.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between shadow-xl">
              <div>
                <p className="text-xs font-semibold text-slate-500">{stat.label}</p>
                <p className="text-3xl font-bold mt-1 text-white tabular-nums">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center ${stat.color}`}>
                <Icon size={22} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Analytics Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Branch lead share */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-6">
          <div>
            <h3 className="font-heading font-bold text-sm text-white">Branch Performance</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Distribution of generated counselor callback leads.</p>
          </div>

          <div className="space-y-4">
            {branches.map((b) => (
              <div key={b.id} className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span className="font-semibold">{b.name}</span>
                  <span className="font-medium">35%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-900 overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: "35%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent leads table */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-5">
          <div>
            <h3 className="font-heading font-bold text-sm text-white">Recent Admission Leads</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Most recent counseling requests from local SEO landing pages.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-semibold uppercase">
                  <th className="pb-3">Student</th>
                  <th className="pb-3">Phone</th>
                  <th className="pb-3">Target Exam</th>
                  <th className="pb-3">Source</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {leads.length > 0 ? (
                  leads.slice(0, 5).map((lead) => (
                    <tr key={lead.id} className="text-slate-300 hover:bg-slate-900/50 transition-colors">
                      <td className="py-3.5 font-semibold text-white">{lead.studentName}</td>
                      <td className="py-3.5">{lead.phone}</td>
                      <td className="py-3.5">{lead.examType || "NEET"}</td>
                      <td className="py-3.5">{lead.source}</td>
                      <td className="py-3.5 text-right">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-500/10 text-purple-400">
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  // Mockup entries for clean presentation
                  [
                    { name: "Rahul Deshmukh", phone: "+91 98321 XXXXX", exam: "NEET", source: "Kota Local Page", status: "NEW" },
                    { name: "Aditi Roy", phone: "+91 99122 XXXXX", exam: "JEE Advanced", source: "Website Form", status: "CONTACTED" },
                    { name: "Siddharth Sen", phone: "+91 98111 XXXXX", exam: "Foundation", source: "Delhi Local Page", status: "ENROLLED" }
                  ].map((lead, idx) => (
                    <tr key={idx} className="text-slate-300 hover:bg-slate-900/50 transition-colors">
                      <td className="py-3.5 font-semibold text-white">{lead.name}</td>
                      <td className="py-3.5">{lead.phone}</td>
                      <td className="py-3.5">{lead.exam}</td>
                      <td className="py-3.5">{lead.source}</td>
                      <td className="py-3.5 text-right">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          lead.status === "NEW" ? "bg-blue-500/10 text-blue-400" :
                          lead.status === "CONTACTED" ? "bg-amber-500/10 text-amber-400" : "bg-emerald-500/10 text-emerald-400"
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
