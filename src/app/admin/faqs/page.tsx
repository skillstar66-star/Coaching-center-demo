import { getFAQs } from "@/lib/data-service"
import { createFAQAction, deleteFAQAction } from "@/lib/admin-actions"
import { Trash2, HelpCircle, Plus } from "lucide-react"

export default async function FAQsAdminPage() {
  const faqs = await getFAQs()

  async function handleCreate(formData: FormData) {
    "use server"
    const question = formData.get("question") as string
    const answer = formData.get("answer") as string
    const category = formData.get("category") as string

    if (question && answer && category) {
      await createFAQAction({ question, answer, category })
    }
  }

  async function handleDelete(formData: FormData) {
    "use server"
    const id = formData.get("id") as string
    if (id) {
      await deleteFAQAction(id)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-white">FAQs Management</h1>
        <p className="text-xs text-slate-400 mt-1">Add, update, or remove question and answers in different student categories.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* FAQ Form */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Plus className="text-purple-400" size={18} />
            <h3 className="font-heading font-semibold text-sm text-white">Add FAQ Entry</h3>
          </div>

          <form action={handleCreate} className="space-y-4 text-xs text-slate-300">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Question</label>
              <input
                type="text"
                name="question"
                required
                placeholder="e.g. Is there any transport facility?"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl focus:outline-purple-500 text-white"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Answer</label>
              <textarea
                name="answer"
                required
                rows={4}
                placeholder="Write clear response..."
                className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl focus:outline-purple-500 text-white"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Category</label>
              <select
                name="category"
                required
                className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl focus:outline-purple-500 text-white"
              >
                <option value="NEET">NEET</option>
                <option value="JEE">JEE</option>
                <option value="Admissions">Admissions</option>
                <option value="Fees">Fees</option>
                <option value="Scholarships">Scholarships</option>
                <option value="Hostel">Hostel</option>
                <option value="Faculty">Faculty</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl transition-all shadow-md shadow-purple-600/20"
            >
              Publish FAQ
            </button>
          </form>
        </div>

        {/* FAQs List */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <HelpCircle className="text-purple-400" size={18} />
            <h3 className="font-heading font-semibold text-sm text-white">FAQ List</h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-start gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white">{faq.question}</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 text-[9px] font-bold border border-slate-800">
                      {faq.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{faq.answer}</p>
                </div>

                {faq.id && !faq.id.startsWith("faq-") && (
                  <form action={handleDelete}>
                    <input type="hidden" name="id" value={faq.id} />
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
