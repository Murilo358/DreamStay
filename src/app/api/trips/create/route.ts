//Recebe o que precisamos para criar a reserva no db
//user
//startDate
//endDate

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { spawn } from "child_process";

export async function POST(request: Request) {
  const req = await request.json();
    
  const generatePrisma = async () => {
    try {
      await prisma.$connect();
      await prisma.$executeRaw`PRISMA MIGRATE DEPLOY \--preview-feature  `;
      await prisma.$executeRaw`PRISMA GENERATE`;
      await prisma.$executeRaw`PRISMA DB PULL`;
      console.log("Prisma migration completed successfully.");
    } catch (error) {
      console.error("Prisma migration failed:", error);
    } finally {
      await prisma.$disconnect();
    }
  };

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
      lat: citysSelected.positions.lat.toString(),
      lng: citysSelected.positions.lng.toString(),
    },
  });

  generatePrisma();

  return new NextResponse(
    JSON.stringify({
      req,
    }),
    { status: 201 }
  );
}
