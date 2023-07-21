//Irá verificar se a trip ja foi preenchida com a data

import { prisma } from "@/lib/prisma";
import { differenceInDays, isAfter, isBefore } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();

  const trip = await prisma.trip.findUnique({
    where: {
      id: req.tripId,
    },
  });

  console.log("ASAAAAAAAAAAAAA");
  console.log({ trip });

  if (!trip) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "TRIP_NOT_FOUND",
        },
      })
    );
  }

  //Verifica se a data preenchida é antes da data inicial (mesmo que no front ja esteja feito)
  if (isBefore(new Date(req.startDate), new Date(trip.startDate))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "INVALID_START_DATE",
        },
      }),
      { status: 400 }
    );
  }
  //Verifica se a data preenchida é antes da data final
  if (isAfter(new Date(req.endDate), new Date(trip.endDate))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "INVALID_END_DATE",
        },
      }),
      { status: 400 }
    );
  }

  //Verifica se a data selecionada no resquest ja não foi preenchida

  const reservations = await prisma.tripReservation.findMany({
    where: {
      tripId: req.tripId,
      startDate: {
        lte: new Date(req.endDate),
      },
      endDate: {
        gte: new Date(req.startDate),
      },
    },
  });

  if (reservations.length > 0) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "TRIP_ALREADY_RESERVED",
        },
      })
    );
  }

  return new NextResponse(
    JSON.stringify({
      success: true,
      trip,
      totalPrice:
        differenceInDays(new Date(req.endDate), new Date(req.startDate)) *
        Number(trip.pricePerDay),
    })
  );
}
