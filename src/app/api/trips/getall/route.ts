import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
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
