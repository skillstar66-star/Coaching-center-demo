import type { Metadata } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LenisProvider } from "@/components/lenis-provider"
import { StickyBar } from "@/components/sticky-bar"
import { AdmissionModal } from "@/components/admission-modal"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "SkillStar | Best NEET & JEE Coaching Institute",
    template: "%s | SkillStar",
  },
  description:
    "India's most premium NEET and JEE coaching institute. 5000+ medical and engineering selections. Top 100 ranks in NEET & JEE. Book a free demo class today.",
  keywords: [
    "NEET Coaching",
    "JEE Coaching",
    "Best Coaching Institute",
    "Medical Entrance Coaching",
    "IIT Coaching",
    "NEET Preparation",
    "JEE Preparation",
  ],
  openGraph: {
    title: "SkillStar | Best NEET & JEE Coaching Institute",
    description:
      "India's most premium NEET and JEE coaching institute. 5000+ selections. Book a free demo class.",
    url: "https://skillstar.com",
    siteName: "SkillStar",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillStar | Best NEET & JEE Coaching Institute",
    description:
      "India's most premium NEET and JEE coaching institute. 5000+ selections.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://skillstar.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <LenisProvider>
          <Navbar />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <StickyBar />
          <AdmissionModal />
        </LenisProvider>
      </body>
    </html>
  )
}
