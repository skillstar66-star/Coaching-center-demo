import { NextRequest, NextResponse } from "next/server"
import { createLead } from "@/lib/data-service"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const result = await createLead(data)
    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}
