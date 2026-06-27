import { Calendar, User, MessageSquare, Clipboard, Star, BarChart3 } from "lucide-react"

export default function ParentDashboard() {
  const child = {
    name: "Rohan Sharma",
    roll: "#2026-NEET-042",
    program: "NEET 2-Year Classroom Program",
    branch: "Kota Center"
  }

  const reports = [
    { testName: "Full Physics Syllabus Test", subject: "Physics", score: "148/180", avgScore: "110/180", status: "Above Average" },
    { testName: "Biochemistry & Genetics Test", subject: "Biology", score: "340/360", avgScore: "290/360", status: "Outstanding" },
    { testName: "Organic Mechanism mock #4", subject: "Chemistry", score: "155/180", avgScore: "125/180", status: "Above Average" }
  ]

  const facultyNotes = [
    { faculty: "Dr. Ramesh Gupta (HOD Physics)", note: "Rohan is highly attentive in class but sometimes rushes through mechanics numerical calculations. We advise spending an extra 15 minutes reviewing steps in errors logbook.", date: "June 20, 2026" },
    { faculty: "Dr. Sneha Patel (Zoology)", note: "Excellent grasping of genetics principles. Led the classroom discussion on transcription factors. Score of 340/360 in biochemistry mocks is a solid milestone.", date: "June 18, 2026" }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-white">Student Progress Report</h1>
        <p className="text-xs text-slate-400 mt-1">Monitoring portal for student: <span className="text-purple-400 font-semibold">{child.name}</span> ({child.roll})</p>
      </div>

      {/* Child Specs */}
      <div className="p-5 rounded-2xl bg-[#0D0A1E] border border-purple-950/40 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Classroom Program</span>
          <span className="text-sm font-semibold text-white mt-1 block">{child.program}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Current Location</span>
          <span className="text-sm font-semibold text-white mt-1 block">{child.branch}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Roll Identifier</span>
          <span className="text-sm font-semibold text-white mt-1 block">{child.roll}</span>
        </div>
      </div>

      {/* Test Scores Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0D0A1E] border border-purple-950/40 shadow-xl space-y-6">
          <div>
            <h3 className="font-heading font-semibold text-sm text-white">Mock Test Performance</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Summary of academic mock test sheets written at the center.</p>
          </div>

          <div className="space-y-4">
            {reports.map((r, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex justify-between items-center gap-4 text-xs">
                <div className="space-y-1">
                  <h4 className="font-semibold text-white">{r.testName}</h4>
                  <p className="text-[10px] text-slate-500">{r.subject} · Batch Average: {r.avgScore}</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-purple-400 block">{r.score}</span>
                  <span className="text-[9px] text-emerald-400 font-semibold">{r.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Faculty remarks card */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0D0A1E] border border-purple-950/40 shadow-xl space-y-6">
          <div>
            <h3 className="font-heading font-semibold text-sm text-white">Mentor Feedback & Notes</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Direct counselor inputs from classroom teaching faculty.</p>
          </div>

          <div className="space-y-4">
            {facultyNotes.map((fn, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/80 space-y-2 text-xs">
                <div className="flex justify-between items-baseline gap-2">
                  <span className="font-semibold text-white">{fn.faculty}</span>
                  <span className="text-[9px] text-slate-500 shrink-0">{fn.date}</span>
                </div>
                <p className="text-slate-400 leading-relaxed italic">&ldquo;{fn.note}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
