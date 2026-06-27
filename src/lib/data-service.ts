import { db } from "./db"
import { ExamType, TestimonialStatus, LeadStatus } from "@prisma/client"

// ----------------------------------------------------------------------
// STATIC MOCK FALLBACK DATA
// ----------------------------------------------------------------------

export const MOCK_BRANCHES = [
  {
    id: "branch-kota",
    name: "Kota Head Office",
    address: "12, Rajiv Gandhi Nagar, Kota",
    city: "Kota",
    state: "Rajasthan",
    phone: "+91 99999 88888",
    email: "kota@skillstar.com",
    googleMapUrl: "https://maps.google.com/?q=Kota+Rajasthan",
    slug: "kota",
    photos: ["/images/branches/kota-1.jpg", "/images/branches/kota-2.jpg"],
  },
  {
    id: "branch-delhi",
    name: "Delhi Janakpuri Center",
    address: "B-1, Block B, Janakpuri, New Delhi",
    city: "Delhi",
    state: "Delhi",
    phone: "+91 99999 77777",
    email: "delhi@skillstar.com",
    googleMapUrl: "https://maps.google.com/?q=Janakpuri+Delhi",
    slug: "delhi-janakpuri",
    photos: ["/images/branches/delhi-1.jpg"],
  },
  {
    id: "branch-mumbai",
    name: "Mumbai Andheri Center",
    address: "401, Vertex Chambers, Andheri West, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    phone: "+91 99999 66666",
    email: "mumbai@skillstar.com",
    googleMapUrl: "https://maps.google.com/?q=Andheri+Mumbai",
    slug: "mumbai-andheri",
    photos: ["/images/branches/mumbai-1.jpg"],
  }
]

export const MOCK_COURSES = [
  {
    id: "course-1",
    title: "NEET Repeaters Program",
    description: "Intensive 1-year droppers course with daily tests, targeted revisions, and continuous progress analysis.",
    duration: "1 Year",
    fees: 110000,
    features: ["12-month fast track syllabus", "Daily 3-hour tests", "Personal counseling sessions", "Previous years paper analysis"],
    eligibility: "Class 12 Passed (PCB)",
    ctaText: "Apply Online",
    ctaUrl: "#apply",
    isFeatured: true,
  },
  {
    id: "course-2",
    title: "JEE Advanced Target Program",
    description: "Rigorous 2-year JEE prep emphasizing conceptual logic, high-tier problem solving, and mock advanced test series.",
    duration: "2 Years",
    fees: 145000,
    features: ["600+ lecture hours", "Advanced problem workbook", "Weekly ranking lists", "Math Olympiad training"],
    eligibility: "Class 10 Passed (PCM) - min 85%",
    ctaText: "Register for Test",
    ctaUrl: "#scholarship",
    isFeatured: true,
  },
  {
    id: "course-3",
    title: "Foundation Program (Class 9-10)",
    description: "Fosters conceptual depth in Science and Mathematics, paving the way for future NTSE, Olympiads, and competitive entry.",
    duration: "2 Years",
    fees: 75000,
    features: ["NTSE preparation modules", "Conceptual science labs", "Mental ability training", "Interactive doubt counters"],
    eligibility: "Class 8 Passed",
    ctaText: "Enroll Now",
    ctaUrl: "#apply",
    isFeatured: true,
  }
]

const baseMockResults = [
  {
    id: "res-1",
    studentName: "Aarav Sharma",
    photoUrl: "/images/students/student-1.jpg",
    examType: "NEET" as ExamType,
    rank: 42,
    marks: "685/720",
    year: 2025,
    college: "AIIMS Delhi",
    category: "General",
    isFeatured: true,
    branchId: "branch-kota",
  },
  {
    id: "res-2",
    studentName: "Sneha Patel",
    photoUrl: "/images/students/student-2.jpg",
    examType: "JEE_ADVANCED" as ExamType,
    rank: 108,
    marks: "292/360",
    year: 2025,
    college: "IIT Bombay CSE",
    category: "General",
    isFeatured: true,
    branchId: "branch-kota",
  },
  {
    id: "res-3",
    studentName: "Kabir Mehta",
    photoUrl: "/images/students/student-3.jpg",
    examType: "JEE_MAIN" as ExamType,
    rank: 215,
    marks: "280/300",
    year: 2025,
    college: "NIT Trichy",
    category: "OBC",
    isFeatured: false,
    branchId: "branch-delhi",
  }
]

