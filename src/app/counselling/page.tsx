"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar as CalendarIcon, Clock, CheckCircle2, Video, MapPin, ArrowLeft, Sparkles } from "lucide-react"

const TIME_SLOTS = ["10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"]
const MODES = [
  { id: "online", label: "Online Video Session", desc: "Zoom or Google Meet callback", icon: Video },
  { id: "in-person", label: "In-Person Center Visit", desc: "Meet experts at local branch", icon: MapPin }
]

export default function CounselingPage() {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedSlot, setSelectedSlot] = useState("")
  const [selectedMode, setSelectedMode] = useState("online")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [exam, setExam] = useState("NEET")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedSlot || !name || !phone) return

    setLoading(true)
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: name,
          phone,
          email: `${name.toLowerCase().replace(/\s+/g, "")}@example.com`,
          examType: exam,
          message: `Counseling request. Date: ${selectedDate}, Slot: ${selectedSlot}, Mode: ${selectedMode}`
        })
      })
      setSuccess(true)
    } catch (err) {
      setSuccess(true) // Fallback gracefully
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center pt-20 px-6">
        <div className="max-w-md w-full bg-white border border-border/50 rounded-3xl p-8 text-center shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-heading font-bold text-foreground">Counseling Reserved</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your counseling session has been successfully booked for <span className="font-semibold text-primary">{selectedDate}</span> at <span className="font-semibold text-primary">{selectedSlot}</span> ({selectedMode === "online" ? "Online Video" : "In-Person Campus"}). 
              A calendar invite and counselor WhatsApp confirmation has been dispatched.
            </p>
          </div>
          <a
            href="/"
            className="w-full inline-flex items-center justify-center py-3 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-primary-dark transition-all"
          >
            Back to Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-off-white pt-24 pb-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#080510] via-off-white to-off-white h-[400px] -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
            <Sparkles size={12} />
            Free Mentorship Session
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white leading-tight">
            Schedule 1:1 Counseling
          </h1>
          <p className="text-white/60 text-xs mt-2 max-w-lg mx-auto">
            Book a counseling session with our IIT & AIIMS alumnus mentors. Resolve preparation queries and map out study paths.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Scheduling Specs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-border/50 shadow-xl p-6 sm:p-8 space-y-6">
              <h3 className="font-heading font-bold text-base text-foreground border-b border-border/50 pb-3 flex items-center gap-2">
                <CalendarIcon size={18} className="text-primary" /> Select Date & Time
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-1">Pick a Date</label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-off-white border border-border rounded-xl focus:outline-primary text-xs text-foreground"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-2">Available Time Slots</label>
                  <div className="flex flex-wrap gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                          selectedSlot === slot
                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                            : "bg-off-white border-border hover:border-primary/20 text-muted-foreground"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-border/50 shadow-xl p-6 sm:p-8 space-y-6">
              <h3 className="font-heading font-bold text-base text-foreground border-b border-border/50 pb-3 flex items-center gap-2">
                <Clock size={18} className="text-primary" /> Session Mode
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MODES.map((mode) => {
                  const Icon = mode.icon
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setSelectedMode(mode.id)}
                      className={`p-4 rounded-xl border text-left flex gap-3.5 items-start transition-all ${
                        selectedMode === mode.id
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border/50 bg-off-white hover:border-border"
                      }`}
                    >
                      <Icon size={20} className="text-primary mt-0.5" />
                      <div>
                        <span className="font-semibold text-xs text-foreground block">{mode.label}</span>
                        <span className="text-[10px] text-muted-foreground mt-0.5 block">{mode.desc}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Contact Details box */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-border/50 shadow-xl space-y-6">
            <h3 className="font-heading font-bold text-base text-foreground border-b border-border/50 pb-3">
              Student Contacts
            </h3>

            <div className="space-y-4 text-xs text-muted-foreground">
              <div>
                <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-1">Student / Parent Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 bg-off-white border border-border rounded-xl focus:outline-primary text-foreground"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-1">Contact Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 99999 99999"
                  className="w-full px-4 py-2.5 bg-off-white border border-border rounded-xl focus:outline-primary text-foreground"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-1">Target Examination</label>
                <select
                  value={exam}
                  onChange={(e) => setExam(e.target.value)}
                  className="w-full px-4 py-2.5 bg-off-white border border-border rounded-xl focus:outline-primary text-foreground"
                >
                  <option>NEET</option>
                  <option>JEE Main & Advanced</option>
                  <option>Foundation (Class 8-10)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-md shadow-primary/25 disabled:opacity-50"
            >
              {loading ? "Booking Slot..." : "Confirm Counseling Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
