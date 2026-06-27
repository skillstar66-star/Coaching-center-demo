import { NextResponse } from "next/server"
import { getBranches } from "@/lib/data-service"

export async function GET() {
  const branches = await getBranches()
  return NextResponse.json(branches)
}
