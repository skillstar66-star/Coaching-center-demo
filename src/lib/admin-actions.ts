"use server"

import { db } from "./db"
import { revalidatePath } from "next/cache"
import { ExamType, TestimonialStatus, LeadStatus } from "@prisma/client"

// ----------------------------------------------------------------------
// LEADS ACTIONS
// ----------------------------------------------------------------------

export async function getLeadsList() {
  try {
    return await db.lead.findMany({
      orderBy: { createdAt: "desc" },
      include: { branch: true }
    })
  } catch (e) {
    // Return empty list if DB is down
    return []
  }
}

export async function updateLeadStatusAction(id: string, status: string) {
  try {
    await db.lead.update({
      where: { id },
      data: { status: status as LeadStatus }
    })
    revalidatePath("/admin/leads")
    revalidatePath("/")
    return { success: true }
  } catch (e) {
    return { success: false, error: "Database unreachable" }
  }
}

// ----------------------------------------------------------------------
// FAQS ACTIONS
// ----------------------------------------------------------------------

export async function createFAQAction(data: { question: string; answer: string; category: string }) {
  try {
    await db.fAQ.create({
      data: {
        question: data.question,
        answer: data.answer,
        category: data.category,
        order: 0
      }
    })
    revalidatePath("/admin/faqs")
    revalidatePath("/")
    return { success: true }
  } catch (e) {
    return { success: false, error: "Database unreachable" }
  }
}

export async function deleteFAQAction(id: string) {
  try {
    await db.fAQ.delete({ where: { id } })
    revalidatePath("/admin/faqs")
    revalidatePath("/")
    return { success: true }
  } catch (e) {
    return { success: false, error: "Database unreachable" }
  }
}

// ----------------------------------------------------------------------
// TESTIMONIALS ACTIONS
// ----------------------------------------------------------------------

export async function updateTestimonialStatusAction(id: string, status: string) {
  try {
    await db.testimonial.update({
      where: { id },
      data: { status: status as TestimonialStatus }
    })
    revalidatePath("/admin/testimonials")
    revalidatePath("/")
    return { success: true }
  } catch (e) {
    return { success: false, error: "Database unreachable" }
  }
}

export async function deleteTestimonialAction(id: string) {
  try {
    await db.testimonial.delete({ where: { id } })
    revalidatePath("/admin/testimonials")
    revalidatePath("/")
    return { success: true }
  } catch (e) {
    return { success: false, error: "Database unreachable" }
  }
}

// ----------------------------------------------------------------------
// RESULTS ACTIONS
// ----------------------------------------------------------------------

export async function createResultAction(data: {
  studentName: string
  examType: string
  rank: number
  marks: string
  year: number
  college: string
  category: string
  branchId?: string
}) {
  try {
    await db.result.create({
      data: {
        studentName: data.studentName,
        examType: data.examType as ExamType,
        rank: Number(data.rank),
        marks: data.marks,
        year: Number(data.year),
        college: data.college,
        category: data.category,
        branchId: data.branchId || null,
        photoUrl: "/images/students/default.jpg",
        isFeatured: true
      }
    })
    revalidatePath("/admin/results")
    revalidatePath("/")
    return { success: true }
  } catch (e) {
    return { success: false, error: "Database unreachable" }
  }
}

export async function deleteResultAction(id: string) {
  try {
    await db.result.delete({ where: { id } })
    revalidatePath("/admin/results")
    revalidatePath("/")
    return { success: true }
  } catch (e) {
    return { success: false, error: "Database unreachable" }
  }
}

// ----------------------------------------------------------------------
// COURSES ACTIONS
// ----------------------------------------------------------------------

export async function createCourseAction(data: {
  title: string
  description: string
  duration: string
  fees: number
  eligibility: string
  features: string[]
}) {
  try {
    await db.course.create({
      data: {
        title: data.title,
        description: data.description,
        duration: data.duration,
        fees: Number(data.fees),
        eligibility: data.eligibility,
        features: data.features,
        isFeatured: true
      }
    })
    revalidatePath("/admin/courses")
    revalidatePath("/")
    return { success: true }
  } catch (e) {
    return { success: false, error: "Database unreachable" }
  }
}

export async function deleteCourseAction(id: string) {
  try {
    await db.course.delete({ where: { id } })
    revalidatePath("/admin/courses")
    revalidatePath("/")
    return { success: true }
  } catch (e) {
    return { success: false, error: "Database unreachable" }
  }
}
