import { getResults, getBranches } from "@/lib/data-service"
import { createResultAction, deleteResultAction } from "@/lib/admin-actions"
import { Trash2, Trophy, Plus, Star } from "lucide-react"

export default async function ResultsAdminPage() {
  const results = await getResults()
  const branches = await getBranches()

  async function handleCreate(formData: FormData) {
    "use server"
    const studentName = formData.get("studentName") as string
    const examType = formData.get("examType") as string
    const rank = Number(formData.get("rank"))
    const marks = formData.get("marks") as string
    const year = Number(formData.get("year"))
    const college = formData.get("college") as string
    const category = formData.get("category") as string
    const branchId = formData.get("branchId") as string

    if (studentName && examType && rank && marks && year && college && category) {
      await createResultAction({
        studentName,
        examType,
        rank,
        marks,
        year,
        college,
        category,
        branchId
      })
    }
  }

  async function handleDelete(formData: FormData) {
    "use server"
    const id = formData.get("id") as string
    if (id) {
      await deleteResultAction(id)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-white">Results & Rankers Management</h1>
        <p className="text-xs text-slate-400 mt-1">Manage All India Rankers, scores, and target medical/engineering admissions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Result Form */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Plus className="text-purple-400" size={18} />
            <h3 className="font-heading font-semibold text-sm text-white">Add Ranker Record</h3>
          </div>

          <form action={handleCreate} className="space-y-4 text-xs text-slate-300">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Student Name</label>
              <input
                type="text"
                name="studentName"
                required
                placeholder="e.g. Aarav Sharma"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl focus:outline-purple-500 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Exam Type</label>
                <select
                  name="examType"
                  required
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl focus:outline-purple-500 text-white"
                >
                  <option value="NEET">NEET</option>
                  <option value="JEE_MAIN">JEE Main</option>
                  <option value="JEE_ADVANCED">JEE Advanced</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">All India Rank (AIR)</label>
                <input
                  type="number"
                  name="rank"
                  required
                  placeholder="e.g. 42"
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl focus:outline-purple-500 text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Score Marks</label>
                <input
                  type="text"
                  name="marks"
                  required
                  placeholder="e.g. 685/720"
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl focus:outline-purple-500 text-white"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Result Year</label>
                <input
                  type="number"
                  name="year"
                  required
                  defaultValue={2026}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl focus:outline-purple-500 text-white"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Admitted College</label>
              <input
                type="text"
                name="college"
                required
                placeholder="e.g. AIIMS Delhi, IIT Bombay CSE"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl focus:outline-purple-500 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  required
                  defaultValue="General"
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl focus:outline-purple-500 text-white"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Coaching Branch</label>
                <select
                  name="branchId"
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl focus:outline-purple-500 text-white"
                >
                  <option value="">General (All Centers)</option>
                  {branches.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl transition-all shadow-md shadow-purple-600/20"
            >
              Publish Ranker
            </button>
          </form>
        </div>

        {/* Results List */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Trophy className="text-purple-400" size={18} />
            <h3 className="font-heading font-semibold text-sm text-white">Ranker Archives</h3>
          </div>

          <div className="space-y-3">
            {results.map((ranker) => (
              <div
                key={ranker.id}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white">{ranker.studentName}</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[9px] font-bold">
                      {ranker.examType} AIR {ranker.rank}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Score: {ranker.marks} | College: {ranker.college} | Year: {ranker.year}
                  </p>
                  <p className="text-[9px] text-slate-500 mt-0.5">
                    Branch: {(ranker as any).branch?.name || "General/Kota"}
                  </p>
                </div>

                {ranker.id && !ranker.id.startsWith("res-") && (
                  <form action={handleDelete}>
                    <input type="hidden" name="id" value={ranker.id} />
                    <button
                      type="submit"
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <Trash2 size={15} />
                    </button>
                  </form>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