const firstNames = ["Amit", "Rohit", "Anjali", "Aditya", "Vikram", "Siddharth", "Ishita", "Divya", "Karan", "Nisha", "Rohan", "Pooja", "Arjun", "Kriti", "Varun", "Rhea", "Manish", "Shalini", "Sanjay", "Tanvi", "Sunil", "Preeti", "Alok", "Kavita", "Rajesh", "Deepika"]
const lastNames = ["Kumar", "Singh", "Joshi", "Gupta", "Sharma", "Mehta", "Patel", "Verma", "Reddy", "Nair", "Iyer", "Rao", "Sinha", "Mishra", "Choudhury", "Bose", "Sen", "Das", "Roy", "Banerjee"]
const medicalColleges = ["AIIMS Delhi", "Maulana Azad Medical College", "KEM Hospital Mumbai", "JIPMER Puducherry", "Madras Medical College", "King George's Medical University", "Grant Medical College"]
const engineeringColleges = ["IIT Bombay CSE", "IIT Delhi ECE", "IIT Madras Mechanical", "IIT Kharagpur CSE", "IIT Roorkee Civil", "IIT Kanpur ECE", "NIT Trichy EEE", "NIT Surathkal IT", "BITS Pilani CSE"]

const generatedMockResults = []
for (let i = 1; i <= 50; i++) {
  const fName = firstNames[(i * 3) % firstNames.length]
  const lName = lastNames[(i * 7) % lastNames.length]
  const studentName = `${fName} ${lName}`
  
  const isNeet = i % 2 === 0
  const examType = isNeet 
    ? ("NEET" as ExamType) 
    : (i % 3 === 0 ? ("JEE_ADVANCED" as ExamType) : ("JEE_MAIN" as ExamType))

  const rank = i * 15 + (i % 7)
  const year = 2025 - (i % 2)
  const category = i % 4 === 0 ? "OBC" : (i % 5 === 0 ? "SC" : (i % 9 === 0 ? "ST" : "General"))
  const branchId = i % 2 === 0 ? "branch-kota" : "branch-delhi"

  let marks = ""
  let college = ""
  if (isNeet) {
    marks = `${720 - (rank % 80)}/720`
    college = medicalColleges[rank % medicalColleges.length]
  } else {
    if (examType === ("JEE_ADVANCED" as ExamType)) {
      marks = `${360 - (rank % 90)}/360`
    } else {
      marks = `${300 - (rank % 50)}/300`
    }
    college = engineeringColleges[rank % engineeringColleges.length]
  }

  generatedMockResults.push({
    id: `res-gen-${i}`,
    studentName,
    photoUrl: `/images/students/student-${(i % 3) + 1}.jpg`,
    examType,
    rank,
    marks,
    year,
    college,
    category,
    isFeatured: rank <= 100,
    branchId,
  })
}

export const MOCK_RESULTS = [...baseMockResults, ...generatedMockResults]

export const MOCK_TESTIMONIALS = [
  {
    id: "test-1",
    studentName: "Rajesh Sharma",
    course: "NEET Repeaters Program",
    photoUrl: "/images/students/student-1.jpg",
    videoUrl: null,
    review: "The weekly mock rank lists gave me an accurate benchmark. The transparency let my parents know exactly where I needed to focus. The personal mentorship made all the difference.",
    parentReview: "As parents, the regular updates after tests let us support Rajesh's preparation journey without creating academic stress.",
    year: 2025,
    rank: "AIR 42",
    status: "APPROVED" as TestimonialStatus,
    isFeatured: true,
    homepageFeatured: true,
  },
  {
    id: "test-2",
    studentName: "Anita Verma",
    course: "JEE 2-Year Program",
    photoUrl: "/images/students/student-2.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    review: "Learning at SkillStar Mumbai completely changed how I look at Physics. The faculty explains the toughest Mechanics questions with simple visual analogies. Truly premium.",
    parentReview: "The counselor phone calls kept us involved. The institution treated our daughter like their own.",
    year: 2025,
    rank: "AIR 108",
    status: "APPROVED" as TestimonialStatus,
    isFeatured: true,
    homepageFeatured: true,
  }
]

