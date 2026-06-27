import { PrismaClient, ExamType, TestimonialStatus, LeadStatus } from "@prisma/client"
import * as crypto from "crypto"

const prisma = new PrismaClient()

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex")
}

async function main() {
  console.log("Seeding started...")

  // 1. Roles
  const roles = [
    { name: "Super Admin", permissions: ["*"] },
    { name: "Branch Admin", permissions: ["leads:read", "leads:write", "enquiries:read", "results:write", "courses:read"] },
    { name: "Counsellor", permissions: ["leads:read", "leads:write", "enquiries:read"] },
    { name: "Faculty", permissions: ["courses:read", "results:read"] },
    { name: "Content Manager", permissions: ["blogs:write", "faqs:write", "testimonials:write", "courses:write", "results:write"] },
  ]

  const dbRoles = []
  for (const role of roles) {
    const dbRole = await prisma.role.upsert({
      where: { name: role.name },
      update: { permissions: role.permissions },
      create: { name: role.name, permissions: role.permissions },
    })
    dbRoles.push(dbRole)
  }
  console.log("Roles seeded.")

  // 2. Branches
  const branches = [
    {
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

  const dbBranches = []
  for (const b of branches) {
    const dbBranch = await prisma.branch.upsert({
      where: { slug: b.slug },
      update: b,
      create: b,
    })
    dbBranches.push(dbBranch)
  }
  console.log("Branches seeded.")

  // 3. Admin User
  const superAdminRole = dbRoles.find(r => r.name === "Super Admin")!
  await prisma.user.upsert({
    where: { email: "admin@skillstar.com" },
    update: {
      passwordHash: hashPassword("admin123"),
      roleId: superAdminRole.id,
    },
    create: {
      name: "SkillStar Super Admin",
      email: "admin@skillstar.com",
      passwordHash: hashPassword("admin123"),
      roleId: superAdminRole.id,
    },
  })
  console.log("Admin user seeded.")

  // 4. Courses
  const courses = [
    {
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

  for (const c of courses) {
    await prisma.course.upsert({
      where: { title: c.title },
      update: c,
      create: c,
    })
  }
  console.log("Courses seeded.")

  // 5. Results
  const results = [
    {
      studentName: "Aarav Sharma",
      photoUrl: "/images/students/student-1.jpg",
      examType: ExamType.NEET,
      rank: 42,
      marks: "685/720",
      year: 2025,
      college: "AIIMS Delhi",
      category: "General",
      isFeatured: true,
      branchId: dbBranches[0].id,
    },
    {
      studentName: "Sneha Patel",
      photoUrl: "/images/students/student-2.jpg",
      examType: ExamType.JEE_ADVANCED,
      rank: 108,
      marks: "292/360",
      year: 2025,
      college: "IIT Bombay CSE",
      category: "General",
      isFeatured: true,
      branchId: dbBranches[0].id,
    },
    {
      studentName: "Kabir Mehta",
      photoUrl: "/images/students/student-3.jpg",
      examType: ExamType.JEE_MAIN,
      rank: 215,
      marks: "280/300",
      year: 2025,
      college: "NIT Trichy",
      category: "OBC",
      isFeatured: false,
      branchId: dbBranches[1].id,
    }
  ]

  // Programmatically generate 50 student results split between JEE and NEET (50/50 split)
  const firstNames = ["Amit", "Rohit", "Anjali", "Aditya", "Vikram", "Siddharth", "Ishita", "Divya", "Karan", "Nisha", "Rohan", "Pooja", "Arjun", "Kriti", "Varun", "Rhea", "Manish", "Shalini", "Sanjay", "Tanvi", "Sunil", "Preeti", "Alok", "Kavita", "Rajesh", "Deepika"]
  const lastNames = ["Kumar", "Singh", "Joshi", "Gupta", "Sharma", "Mehta", "Patel", "Verma", "Reddy", "Nair", "Iyer", "Rao", "Sinha", "Mishra", "Choudhury", "Bose", "Sen", "Das", "Roy", "Banerjee"]
  const medicalColleges = ["AIIMS Delhi", "Maulana Azad Medical College", "KEM Hospital Mumbai", "JIPMER Puducherry", "Madras Medical College", "King George's Medical University", "Grant Medical College"]
  const engineeringColleges = ["IIT Bombay CSE", "IIT Delhi ECE", "IIT Madras Mechanical", "IIT Kharagpur CSE", "IIT Roorkee Civil", "IIT Kanpur ECE", "NIT Trichy EEE", "NIT Surathkal IT", "BITS Pilani CSE"]

  for (let i = 1; i <= 50; i++) {
    const fName = firstNames[(i * 3) % firstNames.length]
    const lName = lastNames[(i * 7) % lastNames.length]
    const studentName = `${fName} ${lName}`
    
    const isNeet = i % 2 === 0
    const examType = isNeet 
      ? ExamType.NEET 
      : (i % 3 === 0 ? ExamType.JEE_ADVANCED : ExamType.JEE_MAIN)

    const rank = i * 15 + (i % 7) // Keep ranks reasonable (15 to ~760)
    const year = 2025 - (i % 2) // split between 2025 and 2024
    const category = i % 4 === 0 ? "OBC" : (i % 5 === 0 ? "SC" : (i % 9 === 0 ? "ST" : "General"))
    const branchId = dbBranches[i % dbBranches.length].id

    let marks = ""
    let college = ""
    if (isNeet) {
      marks = `${720 - (rank % 80)}/720`
      college = medicalColleges[rank % medicalColleges.length]
    } else {
      if (examType === ExamType.JEE_ADVANCED) {
        marks = `${360 - (rank % 90)}/360`
      } else {
        marks = `${300 - (rank % 50)}/300`
      }
      college = engineeringColleges[rank % engineeringColleges.length]
    }

    results.push({
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

  // Clear existing results before seeding to avoid duplicates
  await prisma.result.deleteMany()

  for (const r of results) {
    await prisma.result.create({ data: r })
  }
  console.log("Results seeded.")

  // 6. Testimonials
  const testimonials = [
    {
      studentName: "Rajesh Sharma",
      course: "NEET Repeaters Program",
      photoUrl: "/images/students/student-1.jpg",
      review: "The weekly mock rank lists gave me an accurate benchmark. The transparency let my parents know exactly where I needed to focus. The personal mentorship made all the difference.",
      parentReview: "As parents, the regular updates after tests let us support Rajesh's preparation journey without creating academic stress.",
      year: 2025,
      rank: "AIR 42",
      status: TestimonialStatus.APPROVED,
      isFeatured: true,
      homepageFeatured: true,
    },
    {
      studentName: "Anita Verma",
      course: "JEE 2-Year Program",
      photoUrl: "/images/students/student-2.jpg",
      review: "Learning at SkillStar Mumbai completely changed how I look at Physics. The faculty explains the toughest Mechanics questions with simple visual analogies. Truly premium.",
      parentReview: "The counselor phone calls kept us involved. The institution treated our daughter like their own.",
      year: 2025,
      rank: "AIR 108",
      status: TestimonialStatus.APPROVED,
      isFeatured: true,
      homepageFeatured: true,
    }
  ]

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t })
  }
  console.log("Testimonials seeded.")

  // 7. FAQs
  const faqs = [
    {
      question: "What is the admissions criteria for the NEET Program?",
      answer: "Admissions to our core classroom programs are based on students' performance in the All India Scholarship Test or marks scored in CBSE/State Boards.",
      category: "Admissions",
      order: 1
    },
    {
      question: "Are hostel facilities available for outstation students?",
      answer: "Yes, we provide fully-managed, separate hostels for boys and girls with strict security, high-speed Wi-Fi, reference libraries, and healthy meals.",
      category: "Hostel",
      order: 2
    },
    {
      question: "What is the process to claim a merit scholarship?",
      answer: "Merit scholarships of up to 100% are awarded based on rank in the scholarship exam. Students who score in the top 1% receive full tuition waivers.",
      category: "Scholarships",
      order: 3
    }
  ]

  for (const f of faqs) {
    await prisma.fAQ.create({ data: f })
  }
  console.log("FAQs seeded.")

  // 8. Blogs
  const blogs = [
    {
      title: "How to Crack NEET Physics: 5 Practical Tips",
      slug: "crack-neet-physics-tips",
      content: "Physics is often considered the toughest hurdle for NEET aspirants. In this article, we outline a step-by-step revision strategy focusing on mechanics, electrodynamics, and error correction.",
      author: "Dr. Ramesh Gupta (HOD Physics)",
      category: "NEET Preparation",
      metaTitle: "5 Practical Tips to Master NEET Physics | SkillStar",
      metaDescription: "Read the comprehensive roadmap to crack NEET Physics with tips on study logs, test analysis, and core reference guides written by HOD Physics.",
      tags: ["NEET", "Physics", "Exam Strategy"],
    },
    {
      title: "JEE Advanced 2026: Reference Books & Schedule",
      slug: "jee-advanced-2026-roadmap",
      content: "Cracking JEE Advanced requires a deeper understanding of fundamental concepts. Here is a curated list of reference textbooks and active study schedule benchmarks.",
      author: "Prof. Manoj Sen (IIT Kanpur Alumnus)",
      category: "JEE Preparation",
      metaTitle: "JEE Advanced 2026 Recommended Study Schedule & Books",
      metaDescription: "Plan your path to IIT with JEE Advanced 2026 timeline recommendations, book lists (Irodov, Resnick Halliday, Morrison Boyd) and daily test schedules.",
      tags: ["JEE Advanced", "IIT", "Preparation Books"],
    }
  ]

  for (const bl of blogs) {
    await prisma.blog.upsert({
      where: { slug: bl.slug },
      update: bl,
      create: bl,
    })
  }
  console.log("Blogs seeded.")

  // 9. Faculty
  const facultyList = [
    {
      name: "Dr. Ramesh Gupta",
      photoUrl: "/images/faculty/faculty-1.jpg",
      qualification: "Ph.D. in Physics, IIT Delhi",
      experience: "15+ Years",
      subjects: ["Mechanics", "Thermodynamics"],
      achievements: "Mentored 12 students in NEET top 100",
      bio: "Dr. Gupta is passionate about conceptual clarity and specializes in resolving physics anxieties with interactive demonstrations.",
      resultsProduced: "3 NEET ranks in Top 50, 2025",
      isFeatured: true,
    },
    {
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

  for (const f of facultyList) {
    await prisma.faculty.create({ data: f })
  }
  console.log("Faculty seeded.")

  // 10. Scholarships
  const scholarshipSchemes = [
    {
      title: "SkillStar Merit Scholarship Scheme 2026",
      eligibility: "Class 10/11/12 students appearing in SkillStar Scholarship Test",
      examDate: "January 15, 2027",
      duration: "1 or 2 Years (Program dependent)",
      coverage: "Up to 100% Tuition Fee Waiver",
      terms: ["Must maintain 85% attendance", "Must maintain 75% score in weekly mock tests"],
    }
  ]

  for (const sc of scholarshipSchemes) {
    await prisma.scholarship.create({ data: sc })
  }
  console.log("Scholarships seeded.")

  // 11. SEO Configs
  const seoSettings = [
    {
      pagePath: "/",
      metaTitle: "Best NEET & JEE Coaching Institute | SkillStar Kota & Delhi",
      metaDescription: "SkillStar offers premium classroom coaching for NEET, JEE Main, & JEE Advanced at Kota, Delhi and Mumbai centers. Learn from expert IIT & AIIMS faculty.",
      keywords: ["NEET Coaching", "JEE Coaching", "IIT Coaching", "Kota Coaching", "Medical Entrance"],
    }
  ]

  for (const s of seoSettings) {
    await prisma.sEO.upsert({
      where: { pagePath: s.pagePath },
      update: s,
      create: s,
    })
  }
  console.log("SEO configurations seeded.")

  console.log("Seeding completed successfully!")
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
