import { getCourses } from "@/lib/data-service"
import { createCourseAction, deleteCourseAction } from "@/lib/admin-actions"
import { Trash2, Plus, Sparkles, BookOpen } from "lucide-react"

export default async function CoursesAdminPage() {
  const courses = await getCourses()

  async function handleCreate(formData: FormData) {
    "use server"
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const duration = formData.get("duration") as string
    const fees = Number(formData.get("fees"))
    const eligibility = formData.get("eligibility") as string
    const featuresRaw = formData.get("features") as string
    const features = featuresRaw ? featuresRaw.split(",").map(f => f.trim()) : []

    if (title && description && duration && fees && eligibility) {
      await createCourseAction({
        title,
        description,
        duration,
        fees,
        eligibility,
        features
      })
    }
  }

  async function handleDelete(formData: FormData) {
    "use server"
    const id = formData.get("id") as string
    if (id) {
      await deleteCourseAction(id)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-white">Course Management (CMS)</h1>
        <p className="text-xs text-slate-400 mt-1">Add, edit, or remove program catalogs shown on the landing page.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Course Form */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Plus className="text-purple-400" size={18} />
            <h3 className="font-heading font-semibold text-sm text-white">Create New Program</h3>
          </div>

          <form action={handleCreate} className="space-y-4 text-xs text-slate-300">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Course Title</label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. NEET repeaters crash course"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl focus:outline-purple-500 text-white"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Description</label>
              <textarea
                name="description"
                required
                rows={3}
                placeholder="Write program syllabus overview..."
                className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl focus:outline-purple-500 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Duration</label>
                <input
                  type="text"
                  name="duration"
                  required
                  placeholder="e.g. 1 Year, 2 Years"
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl focus:outline-purple-500 text-white"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Tuition Fees (INR)</label>
                <input
                  type="number"
                  name="fees"
                  required
                  placeholder="e.g. 120000"
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl focus:outline-purple-500 text-white"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Eligibility Criteria</label>
              <input
                type="text"
                name="eligibility"
                required
                placeholder="e.g. Class 12 Passed with min 75%"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl focus:outline-purple-500 text-white"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Key Features (comma separated)</label>
              <input
                type="text"
                name="features"
                placeholder="e.g. 500+ Hours, Daily MCQs, Mock Test"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl focus:outline-purple-500 text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl transition-all shadow-md shadow-purple-600/20"
            >
              Publish Program
            </button>
          </form>
        </div>

        {/* Courses list */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <BookOpen className="text-purple-400" size={18} />
            <h3 className="font-heading font-semibold text-sm text-white">Current Programs</h3>
          </div>

          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.title}
                className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-start gap-4"
              >
                <div className="space-y-2">
                  <div>
                    <h4 className="font-semibold text-sm text-white">{course.title}</h4>
                    <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">{course.duration}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{course.description}</p>
                  <div className="text-[10px] text-slate-500 font-semibold">
                    Fees: ₹{course.fees.toLocaleString()} | Eligibility: {course.eligibility}
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {course.features.map(f => (
                      <span key={f} className="text-[9px] bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800 text-slate-400">{f}</span>
                    ))}
                  </div>
                </div>

                {course.id && !course.id.startsWith("course-") && (
                  <form action={handleDelete} className="shrink-0">
                    <input type="hidden" name="id" value={course.id} />
                    <button
                      type="submit"
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
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