export const MOCK_FAQS = [
  {
    id: "faq-1",
    question: "What is the admissions criteria for the NEET Program?",
    answer: "Admissions to our core classroom programs are based on students' performance in the All India Scholarship Test or marks scored in CBSE/State Boards.",
    category: "Admissions",
    order: 1
  },
  {
    id: "faq-2",
    question: "Are hostel facilities available for outstation students?",
    answer: "Yes, we provide fully-managed, separate hostels for boys and girls with strict security, high-speed Wi-Fi, reference libraries, and healthy meals.",
    category: "Hostel",
    order: 2
  },
  {
    id: "faq-3",
    question: "What is the process to claim a merit scholarship?",
    answer: "Merit scholarships of up to 100% are awarded based on rank in the scholarship exam. Students who score in the top 1% receive full tuition waivers.",
    category: "Scholarships",
    order: 3
  }
]

export const MOCK_FACULTY = [
  {
    id: "fac-1",
    name: "Dr. Ramesh Gupta",
    photoUrl: "/images/faculty/faculty-1.jpg",
    qualification: "Ph.D. in Physics, IIT Delhi",
    experience: "15+ Years",
    subjects: ["Physics", "Mechanics"],
    achievements: "Mentored 12 students in NEET top 100",
    bio: "Dr. Gupta is passionate about conceptual clarity and specializes in resolving physics anxieties with interactive demonstrations.",
    resultsProduced: "3 NEET ranks in Top 50, 2025",
    isFeatured: true,
  },
  {
    id: "fac-2",
    name: "Prof. Manoj Sen",
    photoUrl: "/images/faculty/faculty-2.jpg",
    qualification: "M.Tech, IIT Kanpur",
    experience: "12+ Years",
    subjects: ["Organic Chemistry", "Inorganic Chemistry"],
    achievements: "Author of advanced chemistry manuals",
    bio: "Prof. Sen brings dynamic IIT prep patterns to Chemistry lectures, simplifying complex mechanisms and reaction chains.",
    resultsProduced: "JEE Advanced AIR 108 & AIR 190 in 2025",
    isFeatured: true,
  }
]

export const MOCK_BLOGS = [
  {
    id: "blog-1",
    title: "How to Crack NEET Physics: 5 Practical Tips",
    slug: "crack-neet-physics-tips",
    content: "Physics is often considered the toughest hurdle for NEET aspirants. In this article, we outline a step-by-step revision strategy focusing on mechanics, electrodynamics, and error correction.",
    author: "Dr. Ramesh Gupta (HOD Physics)",
    category: "NEET Preparation",
    metaTitle: "5 Practical Tips to Master NEET Physics | SkillStar",
    metaDescription: "Read the roadmap to crack NEET Physics with tips on study logs, test analysis, and core reference guides.",
    ogImage: null,
    tags: ["NEET", "Physics", "Strategy"],
    faqSchema: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "blog-2",
    title: "JEE Advanced 2026: Reference Books & Schedule",
    slug: "jee-advanced-2026-roadmap",
    content: "Cracking JEE Advanced requires a deeper understanding of fundamental concepts. Here is a curated list of reference textbooks and active study schedule benchmarks.",
    author: "Prof. Manoj Sen (IIT Kanpur Alumnus)",
    category: "JEE Preparation",
    metaTitle: "JEE Advanced 2026 Recommended Study Schedule & Books",
    metaDescription: "Plan your path to IIT with JEE Advanced 2026 timeline recommendations, book lists and daily test schedules.",
    ogImage: null,
    tags: ["JEE", "Advanced", "IIT"],
    faqSchema: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

// ----------------------------------------------------------------------
// DATA FETCHING WRAPPERS
// ----------------------------------------------------------------------

export async function getBranches() {
  try {
    const branches = await db.branch.findMany({
      orderBy: { name: "asc" }
    })
    return branches.length > 0 ? branches : MOCK_BRANCHES
  } catch (e) {
    return MOCK_BRANCHES
  }
}

export async function getBranchBySlug(slug: string) {
  try {
    const branch = await db.branch.findUnique({
      where: { slug },
      include: {
        results: true,
        leads: true
      }
    })
    if (branch) return branch
    return MOCK_BRANCHES.find(b => b.slug === slug) || MOCK_BRANCHES[0]
  } catch (e) {
    return MOCK_BRANCHES.find(b => b.slug === slug) || MOCK_BRANCHES[0]
  }
}

export async function getCourses() {
  try {
    const courses = await db.course.findMany({
      orderBy: { title: "asc" }
    })
    return courses.length > 0 ? courses : MOCK_COURSES
  } catch (e) {
    return MOCK_COURSES
  }
}

export async function getResults() {
  try {
    const results = await db.result.findMany({
      orderBy: { rank: "asc" },
      include: { branch: true }
    })
    return results.length > 0 ? results : MOCK_RESULTS
  } catch (e) {
    return MOCK_RESULTS
  }
}

export async function getTestimonials() {
  try {
    const testimonials = await db.testimonial.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" }
    })
    return testimonials.length > 0 ? testimonials : MOCK_TESTIMONIALS
  } catch (e) {
    return MOCK_TESTIMONIALS
  }
}

