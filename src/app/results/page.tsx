import { getResults } from "@/lib/data-service"
import { ResultsWallClient } from "@/components/results-wall-client"

export const metadata = {
  title: "Complete Results Wall | SkillStar",
  description: "View the comprehensive list of toppers, ranks, and selection ratios for NEET, JEE Main, & JEE Advanced admissions at SkillStar.",
}

export default async function ResultsPage() {
  const results = await getResults()

  // Map result fields correctly and ensure type safety
  const formattedResults = results.map((r) => ({
    id: r.id,
    studentName: r.studentName,
    photoUrl: r.photoUrl || "",
    examType: r.examType as "NEET" | "JEE_MAIN" | "JEE_ADVANCED",
    rank: r.rank,
    marks: r.marks,
    year: r.year,
    college: r.college,
    category: r.category,
    isFeatured: r.isFeatured || false,
  }))

  return <ResultsWallClient initialResults={formattedResults} />
}
