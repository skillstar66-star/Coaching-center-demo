"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle2, Loader2, Sparkles, Phone, Mail, User, BookOpen, MapPin, MessageSquare } from "lucide-react"
import { useAdmissionModal } from "@/hooks/use-admission-modal"

const formSchema = z.object({
  studentName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  examType: z.enum(["NEET", "JEE", "FOUNDATION"], {
    message: "Please select an exam target",
  }),
  branchSlug: z.enum(["kota", "delhi-janakpuri", "mumbai-andheri"], {
    message: "Please select a branch",
  }),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function AdmissionModal() {
  const { isOpen, close } = useAdmissionModal()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const result = await response.json()
      if (result.success) {
        setIsSuccess(true)
        setTimeout(() => {
          setIsSuccess(false)
          reset()
          close()
        }, 3000)
      } else {
        setError(result.error || "Failed to submit. Please try again.")
      }
    } catch (err) {
      setError("Something went wrong. Please check your connection.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-lg bg-[#0e0a1f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-[101] p-6 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>

          {/* Glow effects */}
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-purple-600/20 blur-[60px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-violet-600/20 blur-[60px] pointer-events-none" />

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center justify-center text-center space-y-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400"
              >
                <CheckCircle2 size={32} />
              </motion.div>
              <h3 className="text-xl font-heading font-bold text-white">Inquiry Submitted!</h3>
              <p className="text-xs text-white/50 max-w-sm leading-relaxed">
                Thank you for choosing SkillStar. Our academic counselor will reach out to you within the next 2 hours.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2 pr-8">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles size={10} /> Free Counseling Demo
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
                  Book Your Seat Now
                </h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  Fill in your details below. Gain immediate access to 1:1 expert mapping sessions and custom syllabus kits.
                </p>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Student Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">Student Name</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-3.5 text-white/40" />
                    <input
                      {...register("studentName")}
                      type="text"
                      placeholder="e.g. Rahul Kumar"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/30 focus:border-purple-500 focus:bg-white/[0.06] transition-all outline-none"
                    />
                  </div>
                  {errors.studentName && (
                    <p className="text-[10px] text-rose-400 font-semibold">{errors.studentName.message}</p>
                  )}
                </div>

                {/* Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">Email Address</label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3.5 top-3.5 text-white/40" />
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="name@email.com"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/30 focus:border-purple-500 focus:bg-white/[0.06] transition-all outline-none"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-[10px] text-rose-400 font-semibold">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">Phone Number</label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3.5 top-3.5 text-white/40" />
                      <input
                        {...register("phone")}
                        type="tel"
                        maxLength={10}
                        placeholder="10-digit number"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/30 focus:border-purple-500 focus:bg-white/[0.06] transition-all outline-none"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[10px] text-rose-400 font-semibold">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Exam Target & Branch */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">Exam Target</label>
                    <div className="relative">
                      <BookOpen size={14} className="absolute left-3.5 top-3.5 text-white/40 pointer-events-none" />
                      <select
                        {...register("examType")}
                        className="w-full bg-[#0e0a1f] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white/80 focus:border-purple-500 focus:bg-white/[0.06] transition-all outline-none appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-[#0e0a1f]">Select Target</option>
                        <option value="NEET" className="bg-[#0e0a1f]">NEET Target 2027</option>
                        <option value="JEE" className="bg-[#0e0a1f]">JEE Advanced 2027</option>
                        <option value="FOUNDATION" className="bg-[#0e0a1f]">Foundation Program</option>
                      </select>
                    </div>
                    {errors.examType && (
                      <p className="text-[10px] text-rose-400 font-semibold">{errors.examType.message}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">Branch Center</label>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-3.5 top-3.5 text-white/40 pointer-events-none" />
                      <select
                        {...register("branchSlug")}
                        className="w-full bg-[#0e0a1f] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white/80 focus:border-purple-500 focus:bg-white/[0.06] transition-all outline-none appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-[#0e0a1f]">Select Center</option>
                        <option value="kota" className="bg-[#0e0a1f]">Kota Head Office</option>
                        <option value="delhi-janakpuri" className="bg-[#0e0a1f]">Delhi Janakpuri Center</option>
                        <option value="mumbai-andheri" className="bg-[#0e0a1f]">Mumbai Andheri Center</option>
                      </select>
                    </div>
                    {errors.branchSlug && (
                      <p className="text-[10px] text-rose-400 font-semibold">{errors.branchSlug.message}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">Query / Message (Optional)</label>
                  <div className="relative">
                    <MessageSquare size={14} className="absolute left-3.5 top-3.5 text-white/40" />
                    <textarea
                      {...register("message")}
                      rows={2}
                      placeholder="Any specific doubts or study queries..."
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/30 focus:border-purple-500 focus:bg-white/[0.06] transition-all outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 mt-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary-dark hover:to-purple-700 disabled:from-purple-800 disabled:to-purple-900 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-primary/45 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Submitting Request...
                    </>
                  ) : (
                    "Submit Inquiry"
                  )}
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
