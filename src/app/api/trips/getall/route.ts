import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const prisma = new PrismaClient();
  const trips = await prisma.trip.findMany({});

  if (!trips) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "ALL_TRIPS_NOT_FOUNDED",
        },
      })
    );
  }

  return new NextResponse(
    JSON.stringify({
      trips: trips,
      success: true,
    }),
    { status: 201 }
  );
}
