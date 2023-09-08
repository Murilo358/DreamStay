//Recebe o que precisamos para criar a reserva no db
//user
//startDate
//endDate

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();

  const {
    citysSelected,
    highLights,
    uploadedImages,
    countryCode,
    descriptions,
  } = req.data;

  await prisma.trip.create({
    data: {
      name: descriptions.title,
      location: citysSelected.cityName,
      locationDescription: "n",
      description: descriptions.description,
      startDate: descriptions.startDate,
      endDate: descriptions.endDate,
      pricePerDay: descriptions.pricePerDay,
      coverImage: uploadedImages[0],
      imagesUrl: uploadedImages,
      highlights: highLights,
      maxGuests: parseInt(descriptions.guests),
      countryCode: countryCode,
      recommended: true,
      lat: citysSelected.positions.lat,
      lng: citysSelected.positions.lng,
    },
  });

  return new NextResponse(
    JSON.stringify({
      req,
    }),
    { status: 201 }
  );
}
