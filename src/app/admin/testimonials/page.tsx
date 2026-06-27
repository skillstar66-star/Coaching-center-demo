import { getTestimonials } from "@/lib/data-service"
import { updateTestimonialStatusAction, deleteTestimonialAction } from "@/lib/admin-actions"
import { Trash2, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react"

export default async function TestimonialsAdminPage() {
  const testimonials = await getTestimonials()

  async function handleApprove(formData: FormData) {
    "use server"
    const id = formData.get("id") as string
    if (id) {
      await updateTestimonialStatusAction(id, "APPROVED")
    }
  }

  async function handleDelete(formData: FormData) {
    "use server"
    const id = formData.get("id") as string
    if (id) {
      await deleteTestimonialAction(id)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-white">Student Testimonials CMS</h1>
        <p className="text-xs text-slate-400 mt-1">Review student & parent feedback, approve them for layout feature status, or reject submissions.</p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <MessageSquare className="text-purple-400" size={18} />
          <h3 className="font-heading font-semibold text-sm text-white">Registered Submissions</h3>
        </div>

        <div className="space-y-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-start gap-4"
            >
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-white">{t.studentName}</span>
                  <span className="text-[10px] text-slate-400 font-medium">({t.course} · {t.year})</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    t.status === "APPROVED" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                  }`}>
                    {t.status}
                  </span>
                </div>
                <p className="text-slate-300 italic leading-relaxed">&ldquo;{t.review}&rdquo;</p>
                {t.parentReview && (
                  <p className="text-slate-400 text-[11px] border-l-2 border-purple-500/40 pl-3">
                    <span className="font-semibold block text-slate-300 not-italic text-[10px] mb-0.5">Parent Review:</span>
                    &ldquo;{t.parentReview}&rdquo;
                  </p>
                )}
                {t.rank && (
                  <div className="text-[10px] text-purple-400 font-semibold">Rank Secured: {t.rank}</div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {t.status === "PENDING" && (
                  <form action={handleApprove}>
                    <input type="hidden" name="id" value={t.id} />
                    <button
                      type="submit"
                      className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all"
                      title="Approve Review"
                    >
                      <CheckCircle2 size={16} />
                    </button>
                  </form>
                )}

                {t.id && !t.id.startsWith("test-") && (
                  <form action={handleDelete}>
                    <input type="hidden" name="id" value={t.id} />
                    <button
                      type="submit"
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                      title="Delete Review"
                    >
                      <Trash2 size={16} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
