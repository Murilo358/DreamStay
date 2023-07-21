import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params: { reservationId } }: { params: { reservationId: string } }
) {
  const { searchParams } = new URL(request.url);

  if (!reservationId) {
    return {
      status: 400,
      body: {
        message: "missing reservationId",
      },
    };
  }

  const reservation = await prisma.tripReservation.delete({
    where: {
      id: reservationId,
    },
  });

  return new NextResponse(JSON.stringify(reservation), { status: 200 });
}