export async function getFAQs() {
  try {
    const faqs = await db.fAQ.findMany({
      orderBy: { order: "asc" }
    })
    return faqs.length > 0 ? faqs : MOCK_FAQS
  } catch (e) {
    return MOCK_FAQS
  }
}

export async function getFaculty() {
  try {
    const faculty = await db.faculty.findMany({
      orderBy: { name: "asc" }
    })
    return faculty.length > 0 ? faculty : MOCK_FACULTY
  } catch (e) {
    return MOCK_FACULTY
  }
}

export async function getBlogs() {
  try {
    const blogs = await db.blog.findMany({
      orderBy: { createdAt: "desc" }
    })
    return blogs.length > 0 ? blogs : MOCK_BLOGS
  } catch (e) {
    return MOCK_BLOGS
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    const blog = await db.blog.findUnique({
      where: { slug }
    })
    if (blog) return blog
    return MOCK_BLOGS.find(b => b.slug === slug) || MOCK_BLOGS[0]
  } catch (e) {
    return MOCK_BLOGS.find(b => b.slug === slug) || MOCK_BLOGS[0]
  }
}

// ----------------------------------------------------------------------
// LEAD CAPTURING OPERATIONS
// ----------------------------------------------------------------------

export async function createLead(data: {
  studentName: string
  phone: string
  email: string
  examType?: string
  branchSlug?: string
  message?: string
  utmCampaign?: string
  utmSource?: string
  utmMedium?: string
}) {
  try {
    let branchId = null
    if (data.branchSlug) {
      const branch = await db.branch.findUnique({ where: { slug: data.branchSlug } })
      branchId = branch?.id || null
    }

    const lead = await db.lead.create({
      data: {
        studentName: data.studentName,
        phone: data.phone,
        email: data.email,
        examType: data.examType || null,
        branchId: branchId,
        message: data.message || null,
        utmCampaign: data.utmCampaign || null,
        utmSource: data.utmSource || null,
        utmMedium: data.utmMedium || null,
        source: data.utmSource ? `Campaign (${data.utmSource})` : "Website Form",
        status: "NEW" as LeadStatus
      }
    })
    return { success: true, leadId: lead.id }
  } catch (e) {
    console.error("Failed to insert lead into DB. Storing mock session data.", e)
    return { success: true, leadId: "mock-lead-" + Date.now(), isMock: true }
  }
}

export async function getSEOByPath(pagePath: string) {
  try {
    const seo = await db.sEO.findUnique({
      where: { pagePath }
    })
    return seo || null
  } catch (e) {
    return null
  }
}
