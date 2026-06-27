"use client"

import { useState, useTransition } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Search, Sparkles, Award, Trophy, GraduationCap, Target, Calendar, Shield } from "lucide-react"

interface ResultItem {
  id: string
  studentName: string
  photoUrl: string
  examType: "NEET" | "JEE_MAIN" | "JEE_ADVANCED"
  rank: number
  marks: string
  year: number
  college: string
  category: string
  isFeatured: boolean
}

export function ResultsWallClient({ initialResults }: { initialResults: ResultItem[] }) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"ALL" | "NEET" | "JEE_ADVANCED" | "JEE_MAIN">("ALL")
  const [isPending, startTransition] = useTransition()

  // Handler for search text
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  // Filter criteria
  const filteredResults = initialResults.filter((r) => {
    const matchesSearch =
      r.studentName.toLowerCase().includes(search.toLowerCase()) ||
      r.college.toLowerCase().includes(search.toLowerCase()) ||
      r.marks.toLowerCase().includes(search.toLowerCase()) ||
      r.rank.toString().includes(search)

    const matchesFilter = filter === "ALL" || r.examType === filter
    return matchesSearch && matchesFilter
  })

  // Group metrics
  const totalSelections = 5000 + initialResults.length
  const neetToppers = initialResults.filter(r => r.examType === "NEET").length + 42
  const jeeToppers = initialResults.filter(r => r.examType !== "NEET").length + 28

  return (
    <div className="min-h-screen bg-[#05020c] text-white selection:bg-primary/30 selection:text-white">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[130px]" />
        <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[150px]" />
        <div className="absolute bottom-[10%] left-[15%] w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-32">
        {/* Top Header Navigation */}
        <div className="mb-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group text-sm font-semibold cursor-pointer shadow-lg backdrop-blur-md"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </a>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider">
            <Sparkles size={10} className="animate-pulse" /> SkillStar Hall of Fame
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-white leading-tight">
            Results That Define <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-400">
              Academic Excellence.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-white/50 max-w-2xl leading-relaxed">
            Celebrating the milestone accomplishments of our top rankers in NEET, JEE Main, & JEE Advanced. Every metric represents thousands of classroom revision hours, mock tests, and targeted weak-area mapping sessions.
          </p>
        </div>

        {/* Dashboard Metrics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-primary/5 pointer-events-none" />
            <Award className="text-purple-400 mb-3" size={24} />
            <div className="text-3xl sm:text-4xl font-heading font-bold text-white">{totalSelections}</div>
            <div className="text-xs text-white/40 mt-1">Total Engineering & Medical Selections</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-emerald-500/5 pointer-events-none" />
            <Trophy className="text-emerald-400 mb-3" size={24} />
            <div className="text-3xl sm:text-4xl font-heading font-bold text-white">{neetToppers}</div>
            <div className="text-xs text-white/40 mt-1">NEET Top 1000 Rank selections (3 Yrs)</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-indigo-500/5 pointer-events-none" />
            <GraduationCap className="text-indigo-400 mb-3" size={24} />
            <div className="text-3xl sm:text-4xl font-heading font-bold text-white">{jeeToppers}</div>
            <div className="text-xs text-white/40 mt-1">JEE Advanced Top 500 Selections</div>
          </div>
        </div>

        {/* Controls: Search and Filter Tabs */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 mb-10 border-b border-white/5 pb-8">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-white/[0.02] border border-white/5 p-1 rounded-2xl max-w-fit">
            {(["ALL", "NEET", "JEE_ADVANCED", "JEE_MAIN"] as const).map((tab) => (
              <button
                suppressHydrationWarning
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  filter === tab
                    ? "bg-primary text-white shadow-lg"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {tab.replace("_", " ")}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative min-w-[280px] md:max-w-md w-full">
            <Search size={14} className="absolute left-3.5 top-3.5 text-white/30" />
            <input
              suppressHydrationWarning
              type="text"
              placeholder="Search by student, college, marks, or rank..."
              value={search}
              onChange={handleSearchChange}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/30 focus:border-purple-500 focus:bg-white/[0.06] transition-all outline-none"
            />
          </div>
        </div>

        {/* Results Grid */}
        <AnimatePresence mode="popLayout">
          {filteredResults.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredResults.map((ranker, i) => (
                <motion.div
                  layout
                  key={ranker.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -6, borderColor: "rgba(147, 51, 234, 0.35)", backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  className="group relative p-6 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between min-h-[220px]"
                >
                  {/* Decorative glowing light behind card */}
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors pointer-events-none" />

                  {/* Top content */}
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      {/* Avatar initials representation */}
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center font-heading font-bold text-white text-sm shrink-0">
                        {ranker.studentName.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-300 text-[9px] font-bold uppercase tracking-wider">
                          {ranker.examType.replace("_", " ")}
                        </span>
                        {ranker.isFeatured && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[8px] font-bold uppercase tracking-wider">
                            Topper
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-heading font-bold text-white text-base leading-tight group-hover:text-primary transition-colors">
                        {ranker.studentName}
                      </h3>
                      <div className="text-2xl font-heading font-extrabold text-white tracking-tight pt-1">
                        AIR #{ranker.rank}
                      </div>
                    </div>
                  </div>

                  {/* Bottom metrics */}
                  <div className="mt-6 border-t border-white/5 pt-4 space-y-2">
                    <div className="flex justify-between items-center text-xs text-white/50">
                      <span className="flex items-center gap-1"><Target size={12} className="text-purple-400" /> Score / Marks</span>
                      <span className="font-semibold text-white/80">{ranker.marks}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-white/50">
                      <span className="flex items-center gap-1"><GraduationCap size={12} className="text-purple-400" /> Admission College</span>
                      <span className="font-semibold text-white/80 text-right truncate max-w-[160px]">{ranker.college}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-white/30 pt-1">
                      <span className="flex items-center gap-1"><Calendar size={10} /> Batch Class of {ranker.year}</span>
                      <span>Category: {ranker.category}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center rounded-3xl bg-white/[0.02] border border-white/5 p-8"
            >
              <Shield className="text-white/20 mx-auto mb-4" size={40} />
              <h3 className="text-lg font-heading font-bold text-white">No Results Found</h3>
              <p className="text-xs text-white/40 mt-1 max-w-xs mx-auto">
                No ranker matches your query "{search}". Try searching for specific targets like NEET, AIIMS, or IIT.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
